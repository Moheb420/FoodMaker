FROM node:latest

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Install TypeScript as a project dependency
RUN npm install typescript

# Copy the rest of the application files
COPY . .

# Build TypeScript 
# RUN npm run build

Run npm install build --only=production

# Add public files
# ADD public.tar.gz .

# Set environment variables
ARG PORT_ARG=4000
ENV PORT=${PORT_ARG}
EXPOSE $PORT_ARG

# Specify the command to run your application
CMD ["npm", "start"]
