"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
var Users = {
    get: {
        tags: ["User operations"],
        description: "Get Users",
        operationId: "getUsers",
        parameters: [],
        // expected responses
        responses: {
            // response code
            200: {
                description: "Users were obtained",
                content: {
                    // content-type
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/User", // User model
                        },
                    },
                },
            },
        },
    },
};
exports.Users = Users;
//# sourceMappingURL=getUsers.js.map