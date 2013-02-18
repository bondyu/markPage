/**
 *���ҳ�������ļ� ��Ŀǰֻ���chrome�������������IE
 * @author ginano
 * @date 20130217
 */
/************************************
 *�����������ռ� 
 ************************************/
var Util={};

/***********************************
 * ��ͨͨ�ù���
 **********************************/

Util.Common={
  log:function(str){
      console && console.log && console.log(str);
  } 
};
/************************************
 *�첽������Դ�ļ����� 
 ************************************/
Util.Loader={
  /**
   *����js�ļ� 
   * @param {Object} url
   */
  importJS:function(url,callback,onerror){
        var head = document.getElementsByTagName("head")[0],
            script = document.createElement("script");
        script.type = "text/javascript";
        callback && script.addEventListener("load", callback, false);
        script.addEventListener("error", function(){
            if(onerror){
                onerror(url);
            }else{
                Util.Common.log('faild to load javascript file: "'+url+'"');
            }
        }, false);
        script.src = url;
        head.appendChild(script);
  },
  /**
   *����css�ļ� 
   * @param {Object} url
   */
  importCSS:function(url,callback,onerror){
        var head = document.getElementsByTagName("head")[0],
            link = document.createElement("link");
        link.rel="stylesheet";
        link.type = "text/css";
        callback && link.addEventListener("load", callback, false);
        link.addEventListener("error", function(){
            if(onerror){
                onerror(url);
            }else{
                Util.Common.log('faild to load css file: "'+url+'"');
            }
        }, false);
        link.href=url;
        head.appendChild(link);
  },
  /**
   *�첽����������ļ� 
   * @param {Array} urls
   * @param {Function} callback
   * @param {Boolean} [option=true] isOrdered �Ƿ���Ҫ������أ�Ĭ������Ҫ�������
   */
  asyncLoad:function(urls,callback,isOrdered){
      var _self=this,
          isOrder=!(isOrdered===false),
          isAllDone=false,
          now,
          i,
          len=(urls instanceof Array) && urls.length,
          /**
           *���ݺ�׺�ж���js����css�ļ� 
           * @param {Object} url
           * @param {Object} done
           */
          load=function(url, done, error){
              if(/\.js(?:\s*)$/.test(url)){
                  _self.importJS(url,done,error);
              }else{
                  _self.importCSS(url,done,error);
              }
          },
          orderLoad=function(){
              now=urls.shift();
              if(now){
                 load(now,orderLoad);
              }else{
                 callback && callback(); 
              }
          };
      if(!len || len<1){
          return;
      }
      //�����˳��
      if(isOrder){
          orderLoad();
      }else{
         //���û��˳�����   
         for(i=0,now=0;i<len;i++){
             load(urls[i],function(){
                 now+=1;
                 if(now==len){
                    callback && callback();  
                 }
             });
         }
      }
  } 
};
/***********************************************
 * ·���ж�
 ***********************************************/
Util.Url={
    /**
     *��ȡ��ǰUrl�� ����ֵ
     */
    getCharacter:function(){
        var url=window.location,
            domain=url.hostname,
            //port=url.port,
            path=url.pathname;
        //detailҳ��Ҫ���⴦��
        if(/detail(?:\-test)?\.china\.alibaba\.com(?::\d+)?\/offer\/\d+\.html/.test(url)){
            return 'detail.china.alibaba.com/offer/detail.html';
        }    
        return character=domain+path;
    },
    /**
     *��ȡ��ǰ��ָ��״̬ 
     */
    getCommands:function(){
        var cmd=window.location.hash,
            len=cmd.length-1;
        if(len>1){
            return cmd.substr(1,cmd.length-1);
        }else{
            return null;
        }
    }
};

Util.Common.log(Util.Url.getCommands());
/**
 *��ں��� 
 */
var done=function(){
    Util.Loader.asyncLoad([
        '../css/dialog.css',   //�Ի��������ʽ
        '../css/toolbar.css',  //ҳ�湤������ʽ
        '../css/tag.css',      //������ǩ��ʽ
        '../css/newtag.css',   //�½���ǩ��ʽ
        '../css/mouseright.css',   //����Ҽ���ʽ
        '../js/core.js',
        '../js/notify.js',
        '../js/mvc.js',
        '../js/class.js',
        '../js/tag/view.js',
        '../js/tag/controller.js',
        '../js/tag/model.js',
        '../js/init.js'
    ],function(){
        
    },true);
};
/**
 *������Ѿ�������jquery��ܵ� 
 */
if(window.FE){
    done();
}else{
    Util.Loader.asyncLoad(['http://style.china.alibaba.com/fdevlib/js/fdev-v4/core/fdev-min.js'],function(){
        done();
    });
}
