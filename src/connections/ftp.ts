// src/connections/ftp.ts
import * as ftp from 'basic-ftp';
import {BaseConnection} from './base-connection';

export class FTPConnection extends BaseConnection {
  private client: ftp.Client;

  constructor() {
    super();
    this.client = new ftp.Client();
  }

  async connect(): Promise<void> {
    await this.client.access({
      host: process.env.WP_HOST,
      user: process.env.WP_USER,
      password: this.getDecryptedPassword(),
      secure: true,
    });
  }

  async disconnect(): Promise<void> {
    this.client.close();
  }
}
