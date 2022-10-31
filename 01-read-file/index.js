const path = require('node:path')
const fs = require("fs")

const pathTxt = path.join(__dirname, "text.txt")
console.log(pathTxt)
const stream = fs.createReadStream(pathTxt, 'utf8')
stream.on('data', chunk => console.log(chunk))
stream.on('error', (er)=>{
  console.log(er, "Operacion failed")
})