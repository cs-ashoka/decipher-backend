import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(
        "Decipher<br>\
        <a href='/home'><button>Auth</button></a>"
    )
})

export { router }