/***************
 * 消息事件通知
 ***************/
(function(tool){
    /***
     *消息类 
     *@class Notify 
     */
    var Notify=function(){
        this.eventList={};
    };
    Notify.prototype={
        /**
         *创建一个新的消息实体 
         */
        create:function(){
            return new Notify();
        },
        /**
         *绑定事件 
         * @param {Object} eventname
         * @param {Object} callback
         */
        attach:function(eventname,callback){
            var elist=this.eventList[eventname],
                index;
            if(!elist){
                elist=this.eventList[eventname]=[];
            }
            index=elist.indexOf(callback);
            index>-1 || elist.push(callback);
            return this;
        },
        /**
         *解除事件 
         * @param {Object} eventname
         * @param {Object} callback
         */
        detach:function(eventname,callback){
            var elist=this.eventList[eventname],
                index;
            if(!elist){
                return;
            }
            if(callback){
               index=elist.indexOf(callback);
               index>-1 && elist.splice(index); 
            }else{
               this.eventList[eventname]=[];
            }
            return this;
        },
        /**
         *触发消息 
         * @param {Object} eventname
         */
        notify:function(eventname){
            var args=Array.prototype.slice.call(arguments,1),
                elist=this.eventList[eventname],
                i,len;
            if(!elist){
                return;
            }
            for(i=0,len=elist.length;i<len;i++){
                elist[i].call(null,args);
            }
            return this;
        }
    };
    
    Util.Notify=new Notify();
})(Util);
