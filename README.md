<h1 align="center">NestJS Pokedex</h1>
<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Run in development

1. Clone the repository

   ```bash
   $ git clone https://github.com/alexxispn/nest-pokedex.git
   ```

2. Install NestJS CLI

   ```bash
   $ pnpm add -g @nestjs/cli
   ```

3. Install dependencies

   ```bash
   $ pnpm install
   ```

4. Run the database

   ```bash
   $ docker-compose up -d
   ```

5. Clone the file `.env.example` and rename it to `.env`

   ```bash
   $ cp .env.example .env
   ```
   
6. Set the environment variables
   
7. Run the application

   ```bash
   $ pnpm run start:dev
   ```

8. Recreate the data with the seed

   ```bash
   $ http://localhost:3000/api/seed
   ```

## Stack used

<a href="#"><img src="https://img.shields.io/badge/-NestJS-E0234E?style=for-the-badge&logo=NestJS&"></a>
<a href="#"><img src="https://img.shields.io/badge/-Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/-MongoDB-47A248?style=for-the-badge&logo=MongoDB&logoColor=white"></a>
<a href="#"><img src="https://img.shields.io/badge/-TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"></a>
