// src/connections/connection-manager.ts
import {BaseConnection} from './base-connection';
import {FTPConnection} from './ftp';
import {Config} from '../core/config';

export class ConnectionManager {
  private static instance: ConnectionManager;
  private activeConnections: Map<string, BaseConnection>;
  private config: Config;

  private constructor() {
    this.activeConnections = new Map();
    this.config = Config.getInstance();
  }

  static getInstance(): ConnectionManager {
    if (!ConnectionManager.instance) {
      ConnectionManager.instance = new ConnectionManager();
    }
    return ConnectionManager.instance;
  }

  async createConnection(type: 'ftp'): Promise<BaseConnection> {
    let connection: BaseConnection;

    // Create appropriate connection based on type
    switch (type) {
      case 'ftp':
        connection = new FTPConnection();
        break;
      default:
        throw new Error(`Unsupported connection type: ${type}`);
    }

    try {
      await connection.connect();
      this.activeConnections.set(type, connection);
      return connection;
    } catch (error) {
      throw new Error(`Failed to establish ${type} connection: ${error.message}`);
    }
  }

  async getConnection(type: 'ftp'): Promise<BaseConnection> {
    const existingConnection = this.activeConnections.get(type);
    if (existingConnection) {
      return existingConnection;
    }
    return this.createConnection(type);
  }

  async closeConnection(type: string): Promise<void> {
    const connection = this.activeConnections.get(type);
    if (connection) {
      await connection.disconnect();
      this.activeConnections.delete(type);
    }
  }

  async closeAllConnections(): Promise<void> {
    const closePromises = Array.from(this.activeConnections.entries()).map(async ([type, connection]) => {
      await connection.disconnect();
      this.activeConnections.delete(type);
    });

    await Promise.all(closePromises);
  }
}
