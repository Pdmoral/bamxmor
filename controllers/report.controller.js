const e = require('express');
var config = require('../helpers/config');
// const { connect } = require('../routes/api');
var msg = require('../helpers/messages')
var pool = config.pool;



/**
 * [Function that gets an active beneficiary ]
 * @return response/error
 */
 module.exports.GET_BENIFICIARY_COUNT = (request, response) => {
  console.log(request.params.id);
  let sql = `SELECT COUNT(*) FROM beneficiary WHERE status= 'active';`;
  pool.query(sql, (error, results, fields) => {
      if (error) {
          error.readable = msg.dbError;
          response.status(400).send(error);
      } else {
          results == "" ? response.status(404).json(msg.nothingFound) : response.json(results);
      }
  });
}

/**
 * [Function that gets the total of attendances in a date range]
 * @return response/error
 */
 module.exports.GET_ATTENDANCES_COUNT = (request, response) => {
  console.log(request.params.id);
  let sql = `SELECT COUNT (*) FROM attendances WHERE attended = 'attended'
  AND DATE BETWEEN ? and ?;`;
  pool.query(sql, (error, results, fields) => {
      if (error) {
          error.readable = msg.dbError;
          response.status(400).send(error);
      } else {
          results == "" ? response.status(404).json(msg.nothingFound) : response.json(results);
      }
  });
}

/**
 * [Function that gets Justifications in a date range]
 * @return response/error
 */
 module.exports.GET_JUSTIFICATIONS_COUNT = (request, response) => {
  console.log(request.params.id);
  let sql = `SELECT COUNT (*)
  FROM justification
  WHERE authorizationDate between '2022-01-01' and '2022-02-01';`;
  pool.query(sql, (error, results, fields) => {
      if (error) {
          error.readable = msg.dbError;
          response.status(400).send(error);
      } else {
          results == "" ? response.status(404).json(msg.nothingFound) : response.json(results);
      }
  });
}

/**
 * [Function that gets the total of beneficiaries that take an extra product]
 * @return response/error
 */
 module.exports.GET_EXTRAPRODUCT_COUNT = (request, response) => {
  console.log(request.params.id);
  let sql = `SELECT COUNT(*) FROM attendances
  WHERE extraProduct = 1
  AND DATE BETWEEN ? and ?;`;
  pool.query(sql, (error, results, fields) => {
      if (error) {
          error.readable = msg.dbError;
          response.status(400).send(error);
      } else {
          results == "" ? response.status(404).json(msg.nothingFound) : response.json(results);
      }
  });
}

/**
 * [Function that gets the total sum of 'extraProductPrice' in a date range]
 * @return response/error
 */
 module.exports.GET_EXTRAPRODUCTPRICE_SUM = (request, response) => {
  console.log(request.params.id);
  let sql = `SELECT SUM(extraProductPrice) FROM attendances
  WHERE DATE BETWEEN ? and ? ;`;
  pool.query(sql, (error, results, fields) => {
      if (error) {
          error.readable = msg.dbError;
          response.status(400).send(error);
      } else {
          results == "" ? response.status(404).json(msg.nothingFound) : response.json(results);
      }
  });
}

/**
 * [Function that gets the average of 'extraProductPrice' in a date range]
 * @return response/error
 */
 module.exports.GET_EXTRAPRODUCTPRICE_AVG = (request, response) => {
  console.log(request.params.id);
  let sql = `SELECT AVG(extraProductPrice) FROM attendances
  WHERE DATE BETWEEN ? and ?;`;
  pool.query(sql, (error, results, fields) => {
      if (error) {
          error.readable = msg.dbError;
          response.status(400).send(error);
      } else {
          results == "" ? response.status(404).json(msg.nothingFound) : response.json(results);
      }
  });
}

/**
 * [Function that gets the average of 'extraProductPrice' in a date range]
 * @return response/error
 */
 module.exports.GET_COMMUNITY_SELECT2 = (request, response) => {
    console.log(request.params.id);
    let sql = `SELECT id, name FROM community;`;
    pool.query(sql, (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            results == "" ? response.status(404).json(msg.nothingFound) : response.json(results);
        }
    });
  }

/**
 * [Function that gets the average of 'extraProductPrice' in a date range]
 * @return response/error
 */
 module.exports.GET_GROUP_SELECT2 = (request, response) => {
    console.log(request.params.id);
    let sql = `SELECT id, name FROM communityGroup;`;
    pool.query(sql, (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            results == "" ? response.status(404).json(msg.nothingFound) : response.json(results);
        }
    });
  }

