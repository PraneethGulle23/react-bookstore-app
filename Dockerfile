# Use the official Node.js image as the base image
FROM node:16-slim

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the container
COPY . .

# Build the React app
RUN npm run build

# Install a simple HTTP server to serve the React build
RUN npm install -g serve

# Expose port 5000 (or any other port you prefer)
EXPOSE 5000

# Serve the app
CMD ["serve", "-s", "build", "-l", "5000"]
