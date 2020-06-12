# Notas:

Este es un pequeño servidor de express listo para ejecutarse y servir la carpeta public en la web.

Recuerden que deben de reconstruir los módulos de node con el comando

### Installs

With `package.json` and dependencies added
```shell
docker-compose run app yarn
```

Without dependencies
```shell
docker-compose run app yarn add express socket.io
docker-compose run app yarn add nodemon --dev
```

### Start project

```shell
docker-compose up
```

