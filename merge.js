/**
 *标记页面引用文件 ，目前只针对chrome浏览器，不兼容IE
 * @author ginano
 * @date 20130217
 */

/************************************
 *异步加载资源文件工具 
 ************************************/
var Util={
  /**
   *加载js文件 
   * @param {Object} url
   */
  ImportJS:function(url,callback,onerror){
        var head = document.getElementsByTagName("head")[0],
            script = document.createElement("script");
        script.type = "text/javascript";
        callback && script.addEventListener("load", callback, false);
        script.addEventListener("error", function(){
            if(onerror){
                onerror(url);
            }else{
                Util.Log('faild to load javascript file: "'+url+'"');
            }
        }, false);
        script.src = url;
        head.appendChild(script);
  },
  /**
   *加载css文件 
   * @param {Object} url
   */
  ImportCSS:function(url,callback,onerror){
        var head = document.getElementsByTagName("head")[0],
            link = document.createElement("link");
        link.rel="stylesheet";
        link.type = "text/css";
        callback && link.addEventListener("load", callback, false);
        link.addEventListener("error", function(){
            if(onerror){
                onerror(url);
            }else{
                Util.Log('faild to load css file: "'+url+'"');
            }
        }, false);
        link.href=url;
        head.appendChild(link);
  },
  /**
   *异步加载所需的文件 
   * @param {Array} urls
   * @param {Function} callback
   * @param {Boolean} [option=true] isOrdered 是否需要按序加载，默认是需要按序加载
   */
  asyncLoad:function(urls,callback,isOrdered){
      var _self=this,
          isOrder=!(isOrdered===false),
          isAllDone=false,
          now,
          i,
          len=(urls instanceof Array) && urls.length,
          /**
           *根据后缀判断是js还是css文件 
           * @param {Object} url
           * @param {Object} done
           */
          load=function(url, done, error){
              if(/\.js(?:\s*)$/.test(url)){
                  _self.ImportJS(url,done,error);
              }else{
                  _self.ImportCSS(url,done,error);
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
      //如果有顺序
      if(isOrder){
          orderLoad();
      }else{
         //如果没有顺序加载   
         for(i=0,now=0;i<len;i++){
             load(urls[i],function(){
                 now+=1;
                 if(now==len){
                    callback && callback();  
                 }
             });
         }
      }
  },
  Log:function(str){
      console && console.log && console.log(str);
  }  
};


/**
 *入口函数 
 */
var done=function(){
    Util.asyncLoad([
        '../css/dialog.css',   //对话框基本样式
        '../css/toolbar.css',  //页面工具条样式
        '../css/tag.css',      //基本标签样式
        '../css/newtag.css',   //新建标签样式
        '../css/mouseright.css',   //鼠标右键样式
        '../js/core.js',
        '../js/notify.js',
        '../js/mvc.js',
        '../js/class.js',
        '../js/tag/view.js',
        '../js/tag/controller.js',
        '../js/tag/model.js',
        '../js/init.js'
    ],function(){
        
    },false);
};
/**
 *如果是已经加载了jquery框架的 
 */
if(window.FE){
    done();
}else{
    Util.asyncLoad(['http://style.china.alibaba.com/fdevlib/js/fdev-v4/core/fdev-min.js'],function(){
        done();
    });
}
