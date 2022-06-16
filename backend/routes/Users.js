const express = require('express')
const router  = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')
const { validateToken } = require('../middlewares/AuthMiddleware')

router.post("/", async (req, res) => {
    const { username, password } = req.body
    await bcrypt.hash(password, 10).then((hash) => {
       Users.create({
            username: username,
            password: hash,
        });
        res.json("Proceso Existoso")
    });
});

router.post('/login', async (req, res) => {
    const { username, password } = req.body
    const user = await Users.findOne({ where: { username: username } });
    if(!user) res.json({ error : "El usuario ingresado no existe" });
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) res.json({ error: "Error en el nombre de usuario o password" })
        
        // uso de jsonwebtoken
        const accessToken = sign({username: user.username, id: user.id}, "importantsecret");
        res.json({token: accessToken, username: username, id: user.id});
    });
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
})





module.exports = router;