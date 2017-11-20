//公用方法
var COMMON_ACTION={
    //补0
    format:function(num){
        num=num<10?'0'+num:num;
        return num;
    },

    //获取现在的小时数
    getNowHour:function(){
        return (new Date()).getHours();
    },

    //数量格式化：1234567  -> 1.234.567
    formatNum:function (num){
        if(num){
            var iNow=1;
            var numArr=num.toString().split('');

            for(var i=numArr.length-1; i>0; i--){
                if(iNow==3){
                    numArr.splice(i,0,".");
                    iNow=1;
                }else{
                    iNow++;
                }
            }
            num=numArr.join('');
        }else{
            num='';
        }
        return num;
    },

    //取数组中的最大值
    getArrMax:function(arr){
        var arrMax=0;
        var indexMax=0;
        for(var i=0; i<arr.length; i++){
            if(arr[i]>arrMax){
                arrMax=arr[i];
                indexMax=i;
            }
        }
        return indexMax;
    }
};