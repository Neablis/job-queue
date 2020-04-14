// Packages
const {GraphQLInt, GraphQLList} = require('graphql');

// Modules
const {getJobs, getJob} = require('./resolvers');
const {JobType} = require('./types');

const jobs = {
  type: GraphQLList(JobType),
  args: {
    limit: {
      name: 'Limit',
      type: GraphQLInt,
    },
    offset: {
      name: 'offset',
      type: GraphQLInt,
    },
  },
  resolve: getJobs,
};

const job = {
  type: JobType,
  args: {
    id: {
      name: 'Job Id',
      type: GraphQLInt,
    },
  },
  resolve: getJob,
};

module.exports = {
  jobs,
  job,
};
