# My Developer Portfolio 😊
**A portfolio website made with React and React-Spring for animations.**

Used Created-React-App for this project so to run locally
- clone
- npm/yarn install
- npm/yarn start


### Architecture and some note on the application
```text
  -src
    -app
      -common      // Contains styles and custom components, hocs and utils,
      -constants   // Project constants and strings
      -examples    // Seperate animation example that is taken from the project for better readability
      -modules     // Pages and individual components
    -assets        // self explainatory
      -icons
      -images
```

* Have used webpack's resolve.alias to alias some of the common paths to reduce relative imports in the project. <br />
* Mostly Used Scss, Flexbox, Media-Queries for styling, layouting and responsiveness, haven't used any css framework in this
* Used React-Spring for majority of the animations
