# Modal Dialogs Example
This example presents a way to display modal dialog boxes in an Ampersand app.

The code and concepts for this demo were (lovingly) lifted from the [andyou.talkie.io](https://andyou.talky.io/) app.

## Installation

* clone this repository
* `$ npm install`
* `$ npm start`

Open a browser to the URL output in the terminal when the app starts up, typically (http://localhost:3000)

Once the app is running in your browser, click on the "more info" tab.  Instead of navigating to its own page, it will be displayed in a modal overlay.  Close the info dialog, and your previous page is still active.

## Notes
To see the basic difference between the stock Ampersand generated app, and the modal enabled app, look at the second commit in this repo.
The key elements:
* In /client/views/main.js an additional ViewSwitcher instance was added to the app to handle the modals, and a convenience showModal() method is added to access the ViewSwitcher. 
* In /client/views/dialogs is base-dialog.js.  All dialogs should extend base-dialog.  
* The info view has a click handler to listen for close actions (user clicking the X in the corner, or pressing the cancel button). 
* The body template needs a new div to be a container for displayed dialogs.