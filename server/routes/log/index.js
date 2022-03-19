const express = require('express');
const router = express.Router();
const security = require('../../utils/security');
const utils = require('../../utils/utils');
const mock = require('../../utils/mock');
const users = mock.users;
const parentBabies = mock.parentBabies;
const babies = mock.babies;
const logs = mock.logs

router.get('/', (req, res) => {
    // todo filter by date (year and month)
    const parent = security.getParentFromSession(req);
    if (!parent) {
        security.showParentInvalid(res);
        return;
    }
    const babyId = utils.parseIntOrUndefined(req.query.baby_id);
    if (babyId) {
        const isBabyYours = security.isBabyYours(babyId, parent.id);
        if (!isBabyYours) {
            security.showBabyInvalid(res);
            return;
        }
    }
    const logsToReturn = [];
    for (const id in logs) {
        const log = logs[id];
        if (log.created_by === parent.id) {
            let add = false;
            if (babyId) {
                if (log.baby_id === babyId) {
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
});

/* 
Request Body:
{
    "event_type": "head",
    "event_datetime": 1647676171,
    "circumference": 35,
    "unit": "cm"
}
*/
router.post('/:baby_id/head', (req,res) => {
    const parent = security.getParentFromSession(req);
    if (!parent) {
        security.showParentInvalid(res);
        return;
    }
    const babyId = utils.parseIntOrUndefined(req.params.baby_id);
    if (!babyId || !security.isBabyYours(babyId, parent.id)) {
        security.showBabyInvalid(res);
        return;
    }
    const areBasicPropertiesProvided = security.areBasicLogPropertiesProvided(req);
    if (!areBasicPropertiesProvided) {
        security.showLogBasicPropertiesRequired(res);
        return;
    }
    if (!req.body.circumference || !req.body.unit) {
        security.showLogPropertiesRequired(res, ["circumference", "unit"]);
        return;
    }
    const logData = {
        id: utils.getNewId(Object.keys(logs)),
        event_type: req.body.event_type,
        event_detail: {
            circumference: req.body.circumference,
            unit: req.body.unit
        },
        event_datetime: req.body.event_datetime,
        baby_id: babyId,
        created_by: parent.id
    }
    logs[logData.id] = logData;
    utils.show201SuccessMessage(res, logData);
});


/* 
Request Body:
{
    "event_type": "height",
    "event_datetime": 1647676171,
    "height": 56,
    "unit": "cm"
}
*/
router.post('/:baby_id/height', (req,res) => {
    const parent = security.getParentFromSession(req);
    if (!parent) {
        security.showParentInvalid(res);
        return;
    }
    const babyId = utils.parseIntOrUndefined(req.params.baby_id);
    if (!babyId || !security.isBabyYours(babyId, parent.id)) {
        security.showBabyInvalid(res);
        return;
    }
    const areBasicPropertiesProvided = security.areBasicLogPropertiesProvided(req);
    if (!areBasicPropertiesProvided) {
        security.showLogBasicPropertiesRequired(res);
        return;
    }
    if (!req.body.height || !req.body.unit) {
        security.showLogPropertiesRequired(res, ["height", "unit"]);
        return;
    }
    const logData = {
        id: utils.getNewId(Object.keys(logs)),
        event_type: req.body.event_type,
        event_detail: {
            height: req.body.height,
            unit: req.body.unit
        },
        event_datetime: req.body.event_datetime,
        baby_id: babyId,
        created_by: parent.id
    }
    logs[logData.id] = logData;
    utils.show201SuccessMessage(res, logData);
});

module.exports = router;