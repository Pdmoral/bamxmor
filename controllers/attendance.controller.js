const e = require('express');
var config = require('../helpers/config');
// const { connect } = require('../routes/api');
var msg = require('../helpers/messages')
var dayjs = require('../helpers/dayjs.config')
var pool = config.pool;
var b_controller = require('./beneficiary.controller');

/**
 * [Function that gets all data from a justification]
 * @param  id 
 * @return response/error
 */
module.exports.GET = (request, response) => {
    console.log(request.params.id);
    let sql = `SELECT
    a.id AS 'id',
    b.id AS 'familyId',
    b.name AS 'familyName',
    a.date,
    a.attended,
    CONCAT(u.firstName, ' ', u.lastName) AS 'attendedBy',
    g.name AS 'groupName',
    c.name AS 'communityName'
  FROM
    attendances a
    JOIN user u ON u.id = a.userId
    JOIN beneficiary b ON a.familyId = b.id
    JOIN communityGroup g ON g.id = b.group_id
    JOIN community c ON c.id = g.communityId
  WHERE
    a.id = ?
  ORDER BY
    date DESC;
  `;
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            response.json(results);
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
    console.log("GETALL");
    let sql = `SELECT
    a.id AS 'id',
    b.id AS 'familyId',
    b.name AS 'familyName',
    a.date,
    a.attended,
    CONCAT(u.firstName, ' ', u.lastName) AS 'attendedBy',
    g.name AS 'groupName',
    c.name AS 'communityName'
  FROM
    attendances a
    JOIN user u ON u.id = a.userId
    JOIN beneficiary b ON a.familyId = b.id
    JOIN communityGroup g ON g.id = b.group_id
    JOIN community c ON c.id = g.communityId
  ORDER BY
    date DESC;
  `;
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            response.json(results);
        }
    });
}


/**
 * [Function that gets all data from all justifications]
 * @param   
 * @return response/error
 */
// NO MOVER NADA
module.exports.GETALLRECENT = (request, response) => {
    console.log("GETALLRECENT");
    console.log(request.params.id);
    let sql = `SELECT
    a.id AS 'id',
    b.id AS 'familyId',
    b.name AS 'familyName',
    a.date,
    a.attended,
    CONCAT(u.firstName, ' ', u.lastName) AS 'attendedBy',
    g.name AS 'groupName',
    c.name AS 'communityName'
  FROM
    attendances a
    JOIN user u ON u.id = a.userId
    JOIN beneficiary b ON a.familyId = b.id
    JOIN communityGroup g ON g.id = b.group_id
    JOIN community c ON c.id = g.communityId
  WHERE
    (date BETWEEN DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY) AND (CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY) + INTERVAL 6 DAY)
    AND (attended = 'attended' OR attended = 'justified')
  ORDER BY
    date DESC;`;
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            response.json(results);
        }
    });
}


/**
 * [Function that gets all data from all justifications]
 * @param   
 * @return response/error
 */
// NO MOVER NADA
module.exports.GETRECENTDELIVERIES = (request, response) => {
    console.log("GETRECENTDELIVERIES");
    console.log(request.params.id);
    let sql = `SELECT
    a.id AS 'id',
    b.id AS 'familyId',
    b.name AS 'familyName',
    a.date,
    a.attended,
    a.extraProduct,
    a.extraProductPrice,
    CONCAT(u.firstName, ' ', u.lastName) AS 'attendedBy',
    g.name AS 'groupName',
    c.name AS 'communityName'
    FROM
        attendances a
        JOIN user u ON u.id = a.userId
        JOIN beneficiary b ON a.familyId = b.id
        JOIN communityGroup g ON g.id = b.group_id
        JOIN community c ON c.id = g.communityId
    WHERE
        (date BETWEEN ( DATE_ADD(DATE_ADD(LAST_DAY(CURDATE()), INTERVAL 1 DAY), INTERVAL - 1 MONTH))
            AND LAST_DAY(CURDATE()) )
    AND (attended = 'attended' OR attended = 'justified')
    ORDER BY
        date DESC;`;
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            response.json(results);;
        }
    });
}


