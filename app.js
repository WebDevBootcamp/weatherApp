var express = require('express')
var app = express()
var moment = require("moment");


console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))


app.use(express.static('public'))

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
