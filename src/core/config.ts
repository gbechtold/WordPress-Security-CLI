// src/core/config.ts
import dotenv from 'dotenv';
import {encryptValue, decryptValue} from './encryption';

export class Config {
  private static instance: Config;
  private config: Record<string, any> = {};

  private constructor() {
    dotenv.config();
    this.loadConfig();
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  private loadConfig() {
    // Implementation
  }

  getDecrypted(key: string): string {
    const value = this.config[key];
    return decryptValue(value);
  }
}
