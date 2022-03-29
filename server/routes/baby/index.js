const express = require('express');
const router = express.Router();
const security = require('../../utils/security');
const utils = require('../../utils/utils');
const { LogTypes, users, logs, babies, parentBabies } = require('../../utils/mock');

module.exports = (db) => {

router.get('/', (req, res) => {
    //console.log("req session for security:", req.session);
    const parent = security.getParentFromSession(req);
    if (!parent) {
        security.showParentInvalid(res);
        return;
    }
    const babiesToReturn = [];

    db.query('SELECT baby.id, baby.first_name, baby.last_name, baby.date_of_birth, baby.born_at, baby.picture_url FROM baby INNER JOIN parent ON parentId = parent.id AND parent.id = $1', [parent.id])
        .then((results) => {
            results.rows.forEach(babyData => {
                console.log(babyData)
                const baby = babyData
                babiesToReturn.push(baby)
            })
            res.status(200).json(babiesToReturn);
        })
        .catch((error) => console.log(error));
});

router.get('/:baby_id', (req, res) => {
    const parent = security.getParentFromSession(req);
    if (!parent) {
        security.showParentInvalid(res);
        return;
    }

    db.query('SELECT * FROM baby WHERE id = $1', [req.params.baby_id])
    .then((results) => {
        console.log("MADE IT2")
        console.log(req.params)
        const baby = results.rows[0]
        console.log(baby)

        res.status(200).json(baby);
    })
    
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
        date_of_birth: new Date(req.body.date_of_birth),
        born_at: req.body.birth_location,
        picture_url: req.body.picture_url
    }
    db.query('INSERT INTO baby (first_name, last_name, date_of_birth, born_at, picture_url, parentId) VALUES ($1, $2, $3, $4, $5, $6)', 
        [babyData.first_name, babyData.last_name, babyData.date_of_birth, babyData.born_at, babyData.picture_url, parent.id]  )
        .then((res) => {console.log(res)})
        .catch((error) => console.log(error));

    const parentBabyData = {
        id: utils.getNewId(Object.keys(parentBabies)),
        parent_id: parent.id,
        baby_id: babyData.id
    }
    babies[babyData.id] = babyData;
    parentBabies[parentBabyData.id] = parentBabyData;
    utils.show201SuccessMessage(res, babyData);
});
return router; 
};

// module.exports = router;