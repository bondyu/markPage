var pageMark={
  isInjected:false,
  init:function(){
    this.bind();
    this.checkStatus();  
  },
  injectFiles:function(){
      var head,script;
      if(this.isInjected){
          window.postMessage('loadpagemark','*');
          return;
      }
      this.isInjected=true;
      head = document.getElementsByTagName("head")[0];
      script = document.createElement("script");
      script.type = "text/javascript";
      script.src = 'http://ali-54473/markpage/merge.js';
      script.charset='utf-8';
      head.appendChild(script);
  },
  checkStatus:function(){
     var self=this,
        ison=chrome.storage.sync.get('isOn',function(item){
             if(item['isOn']){
                 self.injectFiles();
             }else{
                 
             } 
        });
      
  },
  bind:function(){
      var self=this;
      chrome.storage.onChanged.addListener(function(changes, namespace) {
          var storageChange
          for (key in changes) {
            storageChange = changes[key];
            //只监听这个开关
            if(key!='isOn'){
                return;
            }
            if(storageChange.newValue){
                self.injectFiles();
            }else{
                window.postMessage('unloadpagemark','*');
            }
          }
        });
  }  
};

pageMark.init();
