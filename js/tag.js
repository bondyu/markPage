(function(Tool,$){
    var Dialog=Tool.Dialog,
        Core=Tool.Core,
        Data=Tool.Data,
        Template=Tool.Template;
     function Tag(param){
         Dialog.call(this,true);
         this.setTemplate('±Í«©',Template.normalTag,'');
         this.dom.addClass('mark-tag');
     } 
     Tag.prototype=new Dialog(true);
     Tool.Tag=Tag;    
})(Util,jQuery);
