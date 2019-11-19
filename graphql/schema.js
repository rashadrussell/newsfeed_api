const {buildSchema} = require("graphql");

const EntrySchema = buildSchema(`
    scalar Date

    enum orderBy {
        date_ASC
        date_DESC
        popularity_ASC
        popularity_DESC
    }

    enum filters {
        all
        trending
        open
        completed
    }

    type Author {
        name: String
        picture: String
        score: Float
    }

    type Entry {
        author: Author
        popularity: Float
        isTrending: Boolean
        date: Date
        title: String
        description: String
        numComments: Int
        thumbnail: String
        codeSubmissionTotal: Int
        pledgeTotal: Float
        pledgeGoal: Float
        pledgerCount: Int
        status: Int
    }

    type Feed {
        entries: [Entry]
        count: Int
        limit: Int
        hasMore: Boolean
    }

    type Query {
        getEntries(
            limit: Int = 5
            page: Int = 0
            orderBy: orderBy
            filter: filters
        ): Feed
    }
`);

module.exports.EntrySchema = EntrySchema;
