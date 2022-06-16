const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());
 
const db = require('./models')

// Routers para posts
const postRouter = require('./routes/Posts');
app.use("/post",postRouter);

// Routers para comentarios
const commentsRouter = require('./routes/Comments');
app.use("/comments",commentsRouter);

// Routers para los usuarios
const usersRouter = require('./routes/Users');
app.use("/auth", usersRouter);

// Routers para los likes
const likesRouter = require('./routes/Likes')
app.use("/likes", likesRouter);

db.sequelize.sync().then(() =>{
    app.listen(4000, () =>{
        console.log('Servidor en el puerto 4000')
    });
});

