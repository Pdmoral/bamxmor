const { response } = require('express');
var config = require('../helpers/config');
const messages = require('../helpers/messages');
var pool = config.pool;


/**
 * [Function that gets all data from a group]
 * @param  id 
 * @return response/error
 */
module.exports.GETALL = (request, response) => {
    let sql = "SELECT * FROM communityGroup;";
    pool.query(sql, (error, results, fields) => {
        if (error) response.status(500).send(error);
        else response.json(results);
    });
}

/**
 * [Function that gets all data from a group]
 * @param  id 
 * @return response/error
 */
 module.exports.GETALLBYCOMMUNITY = (request, response) => {
    let sql = "SELECT * FROM communityGroup WHERE communityId = ?;";
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) response.status(500).send(error);
        else response.json(results);
    });
}


/**
 * [Function that gets all data from a group]
 * @param  id 
 * @return response/error
 */
module.exports.GET = (request, response) => {
    let sql = "SELECT * FROM communityGroup WHERE id = ?;";
    console.log("id: " + [request.params.id]);
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) response.status(500).send(error);
        else response.json(results);
    });
}

/**
 * [Function that creates a group]
 * @return response/error
 */
module.exports.CREATE = (request, response) => {
    const body = request.body
    let sql = "INSERT INTO communityGroup (name, day) VALUES (?,?);";
    pool.query(sql, [body.name, body.day], (error, results, fields) => {
        if (error) {
            response.status(400).send(error);
        }
        response.json(results);
    })
}

/**
 * [Function that updates a group]
 * @param  id 
 * @return response/error
 */
module.exports.UPDATE = (request, response) => {
    const body = request.body
    var sql = "SELECT * FROM communityGroup WHERE id = ?;";
    console.log(request.params.id)
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = messages.dbError;
            response.status(400).send(error);
        } else {
            if (results == "") {
                response.status(400).json(messages.idNotFound);
            } else {
                sql = 'UPDATE communityGroup SET ? WHERE id = ?;';
                pool.query(sql, [body, request.params.id], (error, results, fields) => {
                    if (error) {
                        response.status(400).send(error);
                    }
                    response.json(messages.updatedSuccessfully);
                })
            }
        }
    });
}

/**
 * [Function that deletes a group]
 * @param  id 
 * @return response/error
 */
module.exports.DELETE = (request, response) => {
    const sql = 'DELETE FROM communityGroup WHERE id = ?;'
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            response.status(400).send(error);
        }
        response.json(results);
    })
}