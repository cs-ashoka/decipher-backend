import express from 'express';
import bodyParser from 'body-parser';

import { Log } from '../models/Log.js';
import { Challenge } from '../models/Challenge.js';
import { User } from '../models/User.js';
import isAuthenticated from '../config/middleware.js';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.get('/:id/:cd', isAuthenticated, async (req, res) => {
    const id = req.params.id
    const cd = req.params.cd

    const challenge = await Challenge.findOne({ roomNumber: id, challengeNumber: cd })    
    const user = await User.findOne({user_id: req.session.passport.user})

    user.currentRoom = id
    user.currentChallenge = cd
    await user.save()
    res.send({ 
        question: challenge.question, 
        roomNumber: challenge.roomNumber, 
        challengeNumber: challenge.challengeNumber
    })
})
    
router.post('/:id/:cd', isAuthenticated, async (req, res) => {
    const id = req.params.id
    const cd = req.params.cd
    const ans = req.body.answer.toLowerCase()

    const challenge = await Challenge.findOne({ roomNumber: id, challengeNumber: cd })
    const user = await User.findOne({user_id: req.session.passport.user})

    const log = new Log({
        username: user.username,
        answer: ans,
        roomNumber: id,
        challengeNumber: cd,
        time: new Date()
    });

    await log.save()
    const correct = ans === challenge.answer

    if (correct) {
        challenge.nSolvers = challenge.nSolvers + 1
        await challenge.save()

        user.currentRoom = 0
        user.currentChallenge = 0
        user.challengesSolved = [...user.challengesSolved, [id, cd]]
        user.lastChallengeSolveTime = new Date()
        await user.save()
        
        res.send(correct)
    } else {
        res.send(correct)
    }

})

export { router }