import express from 'express';

const router = express.Router();

router.get('/:id/:cd', (req, res) => {
    const id = req.params.id
    const cd = req.params.cd
    
    res.send(
        `Room ${id} Challenge ${cd}<br>\
        <form method="post" action="/play/${id}/${cd}">
            <input type="text" name="answer" id="answer" placeholder="Answer">
            <input type="submit" value="Submit" id="btn_submit">
        </form>`
        )
    })
    
router.post('/:id/:cd', (req, res) => {
    const id = req.params.id
    res.redirect(`/play/${id}`)
})

export { router }