
//更改标识图片
function updateIcon(isok) {
  chrome.browserAction.setIcon({path:"images/mark" + isok + ".png"});
}
function updateStore(isok){
    chrome.storage.sync.set({
        "isOn":isok
    });
}

chrome.storage.sync.get('isOn',function(item){
     var isOn=!!item['isOn'];
     //初始化更新图标
     updateIcon(isOn);
     //绑定事件
     chrome.browserAction.onClicked.addListener(function(tab){
        isOn=!isOn;
        updateIcon(isOn);
        updateStore(isOn);
    });
});

