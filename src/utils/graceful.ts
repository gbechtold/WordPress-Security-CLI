// src/utils/graceful.ts
import {ConnectionManager} from '../connections/connection-manager';

type CleanupFunction = () => Promise<void>;
const cleanupFunctions: CleanupFunction[] = [];
let isShuttingDown = false;

export function registerCleanup(cleanup: CleanupFunction): void {
  cleanupFunctions.push(cleanup);
}

async function performCleanup(): Promise<void> {
  if (isShuttingDown) return;
  isShuttingDown = true;

  console.log('\nGraceful shutdown initiated...');

  try {
    // Close all active connections
    const connectionManager = ConnectionManager.getInstance();
    await connectionManager.closeAllConnections();

    // Execute all registered cleanup functions
    await Promise.allSettled(cleanupFunctions.map((cleanup) => cleanup()));

    console.log('Cleanup completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error during cleanup:', error);
    process.exit(1);
  }
}

export function setupGracefulShutdown(): void {
  // Handle normal shutdown signals
  process.on('SIGTERM', performCleanup);
  process.on('SIGINT', performCleanup);

  // Handle uncaught exceptions
  process.on('uncaughtException', async (error) => {
    console.error('Uncaught Exception:', error);
    await performCleanup();
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', async (reason, promise) => {
    console.error('Unhandled Promise Rejection:', reason);
    await performCleanup();
  });
}
