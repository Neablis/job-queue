const jobs = require('../services/job-processor');

module.exports = () => {
  Object.keys(jobs).forEach((key) => {
    jobs[key].setupProcessor();
  });
};
