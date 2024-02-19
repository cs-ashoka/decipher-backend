import express from 'express';
import bodyParser from 'body-parser';

import { Log } from '../models/Log.js';
import { Challenge } from '../models/Challenge.js';
import { User } from '../models/User.js';
import isAuthenticated from '../config/middleware.js';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.post('/:id', isAuthenticated, async (req, res) => {
    const id = req.params.id
    if (id != 1 && id != 2 && id != 3) return res.sendStatus(403)

    const user = await User.findOne({user_id: req.body.auth})
    
    let repeat = false
    
    let maxSolved = 0

    user.challengesSolved.filter((x) => (x[0] == id)).forEach((x) => {
        if (parseInt(x[1]) > maxSolved) {
            maxSolved = parseInt(x[1])
        }
    });
    
    // if (repeat) return res.sendStatus(403)

    user.currentRoom = id
    user.currentChallenge = maxSolved

    const resChallenge = await Challenge.findOne({ roomNumber: id, challengeNumber: maxSolved })
    await user.save()
    res.send({ 
        question: resChallenge.question, 
        roomNumber: resChallenge.roomNumber, 
        challengeNumber: resChallenge.challengeNumber
    })
})
    
router.post('/:id/solve', isAuthenticated, async (req, res) => {
    const id = req.params.id
    const ans = req.body.answer.toLowerCase().trim().split(' ').join('');
    const cd = req.body.challengeNumber

    const challenge = await Challenge.findOne({ roomNumber: id, challengeNumber: cd })
    const user = await User.findOne({user_id: req.body.auth})

    const log = new Log({
        username: user.username,
        answer: ans,
        roomNumber: id,
        challengeNumber: cd,
        time: new Date()
    });

    await log.save()

    const correct = ans == challenge.answer.toLowerCase().trim().split(' ').join('');

    if (correct) {
        challenge.nSolvers = challenge.nSolvers + 1
        await challenge.save()

        user.currentRoom = 0
        user.currentChallenge = 0
        user.challengesSolved = [...user.challengesSolved, [id, cd]]
        user.lastChallengeSolveTime = new Date()
        await user.save()
        
        res.status(201).send(correct)
    } else {
        res.status(201).send(correct)
    }

})

export { router }