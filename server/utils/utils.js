const parseIntOrUndefined = function(supposeInt) {
    if (supposeInt && !isNaN(supposeInt)) {
        return parseInt(supposeInt);
    } else {
        return undefined;
    }
}

const getNewId = function(keys) {
    let highestIdFound = 0;
    keys.forEach(key => {
        if (key > highestIdFound) {
            highestIdFound = key;
        }
    });
    return parseInt(highestIdFound) + 1;
}

const show201SuccessMessage = function(res, optionalObject) {
    const responseObj = { "message": "Success" };
    if (optionalObject) {
        responseObj["object"] = optionalObject;
    }
    res.status(201).json(responseObj);
}

module.exports = { parseIntOrUndefined, show201SuccessMessage, getNewId }