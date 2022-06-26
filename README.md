# TODO fullstack

This repository is a monorepo for the fullstack todo app.

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

Start the projects development server

```
npm start:dev
```

The frontend application should now be available at http://localhost:4000

## Environment Variables

These are the environment variables required to successfully deploy the application.

## Built With

Details of the tech stack that has been used.

- [NestJS](https://docs.nestjs.com/) - Server Framework
- [CreateReactApp](https://reactjs.org/docs/create-a-new-react-app.html) - UI Framework

## Architecture

A basic architecture diagram or description of the chosen architecture should be detailed here.

## Infrastructure

## Services

A list of all services used in this project.

| Service Name | Owner/Admin | Service Details |
| ------------ | ----------- | --------------- |

## Changelog

A running changelog can be found here: [CHANGELOG.md](CHANGELOG.md)

## Troubleshooting

Below are a few common issues users experience - including an overview of their possible cause and solutions.

## Frequently Asked Questions
