const {
    response
} = require('express');
const jwt = require('jsonwebtoken');
var config = require('../helpers/config');
var msg = require('../helpers/messages')
var pool = config.pool;

/**
 * Instalacion de BCrypt
 * Backend ahora hará el cifrado de contraseñas
 */
const bcrypt = require('bcrypt');
const saltRounds = 10;


/**
 * [Function that gets all data from an user]
 * @param  id 
 * @return response/error
 */
module.exports.GET = (request, response) => {
    var sql = `SELECT u.id, u.username, u.firstName, u.lastName, u.email, CONVERT(u.image USING utf8) AS image, u.userStatus, u.userTypeId FROM user u
    WHERE u.id = ?;`;
    console.log("id: " + [request.params.id]);
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) response.status(500).send(error);
        else response.json(results);
    });
}


/**
 * [Function that gets all data from an user]
 * @param  id 
 * @return response/error
 */
module.exports.GETALL = (request, response) => {
    var sql = `SELECT u.id, u.username, u.userTypeId, u.firstName, u.lastName, u.email, CONVERT(u.image USING utf8) AS image, u.userStatus, u.userTypeId FROM user u
     WHERE u.userStatus = 'active';`;
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) response.status(500).send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all data from an user]
 * @param  id 
 * @return response/error
 */
module.exports.GETALLDISABLED = (request, response) => {
    var sql = `SELECT u.id, u.username, u.userTypeId, uT.name, u.firstName, u.lastName, u.email, CONVERT(u.image USING utf8) AS image, u.userStatus, u.userTypeId FROM user u
    INNER JOIN userType uT on u.userTypeId = uT.id WHERE u.userStatus = 'active';`;
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) response.status(500).send(error);
        else response.json(results);
    });
}


/**
 * [Function that authenticates an user into system]
 * @param request.body.username
 * @param request.body.password 
 * @param response/error 
 */
module.exports.LOGIN = async (request, response) => {
    let bod = request.body;
    console.log(bod);
    let sql = "SELECT * FROM user WHERE (username = ? OR email = ?) AND userStatus = 'active';"
    pool.query(sql, [bod.username, bod.username], async (error, results, fields) => {
        if (error) response.status(500).send(error);
        else {
            // Comparar contraseña aqui
            if (results == "") response.status(404).json(msg.userMailNotFound);
            else {
                if (bod.password && results[0]) var isMatch = await (bcrypt.compare(bod.password, results[0].password));
                if (results[0].userStatus == "disabled") response.status(403).json(msg.disabledAccount);
                else {
                    var sql = `SELECT u.id, u.username, u.userTypeId, uT.name, u.firstName, u.lastName, u.email, CONVERT(u.image USING utf8) AS image, u.userStatus FROM user u
                    INNER JOIN userType uT on u.userTypeId = uT.id WHERE (username = ? OR email = ?);`;
                    pool.query(sql, [bod.username, bod.username, bod.password], (error, results, fields) => {
                        console.log(results);
                        if (error) {
                            error.readable = msg.dbError;
                            response.status(500).send(error);
                        } else {
                            if (isMatch) {
                                const payload = {
                                    id: bod.id,
                                    user: bod.username
                                }
                                let token = jwt.sign(payload, 'Numero123456.$', {
                                    expiresIn: 7200
                                })
                                response.json({
                                    mensaje: msg.loginSuccessfully,
                                    token: token,
                                    results: results
                                })
                            } else response.status(403).json(msg.incorrectPwd);
                        }
                    })
                }
            }
        }
    })
}

/**
 * [Function that authenticates an user into system]
 * @param request.body.username
 * @param request.body.password 
 * @param response/error 
 */
