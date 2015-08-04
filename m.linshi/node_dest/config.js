module.exports={"debug":false,"isDebugFramework":false,"webresource":"/webresource","dest":"../webresource/dest.m","node_dest":"./node_dest","port":5556,"projects":[{"root":"/","debug":false,"js":[],"css":["/webresource/dest.m/images/views.css"],"include":["widget/extend/loading.js"],"route":{"/":{"controller":"index","template":"index"},"/menu":{"controller":"menu","template":"menu"},"/about":{"controller":"about","template":"about"},"/member":{"controller":"member","template":"member"},"/settings":{"controller":"settings","template":"settings"},"/download":{"controller":"download","template":"download"},"/login":{"controller":"login","template":"login"},"/search/{keywords:.+}":{"controller":"search","template":"search"},"/teacher/{id:\\d+}":{"controller":"teacher","template":"teacher"},"/appointment":{"controller":"appointment","template":"appointment"},"/find":{"controller":"findlist","template":"findlist"},"/findlist/{id:\\d+}":{"controller":"findlist","template":"findlist"},"/order/{id:\\w+}":{"controller":"order","template":"order"},"/find/{id:\\d+}":{"controller":"find","template":"find"},"/find/{type:\\d+}/{id:\\d+}":{"controller":"find","template":"find"}},"webresource":"/webresource//dest.m"}],"build":false,"routes":{"/":{"controller":"views/index","template":"template/index","root":"/"},"/menu":{"controller":"views/menu","template":"template/menu","root":"/"},"/about":{"controller":"views/about","template":"template/about","root":"/"},"/member":{"controller":"views/member","template":"template/member","root":"/"},"/settings":{"controller":"views/settings","template":"template/settings","root":"/"},"/download":{"controller":"views/download","template":"template/download","root":"/"},"/login":{"controller":"views/login","template":"template/login","root":"/"},"/search/{keywords:.+}":{"controller":"views/search","template":"template/search","root":"/"},"/teacher/{id:\\d+}":{"controller":"views/teacher","template":"template/teacher","root":"/"},"/appointment":{"controller":"views/appointment","template":"template/appointment","root":"/"},"/find":{"controller":"views/findlist","template":"template/findlist","root":"/"},"/findlist/{id:\\d+}":{"controller":"views/findlist","template":"template/findlist","root":"/"},"/order/{id:\\w+}":{"controller":"views/order","template":"template/order","root":"/"},"/find/{id:\\d+}":{"controller":"views/find","template":"template/find","root":"/"},"/find/{type:\\d+}/{id:\\d+}":{"controller":"views/find","template":"template/find","root":"/"}}}