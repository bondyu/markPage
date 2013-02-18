/***************
 * ��Ϣ�¼�֪ͨ
 ***************/
(function(tool){
    /***
     *��Ϣ�� 
     *@class Notify 
     */
    var Notify=function(){
        this.eventList={};
    };
    Notify.prototype={
        /**
         *����һ���µ���Ϣʵ�� 
         */
        create:function(){
            return new Notify();
        },
        /**
         *���¼� 
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
         *����¼� 
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
         *������Ϣ 
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
