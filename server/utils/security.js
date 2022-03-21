const mock = require('./mock');
const users = mock.users;
const parentBabies = mock.parentBabies;
const babies = mock.babies;
const logs = mock.logs

const isBabyYours = function(babyId, parentId) {
    let isBabyYours = false;
    if (babyId) {
        for (const id in parentBabies) {
            const parentBaby = parentBabies[id];
            if (parentBaby.parent_id === parentId && parentBaby.baby_id === babyId) {
                isBabyYours = true;
                break;
            }
        }
    }
    return isBabyYours;
}

const getParentFromSession = function(req) {
    const parent = req.session.user;
    if (parent && parent.id && parent.email) {
        return parent;
    }
    return undefined;
}

const areBasicLogPropertiesProvided = function(req) {
    if (req.body.event_type && req.body.event_datetime) {
        return true;
    } else {
        return false;
    }
}

const showBabyInvalid = function(res) {
    res.status(401).json({ message: "Unauthorized. Please provide valid baby id." });
}

const showParentInvalid = function(res) {
    res.status(401).json({ message: "Unauthorized. Please provide valid parent id." });
}

const showLogPropertiesRequired = function(res, properties) {
    res.status(400).json({ message: `Bad Request. The following 'Log' propertie(s) required: ${properties}.` });
}

const showLogBasicPropertiesRequired = function(res) {
    showLogPropertiesRequired(res, ["event_type", "event_datetime"]);
}

const showBabyPropertiesRequired = function(res, properties) {
    res.status(400).json({ message: `Bad Request. The following 'Baby' propertie(s) required: ${properties}.` });
}

module.exports = { 
    isBabyYours, 
    getParentFromSession, 
    showBabyInvalid, 
    showParentInvalid, 
    areBasicLogPropertiesProvided,
    showLogPropertiesRequired,
    showLogBasicPropertiesRequired,
    showBabyPropertiesRequired
}