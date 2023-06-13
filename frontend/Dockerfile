FROM node:14

WORKDIR /app

COPY package.json yarn.lock /app

RUN yarn install

COPY . /app

RUN yarn build

RUN yarn lint

# nachdem der/die container gestartet wurden cd frontend und dann yarn dev, wenn man hier RUN yarn dev eingibt dann steht es zwar in den logs drin
# aber läuft irgendwie nicht richtig an oder so. cmd["yarn", "dev"] funktioniert auch nicht.