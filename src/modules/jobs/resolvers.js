// Packages
const validUrl = require('valid-url');

// Modules
const {FetchQueue} = require('../../services/job-processor');
const redis = require('../../utils/redis');

const getJobs = async (parentValue, {limit, offset}, context) => {
  return FetchQueue.getJobs(offset, limit);
};

const getJob = async (parentValue, {id}, context) => {
  return FetchQueue.getJob(id);
};

const getJobStatus = async (job, args, context) => {
  return await job.getState();
};

const getJobProgress = async (job, args, context) => {
  const progress = await job.progress();
  return typeof progress === 'number' ? progress : null;
};

const getJobResults = async (job, args, context) => {
  if (!job.returnvalue) {
    return null;
  }

  return JSON.stringify(job.returnvalue);
};

const createJob = async (parentValue, {url}, context) => {
  if (!validUrl.isUri(url)) {
    throw new Error('Invalid URI');
  }

  const redisJobCache = `create-job-${url}`;
  const expirationPeriod = 3600; // 1 hr
  const jobInformation = await redis.get(redisJobCache);
  if (
    jobInformation !== null &&
      jobInformation !== 'null' &&
      jobInformation
  ) {
    const jobId = parseInt(jobInformation, 10);
    return FetchQueue.getJob(jobId);
  }

  const job = await FetchQueue.createJob({url});

  redis.set(
      redisJobCache,
      job.id,
      'EX',
      expirationPeriod,
  );

  return job;
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  getJobStatus,
  getJobProgress,
  getJobResults,
};