module.exports.CREATE = async (request, response) => {
    var bod = request.body;
    // Generacion de contraseña por BCrypt
    if (bod.password) {
        bod.password = await (bcrypt.hash(bod.password, saltRounds));
    }
    // Imagen en base64, para devolver
    var base64 = bod.image || null; //j is now 10
    //console.log(request);
    console.log(bod);
    var sql = "SELECT * FROM user WHERE (username = ? OR email = ?);"
    pool.query(sql, [bod.username, bod.email], async (error, results, fields) => {
        if (error) response.status(400).send(error);
        else if (results != "") {
            console.log(results[0]);
            request.body.userStatus = 'active';
            request.params.id = results[0].id
            this.UPDATE(request, response)
        } else {
            var sql = "INSERT INTO user (username, firstName, lastName, email, password, userTypeId, image, userStatus) VALUES (?, ?, ?, ?, ?, ?, ?, 'active');"
            console.log(bod)
            pool.query(sql, [bod.username, bod.firstName, bod.lastName, bod.email, bod.password, bod.userTypeId, bod.image], async (error, results, fields) => {
                if (error) {
                    error.readable = msg.dbError;
                    response.status(400).send(error);
                } else {
                    var sql = `SELECT u.id, u.username, u.firstName, u.lastName, u.email, CONVERT(u.image USING utf8) AS image, u.userStatus, u.userTypeId FROM user u
                    WHERE u.id = ?;`;
                    console.log("id: " + [results.insertId]);
                    pool.query(sql, [results.insertId], (error, results, fields) => {
                        if (error) response.status(500).send(error);
                        else response.json(results);
                    });
                    ///
                }
            });
        }
    });
}


/**
 * [Function that DEACTIVATES (NOT DB DELETION) an user from system]
 * @param request.body.id
 * @param response/error 
 */
module.exports.DELETE = (request, response) => {
    var sql = "SELECT * FROM user WHERE id = ? AND userStatus = 'active';"
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) response.status(500).send(error);
        else {
            if (results == "") response.status(400).json(msg.alreadyDisabledAccount);
            else {
                var sql = "UPDATE user SET userStatus = 'disabled' WHERE id = ?;"
                pool.query(sql, [request.params.id], (error, results, fields) => {
                    console.log(results);
                    if (error) {
                        error.readable = msg.dbError;
                        response.status(400).send(error);
                    } else {
                        response.json(msg.deletedSuccessfully);
                    }
                })
            }
        }
    })
}


/**
 * [Function that DEACTIVATES (NOT DB DELETION) an user from system]
 * @param request.body.id
 * @param response/error 
 */
module.exports.UNDELETE = (request, response) => {
    var sql = "SELECT * FROM user WHERE id = ? AND userStatus = 'disabled';"
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) response.status(500).send(error);
        else {
            if (results == "") response.status(400).json(msg.alreadyDisabledAccount);
            else {
                var sql = "UPDATE user SET userStatus = 'active' WHERE id = ?;"
                pool.query(sql, [request.params.id], (error, results, fields) => {
                    console.log(results);
                    if (error) {
                        error.readable = msg.dbError;
                        response.status(400).send(error);
                    } else {
                        response.json(msg.deletedSuccessfully);
                    }
                })
            }
        }
    })
}



module.exports.UPDATE = async (request, response) => {
    var base64 = request.body.image || null; //j is now 10
    var bod = request.body;
    console.log("EEEEEEEEEEEEEo");
    console.log(bod.password);
    console.log("OOOOOOOOOOOO");
    console.log(bod);
    // Generacion de contraseña por BCrypt
    if (bod.password) {
        bod.password = await (bcrypt.hash(bod.password, saltRounds));
    }
    let sql = "SELECT * FROM user WHERE id = ?;"
    pool.query(sql, [request.params.id], async (error, results, fields) => {
        if (error) response.status(500).send(error);
        else {
            if (results == "") response.status(404).json(msg.idNotFound);
            else {
                console.log(bod)
                let sql = "UPDATE user SET ? WHERE id = ?;"
                pool.query(sql, [bod, request.params.id], async (error, results, fields) => {
                    if (error) {
                        error.readable = msg.dbError;
                        response.status(400).send(error);
                    } else {
                        if (results == "") response.status(404).json(msg.noUpdate);
                        else {
                            var sql = `SELECT u.id, u.username, u.firstName, u.lastName, u.email, CONVERT(u.image USING utf8) AS image, u.userStatus, u.userTypeId FROM user u
                            WHERE u.id = ?;`;
                            console.log("id: " + [request.params.id]);
                            pool.query(sql, [request.params.id], (error, results, fields) => {
                                if (error) response.status(500).send(error);
                                else response.json(results);
                            });
                        }
                    }
                });
            }
        }
    })
}