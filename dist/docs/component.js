"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compo = void 0;
var compo = {
    components: {
        schemas: {
            // User model
            User: {
                type: "object",
                properties: {
                    id: {
                        type: "string",
                        description: "User identification number",
                        example: "zj145g2we66wegwre5eg", // example of an id
                    },
                    firstname: {
                        type: "string",
                        description: "User's firstname",
                        example: "Kwame", // example of a firstname
                    },
                    lastname: {
                        type: "string",
                        description: "User's lastname",
                        example: "Prince", // example of a lastname
                    },
                    email: {
                        type: "string",
                        description: "User's email",
                        example: "Prince@gmail.com", // example of a email
                    },
                    status: {
                        type: "string",
                        description: "User's status between (user and health)",
                        example: "user", // example of a status
                    },
                    password: {
                        type: "string",
                        description: "user's password",
                        example: "user", // example of a password
                    },
                    pic: {
                        type: "string",
                        description: "a pic in png of jpg about you",
                        example: "", // example of a pic
                    },
                    work: {
                        type: "string",
                        description: "place of work if the status is health instead of defaut user",
                        example: "Tema General Hospital", // example of a work
                    },
                    prefession: {
                        type: "string",
                        description: "your job at your work place if your status is health instead of default user",
                        example: "Medical Doctor", // example of a prefession
                    },
                    description: {
                        type: "string",
                        description: "a bio of yourself if your status is health instead of default user",
                        example: "Im Kwame Prince, 55 years old medical doctor at the Tema General hopital. i had my basic school education at lorem senior high school", // example of a description
                    }
                },
            },
            // User input model
            UserInput: {
                type: "object",
                properties: {
                    firstname: {
                        type: "string",
                        description: "User's firstname",
                        example: "Kwame",
                        required: true
                    },
                    lastname: {
                        type: "string",
                        description: "User's lastname",
                        example: "Prince",
                        required: true
                    },
                    email: {
                        type: "string",
                        description: "User's email",
                        example: "Prince@gmail.com",
                        required: true
                    },
                    status: {
                        type: "string",
                        description: "User's status between (user and health)",
                        example: "user", // example of a status
                    },
                    password: {
                        type: "string",
                        description: "user's password",
                        example: "user",
                        required: true
                    },
                    pic: {
                        type: "string",
                        description: "a pic in png of jpg about you",
                        example: "",
                        required: true
                    },
                    work: {
                        type: "string",
                        description: "place of work if the status is health instead of defaut user",
                        example: "Tema General Hospital", // example of a work
                    },
                    prefession: {
                        type: "string",
                        description: "your job at your work place if your status is health instead of default user",
                        example: "Medical Doctor", // example of a prefession
                    },
                    description: {
                        type: "string",
                        description: "a bio of yourself if your status is health instead of default user",
                        example: "Im Kwame Prince, 55 years old medical doctor at the Tema General hopital. i had my basic school education at lorem senior high school", // example of a description
                    }
                },
            },
            // error model
            Error: {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                        description: "Error message",
                        example: "User already exist", // example of an error message
                    },
                    internal_code: {
                        type: "string",
                        description: "Error internal code",
                        example: "Invalid parameters", // example of an error internal code
                    },
                },
            },
        },
    },
};
exports.compo = compo;
//# sourceMappingURL=component.js.map