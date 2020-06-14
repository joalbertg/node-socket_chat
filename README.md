# SockerIO Chat

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

### Project Structure

> run `tree -I "node_modules"`
```shell
.
├── Dockerfile
├── README.md
├── docker-compose.yml
├── package.json
├── public
│   ├── chat.html
│   ├── index.html
│   └── js
│       └── socket-chat.js
├── server
│   ├── classes
│   │   ├── index.js
│   │   └── users.js
│   ├── helpers
│   │   ├── index.js
│   │   └── message.js
│   ├── server.js
│   └── socket
│       └── socket.js
└── yarn.lock

6 directories, 14 files
```

