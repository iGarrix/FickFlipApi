import { User } from 'src/domain/models/user.model';

export class AuthenticateDto {
  user: User;
  accessToken: string;
  //refreshToken: string;
}
