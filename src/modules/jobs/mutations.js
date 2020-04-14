// Packages
const {GraphQLString} = require('graphql');

// Modules
const {createJob} = require('./resolvers');
const {JobType} = require('./types');

const job = {
  type: JobType,
  args: {
    url: {
      name: 'url',
      type: GraphQLString,
    },
  },
  resolve: createJob,
};

module.exports = {
  job,
};
