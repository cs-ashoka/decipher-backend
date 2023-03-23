import express from 'express';
import bodyParser from 'body-parser';

import { Log } from '../models/Log.js';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.get('/:id/:cd', (req, res) => {
    const id = req.params.id
    const cd = req.params.cd
    
    res.send(
        `Room ${id} Challenge ${cd}<br>\
        <form method="post" action="/play/${id}/${cd}">\
            <input type="text" name="answer" id="answer" placeholder="Answer">\
            <input type="submit" value="Submit" id="btn_submit">\
        </form>`
    )
})
    
router.post('/:id/:cd', async (req, res) => {
    const id = req.params.id
    const cd = req.params.cd
    const ans = req.body.answer
    const log = new Log({
        username: "testuser",
        answer: ans,
        roomNumber: id,
        challengeNumber: cd,
        time: new Date()
    });

    await log.save()
    res.redirect(`/play/${id}`)
})

export { router }