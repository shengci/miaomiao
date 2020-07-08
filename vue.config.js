module.exports = {
    devServer:{
        proxy:{
            '/ajax':{
                target:'https://m.maoyan.com',
                changeOrigin:true
            },
            '/geoip/':{
                target:'https://api.asilu.com',
                changeOrigin:true
            }
        }
    }
}