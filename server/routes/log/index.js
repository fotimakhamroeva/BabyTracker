const express = require('express');
const router = express.Router();
const security = require('../../utils/security');
const utils = require('../../utils/utils');
const { LogTypes, users, logs, babies, parentBabies } = require('../../utils/mock');

module.exports = (db) => {


router.get('/', (req, res) => {
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
    const dateFilter = req.query.date_filter;
    
    const logsToReturn = [];
    for (const id in logs) {
        const log = logs[id];
        if (log.created_by === parent.id) {
            let add = false;
            if (dateFilter && babyId) {
                if (utils.doesLogMatchDateFilter(log, dateFilter) && log.baby_id === babyId) {
                    add = true;
                }
            } else if (babyId) {
                if (log.baby_id === babyId) {
                    add = true;
                }
            } else if (dateFilter) {
                if (utils.doesLogMatchDateFilter(log, dateFilter)) {
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

// router.get('/:baby_id', (req, res) => {
//     if (babyId) {
//         const isBabyYours = security.isBabyYours(babyId, parent.id);
//         if (!isBabyYours) {
//             security.showBabyInvalid(res);
//             return;
//         }
//     }
//     const dateFilter = req.query.date_filter;});

/* 
Example for Head size:
{
    "event_type": "head",
    "event_datetime": 1647676171,
    "event_amount": 35, // circumference
    "event_unit": "cm"
}
Example for Height:
{
    "event_type": "height",
    "event_datetime": 1647676171,
    "event_amount": 56, // height
    "event_unit": "cm"
}
Example for Weight:
{
    "event_type": "weight",
    "event_datetime": 1647676171,
    "event_amount": 3.5, // weight
    "event_unit": "kg"
}
Example for Temperature:
{
    "event_type": "temperature",
    "event_datetime": 1647676171,
    "event_amount": 36.5, // temperature
    "event_unit": "C"
}
*/
router.post('/:baby_id/measurement', (req,res) => {
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
    const areBasicPropertiesProvided = security.areBasicMeasurementLogPropertiesProvided(req);
    if (!areBasicPropertiesProvided) {
        security.showMeasurementLogBasicPropertiesRequired(res);
        return;
    }
    const logData = {
        id: utils.getNewId(Object.keys(logs)),
        event_type: req.body.event_type,
        event_amount: req.body.event_amount,
        event_unit: req.body.event_unit,
        event_datetime: req.body.event_datetime,
        babyID: babyId,
        createdBY: parent.id
    }
    db.query('INSERT INTO log (event_type, event_amount, event_unit, event_datetime, babyID, createdBY ) VALUES ($1, $2, $3, $4, $5, $6) returning *', 
    [logData.event_type, logData.event_amount, logData.event_unit, logData.event_datetime, logData.babyID, logData.createdBY]  )
    .then((res) => {console.log(res)})
    .catch((error) => console.log(error));

    logs[logData.id] = logData;
    utils.show201SuccessMessage(res, logData);
});


/* 
Example for Medicine:
{
    "event_type": "medicine",
    "event_datetime": 1647676171,
    "event_name": "Tylenol Syrup",
    "event_detail": "5 mg"
}
Example for Vaccine:
{
    "event_type": "vaccine",
    "event_datetime": 1647676171,
    "event_name": "4 month-vaccine",
    "event_detail": "Diphtheria, tetanus, whooping cough, Haemophilus influenzae"
}
Example for Appointment:
{
    "event_type": "appointment",
    "event_datetime": 1647676171,
    "event_name": "3 months with Dr. Mackyla"
    "event_detail": "33 Testers Drive, London UK",
}
*/
router.post('/:baby_id/event', (req,res) => {
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
    const areBasicPropertiesProvided = security.areBasicEventLogPropertiesProvided(req);
    if (!areBasicPropertiesProvided) {
        security.showEventLogBasicPropertiesRequired(res);
        return;
    }
    const logData = {
        id: utils.getNewId(Object.keys(logs)),
        event_type: req.body.event_type,
        event_name: req.body.event_name,
        event_detail: req.body.event_detail,
        event_datetime: req.body.event_datetime,
        baby_id: babyId,
        created_by: parent.id
    }
    logs[logData.id] = logData;
    utils.show201SuccessMessage(res, logData);
});
return router; 
};

// module.exports = router;