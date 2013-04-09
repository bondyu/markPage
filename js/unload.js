(function(Tool,$){
  
window.addEventListener("message", function(event) {
    if(event.data=='unloadpagemark'){
        Tool.Toolbar.unload();
        Tool.Menu.unload();
        //删除所有的标签
        Tool.PageTag.unload();
    }
}, false);  
    
})(Util,jQuery);
