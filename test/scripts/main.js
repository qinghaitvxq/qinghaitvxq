/**
 * Created by caipf on 2017/1/16.
 */
require.config({
    paths:{
        "jquery":"lib/jquery-3.1.1"
    }
});
require(['../requirejsDemo/scripts/moduleA','jquery'],function(ma, $){
       alert(ma.add(5,6));
       console.log('ma');
       console.log(ma.count);

});