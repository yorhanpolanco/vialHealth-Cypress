# Use the official Node.js image.
FROM node:18 as build

# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Use a lighter version of Node.js for the production environment
FROM node:18 as production

# Set the working directory
WORKDIR /usr/src/app

# Copy package files first
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy the built application from the previous stage
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]