const db = require("../database/db")
const bcrypt = require("bcrypt");

async function signup(req, res) {

    const { username, password } = req.body;
    if (!username || !password) {
    return res.status(400).json({
        message: "All fields are required"
    });
    }
    try {
    const [existingUser] = await db.query(`SELECT * FROM users WHERE username = ?`, [username]);
    if (existingUser.length > 0) {
    return res.status(409).json({
        message: "User already exists"
    })};
    const hashedPassword = await bcrypt.hash(password, 10);
    const [user] = await db.query(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword]);
    res.status(201).json({
        message: "User created successfully",
        id: user.insertId
    });
    
    } catch (error) {
    console.error("Error checking user:", error);
    return res.status(500).json({
    error: "Internal Server Error"
    });
    }}

async function login(req , res) {
    const {username , password} = req.body;
    if(!username || !password) {
        return res.status(400).json({
            message: "All fields are required"
        });
    }
    try {
        const [user] = await db.query(`SELECT * FROM users WHERE username = ?`, [username]);
        if (user.length === 0) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }
        req.session.userId = user[0].id;
        console.log("LOGIN SESSION ID:", req.sessionID);
        console.log(req.session);
        res.status(200).json({
            message: "User logged in successfully",
})} catch (error) {
    console.error("Error checking user:", error);
    return res.status(500).json({
    error: "Internal Server Error"
    });
    }
}
async function logout(err) {
    
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: "Logout failed"
            });
        }
        return res.status(200).json({
            message: "Logged out"
        });
    
    });
}
module.exports = {
    signup,
    login,
    logout
}