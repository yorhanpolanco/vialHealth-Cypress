# Usar una imagen base que incluya Node.js y navegadores necesarios
FROM cypress/included:14.2.1

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /e2e

# Copiar los archivos package.json y package-lock.json al contenedor
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto de los archivos del proyecto al contenedor
COPY . .

# Comando por defecto para ejecutar las pruebas
CMD ["npx", "cypress", "run"]
