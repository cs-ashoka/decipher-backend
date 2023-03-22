import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send(
        "Rooms<br>\
        <a href='/play/1'><button>Room 1</button></a>\
        <a href='/play/2'><button>Room 2</button></a>\
        <a href='/play/3'><button>Room 3</button></a>\
        <a href='/play/4'><button>Room 4</button></a>"
    )
})

export { router }