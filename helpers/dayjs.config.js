// Manejo de fechas con DayJS
var dayjs = require('dayjs')
require('dayjs/locale/es-mx')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.locale('es-mx') // use locale globally
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault("America/Mexico_City")

module.exports.dayjs = dayjs; // Objeto que quiero exportar o hacer publico fuera de este archivo