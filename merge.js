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
 * 页面配置
 **********************************/
Util.Configs={
  serverUrl:'http://alibaba-62762.hz.ali.com:8083'
};
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
    
    /**
     *获取当前的指令状态 
     */
    getCommands:function(type,names){
        var cmd=location[type||'hash'],
            begin=names?names.length+2:1,
            end=cmd.length-begin;
        if(end>1){
            return decodeURIComponent(cmd.substr(begin,cmd.length-1));
        }else{
            return '';
        }
    },
    parseObject:function(type,names){
        var source=this.getCommands(type||'search',names),
            result={};
        function parseObject(str){
            var o;
            try{
                o=JSON.parse(str);            
            }catch(e){
                o=str;
            }
            return o;
        }
        if(source){
            source.replace(/([^&=]+)=([^&=]*)/g,function(mt,p1,p2,p3){
                result[p1]=parseObject(p2);
            });
        }
        return result;
    }
};

Util.Url.parseObject();
Util.Common.log(Util.Url.getCommands());
/**
 *入口函数 
 */
var done=function(){
    Util.Loader.asyncLoad([
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/css/common.css',   //基本样式
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/css/dialog.css',   //对话框基本样式
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/css/toolbar.css',  //页面工具条样式
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/css/tag.css',      //基本标签样式
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/css/newtag.css',   //新建标签样式
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/css/mouseright.css',   //鼠标右键样式
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/data.js',         //存储数据用
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/notify.js',
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/template.js',     //所有的页面模版
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/dialog.js',
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/core.js',
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/tag.js',       //标签构造类
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/pageTag.js',      //页面标签
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/rightmenu.js',
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/toolbar.js',
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/mvc.js',
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/class.js',
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/tag/view.js',
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/tag/controller.js',
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/tag/model.js',
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/load.js',         //重新加载初始化
        'http://alibaba-62762.hz.ali.com:8888/ss/e2/js/unload.js'        //卸载插件内容
    ],function(){
        //下载完了就执行一下,开始加载页面的所有标签
        window.postMessage('loadpagemark','*');
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
