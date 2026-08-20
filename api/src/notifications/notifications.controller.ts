import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { CreateNotificationDto } from './dto/create-notification.dto.js';
import { CurrentUser } from '../common/decorators/current-user.decorator.js';
import type { AuthUser } from '../common/decorators/current-user.decorator.js';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.notificationsService.list(user.id);
  }

  @Get('unread-count')
  unreadCount(@CurrentUser() user: AuthUser) {
    return this.notificationsService.unreadCount(user.id);
  }

  @Post()
  create(@CurrentUser() user: AuthUser, @Body() dto: CreateNotificationDto) {
    return this.notificationsService.create(user.id, dto);
  }

  @Post(':id/read')
  markAsRead(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.notificationsService.markAsRead(user.id, id);
  }

  @Post('read-all')
  markAllAsRead(@CurrentUser() user: AuthUser) {
    return this.notificationsService.markAllAsRead(user.id);
  }

  @Delete(':id')
  remove(@CurrentUser() user: AuthUser, @Param('id') id: string) {
    return this.notificationsService.remove(user.id, id);
  }
}
