# A simple Task Planner

![image](https://user-images.githubusercontent.com/54124311/160501868-3fe3ac86-0c4c-4d6c-a16a-cf2833a388e5.png)

## Build Instructions

This project uses Angular 12 with Node.js 20. To build the project:

```bash
# Install dependencies
npm install

# Build for production (requires legacy OpenSSL provider for Node.js 20)
NODE_OPTIONS=--openssl-legacy-provider npm run build

# Start development server
NODE_OPTIONS=--openssl-legacy-provider npm start
```

The build output will be in the `dist/Task-Planner` directory.

**Note**: The `NODE_OPTIONS=--openssl-legacy-provider` flag is required when building with Node.js 20 due to OpenSSL 3 compatibility requirements with Webpack 5 used by Angular 12.

