const express = require("express");
const app = express();
const session = require("express-session");
const cors=require("cors");

app.use(cors(
    {
        origin: "http://localhost:5500",
        credentials: true
    }
));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        sameSite: "lax",

    }
}));
app.get("/test", (req, res) => {
    console.log(req.session);
    res.json(req.session);
});
app.use(express.json());

require("./routes/tasks.routes")(app);
require("./routes/auth.routes")(app);

app.get("/", (req, res) => {
    res.send("Task Manager API Running");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
