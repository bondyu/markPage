(function(Tool,$){
  
window.addEventListener("message", function(event) {
    if(event.data=='loadpagemark'){
        Tool.Core.initPageParams();
        Tool.Toolbar.init();
        Tool.Menu.init();
    }
}, false);  
    
})(Util,jQuery);
