# Use the official Node.js 22 image from the Docker Hub
FROM node:22

# Install netcat for waiting script
RUN apt-get update && apt-get install -y netcat-openbsd

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code to the working directory
COPY . .

# Copy the environment file
COPY .env .env

# Expose the port the app runs on
EXPOSE ${NODE_PORT}

# Command to run the application
CMD ["npm", "start"]
