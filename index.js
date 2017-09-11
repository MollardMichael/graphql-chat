const express = require('express');
const graphql = require('./graphql/main').default;
const cors = require('cors');
var app = express();

// GraphQL API
app.use(cors())
app.use('/graphql', graphql);

app.listen(4000);
console.log('Running a GraphQL API server at localhost:4000/graphql');
