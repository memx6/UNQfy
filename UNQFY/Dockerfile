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
EXPOSE 5000

# Copia los fuentes dentro del container
COPY . . /home/node/my_node_app/

# Le da permisos al usuario node para escribir en /home/node/my_node_app
# Como comentario, notar que el comando RUN nos permite ejecutar culquier comando bash valido.
RUN chown -R node:users /home/node/

# Habilita el usuario node. Por defecto, los containers corren los comandos con el usuario root
USER node

# Comando por defecto sino se provee uno al hacer docker run
# El comando corre el servicio
CMD [ "node", "api.js" ]

# LISTO!


# Para construir la imagen
# docker build -t unqfy .

# Para correr el container
#docker run  --network=unqfynet --ip 172.20.0.21 -p 5000:5000 -e NEWSLETTER_PORT=http://172.20.0.22:5001 --name unqfy_container --user node unqfy