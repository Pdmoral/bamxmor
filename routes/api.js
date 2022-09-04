const { request, response, Router } = require('express');
var express = require('express');
var router = express.Router();
var uploader = require('../helpers/uploader');


var u_controller = require('../controllers/user.controller'); 
var c_controller = require('../controllers/community.controller');
var g_controller = require('../controllers/group.controller');
var j_controller = require('../controllers/justifications.controller'); 
var b_controller = require('../controllers/beneficiary.controller'); 
var a_controller = require('../controllers/attendance.controller'); 
var jT_controller = require('../controllers/justificationType.controller');
var r_controller = require('../controllers/report.controller'); 

// USUARIOS
// Metodo de LOGIN en [login.js] (routes/login.js)
router.get('/user/', u_controller.GETALL);
router.get('/user/disabled/', u_controller.GETALLDISABLED);
router.get('/user/:id', u_controller.GET);
router.post('/user/create', uploader.senddb, u_controller.CREATE);
router.patch('/user/:id', uploader.senddb, u_controller.UPDATE);
router.delete('/user/:id', u_controller.DELETE);
router.get('/user/re-enable/:id', u_controller.UNDELETE);


// JUSTIFICATIONES
router.get('/justification/', j_controller.GETALL);
router.get('/justification/:id', j_controller.GET);
router.post('/justification/create', j_controller.CREATE);
router.patch('/justification/:id', j_controller.UPDATE);
router.delete('/justification/:id', j_controller.DELETE);

// TIPOS DE JUSTIFICACIONES
router.get('/justificationType/', jT_controller.GETALL);
router.get('/justificationType/:id', jT_controller.GET);
router.post('/justificationType/create', jT_controller.CREATE);
router.patch('/justificationType/:id', jT_controller.UPDATE);
router.delete('/justificationType/:id', jT_controller.DELETE);


// BENEFICIARIOS
router.get('/beneficiary/', b_controller.GETALL);
router.get('/beneficiary/:id', b_controller.GET);
router.post('/beneficiary/create', b_controller.CREATE);
router.patch('/beneficiary/:id', b_controller.UPDATE);
router.delete('/beneficiary/:id', b_controller.DELETE);
router.get('/beneficiary/act/:id', b_controller.UNDELETE);
// Ruta especial para importar xlsx
router.post('/beneficiary/import/', uploader.sendxlsx, b_controller.IMPORT);
// Ruta para llamar al procedimiento despues de importar xlsx
router.get('/beneficiary/import/finish', b_controller.CALLPROCEDURE);

// COMMUNITY
router.get('/community/', c_controller.GETALL);
router.get('/community/:id', c_controller.GET);
router.post('/community/create', c_controller.CREATE);
router.patch('/community/:id', c_controller.UPDATE);
router.delete('/community/:id', c_controller.DELETE);


// GROUP
router.get('/group/', g_controller.GETALL);
router.get('/group/:id', g_controller.GET);
router.get('/group/byCommunity/:id', g_controller.GETALLBYCOMMUNITY);
router.post('/group/create', g_controller.CREATE);
router.patch('/group/:id', g_controller.UPDATE);
router.delete('/group/:id', g_controller.DELETE);

// ATTENDANCES
router.get('/attendance/', a_controller.GETALL);
router.get('/attendance/absence/', a_controller.GETALLABSENCES);
router.get('/attendance/ratio/week', a_controller.GETWEEKRATIO);
router.get('/attendance/ratio/today', a_controller.GETDAYRATIO);
router.get('/attendance/absence/:id', a_controller.GETABSENCEBYFAMILYID);
router.get('/attendance/delivery/recent', a_controller.GETRECENTDELIVERIES);
router.get('/attendance/recent', a_controller.GETALLRECENT);
router.get('/attendance/:id', a_controller.GET);
router.post('/attendance/create', a_controller.CREATE);
router.patch('/attendance/:id', a_controller.UPDATE);
router.delete('/attendance/:id', a_controller.DELETE);


// REPORTES
router.get('/report/beneficiary-count', r_controller.GET_BENIFICIARY_COUNT);
router.get('/report/attendances-count', r_controller.GET_ATTENDANCES_COUNT );
router.get('/report/justifications-count', r_controller.GET_JUSTIFICATIONS_COUNT);
router.get('/report/extraproduct-count', r_controller.GET_EXTRAPRODUCT_COUNT);
router.get('/report/extraproductprice-sum', r_controller.GET_EXTRAPRODUCTPRICE_SUM);
router.get('/report/extraproductprice-avg', r_controller.GET_EXTRAPRODUCTPRICE_AVG);
router.post('/report/filtered-deliveries', r_controller.GET_FILTERED_DELIVERIES);
router.post('/report/justificationns', r_controller.GET_FILTERED_JUSTIFICATIONS);

// SELECT2
router.get('/report/community-select2', r_controller.GET_COMMUNITY_SELECT2);
router.get('/report/group-select2', r_controller.GET_GROUP_SELECT2);


module.exports = router;
