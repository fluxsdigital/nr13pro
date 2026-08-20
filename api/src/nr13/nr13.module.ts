import { Module } from '@nestjs/common';
import { Nr13Service } from './nr13.service.js';
import { Nr13Controller } from './nr13.controller.js';

@Module({
  providers: [Nr13Service],
  controllers: [Nr13Controller],
  exports: [Nr13Service],
})
export class Nr13Module {}
