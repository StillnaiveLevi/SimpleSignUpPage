function encryption(password, rails = 2) {
    if (rails <= 1) return password;

   
    while (password.length < rails) {
        password += 'X';
    }

   
    let fence = Array.from({ length: rails }, () => []);
    let rail = 0;
    let direction = 1; 

   
    for (let char of password) {
        fence[rail].push(char);
        rail += direction;

       
        if (rail === rails - 1 || rail === 0) {
            direction *= -1;
        }
    }

    
    return fence.flat().join('');
}

module.exports = encryption;