const express = require('express');
const router = express.Router();
const security = require('../../utils/security');
const utils = require('../../utils/utils');
const { LogTypes, users, logs, babies, parentBabies } = require('../../utils/mock');

router.get('/', (req, res) => {
    const parent = security.getParentFromSession(req);
    if (!parent) {
        security.showParentInvalid(res);
        return;
    }
    const babiesToReturn = [];
    const filteredParentBaby = Object.values(parentBabies).filter(parentBaby => parentBaby.parent_id === parent.id );
    filteredParentBaby.forEach(parentBaby => {
        const baby = babies[parentBaby.baby_id];
        if (baby) {
            babiesToReturn.push(baby);
        }
    });
    res.status(200).json(babiesToReturn);
});

/* 
Request Body:
{
    "first_name": "John Jr.",
    "last_name": "Doe",
    "date_of_birth": 1647676171,
    "birth_location": "Home",
    "picture_url": "https://images.freeimages.com/images/small-previews/e88/baby-1240460.jpg"
}
*/
router.post('/', (req,res) => {
    const parent = security.getParentFromSession(req);
    if (!parent) {
        security.showParentInvalid(res);
        return;
    }
    if (!req.body.first_name || !req.body.last_name || !req.body.date_of_birth) {
        security.showBabyPropertiesRequired(res, ["first_name", "last_name", "date_of_birth"]);
        return;
    }
    const babyData = {
        id: utils.getNewId(Object.keys(babies)),
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        date_of_birth: req.body.date_of_birth,
        birth_location: req.body.birth_location,
        picture_url: req.body.picture_url
    }
    const parentBabyData = {
        id: utils.getNewId(Object.keys(parentBabies)),
        parent_id: parent.id,
        baby_id: babyData.id
    }
    babies[babyData.id] = babyData;
    parentBabies[parentBabyData.id] = parentBabyData;
    utils.show201SuccessMessage(res, babyData);
});

module.exports = router;