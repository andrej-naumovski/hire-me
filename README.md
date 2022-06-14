# Hire-me project app

This project uses the create-react-app package to bootstrap a React application with the Typescript template and uses Yarn for package management.

## Environment setup

There are a few steps needed to be taken before running the app in development mode.

### Environment variables

This repository contains an `env.example` file which lists all of the needed environment variables. Copy that file and rename the new one to `.env`, and then add the missing values for the variables.

### Installing dependencies

In order to run the application you first need to install the dependencies using Yarn. Run the following command in your terminal:

```
yarn
```

### Starting the development app

After installing dependencies, you can run `yarn start` which spins up a development server, and your application will be located at `localhost:3000`.

## Design decisions

This project uses React 18 as the core UI library. It uses Material-UI as the design system. MUI provides tons of ready UI components out of the box, specifically a very nifty and easy-to-use date/time picker which is necessary for our specific use case.

It uses react-query in combination with React hooks and axios for API calls. React-query comes with great caching capabilities as well as manually being able to invalidate cach and refetch data when an API call succeeds/fails - which makes it very easy to refetch the updated children list once a child has been checked in/checked out.

For the modal state, which is global and should be accessible everywhere around the application, it uses React Context in lieu of some state management tool like Redux. Context already comes with React out of the box, is more lightweight and doesn't require extra dependencies, making it perfect for something as small.

Modals and other global elements (like error alerts) are rendered using React Portals. This allows us to keep these global elements outside of the main component tree.