import{d as s,z as a,f as l,w as n,g as e,h as t,i as c,F as i,A as r,p as o,b as d,B as u,u as p,t as _,x as v,j as f}from"./vendor.d256638c.js";o("data-v-4326f1ef");const g={class:"user-follows-list"},m={class:"list fss fw"},w=["src"],h={class:"center ml10"},k={class:"name-wrap"},y=["onClick"],C={key:0,class:"icon_user_follows_v"},b={class:"msg"},j={class:"td_u"},x=f("动态"),A={class:"c0"},I={class:"td_u"},q=f("关注"),z={class:"c0"},B={class:"td_u"},F=f("粉丝"),S={class:"c0"},U={class:"desc"},D={class:"d_ib t_ovl1"},E=c("div",{class:"right"},[c("i",{class:"icon_user_follows_follow_btn"},[c("span",null,"关注")])],-1);d();var G=s({props:{list:{type:Array,required:!0}},setup(s){const o=a();return(a,d)=>{const f=l("loading");return n((e(),t("div",g,[c("div",m,[(e(!0),t(i,null,r(s.list,((a,l)=>(e(),t("div",{class:u(["item fss",l===s.list.length-1||l===s.list.length-2?"n":""])},[c("img",{src:a.avatarUrl+"?param=60y60",alt:""},null,8,w),c("div",h,[c("div",k,[c("span",{class:"name c0 td_u",onClick:s=>p(o).push("/user/home?id="+a.userId)},_(a.nickname),9,y),a.authStatus?(e(),t("i",C)):v("",!0),a.gender?(e(),t("i",{key:1,class:u("icon_user_follows_gender_"+(1===a.gender?"m":"w"))},null,2)):v("",!0)]),c("div",b,[c("span",j,[x,c("span",A,_(a.eventCount),1)]),c("span",I,[q,c("span",z,_(a.eventCount),1)]),c("span",B,[F,c("span",S,_(a.eventCount),1)])]),c("div",U,[c("span",D,_(a.signature),1)])]),E],2)))),256))])],512)),[[f,0===s.list.length]])}}});G.__scopeId="data-v-4326f1ef";export{G as _};
