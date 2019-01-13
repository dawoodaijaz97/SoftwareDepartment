const config=require('config');

module.exports=function(){
    if(!config.get('jwtPrivateKey')){
        console.log('JWT Private Key is not defined');
    }
}