// Imports
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
} = require('graphql');

const {
  getJobStatus,
  getJobProgress,
  getJobResults,
} = require('./resolvers');

const JobType = new GraphQLObjectType({
  name: 'Job',
  description: 'Job Type',

  fields: () => ({
    id: {
      type: GraphQLInt,
    },
    progress: {
      type: GraphQLInt,
      resolve: getJobProgress,
    },
    result: {
      type: GraphQLString,
      resolve: getJobResults,
    },
    status: {
      type: GraphQLString,
      resolve: getJobStatus,
    },
  }),
});

module.exports = {JobType};
