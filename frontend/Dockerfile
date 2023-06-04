# Use a Node.js base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and yarn.lock files
COPY package.json yarn.lock /app/

# Delete yarn.lock file
RUN rm yarn.lock

# Install dependencies
RUN yarn install

# Copy the rest of the frontend code into the container
COPY . /app

# Build the frontend
RUN yarn build

# Run linting
RUN yarn lint


# Set the command to start the frontend preview
CMD ["yarn", "dev"]
