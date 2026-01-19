const {caesarEncrypt} = require('./encryption');
const defaultHillKeyMatrix = [
    [3, 3],
    [2, 5]
];

function caesarDecrypt(text, shift = 3) {
    return caesarEncrypt(text, 26 - (shift % 26));
}


function vigenereDecrypt(text, key = 'key') {
    key = key.repeat(Math.ceil(text.length / key.length)).slice(0, text.length);
    return text.split('').map((char, i) => {
        if (char.match(/[A-Z]/)) {
            return String.fromCharCode(((char.charCodeAt(0) - 65 - (key[i].toUpperCase().charCodeAt(0) - 65) + 26) % 26) + 65);
        } else if (char.match(/[a-z]/)) {
            return String.fromCharCode(((char.charCodeAt(0) - 97 - (key[i].toLowerCase().charCodeAt(0) - 97) + 26) % 26) + 97);
        } else {
            return char;
        }
    }).join('');
}


function railFenceDecrypt(cipherText, numRails = 2) {
    let railLengths = Array(numRails).fill(0);
    let dir = 1, row = 0;

    for (let i = 0; i < cipherText.length; i++) {
        railLengths[row]++;
        row += dir;
        if (row === 0 || row === numRails - 1) dir *= -1;
    }

    
    let rails = [];
    let index = 0;
    for (let len of railLengths) {
        rails.push(cipherText.slice(index, index + len).split(''));
        index += len;
    }

    
    let result = '';
    row = 0;
    dir = 1;
    for (let i = 0; i < cipherText.length; i++) {
        result += rails[row].shift();
        row += dir;
        if (row === 0 || row === numRails - 1) dir *= -1;
    }

    return result;
}

function columnarDecrypt(cipherText, key = 'key') {
    const numCols = key.length;
    const numRows = Math.ceil(cipherText.length / numCols);
    const sortedKey = key.split('').map((k, i) => ({ k, i })).sort((a, b) => a.k.localeCompare(b.k));

    
    let cols = Array(numCols).fill('');
    let start = 0;
    for (let {i} of sortedKey) {
        cols[i] = cipherText.slice(start, start + numRows).split('');
        start += numRows;
    }

    
    let result = '';
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            if (cols[c][r]) result += cols[c][r];
        }
    }

    return result.replace(/X+$/,''); 
}


function modInverse(a, m) {
    a = ((a % m) + m) % m;
    for (let x = 1; x < m; x++) if ((a * x) % m === 1) return x;
    return null;
}

function hillDecrypt(cipherText, keyMatrix = defaultHillKeyMatrix) {
    cipherText = cipherText.toUpperCase().replace(/[^A-Z]/g, '');
    if (cipherText.length % 2 !== 0) cipherText += 'X';

    const det = keyMatrix[0][0]*keyMatrix[1][1] - keyMatrix[0][1]*keyMatrix[1][0];
    const detInv = modInverse(det, 26);
    if (!detInv) throw new Error("Key matrix is not invertible modulo 26");

    const invMatrix = [
        [( keyMatrix[1][1] * detInv) % 26, (-keyMatrix[0][1] * detInv + 26) % 26],
        [(-keyMatrix[1][0] * detInv + 26) % 26, ( keyMatrix[0][0] * detInv) % 26]
    ];

    let result = '';
    for (let i = 0; i < cipherText.length; i += 2) {
        let pair = [cipherText.charCodeAt(i)-65, cipherText.charCodeAt(i+1)-65];
        let decryptedPair = [
            (invMatrix[0][0]*pair[0] + invMatrix[0][1]*pair[1]) % 26,
            (invMatrix[1][0]*pair[0] + invMatrix[1][1]*pair[1]) % 26
        ];
        result += String.fromCharCode(decryptedPair[0]+65) + String.fromCharCode(decryptedPair[1]+65);
    }
    return result;
}

module.exports = {
    caesarDecrypt,
    vigenereDecrypt,
    railFenceDecrypt,
    columnarDecrypt,
    hillDecrypt
};
