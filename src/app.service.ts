import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  getTest(): string {
    return 'sent GET req';
  }

  postTest(): string {
    return 'sent POST req';
  }
}
