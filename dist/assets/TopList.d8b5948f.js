import{d as a,e as t,f as e,g as s}from"./index.f8e01513.js";import{h as l}from"./moment.423e2916.js";import{_ as n,a as o}from"./CommentHead.9aef55ce.js";import{_ as i}from"./SongList.9e1a3a65.js";import{d as c,f as r,g as u,h as m,A as d,F as v,p,b as g,i as h,t as w,w as f,B as D,n as _,j as b,G as y,r as C,o as P,q as j,D as k,x as I}from"./vendor.d256638c.js";import{_ as M}from"./Pagination.978ba472.js";import"./index.45387715.js";p("data-v-1ea7309a");const q={class:"title"},x=["src"],U={class:"msg fd_col"},F={class:"name"},T={class:"update_msg"};g();var O=c({props:{feature:{type:Object,required:!0},media:{type:Object,required:!0},showDataId:{type:Number,default:0}},setup:a=>(t,e)=>{const s=r("loading");return u(!0),m(v,null,d([a.feature,a.media],(t=>(u(),m("div",{class:"list",key:t.id},[h("div",q,[h("span",null,w(t.title),1)]),f(h("div",{class:"content",style:_(0===t.list.length?"height:240px":"")},[(u(!0),m(v,null,d(t.list,(t=>(u(),m("div",{class:D(["item fsc",a.showDataId===t.id?"active":""]),key:t.id},[h("img",{src:t.coverImgUrl+"?param=40y40",alt:""},null,8,x),h("div",U,[h("span",F,w(t.name),1),h("span",T,w(t.updateFrequency),1)])],2)))),128))],4),[[s,0===t.list.length]])])))),128)}});O.__scopeId="data-v-1ea7309a",p("data-v-bdba3324");const Y={class:"list-head fss"},H={class:"cover pr"},N=["src"],B=h("i",{class:"msk pa"},null,-1),R={class:"msg"},S={class:"name"},A={class:"update-time fsc"},G=h("i",{class:"icons_img"},null,-1),L={class:"btns fsc"},z=y('<span data-v-bdba3324><a class="icons1_img play_btn pr" href="javascript:;" title="播放" data-v-bdba3324><i class="icons1_img" data-v-bdba3324><i class="icons1_img" data-v-bdba3324></i><span class="text pa" data-v-bdba3324>播放</span></i></a><a class="icons1_img add_icon" href="javascript:;" title="添加到播放列表" data-v-bdba3324></a></span>',1),E={class:"icons1_img collect_icon pr",href:"javascript:;"},J=h("i",{class:"icons1_img pa"},null,-1),K={class:"icons1_img share_icon pr",href:"javascript:;"},Q=h("i",{class:"icons1_img pa"},null,-1),V=h("span",null,[h("a",{class:"icons1_img download_icon pr",href:"javascript:;"},[b("下载"),h("i",{class:"icons1_img pa"})])],-1),W={class:"icons1_img comment_icon pr",href:"javascript:;"},X=h("i",{class:"icons1_img pa"},null,-1);g();var Z=c({props:{showData:{type:Object,required:!0},format:{type:Function,required:!0},getUpdateMsg:{type:Function,required:!0}},setup:a=>(t,e)=>(u(),m("div",Y,[h("div",H,[h("img",{src:a.showData.coverImgUrl+"?param=150y150",alt:""},null,8,N),B]),h("div",R,[h("div",S,w(a.showData.name),1),h("div",A,[G,h("span",null,"最近更新："+w(a.format(a.showData.updateTime,"MM月DD日")),1),h("span",null,w("("+a.getUpdateMsg()+")"),1)]),h("div",L,[z,h("span",null,[h("a",E,[b(w("("+a.showData.subscribedCount+")"),1),J])]),h("span",null,[h("a",K,[b(w("("+a.showData.shareCount+")"),1),Q])]),V,h("span",null,[h("a",W,[b(w("("+a.showData.commentCount+")"),1),X])])])])]))});Z.__scopeId="data-v-bdba3324",p("data-v-46a00ded");const $={class:"top-list-page fss"},aa={class:"top-list-wrap fss"},ta={class:"left"},ea={class:"list-wrap"},sa={class:"title fpbc"},la=h("span",{class:"title-name"},"歌曲列表",-1),na=b(" 播放："),oa={style:{color:"#c20c0c"}},ia=b(" 次 "),ca={class:"comment-list-wrap"},ra={key:0,class:"comment-list-hot"},ua=h("div",{class:"comment-list-hot-title"},"精彩评论",-1),ma={class:"list"},da={class:"comment-list-new"},va={key:0,class:"comment-list-new-title"},pa={class:"pagination"};g();var ga=c({setup(c){const d=(a,t,e="normal")=>({normal:()=>l(a).format(t),compare:()=>{let t=new Date(a),e=(new Date).getTime()-t.getTime();return e<36e5?l(a).startOf("hour").fromNow():e>=36e5&&e<=864e5?l(a).subtract(0,"days").calendar():e>=864e5&&e<=307584e5?l(a).format("MM月DD日 HH:mm"):e>307584e5?l(a).format("YYYY年MM月DD日"):void 0},duration:()=>{let t=l.duration(a),e=t.minutes(),s=t.seconds();return(e>=10?e:"0"+e)+":"+(s>=10?s:"0"+s)}}[e]()),v=C({feature:{id:1,title:"云音乐特色榜",list:[]},media:{id:2,title:"全球媒体榜",list:[]},showData:{id:0,name:"",coverImgUrl:"",updateTime:0,trackCount:0,playCount:0,subscribedCount:0,shareCount:0,commentCount:0,tracks:[],trackIds:[]},comments:{newComments:[],hotComments:[]},currentPage:1,totalPage:0}),p=(a=1)=>{s(v.value.showData.id,a).then((a=>{v.value.comments.newComments=a.comments,v.value.totalPage=Math.ceil(a.total/v.value.comments.newComments.length)}))};P((async()=>{let s=await a();v.value.feature.list=s.list.slice(0,4),v.value.media.list=s.list.slice(4);let l=await t(v.value.feature.list[0].id);v.value.showData=l.playlist,console.log(v.value),p(),e(v.value.showData.id).then((a=>v.value.comments.hotComments=a.data.comments)),console.log(v.value)}));const g=()=>{var a;return null==(a=[...v.value.feature.list,...v.value.media.list].find((a=>a.id===v.value.showData.id)))?void 0:a.updateFrequency},D=(a,t=!0)=>{var e,s;return t?0!==a.alia.length?a.name+"-("+(null==(e=a.alia)?void 0:e[0])+")":a.name:null==(s=a.alia)?void 0:s.join("/")},b=a=>{const t="status_icon_new",e="status_icon_stay",s="status_icon_up",l="status_icon_down";let n=v.value.showData.trackIds[a];return void 0!==n.lr?0===n.lr?e:a>n.lr?l:s:t},y=a=>{let t=v.value.showData.trackIds[a].lr;return void 0===t||0===t?t:Math.abs(t-a)},q=C(""),x=(a,t)=>{const e=v.value.currentPage;({page:()=>"page"===a&&t?v.value.currentPage=t:null,prev:()=>v.value.currentPage=1===e||2===e?1:e-1,next:()=>v.value.currentPage=e===v.value.totalPage||e+1===v.value.totalPage?v.value.totalPage:e+1})[a]()};return j((()=>v.value.currentPage),(()=>{console.log(v.value.currentPage),p(v.value.currentPage)}),{deep:!0}),(a,t)=>{const e=r("loading");return u(),m("div",$,[h("div",aa,[h("div",ta,[k(O,{feature:v.value.feature,media:v.value.media,showDataId:v.value.showData.id},null,8,["feature","media","showDataId"])]),f(h("div",{class:"right",style:_(0===v.value.showData.id?"height:calc(100vh - 105px)":"")},[k(Z,{showData:v.value.showData,format:d,getUpdateMsg:g},null,8,["showData"]),h("div",ea,[h("div",sa,[h("div",null,[la,h("span",null,w(v.value.showData.trackCount)+"首歌",1)]),h("div",null,[na,h("span",oa,w(v.value.showData.playCount),1),ia])]),k(i,{list:v.value.showData.tracks,getTitle:D,getStatus:b,getRankNumber:y,format:d},null,8,["list"])]),h("div",ca,[k(n,{commentContent:q.value,commentCount:v.value.showData.commentCount},null,8,["commentContent","commentCount"]),1===v.value.currentPage?(u(),m("div",ra,[ua,h("div",ma,[k(o,{comments:v.value.comments.hotComments,showBeReplied:!1},null,8,["comments"])])])):I("",!0),h("div",da,[1===v.value.currentPage?(u(),m("div",va," 最新评论("+w(v.value.showData.commentCount)+") ",1)):I("",!0),k(o,{comments:v.value.comments.newComments},null,8,["comments"])])]),h("div",pa,[k(M,{currentPage:v.value.currentPage,endPage:v.value.totalPage,click:x},null,8,["currentPage","endPage"])])],4),[[e,0===v.value.showData.id]])])])}}});ga.__scopeId="data-v-46a00ded";export{ga as default};
