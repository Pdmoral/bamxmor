const e = require('express');
var config = require('../helpers/config');
var msg = require('../helpers/messages')

const multer = require('multer');
const path = require('path');
const uuid = require("uuid");
const fs = require("fs")

var pool = config.pool;


const storage = multer.diskStorage({
  destination: path.join(__dirname, '../public/uploads'),
  filename: (req, file, cb) => {
    cb(null, uuid.v4() + path.extname(file.originalname));
  }
})

const upload = multer({
  storage: storage,
  fileFilter: (request, file, cb) => {
    console.log(file)
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .png, .jpg, .mp4 and .jpeg format allowed!'))
    }
  }
})

const uploadBenef = multer({
  storage: storage,
  fileFilter: (request, file, cb) => {
    console.log(file)
    if (file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.mimetype === 'application/vnd.ms-excel' ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('Only .xls, .xlsx format allowed!'))
    }
  }
})

module.exports.senddb = (request, response, next) => {
  return upload.single('image')(request, response, () => {
    console.log(request.body)
    console.log(request.file);
    if (request.file) {
      // Remember, the middleware will call it's next function
      // so we can inject our controller manually as the next()
      var temp_path = path.join(__dirname, '../public/uploads', request.file.filename);
      console.log(temp_path);
      var data = fs.readFileSync(temp_path, 'base64');
      data = "data:" + request.file.mimetype + ";base64," + data;
      request.body.image = data;
      fs.unlink(temp_path, function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
      });
    }
    next()
  })
}

module.exports.sendxlsx = (request, response, next) => {
  return uploadBenef.single('xlsx')(request, response, () => {
    console.log(request.body)
    console.log(request.file);
    if (request.file) {
      // Remember, the middleware will call it's next function
      // so we can inject our controller manually as the next()
      var temp_path = path.join(__dirname, '../public/uploads', request.file.filename);
      request.body.type = temp_path.split('.')[1];
      /* handling xls file */
      request.body.type = temp_path.split('.')[1];
      if(temp_path.split('.')[1] == 'xls'){
        console.log("Processing xls");
        var XLS = require('xlsx')
        var workbook = XLS.readFile(temp_path);        
        var xlData = XLS.utils.sheet_to_json(workbook.Sheets['Sheet2']);
        console.log(workbook.Sheets['Sheet1'])
        var xlData2 = XLS.utils.sheet_to_json(workbook.Sheets['Sheet1']);
        // console.log('xlData: ', xlData)
        // var sheet_name_list = workbook.SheetNames;
        // var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        request.body.xlData = xlData;
        request.body.xlData2 = xlData2;
      }
      /* handling xlsx file */
      else{
        console.log("Processing xlsx");
        var XLSX = require('xlsx')
        var workbook = XLSX.readFile(temp_path);
        var sheet_name_list = workbook.SheetNames;
        var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
        request.body.xlData = xlData;
      }
      /*  */
      console.log("Casa del xlsx: ", temp_path);
      fs.unlink(temp_path, function (err) {
        if (err) return console.log(err);
        console.log('file deleted successfully');
      });
    }
    next()
  })
}

module.exports.send = (request, response, next) => {
  return upload.single('image')(request, response, () => {
    // Remember, the middleware will call it's next function
    // so we can inject our controller manually as the next()
    console.log(request.body)
    console.log("Sisooooy")
    console.log(request.body)
    console.log("Sisooooy")
    console.log(request.body);
    var pas = request.file.filename;
    request.body.image = pas;
    if (!request.file) return response.json({
      error: "ErrorMessages.invalidFiletype"
    })
    next()
  })
}

module.exports.sendMultiple = (request, response, next) => {
  return upload.fields([{
        name: "image",
        maxCount: 1
      },
      {
        name: "miniatura",
        maxCount: 1
      },
    ])
    (request, response, () => {
      // Remember, the middleware will call it's next function
      // so we can inject our controller manually as the next()
      console.log("Sisooooy")
      console.log(request.body)
      console.log("xxxxxxx")
      console.log(request.files);
      request.body.image = request.files.image[0].filename;
      request.body.miniatura = request.files.miniatura[0].filename;
      console.log(request.body)
      if (!request.files) return response.json({
        error: "ErrorMessages.invalidFiletype"
      })
      next()
    })
}

module.exports.none = (request, response, next) => {
  return upload.none('image')(request, response, () => {
    console.log(request.file.filename)
    next()
  })
}