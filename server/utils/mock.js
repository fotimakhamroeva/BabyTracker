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
        first_name: "John Jr.",
        last_name: "Doe",
        date_of_birth: 1647676171,
        birth_location: "Home",
        picture_url: "https://images.freeimages.com/images/small-previews/6ec/baby-1519154.jpg"
    },
    2: {
        id: 2,
        first_name: "Bob Jr.",
        last_name: "Marley",
        date_of_birth: 1647676171,
        birth_location: "Home",
        picture_url: "https://images.freeimages.com/images/small-previews/e88/baby-1240460.jpg"
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
        event_amount: 56,
        event_unit: "cm",
        event_datetime: 1647676171,
        baby_id: 1,
        created_by: 1
    },
    2: {
        id: 2,
        event_type: LogTypes.HEIGHT,
        event_amount: 60,
        event_unit: "cm",
        event_datetime: 1650354571,
        baby_id: 1,
        created_by: 1
    },
    3: {
        id: 3,
        event_type: LogTypes.APPOINTMENT,
        event_name: "3 months with Dr. Mackyla",
        event_detail: "33 Testers Drive, London UK",
        event_datetime: 1650354571,
        baby_id: 1,
        created_by: 1
    },
    4: {
        id: 4,
        event_type: LogTypes.VACCINE,
        event_name: "4 month vaccine",
        event_detail: "Diphtheria, tetanus, whooping cough, Haemophilus influenzae",
        event_datetime: 1647848971,
        baby_id: 2,
        created_by: 1
    },
    5: {
        id: 5,
        event_type: LogTypes.TEMPERATURE,
        event_amount: 36.5,
        event_unit: "C",
        event_datetime: 1647676171,
        baby_id: 1,
        created_by: 1
    },
    6: {
        id: 6,
        event_type: LogTypes.MEDICINE,
        event_name: "Tylenol Syrup",
        event_detail: "5 mg",
        event_datetime: 1647848971,
        baby_id: 2,
        created_by: 1
    },
    7: {
        id: 7,
        event_type: LogTypes.WEIGHT,
        event_amount: 20,
        event_unit: "lbs",
        event_datetime: 1650354571,
        baby_id: 1,
        created_by: 1
    },
    8: {
        id: 8,
        event_type: LogTypes.HEAD,
        event_amount: 23,
        event_unit: "cm",
        event_datetime: 1660354571,
        baby_id: 1,
        created_by: 1
    },
    9: {
        id: 9,
        event_type: LogTypes.WEIGHT,
        event_amount: 25,
        event_unit: "lbs",
        event_datetime: 1670354571,
        baby_id: 1,
        created_by: 1
    },
    10: {
        id: 10,
        event_type: LogTypes.HEAD,
        event_amount: 30,
        event_unit: "cm",
        event_datetime: 1680354571,
        baby_id: 1,
        created_by: 1
    },
    11: {
        id: 11,
        event_type: LogTypes.HEIGHT,
        event_amount: 63,
        event_unit: "cm",
        event_datetime: 1650354571,
        baby_id: 1,
        created_by: 1
    },
    12: {
        id: 12,
        event_type: LogTypes.WEIGHT,
        event_amount: 38,
        event_unit: "lbs",
        event_datetime: 1690354571,
        baby_id: 1,
        created_by: 1
    },
    13: {
        id: 13,
        event_type: LogTypes.HEAD,
        event_amount: 39,
        event_unit: "cm",
        event_datetime: 1700354571,
        baby_id: 1,
        created_by: 1
    },
}

module.exports = { LogTypes, users, logs, babies, parentBabies }