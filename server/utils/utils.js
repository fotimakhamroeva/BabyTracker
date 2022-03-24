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

const doesLogMatchDateFilter = function(log, dateFilter) {
    const eventDate = new Date(log.event_datetime * 1000);
    const filterDate = new Date(dateFilter);
    //console.log("eventDate => " + eventDate.toString());
    //console.log("filterDate => " + dateFilter + " (RAW)");
    //console.log("filterDate => " + filterDate.toString());
    if (filterDate.getFullYear() === eventDate.getFullYear()
            && filterDate.getMonth() === eventDate.getMonth()) {
        return true;
    }
    return false;
}

module.exports = { parseIntOrUndefined, show201SuccessMessage, getNewId, doesLogMatchDateFilter }