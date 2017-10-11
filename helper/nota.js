module.exports = function (lastNota) {
    let newNota = '';
    let charCode = lastNota.charCodeAt(3);
    if (lastNota[3] != 'Z') {
        if (lastNota[2] != 9) {
            newNota += (lastNota[0] + lastNota[1] + lastNota[2] + String.fromCharCode(charCode + 1))
        }
    } else if (lastNota[3] == 'Z') {
        if (lastNota[2] != 9) {
            newNota += (lastNota[0] + lastNota[1] + lastNota[2] + 1 + 'A')
        }
    }
    return newNota;
}