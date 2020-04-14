// Imports
const {GraphQLObjectType} = require('graphql');
// App Imports
const jobs = require('../../modules/jobs/mutations');

// Mutation
const mutation = new GraphQLObjectType({
  name: 'mutations',
  description: 'API Mutations [Create, Update, Delete]',

  fields: {
    ...jobs,
  },
});

module.exports = mutation;
