# Job Queue and Processor

## Table of contents
* [Dependencies](#dependencies)
* [Clone](#clone)
* [Setup](#setup)
* [Features](#features)
* [Tests](#tests)

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
Creating a new job
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

Getting a job
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

Retrieving all jobs
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

## Documentation
## Tests
```shell
$ docker-compose run --rm app npm run-script test
```

---