/**
 * [Function that gets all data from a justification]
 * @param  id 
 * @return response/error
 */
 module.exports.GET_FILTERED_DELIVERIES = (request, response) => {
    var bod = request.body;
    console.log('el body: ', bod);

    let rS = bod.rSDate.replace('/', '-').replace('/', '-');
    let rE = bod.rEDate.replace('/', '-').replace('/', '-');
    let sql_date_f = `WHERE a.date BETWEEN ? AND ? `
    if(bod.rSDate == bod.rEDate){
        sql_date_f = `WHERE a.date BETWEEN ? AND (? + INTERVAL 1 DAY) `;
    }

    /* Community filter */
    let sql_comm_f = `AND c.name <> ? AND c.name IN (SELECT name FROM community) `;
    if(bod.rCommunity != 'Todas'){
        sql_comm_f = `AND c.name = ? `
    }
    /* Group filter */
    let sql_group_f = `AND g.name <> ? AND g.name IN (SELECT name FROM communityGroup) `;
    if(bod.rGroup != 'Todos'){
        sql_group_f = `AND g.name = ? `
    }
    /* Extra product filter */
    let sql_extra_f = ` `;
    if(bod.pCheck == true){
        sql_extra_f = `AND a.extraProduct = 1 `
    }

    let sql = `
    SELECT 
        b.name AS 'nombre_beneficiario',
        g.name AS 'nombre_grupo', g.day AS 'dia',
        c.name AS 'nombre_comunidad',
        a.familyId AS 'folio', a.date AS 'fecha', a.extraProductPrice AS 'productos_extra'
    FROM attendances a
    JOIN 
        beneficiary b ON a.familyId = b.id
    JOIN 
        communityGroup g ON g.id = b.group_id
    JOIN 
        community c ON c.id = g.communityId
        ` +
        sql_date_f +
        `AND a.attended = 'attended'
        `  +
        sql_comm_f +
        sql_group_f +
        sql_extra_f +
        `;`
    /*
    AND a.date BETWEEN ? and ?
        AND c.name = ? 
        AND g.name = ?
    */
    // console.log('PARAMS: ', request.body.rSDate);
    // AND a.extraProductPrice IS NOT NULL
    console.log(sql);
    pool.query(sql, [rS, rE, bod.rCommunity, bod.rGroup, bod.pCheck], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            console.log(error.sql)
            response.status(400).send(error);
        } else {
            if (results == "") {
                response.status(400).json(msg.noRegisters)
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
 module.exports.GET_FILTERED_JUSTIFICATIONS = (request, response) => {
    var bod = request.body;
    console.log('el body: ', bod);

    let rS = bod.rSDate.replace('/', '-').replace('/', '-');
    let rE = bod.rEDate.replace('/', '-').replace('/', '-');
    let sql_date_f = `WHERE a.date BETWEEN ? AND ? `
    if(bod.rSDate == bod.rEDate){
        sql_date_f = `WHERE a.date BETWEEN ? AND (? + INTERVAL 1 DAY) `;
    }

    /* Community filter */
    let sql_comm_f = `AND c.name <> ? AND c.name IN (SELECT name FROM community) `;
    if(bod.rCommunity != 'Todas'){
        sql_comm_f = `AND c.name = ? `
    }
    /* Group filter */
    let sql_group_f = `AND g.name <> ? AND g.name IN (SELECT name FROM communityGroup) `;
    if(bod.rGroup != 'Todos'){
        sql_group_f = `AND g.name = ? `
    }
    /* Extra product filter */
    let sql_extra_f = ` `;
    if(bod.pCheck == true){
        sql_extra_f = `AND a.extraProduct = 1 `
    }

    let sql = `
    SELECT
    a.familyId AS 'folio',
    b.name AS 'nombre_beneficiario',
    c.name AS 'nombre_comunidad',
    g.name AS 'nombre_grupo',
    g.day AS 'dia',
    a.date AS 'fecha de falta',
    a.attended AS 'status',
    j.authorizationDate AS 'Fecha de Justificacion',
    CONCAT(u.firstName, ' ', u.lastName) AS 'Justificado por',
    jt.description AS 'Motivo de Justificacion'
    FROM attendances a
    JOIN
        beneficiary b ON a.familyId = b.id
    JOIN
        communityGroup g ON g.id = b.group_id
    JOIN
        community c ON c.id = g.communityId
    JOIN
        justification j on a.id = j.id
    JOIN
        justificationType jt on j.justificationTypeId = jt.id
    JOIN
        user u on j.authorizedBy = u.id` +
        sql_date_f +
        sql_comm_f +
        sql_group_f +
        sql_extra_f +
        `;`
    /*
    AND a.date BETWEEN ? and ?
        AND c.name = ? 
        AND g.name = ?
    */
    // console.log('PARAMS: ', request.body.rSDate);
    // AND a.extraProductPrice IS NOT NULL
    pool.query(sql, [rS, rE, bod.rCommunity, bod.rGroup, bod.pCheck], (error, results, fields) => {
        if (error) {
            error.readable = msg.dbError;
            response.status(400).send(error);
        } else {
            if (results == "") {
                response.status(400).json(msg.noRegisters)
            } else {
                response.json(results);
            }
        }
    });
}


// Fecha, grupo, comunidad, producto extra