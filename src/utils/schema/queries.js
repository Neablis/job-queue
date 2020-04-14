const {GraphQLObjectType} = require('graphql');

const jobs = require('../../modules/jobs/queries');

// Query
const query = new GraphQLObjectType({
  name: 'query',
  description: 'API Queries [Read]',

  fields: () => ({
    ...jobs,
  }),
});

module.exports = query;
