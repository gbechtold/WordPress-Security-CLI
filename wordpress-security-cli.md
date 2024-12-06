# WordPress Security CLI

🛡️ Ein modulares CLI-Tool für WordPress Malware-Cleanup und Sicherheitsanalyse

## Schnellstart

```bash
npx @your-namespace/wordpress-security-cli init my-project
```

## Projektstruktur

```
wordpress-security-cli/
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
├── src/
│   ├── cli.ts                 # CLI Haupteinstiegspunkt
│   ├── core/
│   │   ├── config.ts         # Konfigurationsmanagement
│   │   ├── encryption.ts     # Verschlüsselungslogik
│   │   ├── backup.ts         # Backup-Funktionalitäten
│   │   └── logger.ts         # Logging-System
│   ├── connections/
│   │   ├── ftp.ts
│   │   ├── sftp.ts
│   │   └── ssh.ts
│   ├── plugins/
│   │   ├── malware-scan/
│   │   ├── file-integrity/
│   │   └── log-analyzer/
│   └── utils/
│       ├── emoji.ts
│       └── spinners.ts
└── tests/
    └── integration/
```

## Konfiguration (.env.example)

```env
# Projekt-Konfiguration
PROJECT_NAME=wordpress-security
LOG_LEVEL=info

# Verschlüsselung
ENCRYPTION_KEY=your-secure-key
SALT=random-salt-value 

# Claude AI API
CLAUDE_API_KEY=your-api-key

# WordPress Connection
WP_HOST=example.com
WP_USER=admin
WP_PASSWORD=encrypted-password
WP_PROTOCOL=sftp

# Backup
BACKUP_PATH=./backups
REMOTE_BACKUP_PATH=/var/backups
```

## Core Features

- 🔐 Verschlüsselte Credential-Speicherung
- 🔄 Automatische Backups
- 🌈 Interaktives CLI mit Animationen
- 🔌 Plugin-System
- 📊 Claude AI Integration
- 🛠️ Graceful Shutdown

## Package.json

```json
{
  "name": "@your-namespace/wordpress-security-cli",
  "version": "1.0.0",
  "description": "WordPress Security and Malware Cleanup CLI",
  "main": "dist/cli.js",
  "bin": {
    "wp-security": "./dist/cli.js"
  },
  "scripts": {
    "start": "ts-node src/cli.ts",
    "build": "tsc",
    "test": "jest",
    "lint": "eslint src/**/*.ts"
  },
  "dependencies": {
    "commander": "^8.3.0",
    "inquirer": "^8.2.0",
    "ora": "^6.0.0",
    "chalk": "^4.1.2",
    "dotenv": "^10.0.0",
    "node-ssh": "^12.0.0",
    "basic-ftp": "^4.6.6",
    "ssh2-sftp-client": "^7.0.0",
    "crypto-js": "^4.1.1",
    "@anthropic-ai/sdk": "^0.4.3",
    "boxen": "^6.2.1",
    "figures": "^3.2.0"
  },
  "devDependencies": {
    "typescript": "^4.5.4",
    "ts-node": "^10.4.0",
    "jest": "^27.4.5",
    "@types/node": "^16.11.12"
  }
}
