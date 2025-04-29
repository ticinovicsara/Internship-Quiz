FROM node:20

WORKDIR /app

COPY ../.././package.json ../.././package.json
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ../frontend/package.json ../frontend/package.json
COPY ../frontend/package-lock.json ../frontend/package-lock.json
COPY ./prisma ./prisma

RUN npm install

COPY . .

RUN npm run build

CMD node apps/backend/dist/main.js