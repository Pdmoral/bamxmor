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
    let sql = `SELECT j.id AS "id", b.id AS "familyId", b.name, a.date, j.id, jt.description,
    CONCAT(u.firstName, " " ,u.lastName) as "justifiedBy"
    FROM user u JOIN justification j ON u.id=j.authorizedBy
    JOIN attendances a ON j.id = a.id
    JOIN beneficiary b ON a.familyId = b.id
    JOIN justificationType jt ON jt.id = j.justificationTypeId
    WHERE j.id=?;`;
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
    let sql = `SELECT
        j.id AS "id",
        b.id AS "familyId",
        b.name,
        a.date AS "abstenceDate",
        j.authorizationDate AS "justificationDate",
        jt.description,
        CONCAT(u.firstName, " ", u.lastName) as "justifiedBy",
        c.name AS "communityName",
        cG.name AS "groupName"
    FROM
        justification j
        JOIN user u ON j.authorizedBy = u.id
        JOIN attendances a ON j.id = a.id
        JOIN beneficiary b ON a.familyId = b.id
        JOIN communityGroup cG on cG.id = b.group_id
        JOIN community c on c.id = cG.communityId
        JOIN justificationType jt ON jt.id = j.justificationTypeId
    ORDER BY j.authorizationDate DESC;`;
    pool.query(sql, [request.params.id], (error, results, fields) => {
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
    let sql = "SELECT * FROM justification WHERE id = ?;";
    console.log(bod.id)
    pool.query(sql, [bod.id], (error, results, fields) => {
        console.log(results)
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            if (results == "") {
                let sql = "INSERT INTO justification (id, justificationTypeId, authorizedBy) VALUES (?, ?, ?);";
                pool.query(sql, [bod.id, bod.justificationTypeId, bod.authorizedBy], (error, results, fields) => {
                    if (error) {
                        error.readable = msg.dbError;
                        response.status(400).send(error);
                    } else {
                        response.status(201).json(msg.registeredSuccessfully);
                    }
                });
            } else {
                response.status(400).json(msg.alreadyJustified);
            }
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
    let sql = `UPDATE justification SET ? WHERE id = ?;`;
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
    let sql = `DELETE FROM justification WHERE id=?;`;
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            results.affectedRows == 0 ? response.status(400).json(msg.noDelete) : response.json(msg.deletedSuccessfully);
        }
    });
}