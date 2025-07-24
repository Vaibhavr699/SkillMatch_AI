import { Controller, Post, Body, UsePipes, ValidationPipe, UnauthorizedException, Get, UseGuards, Req, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Request } from 'express';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';

// DTO for signup
export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsString()
  name?: string;
}

// DTO for login
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

// DTO for admin invite acceptance
export class AdminInviteAcceptDto {
  @IsString()
  code: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}

// DTO for forgot password
export class ForgotPasswordDto {
  @IsEmail()
  email: string;
}

// DTO for reset password
export class ResetPasswordDto {
  @IsString()
  token: string;

  @IsString()
  @MinLength(6)
  newPassword: string;
}

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Register a new user
   * POST /auth/signup
   * Body: { email, password, name? }
   */
  @Post('signup')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async signup(@Body() signupDto: SignupDto) {
    return this.authService.register(signupDto.email, signupDto.password, signupDto.name);
  }

  /**
   * Login user
   * POST /auth/login
   * Body: { email, password }
   * Returns: { access_token }
   */
  @Post('login')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  /**
   * Get current authenticated user
   * GET /auth/me
   * Requires: Bearer JWT token
   */
  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@Req() req: any) {
    // req.user is set by JwtStrategy
    const userId = req.user.userId;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) return null;
    // Return only safe fields
    return {
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  /**
   * Accept an admin invitation code and create an admin account
   * POST /auth/admin-invite
   * Body: { code, email, password }
   */
  @Post('admin-invite')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async acceptAdminInvite(@Body() dto: AdminInviteAcceptDto) {
    const invite = await this.prisma.adminInvite.findUnique({ where: { code: dto.code } });
    if (!invite || invite.used || (invite.email && invite.email !== dto.email)) {
      throw new BadRequestException('Invalid or expired invitation code');
    }
    // Check if user already exists
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) {
      throw new BadRequestException('A user with this email already exists');
    }
    // Create admin user
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });
    await this.prisma.adminInvite.update({
      where: { code: dto.code },
      data: { used: true, usedAt: new Date() },
    });
    return { message: 'Admin account created successfully' };
  }

  /**
   * Request password reset
   * POST /auth/forgot-password
   * Body: { email }
   * Sends a reset link via email if user exists
   */
  @Post('forgot-password')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async forgotPassword(@Body() dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) {
      // For security, do not reveal if user exists
      return { message: 'If your email exists, a reset link has been sent.' };
    }
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60); // 1 hour expiry
    await this.prisma.passwordResetToken.create({
      data: {
        token,
        userId: user.id,
        expiresAt,
      },
    });

    // Send email with nodemailer (Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
    await transporter.sendMail({
      from: `SkillMatch AI <${process.env.GMAIL_USER}>`,
      to: dto.email,
      subject: 'SkillMatch AI Password Reset',
      html: `
        <h2>Password Reset Request</h2>
        <p>You requested a password reset for your SkillMatch AI account.</p>
        <p>Click <a href="${resetUrl}">here</a> to reset your password. This link will expire in 1 hour.</p>
        <p>If you did not request this, you can ignore this email.</p>
      `,
    });

    return { message: 'If your email exists, a reset link has been sent.' };
  }

  /**
   * Reset password
   * POST /auth/reset-password
   * Body: { token, newPassword }
   */
  @Post('reset-password')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async resetPassword(@Body() dto: ResetPasswordDto) {
    const reset = await this.prisma.passwordResetToken.findUnique({ where: { token: dto.token } });
    if (!reset || reset.used || reset.expiresAt < new Date()) {
      throw new BadRequestException('Invalid or expired reset token');
    }
    const user = await this.prisma.user.findUnique({ where: { id: reset.userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword },
    });
    await this.prisma.passwordResetToken.update({
      where: { token: dto.token },
      data: { used: true },
    });
    return { message: 'Password has been reset successfully.' };
  }
} 