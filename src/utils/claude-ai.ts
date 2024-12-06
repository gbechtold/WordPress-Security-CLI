// src/utils/claude-ai.ts
import {Client} from '@anthropic-ai/sdk';

export class ClaudeAI {
  private static client: Client;

  static initialize() {
    this.client = new Client(process.env.CLAUDE_API_KEY!);
  }

  static async analyze(data: any): Promise<string> {
    const message = await this.client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1000,
      messages: [
        {
          role: 'user',
          content: `Analyze this WordPress security scan data and provide recommendations: ${JSON.stringify(data)}`,
        },
      ],
    });
    return message.content[0].text;
  }
}
