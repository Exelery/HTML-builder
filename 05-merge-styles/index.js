// const merge = require("./merge")

const {join, extname, basename} = require('node:path')
const {readdir} = require('node:fs/promises');
const fs = require("fs")


async function merge(_src, _dest){
  const src = _src
  const dest = _dest
  let files = await readdir(src)
  files = files.filter(el => extname(el) == ".css")
  console.log(files)
  const streamWrite = fs.createWriteStream(dest,{flags: "w", encoding: "utf8"})
  for(let file of files){
    let cssPath = join(src, file)
    const streamRead = fs.createReadStream(cssPath, 'utf8')
    streamRead.on('data', chunk => streamWrite.write(chunk))
    streamRead.on('error', (er)=>{
      console.log(er, "Operacion failed")
    })
  }

  console.log(basename(dest),"is created")
}

const src = join(__dirname, "styles")
const dest = join(__dirname, "project-dist", "bundle.css")


merge(src, dest)

module.exports = merge

