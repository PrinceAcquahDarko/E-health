

  const Users = {
    get: {
        tags: ["User operations"], // operation's tag.
        description: "Get Users", // operation's desc.
        operationId: "getUsers", // unique operation id.
        parameters: [], // expected params.
        // expected responses
        responses: {
          // response code
          200: {
            description: "Users were obtained", // response desc.
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
}


export {Users}