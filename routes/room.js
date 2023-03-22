import express from 'express';

const router = express.Router();

router.get('/:id', (req, res) => {
    const id = req.params.id

    res.send(
        `Challenges<br>\
        <a href='/play/${id}/1'><button>Challenge 1</button></a>\
        <a href='/play/${id}/2'><button>Challenge 2</button></a>\
        <a href='/play/${id}/3'><button>Challenge 3</button></a>\
        <a href='/play/${id}/4'><button>Challenge 4</button></a>`
    )
})

export { router }