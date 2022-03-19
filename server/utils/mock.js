const LogTypes = {
    HEAD: "head",
    HEIGHT: "height",
    WEIGHT: "weight",
    TEMPERATURE: "temperature",
    MEDICINE: "medicine",
    VACCINE: "vaccine",
    APPOINTMENT: "appointment"
}

const users = {
    "test1@gmail.com": {
        id: 1,
        email: "test1@gmail.com",
        password: "wwww",
        first_name: "Tester1",
        last_name: "Doe"
    },
    "test2@gmail.com": {
        id: 2,
        email: "test2@gmail.com",
        password: "wwww",
        first_name: "Tester2",
        last_name: "Doe"
    },
    "abc@gmail.com": {
        id: 3,
        email: "abc@gmail.com",
        password: "wwww",
        first_name: "Abc",
        last_name: "Doe"
    }
}

const babies = {
    1: {
        id: 1,
        name: "John Doe Jr."
    },
    2: {
        id: 2,
        name: "Bob Marley Jr."
    }
}

const parentBabies = {
    1: {
        id: 1,
        parent_id: 1,
        baby_id: 1
    },
    2: {
        id: 2,
        parent_id: 1,
        baby_id: 2
    }
}

const logs = {
    1: {
        id: 1,
        event_type: LogTypes.HEIGHT,
        event_detail: {
            height: 56,
            unit: "cm"
        },
        event_datetime: 1647676171,
        baby_id: 1,
        created_by: 1
    },
    2: {
        id: 2,
        event_type: LogTypes.HEIGHT,
        event_detail: {
            height: 60,
            unit: "cm"
        },
        event_datetime: 1650354571,
        baby_id: 1,
        created_by: 1
    },
    3: {
        id: 3,
        event_type: LogTypes.APPOINTMENT,
        event_detail: {
            location: "33 Testers Drive, London UK",
            detail: "3 months with Dr. Mackyla"
        },
        event_datetime: 1650354571,
        baby_id: 1,
        created_by: 1
    },
    4: {
        id: 4,
        event_type: LogTypes.MEDICINE,
        event_detail: {
            name: "4 month vaccine",
            detail: "Diphtheria, tetanus, whooping cough, Haemophilus influenzae"
        },
        event_datetime: 1647848971,
        baby_id: 2,
        created_by: 1
    },
    5: {
        id: 5,
        event_type: LogTypes.TEMPERATURE,
        event_detail: {
            temperature: 36.5,
            unit: "C"
        },
        event_datetime: 1647676171,
        baby_id: 1,
        created_by: 1
    }
}

module.exports = { LogTypes, users, logs, babies, parentBabies }