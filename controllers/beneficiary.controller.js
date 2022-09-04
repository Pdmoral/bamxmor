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
    let sql = `SELECT
    b.id AS 'Id',
    b.name AS 'name',
    g.name AS 'groupName',
    c.name AS 'communityName',
    g.day,
    g.id AS 'groupId',
    b.registrationdate,
    b.expirationdate,
    b.status,
    b.address,
    b.phone
  FROM
    beneficiary b
    JOIN communityGroup g ON g.id = b.group_id
    JOIN community c ON c.id = g.communityId
  WHERE
    b.id = ?;
  `
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            if (results == "") {
                response.status(404).json(msg.idNotFound);
            } else {
                response.json(results);
            }
        }
    });
}

/**
 * [Function that gets all data from a justification]
 * @param  id 
 * @return response/error
 */
module.exports.GETALL = (request, response) => {
    let sql = `SELECT
    b.id AS 'Id',
    b.name AS 'name',
    g.name AS 'groupName',
    c.name AS 'communityName',
    g.day,
    g.id AS 'groupId',
    b.registrationdate,
    b.expirationdate,
    b.status,
    b.address,
    b.phone
  FROM
    beneficiary b
    JOIN communityGroup g ON g.id = b.group_id
    JOIN community c ON c.id = g.communityId;`
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
 * [Function that creates a justifications for an abstence]
 * @param  id 
 * @param  type 
 * @param  user
 * @return response/error
 */
module.exports.CREATE = (request, response) => {
    var bod = request.body;
    var sql = "SELECT * FROM beneficiary WHERE id = ?;"
    pool.query(sql, [bod.id], (error, results, fields) => {
        if (error) response.status(400).send(error);
        else if (results != "") response.status(400).json(msg.alreadyRegistered);
        else {
            let sql = "INSERT INTO beneficiary(id, name, group_id, registrationDate, expirationDate, status, address, phone) VALUES (?, ?, ?, ?, ?, 'active', ?, ?);";
            pool.query(sql, [bod.id, bod.name, bod.group_id, bod.registrationDate, bod.expirationDate, bod.status, bod.address, bod.phone], (error, results, fields) => {
                if (error) response.status(400).send(error);
                else response.json(msg.registeredSuccessfully);
            });
        }
    });
}

/**
 * [Function that gets all data from a justification]
 * @param  id 
 * @return response/error
 */
// FIXME: CREAR UPDATES
module.exports.UPDATE = (request, response) => {
    let sql = "SELECT * FROM beneficiary WHERE id = ?;";
    console.log(request.params.id)
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            if (results == "") {
                response.status(400).json(msg.idNotFound);
            } else {
                console.log(request.params.id);
                let sql = `UPDATE beneficiary SET ? WHERE id = ?;`;
                pool.query(sql, [request.body, request.params.id], (error, results, fields) => {
                    if (error) {
                        error.readable = msg.dbError;
                        response.status(400).send(error);
                    } else {
                        results.affectedRows == 0 ? response.status(404).json(msg.noUpdate) : response.json(msg.updatedSuccessfully);
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
    var sql = "SELECT * FROM beneficiary WHERE id = ? AND status = 'active';"
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) response.status(500).send(error);
        else {
            if (results == "") response.status(400).json(msg.alreadyDisabledAccount);
            else {
                var sql = "UPDATE beneficiary SET status = 'disabled' WHERE id = ?;"
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
 * [Function that gets all data from a justification]
 * @param  id 
 * @return response/error
 */
module.exports.UNDELETE = (request, response) => {
    var sql = "SELECT * FROM beneficiary WHERE id = ? AND status = 'disabled';"
    pool.query(sql, [request.params.id], (error, results, fields) => {
        if (error) response.status(500).send(error);
        else {
            if (results == "") response.status(400).json(msg.alreadyDisabledAccount);
            else {
                var sql = "UPDATE beneficiary SET status = 'active' WHERE id = ?;"
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


module.exports.FN_DELETE = (id) => {
    var sql = "UPDATE beneficiary SET status = 'disabled' WHERE id = ?;"
    pool.query(sql, [id], (error, results, fields) => {
        if (error) {
            return error;
        } else {
            return true;
        }
    })
}

/**
 * [Function that inserts a beneficiary from JSON]
 * @param element
 * @param index
 */
function insertBeneficiariesXLS(element, index) {
    if (index >= 3) {
        var ben = new Object;
        console.log('element: ', element);
        ben.id = element['FOLIO FAMILIAR'];
        ben.name = element['NOMBRE TITULAR'];
        ben.group_name = element.GRUPO;
        ben.registrationDate = element['F.REGISTRO'];
        ben.expirationDate = element['F.VENCIMIENTO'];
        ben.status = element.ESTADO;
        console.log('BENEFICIARIO: ', ben);

        /* fixing registrationDate */
        if (ben.registrationDate !== undefined) {
            var rDate = ben.registrationDate.split(' ')[0].split('/');
            rDate = rDate[2] + '-' + rDate[1] + '-' + rDate[0];
        }
        /* fixing expirationDate */
        if (ben.expirationDate !== undefined) {
            var eDate = ben.expirationDate.split(' ')[0].split('/');
            eDate = eDate[2] + '-' + eDate[1] + '-' + eDate[0];
        }
        if (ben.status == 'Activo') {
            ben.status = 'active';
        } else {
            ben.status = 'disabled';
        }

        var group = 6
        var sql2 = "SELECT id FROM communityGroup WHERE name = ?;"
        pool.query(sql2, [ben.group_name], (error2, results2, fields2) => {
            if (error2) console.log(error2);
            else if (results2 != "") {
                group = results2[0].id;
                // console.log("Group results: ", results2[0].id);
                // console.log("Group name: ", ben.group_name);
                let sql = "INSERT INTO beneficiaryTemp(id, name, group_id, registrationDate, expirationDate, status) VALUES (?, ?, ?, ?, ?, ?);";
                pool.query(sql, [ben.id, ben.name, group, rDate, eDate, ben.status], (error, results, fields) => {
                    if (error) console.log(error);
                });
            } else {
                group = 6;
                let sql = "INSERT INTO beneficiaryTemp(id, name, group_id, registrationDate, expirationDate, status) VALUES (?, ?, ?, ?, ?, ?);";
                pool.query(sql, [ben.id, ben.name, group, rDate, eDate, ben.status], (error, results, fields) => {
                    if (error) console.log(error);
                });
            }
        });

    }
}

/**
 * [Function that inserts a beneficiary from JSON]
 * @param element
 * @param index
 */
function insertBeneficiariesXLSX(element, index) {
    if (index >= 3) {
        var ben = new Object;
        console.log('element: ', element);
        ben.id = element.__EMPTY;
        ben.name = element.__EMPTY_2;
        ben.group_name = element.__EMPTY_6;
        ben.registrationDate = element.__EMPTY_8;
        ben.expirationDate = element.__EMPTY_9;
        ben.status = element.__EMPTY_10;
        console.log('BENEFICIARIO: ', ben);

        /* fixing registrationDate */
        if (ben.registrationDate !== undefined) {
            var rDate = ben.registrationDate.split(' ')[0].split('/');
            rDate = rDate[2] + '-' + rDate[1] + '-' + rDate[0];
        }
        /* fixing expirationDate */
        if (ben.expirationDate !== undefined) {
            var eDate = ben.expirationDate.split(' ')[0].split('/');
            eDate = eDate[2] + '-' + eDate[1] + '-' + eDate[0];
        }
        if (ben.status == 'Activo') {
            ben.status = 'active';
        } else {
            ben.status = 'disabled';
        }

        var group = 6
        var sql2 = "SELECT id FROM communityGroup WHERE name = ?;"
        pool.query(sql2, [ben.group_name], (error2, results2, fields2) => {
            if (error2) console.log(error2);
            else if (results2 != "") {
                group = results2[0].id;
                // console.log("Group results: ", results2[0].id);
                // console.log("Group name: ", ben.group_name);
                let sql = "INSERT INTO beneficiaryTemp(id, name, group_id, registrationDate, expirationDate, status) VALUES (?, ?, ?, ?, ?, ?);";
                pool.query(sql, [ben.id, ben.name, group, rDate, eDate, ben.status], (error, results, fields) => {
                    if (error) console.log(error);
                });
            } else {
                group = 6;
                let sql = "INSERT INTO beneficiaryTemp(id, name, group_id, registrationDate, expirationDate, status) VALUES (?, ?, ?, ?, ?, ?);";
                pool.query(sql, [ben.id, ben.name, group, rDate, eDate, ben.status], (error, results, fields) => {
                    if (error) console.log(error);
                });
            }
        });

    }
}


/**
 * [Function that imports beneficiaries from xlsx worksheet]
 * @param response/error 
 */
module.exports.IMPORT = async (request, response) => {
    var xlData = request.body.xlData;
    var xlData2 = request.body.xlData2;
    // console.log('xlData: ', xlData);
    if (typeof xlData[1] !== 'undefined' && Object.keys(xlData).length > 0){
        var xd1 = (typeof xlData[1].__EMPTY === 'undefined') ? null : xlData[1].__EMPTY;
    }
    if (typeof xlData2 !== 'undefined' && Object.keys(xlData2).length > 0){
        var xd2 = (typeof xlData2[0].__EMPTY === 'undefined') ? null : xlData2[0].__EMPTY;
    }

    var comp = xd1 || xd2 || null;
    console.log("COOOOMP ", comp);
    if (xlData === undefined) {
        response.status(500).send(msg.importedUnsuccessfully);
    } else {
        /* Importamos */
        // xlData.forEach(insertBeneficiaries);
        try {
            if (comp == 'ESTUDIOS SOCIO-NUTRICIOS REGISTRADOS') {
                if (request.body.type == 'xls') {
                    await (xlData.forEach(insertBeneficiariesXLS))
                } else {
                    await (xlData.forEach(insertBeneficiariesXLSX))
                }
                // Una query que se llama, para saber que se han subido los beneficiarios a la db
                let dumbquery = 'SELECT * FROM user WHERE false';
                pool.query(dumbquery, (error, results, fields) => {
                    console.log("Calling proc");
                    if (error) response.status(500).json(error);
                    else {
                        response.json(msg.importedSuccessfully);
                    }
                });
            } else {
                response.status(400).json(msg.notSigoFile);
            }


        } catch (err) {
            console.log("Errores de importacion: ", err);
            response.status(500).json(msg.importedUnsuccessfully);
        }
        // response.json(msg.importedSuccessfully);
    }

}


module.exports.CALLPROCEDURE = (request, response) => {
    let callProcedure = "CALL inset_beneficiaries();";
    console.log(callProcedure);
    pool.query(callProcedure, (error, results, fields) => {
        console.log("Calling proc");
        if (error) response.status(500).json(error);
        else {
            response.json(msg.importedSuccessfully);
        }
    });
}