import{d as a,z as e,U as t,r as s,o as l,q as r,f as u,w as n,g as o,h as i,D as v,v as c,s as g,x as d,p,b as P,i as m}from"./vendor.d256638c.js";import{_ as f}from"./Title.df053e60.js";import{_ as y}from"./AlbumList.a1e1c213.js";import{_}from"./Pagination.978ba472.js";import{h as L}from"./index.f8e01513.js";p("data-v-dd935482");const h={class:"playlist-wrap"},j=m("span",{class:"icon_btn_hot"},"热门",-1);P();var b=a({setup(a){const p=e();t("router",p);const P=s(),m=s({currentPage:1,totalPage:0,isLoading:!1}),b=(a,e)=>{const t=m.value.currentPage;({page:()=>"page"===a&&e?m.value.currentPage=e:null,prev:()=>m.value.currentPage=1===t||2===t?1:t-1,next:()=>m.value.currentPage=t===m.value.totalPage||t+1===m.value.totalPage?m.value.totalPage:t+1})[a]()},x=async(a=1)=>{m.value.isLoading=!0,P.value=await L(a),m.value.totalPage=Math.ceil(P.value.total/35),m.value.isLoading=!1};return l((async()=>{x()})),r((()=>m.value.currentPage),(()=>{x(m.value.currentPage).then((()=>{var a;return null==(a=document.querySelector(".page"))?void 0:a.scrollTo(0,0)}))})),(a,e)=>{var t;const s=u("loading");return n((o(),i("div",h,[v(f,{title:"全部"},{right:c((()=>[j])),_:1}),void 0!==P.value?(o(),g(y,{key:0,playLists:null==(t=P.value)?void 0:t.playlists},null,8,["playLists"])):d("",!0),v(_,{currentPage:m.value.currentPage,endPage:m.value.totalPage,click:b},null,8,["currentPage","endPage"])],512)),[[s,m.value.isLoading]])}}});b.__scopeId="data-v-dd935482";export{b as default};
