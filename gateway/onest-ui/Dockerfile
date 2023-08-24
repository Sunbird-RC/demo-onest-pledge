# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if it exists) to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set the environment variable
ENV REACT_APP_BACKEND_URL="http://localhost:8000"

# Build your React app
RUN npm run build

# Expose the port the app runs on
EXPOSE 4200

# Start the React app when the container starts
CMD ["npm", "start"]
