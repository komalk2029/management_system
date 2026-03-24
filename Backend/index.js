const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 8080;

const filePath = path.join(__dirname, "users.json");

app.use(express.json());
app.use(cors());

app.post("/signup", (req, res) => {
    const { name, email, pass } = req.body;

    let users = [];

    if (fs.existsSync(filePath)) {
        users = JSON.parse(fs.readFileSync(filePath));
    } else {
        fs.writeFileSync(filePath, "[]");
    }

    const userExist = users.find(user => user.email === email);

    if (userExist) {
        return res.json({
            success: false,
            message: "User already exists"
        });
    }

    users.push({
        name,
        email,
        password: pass
    });

    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    res.json({
        success: true,
        message: "Signup successful"
    });
});

app.post("/login", (req, res) => {
    const { email, pass } = req.body;

    let users = [];

    if (fs.existsSync(filePath)) {
        users = JSON.parse(fs.readFileSync(filePath));
    } else {
        fs.writeFileSync(filePath, "[]");
    }

    const user = users.find(
        u => u.email === email && u.password === pass
    );

    if (!user) {
        return res.json({
            success: false,
            message: "Invalid email or password"
        });
    }

    res.json({
        success: true,
        message: "Login successful"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});