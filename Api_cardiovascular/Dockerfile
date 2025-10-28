# Usa una imagen base de Node
FROM node:20

# Crea el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el package.json y package-lock.json primero
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Expone el puerto del backend
EXPOSE 3000

# Comando por defecto
CMD ["npm", "start"]
