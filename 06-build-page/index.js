const {join, extname} = require('node:path')
const {readdir, readFile, mkdir, rm} = require('node:fs/promises');
const fs = require("fs")
const merge = require("../05-merge-styles/index")
const copyDir = require("../04-copy-directory/index")



async function buildPage(){
  const dest = join(__dirname, "project-dist")
  await rm(dest,{recursive: true, force: true})
  await mkdir(dest, { recursive: true });
  const assetsDest = join(dest, "assets")
  await mkdir(assetsDest, { recursive: true });
  const bundle = join(dest, "style.css")

  const assetsSrc = join(__dirname, "assets")
  const srcStyles = join(__dirname, "styles")
  await merge(srcStyles, bundle)
  await copyDir(assetsSrc, assetsDest)
  
  const pathTxt = join(__dirname, "template.html")
  let template = await readFile(pathTxt, 'utf8')
  
  let pathFiles = join(__dirname, "components")
  let files = await readdir(pathFiles)
  
  for(let e of files){
    let pathFile = join(pathFiles, e)
    let component = await readFile(pathFile, 'utf8')
    if(extname(e) == ".html"){
      template = template.replace(`{{${e.split(".")[0]}}}`, component)
    }
        
  }
  const re = /({{()(.*?)}})/g
  template = template.replace(re, "")
  
  const indexPath = join(dest, "index.html")
  const streamWrite = fs.createWriteStream(indexPath,{flags: "w", encoding: "utf8"})
  streamWrite.write(template)
  
}

buildPage().catch(console.error)