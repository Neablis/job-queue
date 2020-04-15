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

- Go to `http://localhost:3000/graphql` to test calls

## Features
- Graphql
- Node
- Bulljs
- Caching

## Usage
### Creating a new job
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

```shell
curl --request POST \
  --url http://localhost:3000/ \
  --header 'content-type: application/json' \
  --data '{"query":"mutation {\n  job (url : \"http://numbersapi.com/44\") {\n    id\n    progress\n    result\n    status\n  }\n}"}'
```

### Getting a specific job
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

```shell
curl --request POST \
  --url http://localhost:3000/ \
  --header 'content-type: application/json' \
  --data '{"query":"{\n  job (id: 12) {\n    id\n    progress\n    result\n    status\n  }\n}"}'
```

### Retrieving all jobs
```graphql
  {
    jobs (offset: 0, limit: 100) {
      id
      progress
      result
      status
    }
  }
```

```shell
curl --request POST \
  --url http://localhost:3000/ \
  --header 'content-type: application/json' \
  --data '{"query":"{\n  jobs (offset: 0, limit: 100) {\n    id\n    progress\n    result\n    status\n  }\n}"}'
```


## Tests
```shell
$ docker-compose run --rm app npm run-script test
```

## Todo
- Push to get to 100% coverage
- Remove console.logs and replace with Winston logging
- Adde parallelization to the job runner
- More comments  

---
