import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

@Schema()
export class Auth {
  @Prop()
  id?: string;
  @Prop()
  username?: string;
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  firstName?: string;
  @Prop()
  lastName?: string;
  @Prop()
  acessToken?: string;
  @Prop()
  refreshToken?: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
