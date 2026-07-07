# Tienda virtual ficticia ("My Teslo Shop")

## Descripción

## Ejecutar proyecto en desarrollo

1. Clonar el repositorio
2. Renombrar el archivo `.env.template` a `.env` y configurar la variable `DATABASE_URL` con la URL de conexión a tu base de datos PostgreSQL
3. Instalar dependencias con `npm install` o `pnpm install`
4. Correr las migraciones de Prisma con `npx prisma migrate dev` o `pnpm prisma migrate dev`
5. Correr seed de la base de datos con `npx prisma db seed` o `pnpm prisma db seed`
6. Correr el proyecto con `npm run dev` o `pnpm run dev`
7. Limpiar el LocalStorage del navegador.

## Ejecutar proyecto en producción
