// src/connections/base-connection.ts
import {Config} from '../core/config';

export abstract class BaseConnection {
  protected config: Config;

  constructor() {
    this.config = Config.getInstance();
  }

  protected getDecryptedPassword(): string {
    return this.config.getDecrypted('WP_PASSWORD');
  }

  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
}
