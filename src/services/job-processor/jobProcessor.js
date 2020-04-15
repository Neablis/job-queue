const states = [
  'completed',
  'failed',
  'delayed',
  'active',
  'wait',
  'paused',
  'stuck',
];

/**
 * Job Processor abstract class for creating a new job
 */
class JobProcessor {
  /**
   * Must pass a bull queue on initialization
   * @param {Queue} queue
   */
  constructor(queue) {
    if (!queue) {
      throw new Error('Must be initialized with a queue');
    }

    this.queue = queue;
  }

  /**
   * Return a job
   *
   * @param {number} id
   * @return {*}
   */
  getJob(id) {
    if (typeof id !== 'number') {
      throw new Error('Must pass an id');
    }
    return this.queue.getJob(id);
  }

  /**
   * Paginated function to return all active or completed jobs
   *
   * @param {number=} offset
   * @param {number=} limit
   * @param {array} filter
   * @return {*}
   */
  async getJobs(offset=0, limit=10, filter=states) {
    return this.queue.getJobs(filter, offset, offset + limit);
  }

  /**
   * Create a job with some generic data
   *
   * @param {object} data
   * @return {Promise<*>}
   */
  async createJob(data) {
    if (!data) {
      throw new Error('Requires data');
    }

    return await this.queue.add(data);
  }

  /**
   * Initializes the job processor
   */
  setupProcessor() {
    this.queue.process(async (job, done) => {
      this.processJob(job, done);
    });
  }

  /**
   * Abstract function to be implemented to process the job
   *
   * @abstract
   */
  processJob() {
    throw new Error('Must implement process Job');
  }
}

module.exports = JobProcessor;
