# Job Queue and Processor

## Table of contents
* [Dependencies](#dependencies)
* [Clone](#clone)
* [Setup](#setup)
* [Features](#features)
* [Tests](#tests)
* [Todo](#todo)

## Dependencies

- Docker

## Clone

- Clone this repo to your local machine using `https://github.com/Neablis/job-queue`

## Setup

```shell
$ docker-compose up
```

- Go to `http://localhost:3000/graphql`

## Features
- Graphql
- Node
- Bulljs

## Usage
- Creating a new job
```graphql
  mutation {
    job (url : "<URL>") {
      id
      progress
      result
      status
    }
  }
```

- Getting a job
```graphql
  {
    job (id: <JOB ID>) {
      id
      progress
      result
      status
    }
  }
```

- Retrieving all jobs
```graphql
  {
    jobs {
      id
      progress
      result
      status
    }
  }
```

## Tests
```shell
$ docker-compose run --rm app npm run-script test
```

## Todo
- Implement unhappy path testing around network requests to get to 100% coverage
- Remove console.log and replace with winston logging
- Adde parallelization to the job runner
- More comments  

---
