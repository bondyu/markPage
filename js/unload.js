(function(Tool,$){
  
window.addEventListener("message", function(event) {
    if(event.data=='unloadpagemark'){
        Tool.Toolbar.unload();
        Tool.Menu.unload();
        //ɾ�����еı�ǩ
        Tool.PageTag.unload();
    }
}, false);  
    
})(Util,jQuery);
