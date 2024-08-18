/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';


export type TUser = {
  _id?:string;
  id: string;
  name: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  contactNo: string;
  address: string;
  role: 'superAdmin' | 'admin' | 'user';
  status: 'in-progress' | 'blocked';
  membership?: 'general'| 'silver'| 'gold'| 'platinum';
  isDeleted: boolean;
};

/* static method defination */
export interface UserModel extends Model<TUser> {
  isUserExistsByEmail(email: string): Promise<TUser>;

  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;

  isJWTIssuedBeforePasswordChange(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
