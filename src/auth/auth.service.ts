import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth, AuthDocument } from './auth.model';
import { createHash } from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import { JwtPayload } from './jwt-payload/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name) private AuthModel: Model<AuthDocument>,
    private readonly jwtService: JwtService,
  ) {}

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
  async login(AuthData: Auth): Promise<{ acessToken: string }> {
    const username = AuthData.username;
    const hashedPassword = createHash('sha256')
      .update(AuthData.password)
      .digest('hex');
    const existingUser = await this.AuthModel.findOne({
      username: username,
      password: hashedPassword,
    }).exec();
    console.log(existingUser);
    if (!existingUser) {
      throw new Error('User não existe');
    }

    if (existingUser) {
      const payload = { id: existingUser.id };
      const acessToken = this.jwtService.sign(payload);
      return { acessToken: acessToken };
    }

    return null;
  }
}
