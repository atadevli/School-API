import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHealth(): any {
    return { status: 'Ok', date: new Date() };
  }
}
