// Packages
const Queue = require('bull');
const axios = require('axios');

// modules
const JobProcessor = require('../JobProcessor');
const constants = require('../../../utils/constants');

/**
 * An implemented Job processor to process URL Fetch Jobs
 */
class FetchJob extends JobProcessor {
  /**
   * Constructor
   */
  constructor() {
    const fetchQueue = new Queue(constants.FETCH_QUEUE, process.env.REDIS_URL);
    super(fetchQueue);
  }

  /**
   * Implemented abstract class to process fetching urls
   *
   * @param {object} job
   * @param {function} done
   * @return {Promise<*>}
   */
  async processJob(job, done) {
    job.progress(0);

    const {data: {url}} = job;

    if (!url) {
      return done('Missing a url');
    }

    try {
      const response = await axios.get(url);

      const data = response.data;

      job.progress(100);

      return done(null, data);
    } catch (e) {
      return done(e);
    }
  }
}

module.exports = new FetchJob();
