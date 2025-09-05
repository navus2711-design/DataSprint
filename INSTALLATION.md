# Installation Guide for AR/VR Collaborative Prototype

This guide will help you set up and run the AR/VR collaborative work prototype on your local machine.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher)
- A modern web browser with WebXR support (Chrome, Firefox, Edge)
- For AR: A mobile device with ARCore (Android) or ARKit (iOS) support
- For VR: A VR headset compatible with WebXR (Oculus Quest, HTC Vive, etc.)

## Installation Steps

1. **Clone or download the repository**

   Download and extract the project files to your local machine.

2. **Install dependencies**

   Open a terminal in the project directory and run:

   ```bash
   npm install
   ```

3. **Build the project**

   ```bash
   npm run build
   ```

4. **Start the server**

   ```bash
   node server.js
   ```

5. **Access the application**

   Open your web browser and navigate to:

   ```
   https://localhost:3000
   ```

   Note: The application uses HTTPS, which is required for WebXR. Your browser may show a security warning because we're using a self-signed certificate. You'll need to accept this warning to proceed.

## Usage

1. **Enter your name and room ID**

   - Enter your name in the input field
   - To create a new room, leave the Room ID field empty
   - To join an existing room, enter the Room ID shared with you

2. **Choose your mode**

   - **Enter AR**: Launch in augmented reality mode (requires AR-capable device)
   - **Enter VR**: Launch in virtual reality mode (requires VR headset)
   - **Enter Desktop Mode**: Use a standard desktop interface with mouse and keyboard controls

3. **Controls**

   - **Desktop Mode**:
     - Click and drag objects to move them
     - Use WASD keys to navigate
     - Use mouse to look around
     - Press ESC to exit

   - **VR Mode**:
     - Use controllers to point and grab objects
     - Use thumbsticks to teleport or move
     - Press menu button to access tools

   - **AR Mode**:
     - Tap on surfaces to place objects
     - Pinch to scale objects
     - Tap and drag to move objects

## Troubleshooting

- **WebXR not available**: Ensure you're using a compatible browser and device. For VR, make sure your headset is connected and recognized by your browser.

- **Cannot connect to room**: Check your internet connection and make sure the server is running.

- **Performance issues**: Reduce the number of objects in the scene or try a different device with better performance.

## Development

To run the project in development mode with hot reloading:

```bash
npm start
```

This will start the webpack development server with the application available at `https://localhost:3000`.