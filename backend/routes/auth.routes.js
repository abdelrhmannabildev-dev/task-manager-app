const {
    signup,
    login,
    logout
} = require("../controllers/auth.controller");
console.log("Auth routes loaded");
module.exports = function (app) {
    app.post("/api/auth/signup", signup);
    app.post("/api/auth/login", login);
    app.post("/api/auth/logout", logout);
}; 