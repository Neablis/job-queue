/* eslint-disable */
const Queue = require('bull');
const redis = require('ioredis');

const chai = require('../setup/chai');
const expect = chai.expect;

const JobProcessor = require('../../src/services/job-processor/jobProcessor');

describe('JobProcessor', () => {
  let client = null;
  let FakeQueue = null;

  beforeEach(async () => {
    FakeQueue = class FetchJob extends JobProcessor {
      constructor() {
        const fetchQueue = new Queue('TEST', process.env.REDIS_URL);

        super(fetchQueue);
      };
    };

    client = new redis(process.env.REDIS_URL);
    return client.flushdb();
  });

  describe('#constructor', () => {
    it('throws an error if no queue is passed', () => {
      let jobProcessor = null;
      try {
        jobProcessor = new JobProcessor();
      } catch (e) {
        expect(e).to.be.an('error');
      }

      expect(jobProcessor).to.eql(null);
    });

    it('creates a new job processor when passed a queue', () => {
      const newJobProcessor = new JobProcessor({});
      expect(newJobProcessor).to.be.an('object');
    });
  });

  describe('#createJob', () => {
    it('throws an error if no data is passed to job', async () => {
      let job = null;
      try {
        const jobProcessor = new JobProcessor({});
        job = await jobProcessor.createJob();
      } catch (e) {
        expect(e).to.be.an('error');
      }

      expect(job).to.eql(null);
    });

    it('creates a job', async () => {
      let data = {test: 1};
      const fakeQueue = new FakeQueue();
      const job = await fakeQueue.createJob(data);

      expect(job).to.be.an("object");
      expect(job.data).to.eql(data);
    });
  });

  describe('#getJob', () => {
    it('throws an error if no id is passed', async () => {
      let job = null;
      try {
        const fakeQueue = new FakeQueue();
        job = await fakeQueue.getJob();
      } catch (e) {
        expect(e).to.be.an('error');
      }

      expect(job).to.eql(null);
    });

    it('returns null if job doesnt exist', async () => {
      const fakeQueue = new FakeQueue();
      const job = await fakeQueue.getJob(5);

      expect(job).to.eql(null);
    });

    it('returns a job if it exists', async () => {
      let data = {test: 1};
      const fakeQueue = new FakeQueue();
      const job = await fakeQueue.createJob(data);

      const retrievedJob = await fakeQueue.getJob(parseInt(job.id, 10));

      expect(retrievedJob).not.eql(null);
      expect(retrievedJob.data).to.eql(data);
    });
  });

  describe('#getJobs', () => {
    it('returns no jobs if they dont exist', async () => {
      const fakeQueue = new FakeQueue();
      const jobs = await fakeQueue.getJobs();

      expect(jobs).to.be.empty;
    });

    it('returns the active and completed jobs', async () => {
      let data = {test: 1};

      const fakeQueue = new FakeQueue();
      let job = await fakeQueue.createJob(data);

      await job.moveToCompleted("succeeded", true);

      const jobs = await fakeQueue.getJobs();

      expect(jobs).to.not.be.empty;
    });
  });

  describe('#processJob', () => {
    it('throws if called without being implemented', async () => {
      try {
        const fakeQueue = new FakeQueue();
        await fakeQueue.processJob();
      } catch (e) {
        expect(e).to.be.an('error');
      }
    });
  });
});
