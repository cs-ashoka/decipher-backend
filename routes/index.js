import express from 'express';
import bodyParser from 'body-parser';

const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.get('/', (req, res) => {
    res.send(
        `Auth<br>\
        <form method="post" action="/auth">\
            <input type="text" name="username" id="username" placeholder="Username">\
            <input type="text" name="password" id="password" placeholder="Password">\
            <input type="submit" value="Submit" id="btn_submit">\
        </form>`
    )
})

export { router }