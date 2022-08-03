"use strict";(self.webpackChunkblog=self.webpackChunkblog||[]).push([[999],{1999:function(e,t,o){o.r(t),o.d(t,{default:function(){return A}}),o(2526),o(1817);var r=o(6252),n=o(3577),s={class:"p-4"},i=(0,r._)("p",{class:"text-2xl mb-8"},"Do you really want to remove this post?",-1),a={class:"flex justify-center items-center space-x-4"},c=(0,r.Uk)(" Remove "),u=(0,r._)("svg",{class:"w-5 h-5 text-white ml-2"},[(0,r._)("use",{"xlink:href":"/sprite.svg#tick"})],-1),l=(0,r.Uk)(" Cancel "),p=(0,r._)("svg",{class:"w-5 h-5 text-white ml-2"},[(0,r._)("use",{"xlink:href":"/sprite.svg#close"})],-1),d={key:2},f={key:3},g={class:"bg-white rounded-lg shadow-lg p-4 space-y-4"},w={class:"flex items-center justify-between border-b border-gray-200 pb-4"},h={class:"flex items-center"},v={class:"w-12 h-12 mr-4 rounded-full overflow-hidden p-0.5 border-2 border-[#9333ea]"},y=["src"],m={class:"font-semibold text-lg text-gray-800"},b=(0,r.Uk)(" By "),k={class:"text-[#9333ea]"},D=(0,r.Uk)(" published "),x={class:"font-normal"},_=(0,r._)("svg",{class:"w-5 h-5 text-gray-700"},[(0,r._)("use",{"xlink:href":"/sprite.svg#dots"})],-1),j=["src"],O={key:1,class:"text-2xl font-semibold break-word"},P={class:"text-gray-800 leading-loose break-word"};o(7941),o(7327),o(1539),o(5003),o(4747),o(9337),o(8674),o(5666);var C=o(989),S=o(7712),U=o(9665),L=o(3516);function R(e,t,o,r,n,s,i){try{var a=e[s](i),c=a.value}catch(e){return void o(e)}a.done?t(c):Promise.resolve(c).then(r,n)}function B(e){return function(){var t=this,o=arguments;return new Promise((function(r,n){var s=e.apply(t,o);function i(e){R(s,r,n,i,a,"next",e)}function a(e){R(s,r,n,i,a,"throw",e)}i(void 0)}))}}function I(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function M(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?I(Object(o),!0).forEach((function(t){q(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):I(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function q(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var z={name:"SinglePost",components:{PostDropdown:U.Z,Modal:L.Z},data:function(){return{showModal:!1,isLoading:!1,post:null,postAuthor:null,postCategory:null,showDropDown:!1}},computed:M({},(0,C.Se)("auth",["isLoggedIn"])),methods:M(M(M(M(M({},(0,C.nv)("posts",["fetchSinglePostByID","removePost"])),(0,C.nv)("auth",["fetchUserByID"])),(0,C.nv)("categories",["fetchCategoryByID"])),(0,C.nv)("toast",["SHOW_SUCCESS"])),{},{deletePost:function(){var e=this;return B(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.isLoading=!0,t.next=3,e.removePost(e.post.id);case 3:e.SHOW_SUCCESS("The post has been removed!"),e.$router.push("/"),e.isLoading=!1;case 6:case"end":return t.stop()}}),t)})))()},formatDate:S.p6}),created:function(){var e=this;return B(regeneratorRuntime.mark((function t(){var o;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e.isLoading=!0,o=e.$route.params.id,t.next=4,e.fetchSinglePostByID(o);case 4:return e.post=t.sent,t.next=7,e.fetchUserByID(e.post.creator_id);case 7:return e.postAuthor=t.sent,t.next=10,e.fetchCategoryByID(e.post.category_id);case 10:e.postCategory=t.sent,e.isLoading=!1;case 12:case"end":return t.stop()}}),t)})))()}},A=(0,o(3744).Z)(z,[["render",function(e,t,o,C,S,U){var L=(0,r.up)("MainButton"),R=(0,r.up)("Modal"),B=(0,r.up)("Spinner"),I=(0,r.up)("router-link"),M=(0,r.up)("PostDropdown"),q=(0,r.Q2)("click-outside");return(0,r.wg)(),(0,r.iD)(r.HY,null,[S.showModal?((0,r.wg)(),(0,r.j4)(R,{key:0},{default:(0,r.w5)((function(){return[(0,r._)("div",s,[i,(0,r._)("div",a,[(0,r.Wm)(L,{type:"button",class:"flex items-center",onClick:t[0]||(t[0]=function(e){U.deletePost(),S.showModal=!1})},{default:(0,r.w5)((function(){return[c,u]})),_:1}),(0,r.Wm)(L,{type:"button",class:"bg-red-500 hover:bg-red-600 flex items-center focus:ring-0",onClick:t[1]||(t[1]=function(e){return S.showModal=!1})},{default:(0,r.w5)((function(){return[l,p]})),_:1})])])]})),_:1})):(0,r.kq)("v-if",!0),S.isLoading?((0,r.wg)(),(0,r.j4)(B,{key:1,class:"mx-auto mt-5"})):S.post?((0,r.wg)(),(0,r.iD)("div",f,[(0,r._)("div",g,[(0,r._)("div",w,[(0,r._)("div",h,[(0,r._)("div",v,[(0,r._)("img",{class:"w-full h-full object-cover rounded-full",src:S.postAuthor.photoURL,alt:""},null,8,y)]),(0,r._)("div",null,[(0,r._)("p",m,[b,(0,r._)("span",k,(0,n.zw)(S.postAuthor.displayName),1),D,(0,r._)("span",x,(0,n.zw)(U.formatDate(S.post.timestamp.seconds)||""),1)]),S.postCategory?((0,r.wg)(),(0,r.j4)(I,{key:0,to:"/categories/".concat(S.postCategory.title),class:"text-gray-500 hover:underline"},{default:(0,r.w5)((function(){return[(0,r.Uk)((0,n.zw)(S.postCategory.title),1)]})),_:1},8,["to"])):(0,r.kq)("v-if",!0)])]),e.isLoggedIn?((0,r.wg)(),(0,r.iD)("button",{key:0,onClick:t[4]||(t[4]=function(e){return S.showDropDown=!S.showDropDown}),id:"openDropdown",type:"button",class:"w-8 h-8 transition-all rounded-full flex items-center justify-center relative"},[_,S.showDropDown?(0,r.wy)(((0,r.wg)(),(0,r.j4)(M,{key:0,onRemove:t[2]||(t[2]=function(e){return S.showModal=!0}),onUpdate:t[3]||(t[3]=function(t){return e.$router.push("/update-post/".concat(S.post.id))}),trigger:"openDropdown",class:"absolute top-full mt-4 -right-2 block"},null,512)),[[q,function(){return S.showDropDown=!1}]]):(0,r.kq)("v-if",!0)])):(0,r.kq)("v-if",!0)]),S.post.photoURL?((0,r.wg)(),(0,r.iD)("img",{key:0,class:"aspect-video w-full h-full object-cover rounded-lg",src:S.post.photoURL,alt:""},null,8,j)):(0,r.kq)("v-if",!0),S.post.title?((0,r.wg)(),(0,r.iD)("h3",O,(0,n.zw)(S.post.title),1)):(0,r.kq)("v-if",!0),(0,r._)("p",P,(0,n.zw)(S.post.description),1)])])):((0,r.wg)(),(0,r.iD)("div",d,"Such a post doesn't exist"))],64)}]])}}]);