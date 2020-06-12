const express = require('express');
const path = require('path');

const publicPath = path.resolve(__dirname, '../public');
const port = process.env.PORT || 3000;
const app = express();

app.use(express.static(publicPath));
app.listen(port, err => {
    if (err) throw new Error(err);
    console.log(`Servidor corriendo en puerto ${ port }`);
});

