# TODO fullstack

This repository is a monorepo for the fullstack todo app.
This app lives in a monorepo handled by npm workspaces

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before we get started, we're going to need to make sure we have a few things installed and available on our machine.

#### Node >= 12

##### MacOS

```bash
curl "https://nodejs.org/dist/latest/node-${VERSION:-$(wget -qO- https://nodejs.org/dist/latest/ | sed -nE 's|.*>node-(.*)\.pkg</a>.*|\1|p')}.pkg" > "$HOME/Downloads/node-latest.pkg" && sudo installer -store -pkg "$HOME/Downloads/node-latest.pkg" -target "/"
```

##### Other

See the installation guides available @ nodejs.org:

https://nodejs.org/en/download/package-manager/

### Installing

Below is a series of step by step instructions that tell you how to get a development env running.

Create a local clone of the repository

```
git clone git@github.com:alphaofficial/todo-fullstack.git
```

Enter the cloned repositories' directory

```
cd todo-fullstack
```

Install the projects dependencies

```
npm install
```

Run the docker command to start the db and app services

```
docker-compose up -d
```

Start the projects backend server after all docker service are running first

```

npm run backend:dev

```

Then start the projects client app

```

npm run client:dev

```

The client application should now be available at http://localhost:<PORT>

![app page](https://i.imgur.com/XRR8aN6.png)

## Environment Variables

These are the environment variables required to successfully deploy the application.

### Backend

| key         | description              |
| ----------- | ------------------------ |
| PG_HOST     | The postgres db host     |
| PG_USER     | The postgres db user     |
| PG_PASSWORD | The postgres db password |
| PG_PORT     | The postgres db port     |
| REDIS_HOST  | The redis server host    |
| REDIS_PORT  | The redis server port    |

### Client

| key                | description                                          |
| ------------------ | ---------------------------------------------------- |
| PORT               | The port for development (optional: default is 3000) |
| REACT_APP_API_HOST | The backend server uri                               |

## Built With

Details of the tech stack that has been used.

- [NestJS](https://docs.nestjs.com/) - Server Framework
- [CreateReactApp](https://reactjs.org/docs/create-a-new-react-app.html) - UI Framework
- [Docker](https://docs.docker.com/get-started/)

## Architecture

A basic architecture diagram or description of the chosen architecture should be detailed here. Coming soon

## Infrastructure

Coming soon

## Services

A list of all services used in this project.
Coming soon

## Changelog

A running changelog can be found here: [CHANGELOG.md](CHANGELOG.md)

## Troubleshooting

Below are a few common issues users experience - including an overview of their possible cause and solutions.

## Frequently Asked Questions

## To do

- One command to start all services
- Cascade delete on status
- Authentication and assignment of tasks to users
- Workspaces
