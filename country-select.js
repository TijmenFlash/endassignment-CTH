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
                    //check if the selectedCountry is already in haveBeen
                    var index = haveBeen.indexOf(selectedCountry);
                    if (index > -1) {
                        haveBeen.splice(index, 1);
                    }
                    var index2 = wantToGo.indexOf(selectedCountry);
                    if (index > -1) {
                        wantToGo.splice(index, 1);
                    }
                    //add selectedCountry to array want to go
                    wantToGo.push(selectedCountry);
                    //testing purposes
                    console.log("Want to go to: "+wantToGo);
                }
            },
            BeenThere: {
                label: "I've been there",
                className: "btn-been-there",
                callback: function() {
                    //check if the selectedCountry is already in haveBeen
                    var index = wantToGo.indexOf(selectedCountry);
                    if (index > -1) {
                        wantToGo.splice(index, 1);
                    }
                    var index2 = haveBeen.indexOf(selectedCountry);
                    if (index > -1) {
                        haveBeen.splice(index, 1);
                    }
                    //add selectedCountry to array have been
                    haveBeen.push(selectedCountry);
                    formSelected();
                    //testing purposes
                    console.log("have been in: "+haveBeen);
                }
            },
            moreInfo: {
                label: "More info",
                className: "btn-primary",
                callback: function() {
                    //console.log(selectedCountry);
                    window.open("https://en.wikipedia.org/wiki/"+selectedCountryName);
                    console.log(topoLayer._layers);
                }
            }
        }
    });
};