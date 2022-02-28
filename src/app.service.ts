import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { version as nodeVersion } from 'process';
import env from './common/config/env.config';

@Injectable()
export class AppService {
  private dbVersion: string | null = null;

  constructor(private readonly connection: Connection) {}

  async index(): Promise<string> {
    if (env.NODE_ENV !== 'development') {
      return 'Hello, Todo It!';
    }
    if (this.dbVersion === null) {
      const [{ dbVersion }] = await this.connection
        .createQueryRunner('master')
        .query('SELECT VERSION() as dbVersion');
      this.dbVersion = dbVersion;
    }
    const ret = `
      <!DOCTYPE html>
      <h1>Debug Information</h1>
      <div>
        <p>Node.js Version: <code>${nodeVersion}</code></p>
        <p>DB Version: <code>${this.dbVersion}</code></p>
      </div>
    `;
    return ret;
  }
}
