
function isJsonStr(str) {
    if (typeof str !== 'string') return false;
    try {
        const result = JSON.parse(str);
        const type = Object.prototype.toString.call(result).toLowerCase();
        return type === '[object object]' || type === '[object array]';
    } catch (err) {
        return false;
    }
}


module.exports = {
    isJsonStr
}