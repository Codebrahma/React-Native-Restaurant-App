# Restaurant App

BoilerPlate Used [https://github.com/kaushiknishchay/React-Native-Boilerplate](https://github.com/kaushiknishchay/React-Native-Boilerplate)

## Setup

### Installation

- run `npm install` or `yarn install`

### Run on Device

- run `yarn android` or `yarn ios` to run on device or emulator



### Project info


Main objective of this project was to have a single code base for both 
web and mobile apps with the logic and view separated.

#### Project Structure

```
    /assets                 - contains image and fonts
    
    /src/actions            - all redux actions
    
    /src/base_components    - react-native specific base components (reusable)
    
    /src/components         - App Specific components
    
    /src/constants          -  colors and Assets
    
    /src/reducers           -  all reducers 
    
    /src/sagas              -   all redux sagas
    
    /src/screen             -  connected components which access the store (containers from react perspective)  
    
    /src/service            -   API methods
    
    /src/store              -   store config
    
    /src/router.js          -   routes config
```

All the view related files reside in `/src/*components` folders.

