const e = require('express');
var config = require('../helpers/config');
// const { connect } = require('../routes/api');
var msg = require('../helpers/messages')
var pool = config.pool;

/**
 * [Function that gets all data from a justification]
 * @param  id 
 * @return response/error
 */
module.exports.GET = (request, response) => {
    console.log(request.params.id);
    let sql = `SELECT * FROM justificationType
    WHERE id = ?;`;
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            results == "" ? response.status(404).json(msg.idNotFound) : response.json(results);
        }
    });
}


/**
 * [Function that gets all data from all justifications]
 * @param   
 * @return response/error
 */
module.exports.GETALL = (request, response) => {
    console.log(request.params.id);
    let sql = `SELECT * FROM justificationType;`;
    pool.query(sql, [], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            results == "" ? response.status(404).json(msg.idNotFound) : response.json(results);;
        }
    });
}


/**
 * [Function that creates a justifications for an abstence]
 * @param  id 
 * @param  type 
 * @param  user
 * @return response/error
 */
module.exports.CREATE = (request, response) => {
    let bod = request.body;
    let sql = "INSERT INTO justificationType (id, description) VALUES (?, ?);";
    pool.query(sql, [bod.id, bod.description], (error, results, fields) => {
        console.log(results)
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            results.affectedRows == 0 ? response.status(400).json(msg.noUpdate) : response.json(msg.registeredSuccessfully);
        }
    });
}

/**
 * [Function that gets all data from a justification]
 * @param  id 
 * @return response/error
 */
 module.exports.UPDATE = (request, response) => {
    console.log(request.params.id);
    let sql = `UPDATE justificationType SET ? WHERE id = ?;`;
    pool.query(sql, [request.body, request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            results.affectedRows == 0 ? response.status(400).json(msg.noUpdate) : response.json(msg.updatedSuccessfully);
        }
    });
}


/**
 * [Function that gets all data from a justification]
 * @param  id 
 * @return response/error
 */
module.exports.DELETE = (request, response) => {
    console.log(request.params.id);
    let sql = `DELETE FROM justificationType WHERE id=?;`;
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            results.affectedRows == 0 ? response.status(400).json(msg.noDelete) : response.json(msg.deletedSuccessfully);
        }
    });
}