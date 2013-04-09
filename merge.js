/**
 *标记页面引用文件 ，目前只针对chrome浏览器，不兼容IE
 * @author ginano
 * @date 20130217
 */
/************************************
 *工具类命名空间 
 ************************************/
var Util={};

/***********************************
 * 普通通用工具
 **********************************/

Util.Common={
  log:function(str){
      console && console.log && console.log(str);
  } 
};
/************************************
 *异步加载资源文件工具 
 ************************************/
Util.Loader={
  /**
   *加载js文件 
   * @param {Object} url
   */
  importJS:function(url,callback,onerror){
        var head = document.getElementsByTagName("head")[0],
            script = document.createElement("script");
        script.type = "text/javascript";
        script.charset='utf-8';
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
   *加载css文件 
   * @param {Object} url
   */
  importCSS:function(url,callback,onerror){
        var head = document.getElementsByTagName("head")[0],
            link = document.createElement("link");
        link.rel="stylesheet";
        link.type = "text/css";
        link.charset='utf-8';
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
  } 
};
/***********************************************
 * 路径判断
 ***********************************************/
Util.Url={
    
    /**
     *获取当前的指令状态 
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
 *入口函数 
 */
var done=function(){
    Util.Loader.asyncLoad([
        'http://ali-54473/markpage/css/common.css',   //基本样式
        'http://ali-54473/markpage/css/dialog.css',   //对话框基本样式
        'http://ali-54473/markpage/css/toolbar.css',  //页面工具条样式
        'http://ali-54473/markpage/css/tag.css',      //基本标签样式
        'http://ali-54473/markpage/css/newtag.css',   //新建标签样式
        'http://ali-54473/markpage/css/mouseright.css',   //鼠标右键样式
        'http://ali-54473/markpage/js/data.js',         //存储数据用
        'http://ali-54473/markpage/js/notify.js',
        'http://ali-54473/markpage/js/template.js',     //所有的页面模版
        'http://ali-54473/markpage/js/core.js',
        'http://ali-54473/markpage/js/dialog.js',
        'http://ali-54473/markpage/js/tag.js',       //标签构造类
        'http://ali-54473/markpage/js/rightmenu.js',
        'http://ali-54473/markpage/js/toolbar.js',
        'http://ali-54473/markpage/js/mvc.js',
        'http://ali-54473/markpage/js/class.js',
        'http://ali-54473/markpage/js/tag/view.js',
        'http://ali-54473/markpage/js/tag/controller.js',
        'http://ali-54473/markpage/js/tag/model.js',
        'http://ali-54473/markpage/js/pageTag.js',      //页面标签
        'http://ali-54473/markpage/js/load.js',         //重新加载初始化
        'http://ali-54473/markpage/js/unload.js'        //卸载插件内容
    ],function(){
        
    },true);
};
/**
 *如果是已经加载了jquery框架的 
 */
if(window.FE){
    done();
}else{
    Util.Loader.asyncLoad([
        'http://style.china.alibaba.com/fdevlib/js/fdev-v4/core/fdev-min.js',
        'http://style.china.alibaba.com/fdevlib/css/fdev-v4/core/fdev-wide.css'],function(){
        done();
    });
}
