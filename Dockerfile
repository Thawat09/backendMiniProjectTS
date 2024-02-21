# Use the official Node.js 14 image as base
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install project dependencies
RUN npm install

# Install global packages
RUN npm install -g nodemon
RUN npm install pm2 -g

# Copy the rest of the application
COPY . .

# Expose port 3000
EXPOSE 3014

# Command to run the application
CMD ["npm", "start"]