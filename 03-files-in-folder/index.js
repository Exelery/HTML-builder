const path = require('node:path')
const fs = require("fs").promises


const pathFold = path.join(__dirname, "secret-folder")

async function main() {
  let files = await fs.readdir(pathFold)
  let answer = Promise.all(files.map(async e =>{
    let filePath = path.join(pathFold, e)
    let stat = await fs.lstat(filePath)
    // console.log(stat.size)
    if(stat.isFile()){
      return [...e.split("."), stat.size+"b"].join(" - ")
    }
  }))
  return answer
}

main().then(res => {
  res = res.filter(e => e != undefined)
  res.forEach(e => console.log(e))
})