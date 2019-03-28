# Route planner to the CMD Device Lab 🗺
**In this application you can plan your route from home, or another location, to the CMD device lab! This application is all about accessability!💫**

[Link to website](https://route-planner-browser-tech.herokuapp.com)

![Route-planner](./docs/route-planner.png)


## Table of Contents
* **[How to install](#how-to-install)**
* **[Use case](#use-case)**
* **[Progressive Enhencement](#progressive-enhancement)**
* **[Walktrough the application](#walk-trough-the-application)**
* **[Accessability](#accessability)**
* **[Feature detection](#accessability)**
* **[Resources](#resources)**
* **[Credits](#credits)**
* **[License](#license)**

## How to install

Before installing make sure you have installed node.js and npm.
Choose or make a new directory.
Load the template into your directory.

```bash
git clone https://github.com/chelseadoeleman/route-planner.git
```

Make sure you are in the right directory 
```bash
cd route-planner
```

Check if you have the latest version of npm.
Install the dependencies in [package.json](./package.json)
```bash
npm install
```

## Use case

For this project I chose the following user case **"Plan your route from my home to the CMD Device Lab"**. First off I sketched a wireflow with the core functionality of how the application should behave and how interaction works within the application.

![Wireflow](./docs/wireflow.jpg)

In the first place I found it hard to divide my application into four layers: functional, reliable, usable and pleasurable. Looking back at it now, I would like to add some changes to my sketch.

*   Functional
    *   The route needs to be divided in steps to get from my home to the Device lab.
    *   Offer different transportation options to the user.
*   Reliable
    *   The user can find the route to the Device lab from my home, no. matter. what.
    *   API's are not reliable.
*   Usable
    *   Make sure it's accessable for everyone
    *   Make sure that the core functionality works in almost 'every' browser.
*   Pleasurable
    *   Add some crazy styles and transitions to CSS.
    *   Add Javascript to go all out. Like making sure the user can also plan their route to the Device Lab to other places 😊.

## Progressive Enhancement

**Browser tests**
*   Internet Explorer *(v5-v11) tested with virtualBox IE11 and other version by opening the inspector*
    *   v11 works fine! Some weird things I noticed is that @supports is not yet supported in IE11 however flexbox is. So at first I checked if flexbox was supported with ```@supports```, but this totally broke the styling.
    *   From v10 some functionality dissapears from the application, due to the fact that mapbox isn't supported below IE11.
    *   After v8 it becomes a complete mess, where the css looks a bit wonky. However the user is still able to walk through all the steps.
*   Safari *(latest)*
    *   Works fine, but just using the keyboard to navigate proves to be quite difficult even when using ```<a>```, ```<button>``` can be selected with tabs.
*   Opera mini *(latest)*
    *   Everything seems to be working here! Eventhough it can be quite slow.
*   Edge *(latest)*
    *   See IE11 explanation.
*   Firefox *(latest)*
    *   Same problem as safari when navigating with the keyboard, other functions do work properly.
*   Chrome *(latest)*
    *   Works accordingly, because I developed in this browser.
*   Opera Neon *(latest)*
    * All features work in Opera Neon!

## Walktrough the application

![Route-planner](./docs/route-planner.png)

The route is configured step by step with directions that lead to you to your destination, in this case the Device Lab. The user is also able to choose their preferred type of transport to get to their destination. 

The application is set up with **node** and an **express** server. The pages are rendered with **ejs**. The core of the application is build with semantic HTML 5, which isn't supported in every browsers. Elements like ```<main>``` or ```<section>``` Are just left empty above their children which were included in that element, in certain browsers like IE8. Javascript and CSS are seperated from the HTML. When Javascript is turned of the user is still able to use the core functionality of the application. Only Mapbox won't be available anymore at that time, which provide the user with dynamic routes.

The user is also able to go from point 'a' to 'b' by providing the application their location. The application will only ask the user for their location if they actually choose the link, to go from their current location.

In the end I didn't have enough time to implement something for a bad broadband connection. But Mapbox does provide an offline Map, which can be used to display the routes. If the user is able to save their location, where they want to calculate their route from. They can easily start the navigation, when they do have a better internet connection. These are just a few enhancements, which could make the application a lot better.

## Accessability

<details>
  <summary>Colors</summary>

</details>

<details>
  <summary>Cookies</summary>

</details>


<details>
  <summary>Custom</summary>

</details>

<details>
  <summary>Images</summary>

</details>

<details>
  <summary>Internet</summary>

</details>


<details>
  <summary>Javascript</summary>

</details>

<details>
  <summary>Localstorage</summary>

</details>


<details>
  <summary>Mouse and/or trackpad</summary>

</details>


## Feature detection


## Resources

**Feature detection**
* [Can I Use](https://unsplash.com/developers)
* [Quirksmode](https://caniuse.com/)
* [MDN](https://developer.mozilla.org/en-US/)

**Additional sources**
* [Mapbox](https://www.mapbox.com/)
* [Mapbox Directions](https://docs.mapbox.com/help/glossary/mapbox-directions-api/)
* [Opencage Geocoding API](https://opencagedata.com/api)

## Credits

*   **Maikel:** Helping with some feature detection and setting up Mapbox.

## License
This repository is licensed as [MIT](LICENSE) by [Chelsea Doeleman](https://github.com/chelseadoeleman).
