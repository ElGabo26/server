
function getPathFile(file){
    const path=file.path
    const pathSplit=path.split("\\")
    
    return `${pathSplit[1]}/${pathSplit[2]}`
}


module.exports={
    getPathFile
}