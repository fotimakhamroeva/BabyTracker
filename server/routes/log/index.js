const express = require('express');
const router = express.Router();
const mock = require('../../utils/mock');
const users = mock.users;
const parentBabies = mock.parentBabies;
const babies = mock.babies;
const logs = mock.logs

router.get('/', (req, res) => {
    const user = req.session.user;
    const babyId = req.query.baby_id;
    if (babyId) {
        let babyFoundForParent = false;
        for (const id in parentBabies) {
            const parentBaby = parentBabies[id];
            if (parentBaby.parent_id === user.id && parentBaby.baby_id === parseInt(babyId)) {
                babyFoundForParent = true;
                break;
            }
        }
        if (!babyFoundForParent) {
            res.status(401).json({ message: "Unauthorized. This baby does not belong to you." });
            return;
        }
    }
    if (user && user.id && user.email) {
        const logsToReturn = [];
        for (const id in logs) {
            const log = logs[id];
            if (log.created_by === user.id) {
                let add = false;
                if (babyId) {
                    if (log.baby_id === parseInt(babyId)) {
                        add = true;
                    }
                } else {
                    add = true;
                }
                if (add) {
                    logsToReturn.push(log);
                }
            }
        }
        res.status(200).json(logsToReturn);
        return;
    }
    res.status(401).json({ message: "Unauthorized" });
});

router.post('/head', (req,res) => {
    // todo
});

module.exports = router;