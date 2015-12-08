console.log("country-select.js loaded");

//function for dialog box
countrySelected = function() {
    bootbox.dialog({
        message: "Is this a place you are longing to visit or have you already crossed it off your list?",
        title: "Make your decision",
        buttons: {
            WantTo: {
                label: "I want to go there",
                className: "btn-go-there",
                callback: function() {
                    inMenu = 0;
                }
            },
            BeenThere: {
                label: "Been there done that",
                className: "btn-been-there",
                callback: function() {
                    inMenu = 0;
                }
            },
            moreInfo: {
                label: "Click me for more info!",
                className: "btn-primary",
                    callback: function() {
                        inMenu = 0;
                    }
                }
            }
        });
    };