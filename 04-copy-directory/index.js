const {join} = require('node:path')
const { mkdir, readdir, copyFile, rm, lstat} = require('node:fs/promises');
// const copyDir = require("./copyDir")

const src = join(__dirname, "files")
const dest = join(__dirname, "files-copy")


async function copyDir(_src, _dest){
  const src = _src
  const dest = _dest
  await rm(dest,{recursive: true, force: true})

  const createDir = await mkdir(dest, { recursive: true });

  let files = await readdir(src)

  for(let file of files){
    let filePath = join(src, file)
    let copyPath = join(dest, file)
    let stat = await lstat(filePath)
    if(stat.isDirectory()){
      copyDir(filePath, copyPath)
    } else{
      await copyFile(filePath, copyPath)
    }

  }

  console.log("Files have copied")
  return createDir;
}


copyDir(src, dest).catch(console.error)


module.exports = copyDir