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

const showBabyInvalid = function(res) {
    res.status(401).json({ message: "Unauthorized. Please provide valid baby id." });
}

const showParentInvalid = function(res) {
    res.status(401).json({ message: "Unauthorized. Please provide valid parent id." });
}

module.exports = { isBabyYours, getParentFromSession, showBabyInvalid, showParentInvalid }