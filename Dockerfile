# Base image with Node 20
FROM node:20
 
# Set working directory
WORKDIR /app
 
# Copy only package.json and package-lock.json first for caching
COPY package*.json ./
 
# Install dependencies
RUN npm install
 
# Copy the rest of your code
COPY . .
 
# Expose the port your dev server uses (commonly 3000 or 5173)
EXPOSE 5173
 
# CMD ["npm", "run", "dev"]
CMD ["npm", "run", "dev", "--", "--host"]