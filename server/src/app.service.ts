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

    const debugInformation = /* HTML */ `
      <!DOCTYPE html>
      <h1>Debug Information</h1>
      <textarea
        id="debug-info"
        readonly
        rows="5"
        cols="30"
        style="resize: none;"
      >
Node.js Version: ${nodeVersion}
DB Version: ${this.dbVersion}</textarea
      >
      <button id="copy-button">Copy to clipboard</button>
      <script>
        const copyButton = document.getElementById('copy-button');
        const textArea = document.getElementById('debug-info');
        copyButton.addEventListener('click', () => {
          navigator.clipboard.writeText(textArea.textContent).catch((err) => {
            alert(err);
          });
        });
      </script>
    `;
    return debugInformation;
  }
}
