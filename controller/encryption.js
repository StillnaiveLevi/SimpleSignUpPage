function caesarEncrypt(text, shift=3) {
    return text.split('').map(char => {
        if (char.match(/[A-Z]/)) {
            return String.fromCharCode(((char.charCodeAt(0) - 65 + shift) % 26) + 65);
        } else if (char.match(/[a-z]/)) {
            return String.fromCharCode(((char.charCodeAt(0) - 97 + shift) % 26) + 97);
        } else {
            return char; 
        }
    }).join('');
}


function vigenereEncrypt(text, key='key') {
    key = key.repeat(Math.ceil(text.length / key.length)).slice(0, text.length);
    return text.split('').map((char, i) => {
        if (char.match(/[A-Z]/)) {
            return String.fromCharCode(((char.charCodeAt(0) - 65 + (key[i].toUpperCase().charCodeAt(0) - 65)) % 26) + 65);
        } else if (char.match(/[a-z]/)) {
            return String.fromCharCode(((char.charCodeAt(0) - 97 + (key[i].toLowerCase().charCodeAt(0) - 97)) % 26) + 97);
        } else {
            return char;
        }
    }).join('');
}

function railFenceEncrypt(text, numRails=2) {
    let rail = Array.from({ length: numRails }, () => []);
    let dir = 1, row = 0;
    for (let char of text) {
        rail[row].push(char);
        row += dir;
        if (row === 0 || row === numRails - 1) dir *= -1;
    }
    return rail.flat().join('');
}


function columnarEncrypt(text, key='key') {
    const numCols = key.length;
    const numRows = Math.ceil(text.length / numCols);
    const grid = Array.from({ length: numRows }, (_, i) =>
        text.slice(i * numCols, (i + 1) * numCols).padEnd(numCols, 'X')
    );
    const sortedKey = key.split('').map((k, i) => ({ k, i })).sort((a, b) => a.k.localeCompare(b.k));
    return sortedKey.map(k => grid.map(row => row[k.i]).join('')).join('');
}


const defaultHillKeyMatrix = [
    [3, 3],
    [2, 5]
];


 function hillEncrypt(text, keyMatrix = defaultHillKeyMatrix) {
    
    text = text.replace(/[^a-zA-Z]/g, '').toUpperCase();
    if (text.length % 2 !== 0) text += 'X'; 

    let result = '';
    for (let i = 0; i < text.length; i += 2) {
        let pair = [text.charCodeAt(i) - 65, text.charCodeAt(i + 1) - 65];
        let encryptedPair = [
            (keyMatrix[0][0] * pair[0] + keyMatrix[0][1] * pair[1]) % 26,
            (keyMatrix[1][0] * pair[0] + keyMatrix[1][1] * pair[1]) % 26
        ];
        result += String.fromCharCode(encryptedPair[0] + 65) + String.fromCharCode(encryptedPair[1] + 65);
    }
    return result;
}


module.exports= {caesarEncrypt, vigenereEncrypt, railFenceEncrypt, columnarEncrypt, hillEncrypt};