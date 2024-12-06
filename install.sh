// install.sh
#!/bin/bash
echo "🛡️ Installing WordPress Security CLI..."

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js and npm first."
    exit 1
fi

# Install the package globally
npm install -g @your-namespace/wordpress-security-cli

echo "✅ Installation complete! You can now use 'wp-security' command."