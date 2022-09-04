const express = require('express');
const jwt = require('jsonwebtoken');
const middleware = express.Router();
var msg = require('../helpers/messages')

middleware.use((req, res, next) => {
    //Authorization
    const token = req.headers['x-access-token']
    if (token) {
        const decode = jwt.verify(token, 'Numero123456.$', (err, decoded) => {
            if(err)
                return res.status(401).json(msg.invalidToken)
            else   
                next()
                //Si es necesario, se pueden establecer valores a req
                //Para enviar información al path solicitado
        })
        
    }else{
        return  res.status(401).send(msg.tokenNotFound);
    }
})

module.exports = middleware