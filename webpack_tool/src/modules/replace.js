module.exports = function(string,reg){
    while(string.indexOf(reg) !== -1){
        string = string.replace(reg,'W');
    }
    return string;
}