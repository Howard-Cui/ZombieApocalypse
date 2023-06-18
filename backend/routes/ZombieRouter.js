const express = require('express');
const ZombieService = require('../services/ZombieService');

const router = express.Router();

router.post('/direction', (req, res, next) => {

    const payload = req.body.body;

    payload.zombie.x = Number.parseInt(payload.zombie.x);
    payload.zombie.y = Number.parseInt(payload.zombie.y);

    for (let i = 0; i < payload.creature.length; i ++) {
        payload.creature[i].x = Number.parseInt(payload.creature[i].x);
        payload.creature[i].y = Number.parseInt(payload.creature[i].y);
    }

    // console.log(payload);
    res.send(ZombieService.getNextPosition(payload));
    next();
})

module.exports = router;