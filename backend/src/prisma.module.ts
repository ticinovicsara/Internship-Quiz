import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // DA BI DRUGI MODULI MOGLI KORISTITI
})
export class PrismaModule {}
