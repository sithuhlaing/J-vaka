#!/bin/bash

# OH eHR Frontend Startup Script
echo "🏥 Starting OH eHR Frontend System..."

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --legacy-peer-deps
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
npm run clean

# Build the application
echo "🔨 Building application..."
npm run build

# Start the production server
echo "🚀 Starting production server..."
echo "✅ OH eHR System will be available at:"
echo "   Local:    http://localhost:3000"
echo "   Network:  http://$(hostname -I | awk '{print $1}'):3000"
echo ""
echo "🔐 Login credentials:"
echo "   Email: any valid email (e.g., test@nhs.uk)"
echo "   Password: password123"
echo "   Roles: employee, oh_professional, manager, admin"
echo ""

npm start