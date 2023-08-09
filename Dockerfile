# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /build

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install application dependencies
RUN npm install
RUN npm install sequelize

# Copy the rest of the application code
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Command to start your Node.js app
CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]
