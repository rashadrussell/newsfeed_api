const express = require('express');
const app = express();
const port = 8000;
const fs = require('fs');
const cors = require('cors');
const graphqlHTTP = require('express-graphql');

const {EntrySchema} = require('./graphql/schema');
const {
    filter,
    paginate,
    sort
} = require('./common/utils/processing');


app.use(cors());


const getEntries = ({filter: filterType, limit, page, orderBy}) => {
    return fs.promises.readFile('./data/entries.json')
        .then((data) => {
            let results = JSON.parse(data);

            if (filterType) {
                results = filter(results, filterType);
            }

            if (orderBy) {
                results = sort(results, orderBy);
            }

            let total = results.length;
            let offset = page * limit;
            let hasMoreEntries = (total - offset) > limit;

            results = paginate(results, limit, offset);

            let count = results.length;

            return {
                entries: results,
                count,
                limit,
                hasMore: hasMoreEntries
            };
        });
};



const rootValue = {
    getEntries
};

app.use('/api/v1/entries/', graphqlHTTP({
    schema: EntrySchema,
    rootValue,
    graphiql: true,
}));


app.listen(port, () => console.log(`Server listening on port ${port}!`));
