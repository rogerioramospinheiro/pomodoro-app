const express = require('express');
const path = require('path');

const publicPath = path.join(__dirname, '..', 'public');

const port = process.env.PORT || 3001;

const app = express();

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Pomodoro is up and running');
    }
})