console.log("form-functions.js loaded");

$(function() {
    $("#from").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function( selectedDate ) {
            $("#to").datepicker( "option", "minDate", selectedDate );
        }
    });
    $("#to").datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3,
        onClose: function( selectedDate ) {
            $( "#from" ).datepicker( "option", "maxDate", selectedDate );
        }
    });
});

// SaveForm = function() {
//     window.close("http://uckk08f1d81e.cindyrolina.koding.io/endassi…/form.html");
// };