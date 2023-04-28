import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.model';
import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload } from './jwt-payload/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { Console } from 'console';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private AuthModel: Model<AuthDocument>,
    private readonly jwtService: JwtService,
  ) {}
  private readonly secretKey = 'biscoito';

  async register(AuthData: Auth): Promise<Auth> {
    const username = AuthData.username;
    const existingUser = await this.AuthModel.findOne({ username }).exec();
    if (existingUser) {
      throw new Error('User already exists');
    }
    const hashedPassword = createHash('sha256')
      .update(AuthData.password)
      .digest('hex');
    const id = uuidv4();
    const newUser = new this.AuthModel({
      id,
      username: AuthData.username,
      email: AuthData.email,
      password: hashedPassword,
      firstName: AuthData.firstName,
      lastName: AuthData.lastName,
    });
    await newUser.save();
    return {
      id,
      username: AuthData.username,
      email: AuthData.email,
      password: hashedPassword,
      firstName: AuthData.firstName,
      lastName: AuthData.lastName,
    };
  }
  async validateUser(payload: JwtPayload): Promise<Auth> {
    return this.AuthModel.findById(payload.sub);
  }

  async validate(payload: JwtPayload): Promise<{ acessToken: any }> {
    console.log(payload);
    try {
      const payload_ = this.jwtService.verify(payload.acessToken);
      console.log(payload_);
      return { acessToken: payload_ };
    } catch (err) {
      throw new Error('Invalid token');
    }
  }
  async refresh(AuthData: JwtPayload): Promise<{ acessToken: any }> {
    const payload = this.jwtService.verify(AuthData.acessToken);
    console.log(payload);

    if (!payload) {
      throw new Error('Invalid token');
    }
    const decoded = this.jwtService.decode(AuthData.acessToken);
    const id = typeof decoded === 'string' ? decoded : decoded.id;

    console.log(id);
    const acessToken = this.jwtService.sign({ id: id }, { expiresIn: '15m' });
    return { acessToken: acessToken };
  }

  async login(
    AuthData: Auth,
  ): Promise<{ acessToken: string; refreshToken: string }> {
    const email = AuthData.email;
    const hashedPassword = createHash('sha256')
      .update(AuthData.password)
      .digest('hex');
    const existingUser = await this.AuthModel.findOne({
      email: email,
      password: hashedPassword,
    }).exec();
    console.log(existingUser);
    if (!existingUser) {
      throw new Error('User não existe');
    }

    if (existingUser) {
      const payload = { id: existingUser.id };
      const acessToken = this.jwtService.sign(payload, { expiresIn: '15m' });
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '7d' });
      return { acessToken: acessToken, refreshToken: refreshToken };
    }

    return null;
  }
}
