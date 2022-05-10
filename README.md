# wally-technical-challenge
Fullstack Technical Challenge Wally POS S.A.C.

---
## Developer: Emilio Gonzales
## Build Setup

### `Frontend (NUXT)`
```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

### `Backend (Express + Sequelize)`
```bash
# BBDD
$ crear un BBDD llamada `wally_db`
# Ejecutar las migraciones y seeders
$ npx fresh migrate seed

# serve with hot reload at localhost:8000
$ node backend/app
```

Se realizó un despliegue en DigitalOcean usando también la terminal de linux como AWS EC2.
