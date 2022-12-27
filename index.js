const express = require('express')
const path = require('path');
const authRouter = require('./routes/auth.router')
const ticketsRouter = require('./routes/tickets.router')

const app = express()
const port = 3001


// const merchant_model = require('./models/merchant_model')

app.use(express.json())
app.use(express.static(path.join(__dirname, 'build')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${port}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization');
    next();
});

app.use("/auth", authRouter)
app.use("/api", ticketsRouter)

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})
