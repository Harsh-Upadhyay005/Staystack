const express = require('express');
const app = express();

const ExpressError = require('./ExpressError');

const CheckToken = (req, res, next) => {
    const token = req.query.token;
    if (token === 'secret') {
        return next();
    }
    throw new ExpressError(401, 'Invalid Token');
};

app.get('/api', CheckToken, (req, res) => {
    res.send('You have accessed a protected route!');
});


app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.use (( err,req, res, next) => {
    const { status = 500, message = 'Something went wrong' } = err;
    res.status(status).send(message);
})



app.listen(3000, () => {
    console.log('Server running on port 3000');
});

