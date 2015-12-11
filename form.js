console.log("form.js loaded");

formSelected = function() {
    var modal = bootbox.dialog({
        message: $(".form-content").html(),
        title: "Travel Information",
        buttons: [
          {
            label: "Save",
            className: "btn btn-primary pull-left",
            callback: function(result) {
              
                var data = modal.find(".form");
                //console.log(data[0][2].value);
                haveBeenCities.push(data[0][2].value);
                updatePins();
            }
          },
          {
            label: "Close",
            className: "btn btn-default pull-left",
            callback: function() {
              console.log("just do something on close");
            }
          }
        ],
        show: false,
        onEscape: function() {
          modal.modal("hide");
        }
    });
    
    modal.modal("show");
};