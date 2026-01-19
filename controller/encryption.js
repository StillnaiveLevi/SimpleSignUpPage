function encryption(text, rails = 2, minLength = 0, filler = 'X') {
    if (rails <= 1) return text;

   
    if (text.length < minLength) {
        text += filler.repeat(minLength - text.length);
    }

    let fence = Array.from({ length: rails }, () => []);
    let rail = 0;
    let direction = 1;

    for (let char of text) {
        fence[rail].push(char);
        rail += direction;

        if (rail === rails - 1 || rail === 0) {
            direction *= -1;
        }
    }

    return fence.flat().join('');
}


module.exports =encryption;
