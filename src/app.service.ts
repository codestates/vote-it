import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import env from './common/config/env.config';

@Injectable()
export class AppService {
  constructor(private readonly connection: Connection) {}

  async index(): Promise<string> {
    if (env.NODE_ENV !== 'development') {
      return 'Hello, Todo It!';
    }
    const nodeVersion = process.version;
    const [{ dbVersion }] = await this.connection
      .createQueryRunner('master')
      .query('SELECT VERSION() as dbVersion');
    const ret = `
      <!DOCTYPE html>
      <h1>Debug Information</h1>
      <div>
        <p>Node.js Version: <code>${nodeVersion}</code></p>
        <p>DB Version: <code>${dbVersion}</code></p>
      </div>
    `;
    return ret;
  }
}
