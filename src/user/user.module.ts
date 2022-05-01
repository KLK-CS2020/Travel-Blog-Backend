import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../mongoDB/user.schema';
import { ProfileProvider } from '../mongoDB/profile.provider';
import { DatabaseModule } from '../mongoDB/database.module';
import { ProfileSchema } from "../mongoDB/profile.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, {name: 'Profile', schema: ProfileSchema}]),
    DatabaseModule,
  ],
  providers: [UserService, ...ProfileProvider],
  exports: [UserService],
})
export class UserModule {}
