var dayjs = require('../helpers/dayjs.config')

module.exports = {
    tokenNotFound: {
        "MesageType": "Error",
        "Message": "Token no proporcionado",
        "Component": "Token/Authentication",
        "Authenticated": false
    },
    invalidToken: {
        "MesageType": "Error",
        "Message": "El token proporcionado es invalido",
        "Component": "Token/Authentication",
        "Authenticated": false
    },
    userMailNotFound: {
        "MesageType": "Error",
        "Message": "Usuario o email no encontrado",
        "Component": "Authentication"
    },
    incorrectPwd: {
        "MesageType": "Error",
        "Message": "Contraseña incorrecta",
        "Component": "Authentication"
    },
    alreadyDisabledAccount: {
        "MesageType": "Error",
        "Message": "La cuenta ya desactivada o no existe en el sistema",
        "Component": "Account"
    },
    disabledAccount: {
        "MesageType": "Error",
        "Message": "Cuenta desactivada",
        "Component": "Account"
    },
    fieldsError: {
        "MesageType": "Error",
        "Message": "Falta uno o más campos por llenar",
        "Component": "User"
    },
    alreadyRegistered: {
        "MesageType": "Error",
        "Message": "El usuario y/o email ya está registrado en el sistema",
        "Component": "User"
    },
    loginSuccessfully: {
        "MesageType": "Success",
        "Mesage": "La cuenta se ha autenticado en el sistema exitosamente",
        "Component": "Account"
    },
    registeredSuccessfully: {
        "MesageType": "Success",
        "Mesage": "El registro se ha creado en el sistema exitosamente",
        "Component": "Database"
    },
    updatedSuccessfully: {
        "MesageType": "Success",
        "Mesage": "El registro se ha actualizado en el sistema exitosamente",
        "Component": "Database"
    },
    deletedSuccessfully: {
        "MesageType": "Success",
        "Mesage": "El registro se ha eliminado del sistema exitosamente",
        "Component": "Database"
    },
    noDelete: {
        "MesageType": "Error",
        "Mesage": "No se encuentra un registro para eliminar",
        "Component": "Database"
    },
    noUpdate: {
        "MesageType": "Error",
        "Mesage": "No se pudo actualizar el registro en el sistema",
        "Component": "Database"
    },
    idNotFound: {
        "MesageType": "Error",
        "Mesage": "No se encuentra un registro con este id en el sistema",
        "Component": "Database"
    },
    nothingFound: {
        "MesageType": "Error",
        "Mesage": "No se encuentran registros en el sistema",
        "Component": "Database"
    },
    dbError: {
        "MesageType": "Error",
        "Mesage": "El sistema tuvo un error en la base de datos. Favor de revisar sus datos o reportar el error.",
        "Component": "Database"
    },
    alreadyJustified: {
        "MesageType": "Error",
        "Message": "La falta ya está justificada en el sistema",
        "Component": "Justification"
    },
    alreadyDisabledBeneficiary: {
        "MesageType": "Error",
        "Message": "El beneficiario está desactivado o no existe en el sistema",
        "Component": "Beneficiary"
    },
    disabledBeneficiary: {
        "MesageType": "Error",
        "Message": "Beneficiario desactivado, favor de pasar a trabajo social",
        "Component": "Beneficiary"
    },
    expiredBeneficiary: {
        "MesageType": "Error",
        "Message": "La vigencia del beneficiario ha expirado",
        "Component": "Beneficiary"
    },
    alreadyRegisteredBeneficiary: {
        "MesageType": "Error",
        "Message": "El Beneficiario ya está registrado en el sistema",
        "Component": "Beneficiary"
    },
    importedSuccessfully: {
        "MesageType": "Success",
        "Message": "Los beneficiarios han sido importados correctamente",
        "Component": "Beneficiary"
    },
    importedUnsuccessfully: {
        "MesageType": "Error",
        "Message": "Ha habido un error al procesar el archivo",
        "Component": "Beneficiary"
    },
    noRegisters: {
        "MesageType": "Error",
        "Message": "No se ha encontrado ningún registro con estos datos",
        "Component": "Reports"
    },
    notSigoFile: {
        "MesageType": "Error",
        "Message": "El archivo subido no corresponde a un archivo generado por el sistema SIGO+",
        "Component": "Beneficiary"
    },
    alreadyAssistedDay(sqlResults) {
        return {
            "MesageType": "Error",
            "Message": "El beneficiario ya asistió el día de hoy ("+ dayjs.dayjs(sqlResults.date).format('DD/MMMM/YYYY').toUpperCase() +")",
            "Component": "Attendances"
        }
    },
    alreadyAssistedWeek(sqlResults) {
        return {
            "MesageType": "Error",
            "Message": "ATENCION: El beneficiario " + sqlResults.familyId + " SERÁ DADO DE BAJA DEBIDO A QUE YA ASISTIÓ MÁS DE UNA VEZ EN ESTA SEMANA ("+ dayjs.dayjs(sqlResults.date).format('DD/MMMM/YYYY  HH:MM:ss').toUpperCase() +") Mandar beneficiario a trabajo social",
            "Component": "Attendances"
        }
    },
    beneficiaryNotOnDay: {
        "MesageType": "Error",
        "Message": "ATENCION: El beneficiario NO DEBERÍA ASISTIR ESTE DÍA",
        "Component": "Attendances"
    }
}