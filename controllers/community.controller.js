const {
    response
} = require('express');
var config = require('../helpers/config');
const messages = require('../helpers/messages');
var pool = config.pool;

/**
 * [Function that gets all data from a community]
 * @param  id 
 * @return response/error
 */
module.exports.GETALL = (request, response) => {
    let sql = "SELECT * FROM community;";
    pool.query(sql, (error, results, fields) => {
        if (error) response.status(500).send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all data from an communities]
 * @param  id 
 * @return response/error
 */
module.exports.GET = (request, response) => {
    let sql = "SELECT * FROM community WHERE id = ?;";
    console.log("id: " + [request.params.id]);
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) response.status(500).send(error);
        else response.json(results);
    });
}

/**
 * [Function that creates a community]
 * @return response/error
 */
module.exports.CREATE = (request, response) => {
    const body = request.body
    let sql = "INSERT INTO community(name, location, latitude, longitude) VALUES (?,?,?,?);";
    pool.query(sql, [body.name, body.location, body.latitude, body.longitude], (error, results, fields) => {
        if (error) {
            response.status(400).send(error);
        }
        response.json(results);
    })
}


/**
 * [Function that updates a community]
 * @param  id 
 * @return response/error
 */
module.exports.UPDATE = (request, response) => {
    const body = request.body
    const sql = 'SELECT * FROM community WHERE id = ?;';
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            response.status(400).send(error);
        } else {
            if (results == "") {
                response.status(404).json(messages.idNotFound);
            } else {
                let sql = 'UPDATE community SET name = ?, location = ?, latitude = ?, longitude = ? WHERE id = ?;';
                pool.query(sql, [body.name, body.location, body.location, body.latitude, body.longitude, request.params.id], (error, results, fields) => {
                    if (error) {
                        response.status(400).send(error);
                    }
                    response.json(results);
                })
            }
        }


    })
}

/**
 * [Function that deletes a comunnity]
 * @param  id 
 * @return response/error
 */
module.exports.DELETE = (request, response) => {
    const sql = 'DELETE FROM community WHERE id = ?;'
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            response.status(400).send(error);
        }
        response.json(results);
    })
}