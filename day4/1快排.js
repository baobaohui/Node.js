var arr = [1,4,2,7,6]
var a= 0;
var b= arr.length-1;
var temp;
function qs(arr,a,b){
    if(a>=b)
        return;
    const key = arr[b];//基准值
    var left = a;
    var right = b;
    while(left<=right){
        while (left<=right && arr[left]<key){
            left += 1;
        }
        arr[right] = arr[left];
        while (left<=right && key<arr[right]){
            right -=1;
        }
        arr[left] = arr[right];
    }
    arr[right] = key;
    
    qs(arr,a,left-1);
    qs(arr,left+1,b)
}
qs(arr,a,b);
for(var i=0;i<arr.length;i++){
    console.log(arr[i]);
}