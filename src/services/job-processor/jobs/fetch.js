// Packages
const Queue = require('bull');
const axios = require('axios');

// modules
const JobProcessor = require('../JobProcessor');
const constants = require('../../../utils/constants');

class FetchJob extends JobProcessor {
  constructor() {
    const fetchQueue = new Queue(constants.FETCH_QUEUE, process.env.REDIS_URL);

    super(fetchQueue);
  }

  async processJob(job, done) {
    job.progress(0);

    const {data: {url}} = job;

    if (!url) {
      return done('Missing a url');
    }

    try {
      const results = await axios.get(url);

      job.progress(100);

      done(null, results.data);
    } catch (e) {
      return done(e);
    }
  }
}

module.exports = new FetchJob();
