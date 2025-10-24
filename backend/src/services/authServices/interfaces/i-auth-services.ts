import { UserDto, UserProfileDto } from 'src/dto/user.dto';
import { CreateUserDTO, GetUserDto, LoginUserDto } from '../../../dto/authDTO/auth.dto';
export interface IAuthService {
  signup(userData: CreateUserDTO): Promise<GetUserDto>;
  login(userData: LoginUserDto): Promise<UserDto>;
  forgotPassword(email: string): Promise<void>;
  resetPassword(token: string, newPassword: string): Promise<void>;
  verifyPassword(userId: string, password: string): Promise<void>;
  changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void>;
  changeEmailRequest(
    userId: string,
    password: string,
    newEmail: string,
  ): Promise<{ expiresAt: Date }>;
  verifyEmailChange(userId: string, otp: string): Promise<UserProfileDto | null>;
  resendChangeEmailOtp(userId: string): Promise<{ expiresAt: Date }>;
}
