(function(Tool,$){
  
window.addEventListener("message", function(event) {
    if(event.data=='loadpagemark'){
        Tool.Toolbar.init();
        Tool.Menu.init();
      
        Tool.APP.load();
    }
}, false);  
    
})(Util,jQuery);
