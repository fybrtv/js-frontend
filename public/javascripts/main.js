console.log("Main.js initialized...")

function DropDown(el) {
    this.dd = el;
    this.initEvents();
}
DropDown.prototype = {
    initEvents : function() {
        var obj = this;

        obj.dd.on('click', function(event){
            $(this).toggleClass('active');
            event.stopPropagation();
        }); 
    }
}

$.fn.topText = function() {
   
    return $(this)  .clone()
            .children()
            .remove()
            .end()
            .text();
 
};

$(function() {

    if ($('#dd').length != 0) {
        var dd = new DropDown( $('#dd') );

        $(document).click(function() {
            // all dropdowns
            $('.wrapper-dropdown-1').removeClass('active');
        });
        $(document).ready(function(){
            currentChannel = window.location.search.replace("?","").split("&")[0].split("=")[1] ||  "Comedy";

            var dd = $('#dd').get(0);
            var ctopText = dd.childNodes[0];
            ctopText.nodeValue = currentChannel;

            $("#videoStream").height($(window).innerHeight()-parseInt($("#header").css("height")))
        });
    }
    	
});
