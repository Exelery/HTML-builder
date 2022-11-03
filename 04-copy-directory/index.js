const {join} = require('node:path')
const copyDir = require("./copyDir")

const src = join(__dirname, "files")
const dest = join(__dirname, "files-copy")


copyDir(src, dest).catch(console.error)