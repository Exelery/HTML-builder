const {join} = require('node:path')
const { mkdir, readdir, copyFile, rm } = require('node:fs/promises');

async function copyDir(){
  const src = join(__dirname, "files")
  const dest = join(__dirname, "files-copy")
  await rm(dest,{recursive: true, force: true})

  const createDir = await mkdir(dest, { recursive: true });

  // console.log( `created ${createDir}`);

  let files = await readdir(src)



  for(let file of files){
    let filePath = join(src, file)
    let copyPath = join(dest, file)
    await copyFile(filePath, copyPath)
  }
  
  console.log("Files have copied to", "files-copy folder")
  return createDir;
}


copyDir().catch(console.error)


