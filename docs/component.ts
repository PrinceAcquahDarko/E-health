const compo = {
    components: {
        schemas: {
          
          // User model
          User: {
            type: "object", // data type
            properties: {
              id: {
                type: "string", // data-type
                description: "User identification number", // desc
                example: "zj145g2we66wegwre5eg", // example of an id
              },
              firstname: {
                type: "string", // data-type
                description: "User's firstname", // desc
                example: "Kwame", // example of a firstname
              },
              lastname: {
                type: "string", // data-type
                description: "User's lastname", // desc
                example: "Prince", // example of a lastname
              },
              email: {
                type: "string", // data-type
                description: "User's email", // desc
                example: "Prince@gmail.com", // example of a email
              },
              status: {
                type: "string", // data-type
                description: "User's status between (user and health)", // desc
                example: "user", // example of a status
              },
              password: {
                type: "string", // data-type
                description: "user's password", // desc
                example: "user", // example of a password
              },
              pic: {
                type: "string", // data-type
                description: "a pic in png of jpg about you", // desc
                example: "", // example of a pic
              },
              work: {
                type: "string", // data-type
                description: "place of work if the status is health instead of defaut user", // desc
                example: "Tema General Hospital", // example of a work
              },
              prefession: {
                type: "string", // data-type
                description: "your job at your work place if your status is health instead of default user", // desc
                example: "Medical Doctor", // example of a prefession
              },
              description: {
                type: "string", // data-type
                description: "a bio of yourself if your status is health instead of default user", // desc
                example: "Im Kwame Prince, 55 years old medical doctor at the Tema General hopital. i had my basic school education at lorem senior high school", // example of a description
              }
            
            },
          },
          // User input model
          UserInput: {
            type: "object", // data type
            properties: {
                firstname: {
                    type: "string", // data-type
                    description: "User's firstname", // desc
                    example: "Kwame", // example of a firstname
                    required: true
                  },
                  lastname: {
                    type: "string", // data-type
                    description: "User's lastname", // desc
                    example: "Prince", // example of a lastname
                    required: true

                  },
                  email: {
                    type: "string", // data-type
                    description: "User's email", // desc
                    example: "Prince@gmail.com", // example of a email
                    required: true

                  },
                  status: {
                    type: "string", // data-type
                    description: "User's status between (user and health)", // desc
                    example: "user", // example of a status
                  },
                  password: {
                    type: "string", // data-type
                    description: "user's password", // desc
                    example: "user", // example of a password
                    required: true

                  },
                  pic: {
                    type: "string", // data-type
                    description: "a pic in png of jpg about you", // desc
                    example: "", // example of a pic
                    required: true

                  },
                  work: {
                    type: "string", // data-type
                    description: "place of work if the status is health instead of defaut user", // desc
                    example: "Tema General Hospital", // example of a work
                  },
                  prefession: {
                    type: "string", // data-type
                    description: "your job at your work place if your status is health instead of default user", // desc
                    example: "Medical Doctor", // example of a prefession
                  },
                  description: {
                    type: "string", // data-type
                    description: "a bio of yourself if your status is health instead of default user", // desc
                    example: "Im Kwame Prince, 55 years old medical doctor at the Tema General hopital. i had my basic school education at lorem senior high school", // example of a description
                  }
            },
          },
          // error model
          Error: {
            type: "object", //data type
            properties: {
              message: {
                type: "string", // data type
                description: "Error message", // desc
                example: "User already exist", // example of an error message
              },
              internal_code: {
                type: "string", // data type
                description: "Error internal code", // desc
                example: "Invalid parameters", // example of an error internal code
              },
            },
          },
        },
      },
}


export {compo}