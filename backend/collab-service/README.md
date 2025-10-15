# PeerPrep Collaboration Service

A real-time collaboration service built with NestJS and Socket.IO for the PeerPrep platform. This service handles WebSocket connections to enable real-time collaborative features like shared code editing, chat, and synchronization between users in coding sessions.

## Features

- **WebSocket Gateway**: Real-time bidirectional communication using Socket.IO
- **JWT Authentication**: Secure token-based authentication with Supabase integration
- **CORS Support**: Configurable cross-origin resource sharing
- **Development Test Client**: Built-in HTML test client for easy development and testing

## Architecture

The service is structured as follows:

- **CollabGateway** (`src/collab/collab.gateway.ts`): WebSocket gateway handling real-time connections
- **AuthService** (`src/auth/auth.service.ts`): JWT token verification and user authentication
- **Test Client** (`test-client/index.html`): Interactive HTML client for testing WebSocket functionality

## Current Implementation

### WebSocket Events

- **Connection**: Authenticates users via JWT token and establishes secure WebSocket connection
- **`ping`**: Test event that responds with `pong` for connection testing
- **`collab:connected`**: Confirmation event sent upon successful connection
- **`collab:error`**: Error event sent when authentication or connection fails

### Authentication

The service supports multiple authentication modes:

- **Production**: Uses `SUPABASE_JWT_SECRET` to verify JWT tokens
- **Development**: Accepts `dev-test-token` for local testing
- **Fallback**: Basic JWT decoding when no secret is configured (with warnings)

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager

## Installation

```bash
npm install
```

## Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000

# CORS Configuration (comma-separated list of allowed origins)
CORS_ORIGINS=http://localhost:3001,http://localhost:3002

# JWT Authentication (optional for development)
SUPABASE_JWT_SECRET=your-supabase-jwt-secret
```

## Running the Service

### Development Mode (Recommended)

```bash
npm run start:dev
```

This starts the service in watch mode on `http://localhost:3000` with hot-reload enabled.

### Other Run Modes

```bash
# Standard development
npm run start

# Debug mode
npm run start:debug

# Production mode
npm run start:prod
```

## Testing the Service

### Method 1: Using the Built-in Test Client (Recommended)

1. Start the service in development mode:

   ```bash
   npm run start:dev
   ```

2. Open the test client in your browser:
   - Navigate to the `test-client` folder
   - Open `index.html` in any modern web browser
   - The test client will automatically connect to `http://localhost:3002`

3. Test the connection:
   - The client will attempt to connect using the `dev-test-token`
   - You should see a "Connected" status
   - Click "Send Ping" to test the ping/pong functionality
   - Check the log area for real-time message updates

### Method 2: Using JavaScript/Browser Console

```javascript
// Connect to the WebSocket
const socket = io('http://localhost:3002/collab', {
  transports: ['websocket'],
  auth: {
    token: 'dev-test-token', // or your actual JWT token
  },
});

// Listen for connection confirmation
socket.on('collab:connected', (data) => {
  console.log('Connected:', data);
});

// Send a test ping
socket.emit('ping', { message: 'Hello from client!' });

// Listen for pong response
socket.on('pong', (data) => {
  console.log('Received pong:', data);
});

// Handle errors
socket.on('collab:error', (error) => {
  console.error('Connection error:', error);
});
```

### Method 3: Using a WebSocket Testing Tool

You can use tools like:

- **Postman** (WebSocket support)
- **WebSocket King** browser extension
- **wscat** command-line tool

Connection details:

- **URL**: `ws://localhost:3002/collab`
- **Namespace**: `/collab`
- **Auth**: Include `token` in the auth object during handshake

## Development Notes

### Authentication Modes

1. **Development Mode**: Use `dev-test-token` as the authentication token
2. **Production Mode**: Set `SUPABASE_JWT_SECRET` and use valid JWT tokens
3. **Fallback Mode**: The service will decode JWT tokens without verification (shows warnings)

### WebSocket Namespace

The service uses the `/collab` namespace for all WebSocket connections. Make sure your client connects to the correct namespace.

### CORS Configuration

Configure `CORS_ORIGINS` in your `.env` file to allow connections from your frontend applications.

## Project Structure

```
src/
├── auth/
│   └── auth.service.ts          # JWT authentication service
├── collab/
│   ├── collab.gateway.ts        # WebSocket gateway
│   └── collab.module.ts         # Collaboration module
├── app.controller.ts            # Basic HTTP controller
├── app.module.ts               # Main application module
├── app.service.ts              # Basic application service
└── main.ts                     # Application entry point

test-client/
└── index.html                  # Interactive test client
```

## Available Scripts

```bash
# Development
npm run start:dev              # Start in watch mode
npm run start:debug            # Start in debug mode

# Testing
npm run test                   # Run unit tests
npm run test:e2e              # Run end-to-end tests
npm run test:cov              # Run tests with coverage

# Building
npm run build                 # Build the application
npm run start:prod            # Run built application

# Code Quality
npm run lint                  # Run ESLint
npm run format                # Format code with Prettier
```

## Troubleshooting

### Connection Issues

- Ensure the service is running on the correct port (default: 3002)
- Check CORS configuration if connecting from a web browser
- Verify that WebSocket transports are enabled in your client

### Authentication Issues

- For development, use `dev-test-token` as the token
- For production, ensure `SUPABASE_JWT_SECRET` is correctly configured
- Check the console logs for authentication error details

### Common Error Messages

- **"Missing token"**: Include a token in the auth object during connection
- **"Invalid token"**: Token verification failed - check your token or secret
- **"Connection failed"**: Check if the service is running and accessible
