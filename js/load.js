(function(Tool,$){
  
window.addEventListener("message", function(event) {
    if(event.data=='loadpagemark'){
        Tool.Toolbar.init();
        Tool.Menu.init();
        Tool.PageTag.init();
    }
}, false);  
    
})(Util,jQuery);
