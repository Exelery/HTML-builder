const merge = require("./merge")
const {join} = require('node:path')


console.log("run")


const src = join(__dirname, "styles")
const dest = join(__dirname, "project-dist", "bundle.css")
merge(src, dest)

// Привет! Функцию сделал в соседнем файле ./merge чтобы при
// повторном использовании она не зпускалась лишний раз. Пожайлуста посмотрите этот файл
// и добавьте его при проверке 