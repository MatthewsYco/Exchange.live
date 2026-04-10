# Render Root Dockerfile (specifically targeting the Frontend)
FROM node:20-alpine

WORKDIR /app

# Copy the entire repository into the Docker container
COPY . .

# Move into the frontend folder where the actual application lives
WORKDIR /app/frontend

# Install dependencies and build the Next.js app
RUN npm install
RUN npm run build

# Expose the correct port requested by Render
EXPOSE 3000

# Start the production server
CMD ["npm", "start"]
