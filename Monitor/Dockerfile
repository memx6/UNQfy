FROM node:12
# Utiliza la imagen de node 12 como base.
# A partir de esta imagen se ejecutarán los comandos de abajo creando una nueva imagen.

# Configura variables de entorno necesariar para correr node
ENV NODE_ENV=development
ENV DEBUG=true

# Crea un directorio y nos movemos ahí
WORKDIR /home/node/my_node_app

# Copia el package.json package-lock.json en /home/node/my_node_app
COPY package.json .
COPY package-lock.json .

# Ejecuta npm install. Esto produce que se instalen todas las dependencias necearias para correr la aplicación
RUN ["npm", "install"]

# Expone el puerto 3000 donde corre la aplicación
EXPOSE 3002

# Copia los fuentes dentro del container
COPY . . /home/node/my_node_app/

# Le da permisos al usuario node para escribir en /home/node/my_node_app
# Como comentario, notar que el comando RUN nos permite ejecutar culquier comando bash valido.
RUN chown -R node:users /home/node/

# Habilita el usuario node. Por defecto, los containers corren los comandos con el usuario root
USER node

# Comando por defecto sino se provee uno al hacer docker run
# El comando corre el servicio
CMD [ "node", "APIMonitor.js" ]

# LISTO!


# Para construir la imagen
# docker build -t monitor .

# Para correr el container
# docker run -p 3002:3002 --name monitor_container --user node monitor