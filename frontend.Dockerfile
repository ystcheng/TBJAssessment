FROM node:20-alpine
ENV NODE_ENV=development
# Create work dir
WORKDIR /app

# Copy the package dependencies and install it 
COPY frontend/package-lock.json .
COPY frontend/package.json .
RUN npm install --legacy-peer-deps

# Copy the rest of the frontend proj
COPY ./frontend .

# Expose the port 
EXPOSE 3000

# Start React
CMD [ "npm", "start" ] 

