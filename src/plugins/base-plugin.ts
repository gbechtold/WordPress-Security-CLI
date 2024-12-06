// src/plugins/base-plugin.ts
export abstract class BasePlugin {
  abstract name: string;
  abstract description: string;

  abstract execute(): Promise<void>;
  abstract cleanup(): Promise<void>;
}
