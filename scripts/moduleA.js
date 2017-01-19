/**
 * Created by caipf on 2017/1/16.
 */
define(['jquery'],function($){
    var add=function(x,y){
        return x+y;
    };
    var getPCount=function(){
        return $('p').length;
    }
    return{

        add:add,
        count:getPCount()
    };
});