const process = require("process")
const path = require('node:path')
const fs = require("fs")
const readline = require('node:readline')

const pathTxt = path.join(__dirname, "text.txt")
const stream = fs.createWriteStream(pathTxt,{flags: "w", encoding: "utf8"})
stream.on("ready", ()=>{console.log("File is ready")})
console.log("--------start---------")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

process.on("exit", ()=>{
  stream.end()
  console.log("--------exit---------")
})

rl.on("line", (line)=>{
  if(line == "exit"){
    process.exit()
  }
  stream.write(line + "\n")
})


