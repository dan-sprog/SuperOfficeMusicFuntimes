// Backbone.js 0.9.9 (modified to add AMD registration)

// (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
// Backbone may be freely distributed under the MIT license.
// For all details and documentation:
// http://backbonejs.org
(function(k,f){typeof exports!=="undefined"?f(k,exports,require("underscore")):typeof define==="function"&&define.amd?define(["underscore","jquery","exports"],function(e,i,q){k.Backbone=f(k,q,e,i)}):k.Backbone=f(k,{},k._,k.jQuery||k.Zepto||k.ender)})(this,function(k,f,e,i){var q=k.Backbone,m=[],y=m.push,r=m.slice,z=m.splice;f.VERSION="0.9.9";f.$=i;f.noConflict=function(){k.Backbone=q;return this};f.emulateHTTP=false;f.emulateJSON=false;var s=/\s+/,n=function(a,b,c,d){if(!c)return true;if(typeof c===
"object")for(var g in c)a[b].apply(a,[g,c[g]].concat(d));else if(s.test(c)){c=c.split(s);g=0;for(var e=c.length;g<e;g++)a[b].apply(a,[c[g]].concat(d))}else return true},t=function(a,b,c){var d,a=-1,e=b.length;switch(c.length){case 0:for(;++a<e;)(d=b[a]).callback.call(d.ctx);break;case 1:for(;++a<e;)(d=b[a]).callback.call(d.ctx,c[0]);break;case 2:for(;++a<e;)(d=b[a]).callback.call(d.ctx,c[0],c[1]);break;case 3:for(;++a<e;)(d=b[a]).callback.call(d.ctx,c[0],c[1],c[2]);break;default:for(;++a<e;)(d=b[a]).callback.apply(d.ctx,
c)}},i=f.Events={on:function(a,b,c){if(!n(this,"on",a,[b,c])||!b)return this;this._events||(this._events={});(this._events[a]||(this._events[a]=[])).push({callback:b,context:c,ctx:c||this});return this},once:function(a,b,c){if(!n(this,"once",a,[b,c])||!b)return this;var d=this,g=e.once(function(){d.off(a,g);b.apply(this,arguments)});g._callback=b;this.on(a,g,c);return this},off:function(a,b,c){var d,g,f,h,j,u,i,k;if(!this._events||!n(this,"off",a,[b,c]))return this;if(!a&&!b&&!c)return this._events=
{},this;h=a?[a]:e.keys(this._events);for(j=0,u=h.length;j<u;j++)if(a=h[j],d=this._events[a]){f=[];if(b||c)for(i=0,k=d.length;i<k;i++)g=d[i],(b&&b!==(g.callback._callback||g.callback)||c&&c!==g.context)&&f.push(g);this._events[a]=f}return this},trigger:function(a){if(!this._events)return this;var b=r.call(arguments,1);if(!n(this,"trigger",a,b))return this;var c=this._events[a],d=this._events.all;c&&t(this,c,b);d&&t(this,d,arguments);return this},listenTo:function(a,b,c){var d=this._listeners||(this._listeners=
{}),g=a._listenerId||(a._listenerId=e.uniqueId("l"));d[g]=a;a.on(b,c||this,this);return this},stopListening:function(a,b,c){var d=this._listeners;if(d){if(a)a.off(b,c,this),!b&&!c&&delete d[a._listenerId];else{for(var e in d)d[e].off(null,null,this);this._listeners={}}return this}}};i.bind=i.on;i.unbind=i.off;e.extend(f,i);var o=f.Model=function(a,b){var c,d=a||{};this.cid=e.uniqueId("c");this.changed={};this.attributes={};this._changes=[];if(b&&b.collection)this.collection=b.collection;b&&b.parse&&
(d=this.parse(d));(c=e.result(this,"defaults"))&&e.defaults(d,c);this.set(d,{silent:true});this._currentAttributes=e.clone(this.attributes);this._previousAttributes=e.clone(this.attributes);this.initialize.apply(this,arguments)};e.extend(o.prototype,i,{changed:null,idAttribute:"id",initialize:function(){},toJSON:function(){return e.clone(this.attributes)},sync:function(){return f.sync.apply(this,arguments)},get:function(a){return this.attributes[a]},escape:function(a){return e.escape(this.get(a))},
has:function(a){return this.get(a)!=null},set:function(a,b,c){var d,g;if(a==null)return this;e.isObject(a)?(g=a,c=b):(g={})[a]=b;var a=c&&c.silent,f=c&&c.unset;if(!this._validate(g,c))return false;if(this.idAttribute in g)this.id=g[this.idAttribute];var h=this.attributes;for(d in g)b=g[d],f?delete h[d]:h[d]=b,this._changes.push(d,b);this._hasComputed=false;a||this.change(c);return this},unset:function(a,b){return this.set(a,void 0,e.extend({},b,{unset:true}))},clear:function(a){var b={},c;for(c in this.attributes)b[c]=
void 0;return this.set(b,e.extend({},a,{unset:true}))},fetch:function(a){a=a?e.clone(a):{};if(a.parse===void 0)a.parse=true;var b=this,c=a.success;a.success=function(d){if(!b.set(b.parse(d),a))return false;c&&c(b,d,a)};return this.sync("read",this,a)},save:function(a,b,c){var d,g,f;a==null||e.isObject(a)?(d=a,c=b):a!=null&&((d={})[a]=b);c=c?e.clone(c):{};if(c.wait){if(d&&!this._validate(d,c))return false;g=e.clone(this.attributes)}a=e.extend({},c,{silent:true});if(d&&!this.set(d,c.wait?a:c))return false;
if(!d&&!this._validate(null,c))return false;var h=this,j=c.success;c.success=function(a){f=true;var b=h.parse(a);c.wait&&(b=e.extend(d||{},b));if(!h.set(b,c))return false;j&&j(h,a,c)};b=this.isNew()?"create":c.patch?"patch":"update";if(b=="patch")c.attrs=d;b=this.sync(b,this,c);!f&&c.wait&&(this.clear(a),this.set(g,a));return b},destroy:function(a){var a=a?e.clone(a):{},b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};a.success=function(e){(a.wait||b.isNew())&&d();c&&c(b,e,a)};
if(this.isNew())return a.success(),false;var g=this.sync("delete",this,a);a.wait||d();return g},url:function(){var a=e.result(this,"urlRoot")||e.result(this.collection,"url")||v();return this.isNew()?a:a+(a.charAt(a.length-1)==="/"?"":"/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},change:function(a){var b=this._changing;this._changing=true;var c=this._computeChanges(true);this._pending=
!!c.length;for(var d=c.length-2;d>=0;d-=2)this.trigger("change:"+c[d],this,c[d+1],a);if(b)return this;for(;this._pending;)this._pending=false,this.trigger("change",this,a),this._previousAttributes=e.clone(this.attributes);this._changing=false;return this},hasChanged:function(a){this._hasComputed||this._computeChanges();return a==null?!e.isEmpty(this.changed):e.has(this.changed,a)},changedAttributes:function(a){if(!a)return this.hasChanged()?e.clone(this.changed):false;var b,c=false,d=this._previousAttributes,
g;for(g in a)if(!e.isEqual(d[g],b=a[g]))(c||(c={}))[g]=b;return c},_computeChanges:function(a){this.changed={};for(var b={},c=[],d=this._currentAttributes,e=this._changes,f=e.length-2;f>=0;f-=2){var h=e[f],j=e[f+1];b[h]||(b[h]=true,d[h]!==j&&(this.changed[h]=j,a&&(c.push(h,j),d[h]=j)))}if(a)this._changes=[];this._hasComputed=true;return c},previous:function(a){return a==null||!this._previousAttributes?null:this._previousAttributes[a]},previousAttributes:function(){return e.clone(this._previousAttributes)},
_validate:function(a,b){if(!this.validate)return true;var a=e.extend({},this.attributes,a),c=this.validate(a,b);if(!c)return true;b&&b.error&&b.error(this,c,b);this.trigger("error",this,c,b);return false}});var p=f.Collection=function(a,b){b||(b={});if(b.model)this.model=b.model;if(b.comparator!==void 0)this.comparator=b.comparator;this._reset();this.initialize.apply(this,arguments);a&&this.reset(a,e.extend({silent:true},b))};e.extend(p.prototype,i,{model:o,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},
sync:function(){return f.sync.apply(this,arguments)},add:function(a,b){var c,d,g,f,h=b&&b.at,j=(b&&b.sort)==null?true:b.sort,a=e.isArray(a)?a.slice():[a];for(c=a.length-1;c>=0;c--)(d=this._prepareModel(a[c],b))?(a[c]=d,(g=d.id!=null&&this._byId[d.id])||this._byCid[d.cid]?(b&&b.merge&&g&&(g.set(d.attributes,b),f=j),a.splice(c,1)):(d.on("all",this._onModelEvent,this),this._byCid[d.cid]=d,d.id!=null&&(this._byId[d.id]=d))):(this.trigger("error",this,a[c],b),a.splice(c,1));a.length&&(f=j);this.length+=
a.length;c=[h!=null?h:this.models.length,0];y.apply(c,a);z.apply(this.models,c);f&&this.comparator&&h==null&&this.sort({silent:true});if(b&&b.silent)return this;for(;d=a.shift();)d.trigger("add",d,this,b);return this},remove:function(a,b){var c,d,g,f;b||(b={});a=e.isArray(a)?a.slice():[a];for(c=0,d=a.length;c<d;c++)if(f=this.get(a[c])){delete this._byId[f.id];delete this._byCid[f.cid];g=this.indexOf(f);this.models.splice(g,1);this.length--;if(!b.silent)b.index=g,f.trigger("remove",f,this,b);this._removeReference(f)}return this},
push:function(a,b){a=this._prepareModel(a,b);this.add(a,e.extend({at:this.length},b));return a},pop:function(a){var b=this.at(this.length-1);this.remove(b,a);return b},unshift:function(a,b){a=this._prepareModel(a,b);this.add(a,e.extend({at:0},b));return a},shift:function(a){var b=this.at(0);this.remove(b,a);return b},slice:function(a,b){return this.models.slice(a,b)},get:function(a){return a==null?void 0:this._byId[a.id!=null?a.id:a]||this._byCid[a.cid||a]},at:function(a){return this.models[a]},where:function(a){return e.isEmpty(a)?
[]:this.filter(function(b){for(var c in a)if(a[c]!==b.get(c))return false;return true})},sort:function(a){if(!this.comparator)throw Error("Cannot sort a set without a comparator");e.isString(this.comparator)||this.comparator.length===1?this.models=this.sortBy(this.comparator,this):this.models.sort(e.bind(this.comparator,this));(!a||!a.silent)&&this.trigger("sort",this,a);return this},pluck:function(a){return e.invoke(this.models,"get",a)},update:function(a,b){var c,d,g,f,h=[],j=[],i={},k=this.model.prototype.idAttribute,
b=e.extend({add:true,merge:true,remove:true},b);b.parse&&(a=this.parse(a));e.isArray(a)||(a=a?[a]:[]);if(b.add&&!b.remove)return this.add(a,b);for(d=0,g=a.length;d<g;d++)c=a[d],f=this.get(c.id||c.cid||c[k]),b.remove&&f&&(i[f.cid]=true),(b.add&&!f||b.merge&&f)&&h.push(c);if(b.remove)for(d=0,g=this.models.length;d<g;d++)c=this.models[d],i[c.cid]||j.push(c);j.length&&this.remove(j,b);h.length&&this.add(h,b);return this},reset:function(a,b){b||(b={});b.parse&&(a=this.parse(a));for(var c=0,d=this.models.length;c<
d;c++)this._removeReference(this.models[c]);b.previousModels=this.models;this._reset();a&&this.add(a,e.extend({silent:true},b));b.silent||this.trigger("reset",this,b);return this},fetch:function(a){a=a?e.clone(a):{};if(a.parse===void 0)a.parse=true;var b=this,c=a.success;a.success=function(d){b[a.update?"update":"reset"](d,a);c&&c(b,d,a)};return this.sync("read",this,a)},create:function(a,b){var c=this,b=b?e.clone(b):{},a=this._prepareModel(a,b);if(!a)return false;b.wait||c.add(a,b);var d=b.success;
b.success=function(a,b,e){e.wait&&c.add(a,e);d&&d(a,b,e)};a.save(null,b);return a},parse:function(a){return a},clone:function(){return new this.constructor(this.models)},chain:function(){return e(this.models).chain()},_reset:function(){this.length=0;this.models=[];this._byId={};this._byCid={}},_prepareModel:function(a,b){if(a instanceof o){if(!a.collection)a.collection=this;return a}b||(b={});b.collection=this;var c=new this.model(a,b);return!c._validate(a,b)?false:c},_removeReference:function(a){this===
a.collection&&delete a.collection;a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){(a==="add"||a==="remove")&&c!==this||(a==="destroy"&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],b.id!=null&&(this._byId[b.id]=b)),this.trigger.apply(this,arguments))}});e.each("forEach,each,map,collect,reduce,foldl,inject,reduceRight,foldr,find,detect,filter,select,reject,every,all,some,any,include,contains,invoke,max,min,sortedIndex,toArray,size,first,head,take,initial,rest,tail,last,without,indexOf,shuffle,lastIndexOf,isEmpty".split(","),
function(a){p.prototype[a]=function(){var b=r.call(arguments);b.unshift(this.models);return e[a].apply(e,b)}});e.each(["groupBy","countBy","sortBy"],function(a){p.prototype[a]=function(b,c){var d=e.isFunction(b)?b:function(a){return a.get(b)};return e[a](this.models,d,c)}});var m=f.Router=function(a){a||(a={});if(a.routes)this.routes=a.routes;this._bindRoutes();this.initialize.apply(this,arguments)},A=/\((.*?)\)/g,B=/:\w+/g,C=/\*\w+/g,D=/[\-{}\[\]+?.,\\\^$|#\s]/g;e.extend(m.prototype,i,{initialize:function(){},
route:function(a,b,c){e.isRegExp(a)||(a=this._routeToRegExp(a));c||(c=this[b]);f.history.route(a,e.bind(function(d){d=this._extractParameters(a,d);c&&c.apply(this,d);this.trigger.apply(this,["route:"+b].concat(d));f.history.trigger("route",this,b,d)},this));return this},navigate:function(a,b){f.history.navigate(a,b);return this},_bindRoutes:function(){if(this.routes)for(var a,b=e.keys(this.routes);(a=b.pop())!=null;)this.route(a,this.routes[a])},_routeToRegExp:function(a){a=a.replace(D,"\\$&").replace(A,
"(?:$1)?").replace(B,"([^/]+)").replace(C,"(.*?)");return RegExp("^"+a+"$")},_extractParameters:function(a,b){return a.exec(b).slice(1)}});var l=f.History=function(){this.handlers=[];e.bindAll(this,"checkUrl");if(typeof window!=="undefined")this.location=window.location,this.history=window.history},w=/^[#\/]|\s+$/g,E=/^\/+|\/+$/g,F=/msie [\w.]+/,G=/\/$/;l.started=false;e.extend(l.prototype,i,{interval:50,getHash:function(a){return(a=(a||this).location.href.match(/#(.*)$/))?a[1]:""},getFragment:function(a,
b){if(a==null)if(this._hasPushState||!this._wantsHashChange||b){var a=this.location.pathname,c=this.root.replace(G,"");a.indexOf(c)||(a=a.substr(c.length))}else a=this.getHash();return a.replace(w,"")},start:function(a){if(l.started)throw Error("Backbone.history has already been started");l.started=true;this.options=e.extend({},{root:"/"},this.options,a);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=
!(!this.options.pushState||!this.history||!this.history.pushState);var a=this.getFragment(),b=document.documentMode,b=F.exec(navigator.userAgent.toLowerCase())&&(!b||b<=7);this.root=("/"+this.root+"/").replace(E,"/");if(b&&this._wantsHashChange)this.iframe=f.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow,this.navigate(a);if(this._hasPushState)f.$(window).bind("popstate",this.checkUrl);else if(this._wantsHashChange&&"onhashchange"in window&&!b)f.$(window).bind("hashchange",
this.checkUrl);else if(this._wantsHashChange)this._checkUrlInterval=setInterval(this.checkUrl,this.interval);this.fragment=a;a=this.location;b=a.pathname.replace(/[^\/]$/,"$&/")===this.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!b)return this.fragment=this.getFragment(null,true),this.location.replace(this.root+this.location.search+"#"+this.fragment),true;else if(this._wantsPushState&&this._hasPushState&&b&&a.hash)this.fragment=this.getHash().replace(w,""),this.history.replaceState({},
document.title,this.root+this.fragment+a.search);if(!this.options.silent)return this.loadUrl()},stop:function(){f.$(window).unbind("popstate",this.checkUrl).unbind("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);l.started=false},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a===this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe)));if(a===this.fragment)return false;this.iframe&&this.navigate(a);
this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(a){var b=this.fragment=this.getFragment(a);return e.any(this.handlers,function(a){if(a.route.test(b))return a.callback(b),true})},navigate:function(a,b){if(!l.started)return false;if(!b||b===true)b={trigger:b};a=this.getFragment(a||"");if(this.fragment!==a){this.fragment=a;var c=this.root+a;if(this._hasPushState)this.history[b.replace?"replaceState":"pushState"]({},document.title,c);else if(this._wantsHashChange)this._updateHash(this.location,
a,b.replace),this.iframe&&a!==this.getFragment(this.getHash(this.iframe))&&(b.replace||this.iframe.document.open().close(),this._updateHash(this.iframe.location,a,b.replace));else return this.location.assign(c);b.trigger&&this.loadUrl(a)}},_updateHash:function(a,b,c){c?(c=a.href.replace(/(javascript:|#).*$/,""),a.replace(c+"#"+b)):a.hash="#"+b}});f.history=new l;var x=f.View=function(a){this.cid=e.uniqueId("view");this._configure(a||{});this._ensureElement();this.initialize.apply(this,arguments);
this.delegateEvents()},H=/^(\S+)\s*(.*)$/,I="model,collection,el,id,attributes,className,tagName,events".split(",");e.extend(x.prototype,i,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},make:function(a,b,c){a=document.createElement(a);b&&f.$(a).attr(b);c!=null&&f.$(a).html(c);return a},setElement:function(a,b){this.$el&&this.undelegateEvents();this.$el=a instanceof f.$?
a:f.$(a);this.el=this.$el[0];b!==false&&this.delegateEvents();return this},delegateEvents:function(a){if(a||(a=e.result(this,"events"))){this.undelegateEvents();for(var b in a){var c=a[b];e.isFunction(c)||(c=this[a[b]]);if(!c)throw Error('Method "'+a[b]+'" does not exist');var d=b.match(H),f=d[1],d=d[2],c=e.bind(c,this);f+=".delegateEvents"+this.cid;d===""?this.$el.bind(f,c):this.$el.delegate(d,f,c)}}},undelegateEvents:function(){this.$el.unbind(".delegateEvents"+this.cid)},_configure:function(a){this.options&&
(a=e.extend({},e.result(this,"options"),a));e.extend(this,e.pick(a,I));this.options=a},_ensureElement:function(){if(this.el)this.setElement(e.result(this,"el"),false);else{var a=e.extend({},e.result(this,"attributes"));if(this.id)a.id=e.result(this,"id");this.className&&(a["class"]=e.result(this,"className"));this.setElement(this.make(e.result(this,"tagName"),a),false)}}});var J={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};f.sync=function(a,b,c){var d=J[a];e.defaults(c||
(c={}),{emulateHTTP:f.emulateHTTP,emulateJSON:f.emulateJSON});var g={type:d,dataType:"json"};if(!c.url)g.url=e.result(b,"url")||v();if(c.data==null&&b&&(a==="create"||a==="update"||a==="patch"))g.contentType="application/json",g.data=JSON.stringify(c.attrs||b.toJSON(c));if(c.emulateJSON)g.contentType="application/x-www-form-urlencoded",g.data=g.data?{model:g.data}:{};if(c.emulateHTTP&&(d==="PUT"||d==="DELETE"||d==="PATCH")){g.type="POST";if(c.emulateJSON)g.data._method=d;var i=c.beforeSend;c.beforeSend=
function(a){a.setRequestHeader("X-HTTP-Method-Override",d);if(i)return i.apply(this,arguments)}}if(g.type!=="GET"&&!c.emulateJSON)g.processData=false;var h=c.success;c.success=function(a,d,e){h&&h(a,d,e);b.trigger("sync",b,a,c)};var j=c.error;c.error=function(a){j&&j(b,a,c);b.trigger("error",b,a,c)};a=f.ajax(e.extend(g,c));b.trigger("request",b,a,c);return a};f.ajax=function(){return f.$.ajax.apply(f.$,arguments)};o.extend=p.extend=m.extend=x.extend=l.extend=function(a,b){var c=this,d;d=a&&e.has(a,
"constructor")?a.constructor:function(){c.apply(this,arguments)};e.extend(d,c,b);var f=function(){this.constructor=d};f.prototype=c.prototype;d.prototype=new f;a&&e.extend(d.prototype,a);d.__super__=c.prototype;return d};var v=function(){throw Error('A "url" property or function must be specified');};return f});
