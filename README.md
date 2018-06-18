# React Native Boilerplate

## Packages included and configured
- `eslint` -> follows airbnb styling guide
- `redux` -> store configured with reducers and actions and sagas
- `redux-saga` -> redux saga integrate in store
- `styled-components` -> for styling components
- `react-native-permissions` -> cross platform permission request library
- `react-native-vector-icons` -> icons library

## Can be used

- `react-native-router-flux` or `react-navigation` for routing in app (*not included*)

## Steps

### Setup

- run `react-native init <project name> --package=<package identifier>` in your directory
- let react native install and setup the code
- delete `package.json`, `App.js` files & delete `src/*` folder in your generated project
- copy all the files from repo folder (`/*` & `/src/*`) to your project
- change `name` in package.json file to your own
- run `npm install` or `yarn install` to install dependencies
- run `react-native link react-native-vector-icons` to install vector icons library


### Run

- `yarn android` or `yarn ios` to run on a device
