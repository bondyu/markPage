(function(Tool,$){
  
window.addEventListener("message", function(event) {
    if(event.data=='unloadpagemark'){
        Tool.Toolbar.unload();
        Tool.Menu.unload();
        //ɾ�����еı�ǩ
        $('div.mark-tag').remove();
    }
}, false);  
    
})(Util,jQuery);
