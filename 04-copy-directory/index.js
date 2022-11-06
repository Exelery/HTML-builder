const {join} = require('node:path')
const copyDir = require("./copyDir")

const src = join(__dirname, "files")
const dest = join(__dirname, "files-copy")


copyDir(src, dest).catch(console.error)

//// Привет! Функцию сделал в соседнем файле ./copyDir чтобы при
// повторном использовании она не зпускалась лишний раз. Пожайлуста посмотрите этот файл
// и добавьте его при проверке 