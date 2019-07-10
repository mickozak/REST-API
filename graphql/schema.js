const {buildSchema} = require('graphql');


//After schema is not ":"

module.exports = buildSchema(`
    type TestData {
        text: String!
        views: Int!
    }
    type RootQuery {
        hello: TestData!
    }
    schema {
        query: RootQuery
    }
`);