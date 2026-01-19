const { 
    caesarDecrypt, vigenereDecrypt, railFenceDecrypt, columnarDecrypt, hillDecrypt 
} = require('./decryption');

const {caesarEncrypt, vigenereEncrypt, railFenceEncrypt, columnarEncrypt, hillEncrypt} = require('./encryption')

const user = require('../model/users');

exports.loginForm = (req, res) => {
    res.render('login.ejs');
}

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const encryptedUsername = vigenereEncrypt(username);
        const encryptedPassword = hillEncrypt(password);

        const foundUser = await user.findOne({ username: encryptedUsername });
        if (!foundUser) {
            return res.json({ message: "User not found" });
        }

        if (encryptedPassword !== foundUser.password) {
            return res.json({ message: "Incorrect password" });
        }

        const decryptedUser = {
            fullname: caesarDecrypt(foundUser.fullname),
            username: vigenereDecrypt(foundUser.username),
            email: railFenceDecrypt(foundUser.email),
            phone: columnarDecrypt(foundUser.phone)
        };

        res.json({ message: "Login successful", user: decryptedUser });

    } catch (err) {
        res.json({ message: err.message });
    }
};