/**
 * [Function that gets all data from all justifications]
 * @param   
 * @return response/error
 */
module.exports.GETWEEKRATIO = (request, response) => {
    console.log("GETWEEKRATIO");
    let sql = `SELECT *, (total - current) AS benef FROM
    (SELECT day, COUNT(day) AS current
    FROM attendances a
    JOIN beneficiary b on a.familyId = b.id
    JOIN communityGroup cG on cG.id = b.group_id
    WHERE
        (date BETWEEN DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY) AND (CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY) + INTERVAL 6 DAY)
        AND a.attended = 'attended'
    GROUP BY day, attended) AS currAttByDay
    RIGHT JOIN (SELECT day, COUNT(day) AS total
    FROM beneficiary b
    JOIN communityGroup cG on cG.id = b.group_id
    GROUP BY day) AS totalBeneficiaryByDay
    USING (day);`;
    pool.query(sql, (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            response.json(results);
        }
    });
}

/**
 * [Function that gets all data from all justifications]
 * @param   
 * @return response/error
 */
module.exports.GETDAYRATIO = (request, response) => {
    console.log("GETDAYRATIOS");
    let sql = `SELECT *, (total - current) AS benef FROM
    (SELECT day, COUNT(day) AS current
    FROM attendances a
    JOIN beneficiary b on a.familyId = b.id
    JOIN communityGroup cG on cG.id = b.group_id
    WHERE
        date >= CURDATE()
        AND a.attended = 'attended'
    GROUP BY day, attended) AS currAttByDay
    RIGHT JOIN (SELECT day, COUNT(day) AS total
    FROM beneficiary b
    JOIN communityGroup cG on cG.id = b.group_id
    WHERE cG.day = UPPER(DAYNAME(CURDATE()))
    GROUP BY day) AS totalBeneficiaryByDay
    USING (day);`;
    pool.query(sql, async(error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            if (results == "") {
                let sql = `SELECT *, (total - current) AS benef FROM
                (SELECT day, COUNT(day) AS current
                FROM attendances a
                JOIN beneficiary b on a.familyId = b.id
                JOIN communityGroup cG on cG.id = b.group_id
                WHERE
                    (date BETWEEN DATE_ADD(CURDATE(), INTERVAL - WEEKDAY(CURDATE()) DAY) AND (CURDATE() - INTERVAL WEEKDAY(CURDATE()) DAY) + INTERVAL 6 DAY)
                    AND a.attended = 'attended'
                GROUP BY day, attended) AS currAttByDay
                RIGHT JOIN (SELECT day, COUNT(day) AS total
                FROM beneficiary b
                JOIN communityGroup cG on cG.id = b.group_id
                WHERE cG.day = "NULL"
                GROUP BY day) AS totalBeneficiaryByDay
                USING (day);`
                pool.query(sql, async(error, results, fields) => {
                    if (error) {
                        error.readable = msg.dbError;
                        response.status(400).send(error);
                    } else {
                        response.json(results);
                    }
                });
            } else {
                response.json(results)
            }
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
    // VErificacion por SQL para evitar una asistencia doble por semana
    let sql = "SELECT * FROM attendances WHERE familyId = ? AND date > CURRENT_DATE() - INTERVAL WEEKDAY(CURRENT_DATE()) DAY;";
    pool.query(sql, [bod.familyId], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            if (results == "") {
                let sql = `SELECT
                b.id,
                b.status,
                g.day
              FROM
                beneficiary b
                JOIN communityGroup g ON g.id = b.group_id
            WHERE b.id = ?
                AND  (day = UPPER(DAYNAME(CURRENT_DATE))
                OR day = "NULL");`;
                pool.query(sql, [bod.familyId], (error, results, fields) => {
                    if (error) {
                        error.readable = msg.dbError;
                        response.status(400).send(error);
                    } else {
                        if(results != "") {
                            if(results[0].status == 'active') {
                                let sql = "INSERT INTO attendances (familyId, attended, userId, extraProduct, extraProductPrice) VALUES (?, 'attended', ?, ?, ?);";
                                pool.query(sql, [bod.familyId, bod.userId, bod.extraProduct, bod.extraProductPrice], (error, results, fields) => {
                                    if (error) {
                                        error.readable = msg.dbError;
                                        response.status(400).send(error);
                                    } else {
                                        console.log(results)
                                        response.status(201).json(msg.registeredSuccessfully);
                                    }
                                });
                            } else {
                                response.status(400).json(msg.disabledBeneficiary)
                            }
                        } else {
                            console.log(results)
                            response.status(400).json(msg.beneficiaryNotOnDay);
                        }
                    }
                });
                ////

            } // Comprobacion para ver si asistió el mismo dia (NO SE DA DE BAJA), NO SE REGISTRA LA ASISTENCIA EN DB
            else if (dayjs.dayjs(results[0].date).format('DD/MM/YYYY') == dayjs.dayjs().format('DD/MM/YYYY')) {
                response.status(400).json(msg.alreadyAssistedDay(results[0]));
            } // BENEFICIARIO ASISTE DOS VECES POR SEMANA (SE DA DE BAJA)
            else {
                b_controller.FN_DELETE(results[0].familyId);
                response.status(400).json(msg.alreadyAssistedWeek(results[0]));
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
    let sql = "SELECT * FROM attendances WHERE id = ?;";
    console.log(request.params.id)
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            if (results != "") {
                response.status(400).json(msg.alreadyJustified);
            } else {
                let sql = `UPDATE attendances SET ? WHERE id = ?;`;
                pool.query(sql, [request.body, request.params.id], (error, results, fields) => {
                    if (error) {
                        error.readable = msg.dbError;
                        response.status(400).send(error);
                    } else {
                        results.affectedRows == 0 ? response.status(400).json(msg.noUpdate) : response.json(msg.updatedSuccessfully);
                    }
                });
            }
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
    let sql = `DELETE FROM attendances WHERE id=?;`;
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            results.affectedRows == 0 ? response.status(400).json(msg.noDelete) : response.json(msg.deletedSuccessfully);
        }
    });
}


/**
 * [Function that gets all data from all justifications]
 * @param   
 * @return response/error
 */
module.exports.GETALLABSENCES = (request, response) => {
    console.log("GETALLABSENCES");
    console.log(request.params.id);
    let sql = `SELECT
    b.id AS Id,
    b.name AS name,
    c.name AS communityName,
    g.name AS groupName,
    b.status,
    b.address,
    b.phone,
    absCount.absencesOfMonth
  FROM
    beneficiary b
    JOIN (
      SELECT
        familyId,
        COUNT (*) AS "absencesOfMonth"
      FROM
        attendances
      WHERE
        attended = "absent"
        AND date > date_add(
          date_add(LAST_DAY(NOW()), interval 1 DAY),
          INTERVAL -1 MONTH
        )
        AND date <= LAST_DAY(NOW())
      GROUP BY
        familyId
    ) absCount ON b.id = absCount.familyId
    JOIN communityGroup g ON g.id = b.group_id
    JOIN community c ON c.id = g.communityId;`
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            results == "" ? response.status(404).json(msg.nothingFound) : response.json(results);;
        }
    });
}

/**
 * [Function that gets all data from a justification]
 * @param  id 
 * @return response/error
 */
module.exports.GETABSENCEBYFAMILYID = (request, response) => {
    console.log("GETABSENCEBYFAMILYID");
    console.log(request.params.id);
    let sql = `SELECT
    a.id AS 'id',
    b.id AS 'familyId',
    b.name AS 'familyName',
    a.date,
    a.attended,
    CONCAT(u.firstName, ' ', u.lastName) AS 'attendedBy',
    g.name AS 'groupName',
    c.name AS 'communityName'
  FROM
    attendances a
    JOIN user u ON u.id = a.userId
    JOIN beneficiary b ON a.familyId = b.id
    JOIN communityGroup g ON g.id = b.group_id
    JOIN community c ON c.id = g.communityId
WHERE
        attended = "absent"
        AND familyId = ?
  ORDER BY
    date DESC;
  `
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            results == "" ? response.status(404).json(msg.nothingFound) : response.json(results);
        }
    });
}