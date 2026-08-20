import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateNotificationDto } from './dto/create-notification.dto.js';

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  list(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  unreadCount(userId: string) {
    return this.prisma.notification.count({
      where: { userId, read: false },
    });
  }

  create(userId: string, dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: { ...dto, userId },
    });
  }

  async markAsRead(userId: string, id: string) {
    await this.prisma.notification.updateMany({
      where: { id, userId },
      data: { read: true },
    });
    return { ok: true };
  }

  async markAllAsRead(userId: string) {
    await this.prisma.notification.updateMany({
      where: { userId, read: false },
      data: { read: true },
    });
    return { ok: true };
  }

  async remove(userId: string, id: string) {
    await this.prisma.notification.deleteMany({
      where: { id, userId },
    });
    return { ok: true };
  }
}
