(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        if (typeof root === 'undefined' || root !== Object(root)) {
            throw new Error('templatizer: window does not exist or is not an object');
        }
        root.templatizer = factory();
    }
}(this, function () {
    var jade=function(){function n(n){return null!=n&&""!==n}function t(e){return(Array.isArray(e)?e.map(t):e&&"object"==typeof e?Object.keys(e).filter(function(n){return e[n]}):[e]).filter(n).join(" ")}function e(n){return i[n]||n}function r(n){var t=String(n).replace(o,e);return t===""+n?n:t}var a={};a.merge=function s(t,e){if(1===arguments.length){for(var r=t[0],a=1;a<t.length;a++)r=s(r,t[a]);return r}var i=t["class"],o=e["class"];(i||o)&&(i=i||[],o=o||[],Array.isArray(i)||(i=[i]),Array.isArray(o)||(o=[o]),t["class"]=i.concat(o).filter(n));for(var f in e)"class"!=f&&(t[f]=e[f]);return t},a.joinClasses=t,a.cls=function(n,e){for(var r=[],i=0;i<n.length;i++)e&&e[i]?r.push(a.escape(t([n[i]]))):r.push(t(n[i]));var o=t(r);return o.length?' class="'+o+'"':""},a.style=function(n){return n&&"object"==typeof n?Object.keys(n).map(function(t){return t+":"+n[t]}).join(";"):n},a.attr=function(n,t,e,r){return"style"===n&&(t=a.style(t)),"boolean"==typeof t||null==t?t?" "+(r?n:n+'="'+n+'"'):"":0==n.indexOf("data")&&"string"!=typeof t?(-1!==JSON.stringify(t).indexOf("&")&&console.warn("Since Jade 2.0.0, ampersands (`&`) in data attributes will be escaped to `&amp;`"),t&&"function"==typeof t.toISOString&&console.warn("Jade will eliminate the double quotes around dates in ISO form after 2.0.0")," "+n+"='"+JSON.stringify(t).replace(/'/g,"&apos;")+"'"):e?(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+a.escape(t)+'"'):(t&&"function"==typeof t.toISOString&&console.warn("Jade will stringify dates in ISO form after 2.0.0")," "+n+'="'+t+'"')},a.attrs=function(n,e){var r=[],i=Object.keys(n);if(i.length)for(var o=0;o<i.length;++o){var s=i[o],f=n[s];"class"==s?(f=t(f))&&r.push(" "+s+'="'+f+'"'):r.push(a.attr(s,f,!1,e))}return r.join("")};var i={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"},o=/[&<>"]/g;return a.escape=r,a.rethrow=function f(n,t,e,r){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&t||r))throw n.message+=" on line "+e,n;try{r=r||require("fs").readFileSync(t,"utf8")}catch(a){f(n,null,e)}var i=3,o=r.split("\n"),s=Math.max(e-i,0),l=Math.min(o.length,e+i),i=o.slice(s,l).map(function(n,t){var r=t+s+1;return(r==e?"  > ":"    ")+r+"| "+n}).join("\n");throw n.path=t,n.message=(t||"Jade")+":"+e+"\n"+i+"\n\n"+n.message,n},a.DebugItem=function(n,t){this.lineno=n,this.filename=t},a}(); 

    var templatizer = {};
    templatizer["pages"] = {};

    // body.jade compiled template
    templatizer["body"] = function tmpl_body() {
        return '<body><nav class="navbar navbar-default"><div class="container-fluid"><div class="navbar-header"><a href="/" class="navbar-brand">JSON Web Tokens</a></div><ul class="nav navbar-nav"><li><a href="/">home</a></li></ul><ul class="nav navbar-nav navbar-right"><li class="dropdown"><a data-hook="currentUserName"></a></li><li><a href="javascript:void(0)" data-hook="action-logout">Logout</a></li></ul></div></nav><div class="container"><main data-hook="page-container"></main><footer class="footer-main"><nav class="nav-footer cf"><div><a href="http://ampersandjs.com/learn" class="nav-item external">Learn</a><a href="http://ampersandjs.com/docs" class="nav-item external">Docs</a><a href="http://tools.ampersandjs.com" class="nav-item external">Modules</a></div><div><a href="https://gitter.im/AmpersandJS/AmpersandJS" class="nav-item external">Chatroom</a><a href="https://trello.com/b/UxylNzHr/ampersand-js-roadmap" class="nav-item external">Roadmap</a><a href="http://ampersandjs.com/contribute" class="nav-item external">Contribute</a></div><div><a href="http://ampersandjs.com/security" class="nav-item external">Security</a><a href="https://github.com/ampersandjs" class="nav-item external">Github</a><a href="https://twitter.com/ampersandjs" class="nav-item external">Twitter</a></div></nav><p>Sponsored by <a href="https://andyet.com">&amp;yet </a><br/>with the help of our <a href="http://ampersandjs.com/contribute">contributors</a></p><a href="http://ampersandjs.com" class="logo logo-ampersand-pink">&amp;</a></footer></div></body>';
    };

    // head.jade compiled template
    templatizer["head"] = function tmpl_head() {
        return '<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0"/><meta name="apple-mobile-web-app-capable" content="yes"/>';
    };

    // pages/home.jade compiled template
    templatizer["pages"]["home"] = function tmpl_pages_home() {
        return '<section class="page home"><h2>JWT\'s in Ampersand</h2><p>Your login token is:</p><p data-hook="loginToken"></p><p>You are seeing this page because you have a valid login token. To validate the token before the page was rendered we made a request to the API to load Admin Root\'s user details. If your model extends the baseModel then every request made to the API will have the token in the header.</p><p>Please review the app.js to see the implementation details.</p></section>';
    };

    return templatizer;
}));
