class JobProcessor {
  constructor(queue) {
    if (!queue) {
      throw new Error('Must be initialized with a queue');
    }

    this.queue = queue;
  }

  getJob(id) {
    return this.queue.getJob(id);
  }

  getJobs(offset=0, limit=10, filter=['completed', 'active']) {
    return this.queue.getJobs(filter, offset, offset + limit);
  }

  async createJob(data) {
    return this.queue.add(data);
  }

  setupProcessor() {
    this.queue.process(async (job, done) => {
      this.processJob(job, done);
    });
  }

  processJob() {
    throw new Error('Must implement process Job');
  }
}

module.exports = JobProcessor;
