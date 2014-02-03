$(document).ready(function() {

    $("#selectPointSales").on('click', function(){
        window.open($(this).attr('href'), "yashare_popup", "scrollbars=0,resizable=0,menubar=0,toolbar=0,status=0");
        return false;
    });

});