import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(
        "Instructions<br>\
        <a href='/play'><button>Start</button></a>"
    )
})

export { router }