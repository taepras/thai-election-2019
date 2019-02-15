webpackJsonp([1],{"A4Z/":function(t,a){},M40d:function(t,a){},NHnr:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("7+uW"),r=e("mtWM"),s=e.n(r),i={name:"App",data:function(){return{candidates:{},areas:{},parties:{}}},created:function(){var t=this;s.a.all([s.a.get("/static/data/candidates.json"),s.a.get("/static/data/areas.json"),s.a.get("/static/data/parties.json")]).then(s.a.spread(function(a,e,n){t.preprocessData(a.data,e.data,n.data)}))},methods:{preprocessData:function(t,a,e){for(var n in t)for(var r in t[n])for(var s in t[n][r]){var i=t[n][r][s].party;e[i]||(e[i]={candidateCount:0}),e[i].candidateCount||(e[i].candidateCount=0),e[i].candidateCount++}for(var o in e)e[o].candidateCount||(e[o].candidateCount=0);this.candidates=t,this.areas=a,this.parties=e}}},o={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{attrs:{id:"app"}},[a("transition",{attrs:{name:"fade",mode:"out-in"}},[a("keep-alive",[a("router-view",{attrs:{candidates:this.candidates,areas:this.areas,parties:this.parties}})],1)],1)],1)},staticRenderFns:[]};var c=e("VU/8")(i,o,!1,function(t){e("b19c")},null,null).exports,l=e("//Fk"),d=e.n(l),u=e("/ocq"),v={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"hello"},[e("h1",[t._v(t._s(t.msg))]),t._v(" "),e("h2",[t._v("Essential Links")]),t._v(" "),t._m(0),t._v(" "),e("h2",[t._v("Ecosystem")]),t._v(" "),t._m(1)])},staticRenderFns:[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ul",[e("li",[e("a",{attrs:{href:"https://vuejs.org",target:"_blank"}},[t._v("\n        Core Docs\n      ")])]),t._v(" "),e("li",[e("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank"}},[t._v("\n        Forum\n      ")])]),t._v(" "),e("li",[e("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank"}},[t._v("\n        Community Chat\n      ")])]),t._v(" "),e("li",[e("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank"}},[t._v("\n        Twitter\n      ")])]),t._v(" "),e("br"),t._v(" "),e("li",[e("a",{attrs:{href:"http://vuejs-templates.github.io/webpack/",target:"_blank"}},[t._v("\n        Docs for This Template\n      ")])])])},function(){var t=this.$createElement,a=this._self._c||t;return a("ul",[a("li",[a("a",{attrs:{href:"http://router.vuejs.org/",target:"_blank"}},[this._v("\n        vue-router\n      ")])]),this._v(" "),a("li",[a("a",{attrs:{href:"http://vuex.vuejs.org/",target:"_blank"}},[this._v("\n        vuex\n      ")])]),this._v(" "),a("li",[a("a",{attrs:{href:"http://vue-loader.vuejs.org/",target:"_blank"}},[this._v("\n        vue-loader\n      ")])]),this._v(" "),a("li",[a("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank"}},[this._v("\n        awesome-vue\n      ")])])])}]};var h=e("VU/8")({name:"HomePage",data:function(){return{msg:"Welcome to Your Vue.js App"}}},v,!1,function(t){e("eWc4")},"data-v-0f66b6b0",null).exports,p=e("Dd8w"),_=e.n(p),f=e("woOf"),m=e.n(f),g=e("fZjL"),y=e.n(g),C={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"accordion",class:this.accordionClasses},[a("div",{staticClass:"above",on:{click:this.toggleAccordion}},[this._t("above")],2),this._v(" "),a("div",{staticClass:"below"},[this._t("below")],2)])},staticRenderFns:[]};var b=e("VU/8")({data:function(){return{isOpen:!1}},methods:{toggleAccordion:function(){this.isOpen=!this.isOpen,this.$emit("update",this.isOpen)}},computed:{accordionClasses:function(){return{"is-closed":!this.isOpen,"is-primary":this.isOpen,"is-dark":!this.isOpen}}}},C,!1,function(t){e("cumn")},null,null).exports,k={name:"FloatingCard",props:{height:{type:Number,default:3}},computed:{shadowStyle:function(){return{boxShadow:"0px "+3*this.height+"px "+10*this.height+"px rgba(0, 0, 0, 0.12)"}}}},N={render:function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"card mb-3 floating-card",style:this.shadowStyle},[a("div",{staticClass:"card-body"},[this._t("default")],2)])},staticRenderFns:[]};var w=e("VU/8")(k,N,!1,function(t){e("A4Z/")},null,null).exports,x={name:"AccordionFloatingCard",components:{Accordion:b,FloatingCard:w},data:function(){return{isExpanded:!1}},methods:{onAccordionUpdate:function(t){this.isExpanded=t}}},P={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("floating-card",{class:{expanded:t.isExpanded}},[e("accordion",{on:{update:t.onAccordionUpdate},scopedSlots:t._u([{key:"above",fn:function(){return[e("div",{staticClass:"row"},[e("div",{staticClass:"col-10 floating-card-col"},[t._t("above")],2),t._v(" "),e("div",{staticClass:"col-2 floating-card-col text-right"},[e("i",{staticClass:"fas fa-chevron-down",class:{expanded:t.isExpanded}})])])]},proxy:!0},{key:"below",fn:function(){return[e("hr"),t._v(" "),t._t("below")]},proxy:!0}])})],1)},staticRenderFns:[]};var S=e("VU/8")(x,P,!1,function(t){e("t/Ed")},null,null).exports,A={name:"Candidate",components:{AccordionFloatingCard:S},props:["candidate","parties"],computed:{partyLogo:function(){return"/static/logo/"+this.candidate.party+".png"}}},E={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("accordion-floating-card",{scopedSlots:t._u([{key:"above",fn:function(){return[e("div",{staticClass:"row candidate"},[e("div",{staticClass:"col-2 floating-card-col candidate-number"},[t._v(t._s(+t.candidate.number))]),t._v(" "),e("div",{staticClass:"col-2 floating-card-col text-center"},[e("div",{staticClass:"logo",style:"background-image:url('"+t.partyLogo+"')"})]),t._v(" "),e("div",{staticClass:"col-8 floating-card-col text-nowrap party-name"},[e("span",[e("b",{staticClass:"accent"},[t._v("พรรค"+t._s(t.candidate.party))]),e("br"),t._v(" "+t._s(t.candidate.title)+" "+t._s(t.candidate.firstName)+" "+t._s(t.candidate.lastName))])])])]},proxy:!0},{key:"below",fn:function(){return[e("div",{staticClass:"row candidate-details"},[e("div",{staticClass:"col"},[t._v("\n                ถ้าเลือก\n                "),e("b",[t._v(t._s(t.candidate.firstName)+" "+t._s(t.candidate.lastName))]),t._v(" จะได้...\n                "),e("ol",[e("li",[t._v("เพิ่มโอกาสให้\n                        "),e("b",[t._v(t._s(t.candidate.title)+" "+t._s(t.candidate.firstName)+" "+t._s(t.candidate.lastName))]),t._v(" เป็นผู้แทนเขต")]),t._v(" "),e("li",[t._v("เพิ่มที่นั่งให้ ส.ส. บัญชีรายชื่อของ\n                        "),e("b",[t._v("พรรค"+t._s(t.candidate.party))]),t._v(" (ไม่จำเป็นต้องชนะเลือกตั้งในเขต)\n                    ")]),t._v(" "),e("li",[e("span",{class:{strikethrough:0==t.parties[t.candidate.party].pm_candidates.length}},[t._v("\n                            ถ้า "),e("b",[t._v("พรรค"+t._s(t.candidate.party))]),t._v(" ได้ที่นั่ง ส.ส. ในสภา 5% ขึ้นไป บุคคลที่พรรคเสนอชื่อเป็นนายกฯ ต่อไปนี้ มีสิทธิ์ได้รับเลือกในสภา:\n                        ")]),t._v(" "),e("ul",[t._l(t.parties[t.candidate.party].pm_candidates,function(a,n){return e("li",{key:n},[t._v("\n                                "+t._s(a.title)+" "+t._s(a.firstName)+" "+t._s(a.lastName)+"\n                            ")])}),t._v(" "),0==t.parties[t.candidate.party].pm_candidates.length?e("li",{staticClass:"text-muted"},[e("i",[t._v("[พรรคนี้ไม่ได้ส่งชื่อแคนดิเดตนายกฯ]")])]):t._e()],2)])]),t._v(" "),e("router-link",{staticClass:"btn btn-primary btn-block",attrs:{to:"/party/"+t.candidate.party}},[t._v("\n                    ดูข้อมูลผู้สมัครของพรรค"+t._s(t.candidate.party)+"\n                ")]),t._v(" "),e("a",{staticClass:"btn btn-outline-secondary btn-block",attrs:{target:"_blank",href:"http://www.google.com/search?q="+t.candidate.firstName+"+"+t.candidate.lastName}},[t._v("\n                    ค้นหาผู้สมัครใน Google\n                    "),e("i",{staticClass:"fas fa-external-link-alt ml-1"})])],1)])]},proxy:!0}])})},staticRenderFns:[]};var T=e("VU/8")(A,E,!1,function(t){e("kdPL")},null,null).exports,U={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("nav",{staticClass:"navbar fixed-top navbar-dark bg-primary"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col col-2 text-left"},[t._t("left",[e("i",{staticClass:"fas fa-arrow-left",on:{click:function(a){return t.back(-1)}}})])],2),t._v(" "),e("div",{staticClass:"col col-8 text-center"},[t._t("center",[t._v("\n                Title\n            ")])],2),t._v(" "),e("div",{staticClass:"col col-2 text-right"},[t._t("right")],2)])])},staticRenderFns:[]};var L=e("VU/8")({name:"Navbar",methods:{back:function(){this.$router.go(-1)}}},U,!1,function(t){e("QgiZ")},null,null).exports,R={provinceMap:{"กรุงเทพมหานคร":"Bangkok","เชียงราย":"Chiang Rai","เชียงใหม่":"Chiang Mai","น่าน":"Nan","พะเยา":"Phayao","แพร่":"Phrae","แม่ฮ่องสอน":"Mae Hong Son","ลำปาง":"Lampang","ลำพูน":"Lamphun","อุตรดิตถ์":"Uttaradit","กาฬสินธุ์":"Kalasin","ขอนแก่น":"Khon Kaen","ชัยภูมิ":"Chaiyaphum","นครพนม":"Nakhon Phanom","นครราชสีมา":"Nakhon Ratchasima","บึงกาฬ":"Bueng Kan","บุรีรัมย์":"Buri Ram","มหาสารคาม":"Maha Sarakham","มุกดาหาร":"Mukdahan","ยโสธร":"Yasothon","ร้อยเอ็ด":"Roi Et","เลย":"Loei","ศรีสะเกษ":"Si Sa Ket","สกลนคร":"Sakon Nakhon","สุรินทร์":"Surin","หนองคาย":"Nong Khai","หนองบัวลำภู":"Nong Bua Lam Phu","อำนาจเจริญ":"Amnat Charoen","อุดรธานี":"Udon Thani","อุบลราชธานี":"Ubon Ratchathani","กำแพงเพชร":"Kamphaeng Phet","ชัยนาท":"Chai Nat","นครนายก":"Nakhon Nayok","นครปฐม":"Nakhon Pathom","นครสวรรค์":"Nakhon Sawan","นนทบุรี":"Nonthaburi","ปทุมธานี":"Pathum Thani","พระนครศรีอยุธยา":"Phra Nakhon Si Ayutthaya","พิจิตร":"Phichit","พิษณุโลก":"Phitsanulok","เพชรบูรณ์":"Phetchabun","ลพบุรี":"Lop Buri","สมุทรปราการ":"Samut Prakan","สมุทรสงคราม":"Samut Songkhram","สมุทรสาคร":"Samut Sakhon","สิงห์บุรี":"Sing Buri","สุโขทัย":"Sukhothai","สุพรรณบุรี":"Suphan Buri","สระบุรี":"Saraburi","อ่างทอง":"Ang Thong","อุทัยธานี":"Uthai Thani","จันทบุรี":"Chanthaburi","ฉะเชิงเทรา":"Chachoengsao","ชลบุรี":"Chon Buri","ตราด":"Trat","ปราจีนบุรี":"Prachin Buri","ระยอง":"Rayong","สระแก้ว":"Sa Kaeo","กาญจนบุรี":"Kanchanaburi","ตาก":"Tak","ประจวบคีรีขันธ์":"Prachuap Khiri Khan","เพชรบุรี":"Phetchaburi","ราชบุรี":"Ratchaburi","กระบี่":"Krabi","ชุมพร":"Chumphon","ตรัง":"Trang","นครศรีธรรมราช":"Nakhon Si Thammarat","นราธิวาส":"Narathiwat","ปัตตานี":"Pattani","พังงา":"Phangnga","พัทลุง":"Phatthalung","ภูเก็ต":"Phuket","ยะลา":"Yala","ระนอง":"Ranong","สงขลา":"Songkhla","สตูล":"Satun","สุราษฎร์ธานี":"Surat Thani"},provinceEnglishToThai:function(t){if(!t)return"";for(var a in this.provinceMap)if(this.provinceMap[a].toLowerCase().replace(/\s/g,"")===t.toLowerCase().replace(/\s/g,""))return a;return""}},$={name:"RegionPage",components:{AccordionFloatingCard:S,Candidate:T,FloatingCard:w,Navbar:L},props:["candidates","areas","parties"],data:function(){return{loading:!0,selectedProvince:"",selectedArea:"",currentSort:"candidateCount",currentSortDir:"desc"}},created:function(){this.selectedProvince=R.provinceEnglishToThai(this.$route.params.province),this.selectedArea=this.$route.params.area,this.init()},computed:{isLoading:function(){return!this.candidates[this.selectedProvince]},candidatesInArea:function(){if(y()(this.candidates).length<=0||!this.selectedProvince||!this.selectedArea)return[];var t=this.candidates[this.selectedProvince][this.selectedArea];return y()(t).map(function(a){var e=m()({},t[a]);return e.number=a,e}).sort(function(t,a){return t.number-a.number})},partiesWithoutCandidate:function(){var t=m()({},this.parties);this.candidatesInArea.forEach(function(a){delete t[a.party]});var a=[];for(var e in t)a.push(_()({},t[e],{partyName:e}));var n=this;return console.log(Array.isArray(a)),Array.isArray(a)&&a.sort(function(t,a){var e=t[n.currentSort]==a[n.currentSort]?0:t[n.currentSort]>a[n.currentSort]?1:-1;return"asc"==n.currentSortDir?e:-e}),console.log(a),a}},methods:{init:function(){this.selectedProvince||(this.selectedProvince=y()(this.areas)[0]),this.selectedArea||(this.selectedArea=y()(this.areas[this.selectedProvince]).sort()[0]),this.updateUrl()},districtList:function(t){var a=[];for(var e in t)t[e].district&&a.push(t[e].district);return a.join(", ")},provinceToEnglish:function(t){return R.provinceMap[t]},provinceToUrl:function(t){return R.provinceMap[t].toLowerCase().replace(/\s/g,"")},provinceChanged:function(){this.selectedArea=y()(this.areas[this.selectedProvince])[0],this.updateUrl()},updateUrl:function(){this.$router.push({path:"/region/"+this.provinceToUrl(this.selectedProvince)+"/"+this.selectedArea})},goToPartyPage:function(t){this.$router.push("/party/"+t)},sort:function(t){t===this.currentSort?this.currentSortDir="asc"===this.currentSortDir?"desc":"asc":this.currentSortDir="asc",this.currentSort=t,console.log("sort",this.currentSort,this.currentSortDir)}},watch:{areas:function(){this.init()}}},F={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"navbar-padding"},[e("navbar",{scopedSlots:t._u([{key:"left",fn:function(){return[e("router-link",{attrs:{to:{path:"/"}}},[e("i",{staticClass:"fas fa-arrow-left"})])]},proxy:!0},{key:"center",fn:function(){return[e("span",{staticClass:"accent"},[t._v(t._s(t.selectedProvince)+" เขต "+t._s(t.selectedArea))])]},proxy:!0},{key:"right",fn:function(){return[e("i",{staticClass:"fas fa-edit"})]},proxy:!0}])}),t._v(" "),e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12"},[e("form",[e("div",{staticClass:"row"},[e("div",{staticClass:"col-6"},[e("label",[t._v("จังหวัด")]),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedProvince,expression:"selectedProvince"}],staticClass:"form-control",attrs:{name:"province",id:"provinces"},on:{change:[function(a){var e=Array.prototype.filter.call(a.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectedProvince=a.target.multiple?e:e[0]},t.provinceChanged]}},t._l(t.areas,function(a,n){return e("option",{key:n,domProps:{value:n}},[t._v("\n                                    "+t._s(n)+"\n                                ")])}),0)]),t._v(" "),e("div",{staticClass:"col-6"},[e("label",[t._v("เขตเลือกตั้ง")]),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.selectedArea,expression:"selectedArea"}],staticClass:"form-control",attrs:{name:"area",id:"areas"},on:{change:[function(a){var e=Array.prototype.filter.call(a.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.selectedArea=a.target.multiple?e:e[0]},t.updateUrl]}},t._l(t.areas[t.selectedProvince],function(a,n){return e("option",{key:n,domProps:{value:n}},[t._v("\n                                    เขต "+t._s(n)+" ("+t._s("กรุงเทพมหานคร"==t.selectedProvince?"เขต":"อำเภอ")+t._s(t.districtList(t.areas[t.selectedProvince][n]))+")\n                                ")])}),0)])])])]),t._v(" "),e("div",{staticClass:"col-12"},[e("hr"),t._v(" "),e("h1",[t._v("รายชื่อผู้สมัคร ส.ส. เขต")]),t._v(" "),e("p",[t._v("จังหวัด"+t._s(t.selectedProvince)),e("br"),t._v("เขต "+t._s(t.selectedArea)+" ("+t._s("กรุงเทพมหานคร"==t.selectedProvince?"เขต":"อำเภอ")+t._s(t.areas[t.selectedProvince]?t.districtList(t.areas[t.selectedProvince][t.selectedArea]):" -")+")")]),t._v(" "),e("hr"),t._v(" "),e("div",{staticClass:"alert alert-danger"},[t._v("*หมายเหตุ: แต่ละเขตเรียงหมายเลขไม่เหมือนกัน")]),t._v(" "),t._m(0),t._v(" "),t.isLoading?e("floating-card",{staticClass:"text-center"},[t._v("\n                    กำลังโหลดข้อมูล\n                    "),e("i",{staticClass:"fas fa-spinner fa-pulse"})]):t._e(),t._v(" "),t._l(t.candidatesInArea,function(a,n){return e("candidate",{key:n,attrs:{candidate:a,parties:t.parties}})}),t._v(" "),e("accordion-floating-card",{scopedSlots:t._u([{key:"above",fn:function(){return[t._v("\n                        จะเกิดอะไรขึ้นถ้ากาช่อง\n                        "),e("br"),t._v(" "),e("b",[t._v('"ไม่ประสงค์ลงคะแนน"')])]},proxy:!0},{key:"below",fn:function(){return[t._v("\n                        ตามกติกาเลือกตั้ง 2562 ถ้าผู้ชนะในเขตใดได้รับคะแนนเสียง\n                        "),e("b",[t._v("น้อยกว่า")]),t._v('จำนวนเสียง "ไม่ประสงค์ลงคะแนน" เขตนั้นจะต้อง\n                        '),e("b",[t._v("เลือกตั้งใหม่")]),t._v(" และผู้สมัครฯ ชุดเดิมจะไม่มีสิทธิ์ลงสมัครรับเลือกตั้งในครั้งใหม่นั้น\n                    ")]},proxy:!0}])})],2)]),t._v(" "),e("hr"),t._v(" "),e("h2",[t._v("หาพรรคที่สนใจไม่เจอ?")]),t._v(" "),e("p",{staticClass:"text-muted"},[t._v("รายชื่อด้านล่างคือพรรคที่ไม่ได้ลงสมัครในเขตนี้ หากพรรคที่ท่านสนใจไม่ลงสมัครรับเลือกตั้งในเขตของท่าน ท่านจะไม่สามารถเลือกเพื่อเพิ่มที่นั่ง ส.ส. บัญชีรายชื่อให้พรรคนั้นได้")]),t._v(" "),e("div",{staticClass:"row mt-3",attrs:{id:"not-in-this-area"}},[e("div",{staticClass:"col"},[e("floating-card",{attrs:{height:1}},[e("p",[t._v("แตะที่ชื่อพรรคเพื่อดูรายละเอียดพรรค")]),t._v(" "),e("table",{staticClass:"table table-hover"},[e("thead",[e("tr",[e("th",{attrs:{colspan:"2"},on:{click:function(a){return t.sort("partyName")}}},[t._v("\n                                    ชื่อพรรค\n                                    "),"partyName"==t.currentSort&&"asc"==t.currentSortDir?e("i",{staticClass:"ml-1 fas fa-sort-alpha-down"}):t._e(),t._v(" "),"partyName"==t.currentSort&&"desc"==t.currentSortDir?e("i",{staticClass:"ml-1 fas fa-sort-alpha-up"}):t._e()]),t._v(" "),e("th",{on:{click:function(a){return t.sort("candidateCount")}}},[t._v("\n                                    จำนวนเขตที่ลงสมัคร\n                                    "),"candidateCount"==t.currentSort&&"asc"==t.currentSortDir?e("i",{staticClass:"ml-1 fas fa-sort-amount-up"}):t._e(),t._v(" "),"candidateCount"==t.currentSort&&"desc"==t.currentSortDir?e("i",{staticClass:"ml-1 fas fa-sort-amount-down"}):t._e()])])]),t._v(" "),e("tbody",t._l(t.partiesWithoutCandidate,function(a,n){return e("tr",{key:n,on:{click:function(e){return t.goToPartyPage(a.partyName)}}},[e("td",[e("div",{staticClass:"logo",style:"background-image:url('/static/logo/"+a.partyName+".png')"})]),t._v(" "),e("td",[t._v("พรรค"+t._s(a.partyName))]),t._v(" "),e("td",[t._v(t._s(a.candidateCount||0)+" / 350")])])}),0)])])],1)])])],1)},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("div",{staticClass:"row mb-3 px-3"},[a("div",{staticClass:"col-3"},[this._v("หมายเลข")]),this._v(" "),a("div",{staticClass:"col-9"},[this._v("พรรค/ผู้สมัคร ส.ส.เขต")])])}]};var j=e("VU/8")($,F,!1,function(t){e("dnUx")},"data-v-739294d0",null).exports,D={name:"PartyPage",components:{FloatingCard:w,Accordion:b,Candidate:T,Navbar:L},props:["candidates","areas","parties"],data:function(){return{party:{candidateCount:""},partyName:""}},computed:{partyLogo:function(){return"/static/logo/"+this.partyName+".png"}},beforeMount:function(){this.partyName=this.$route.params.partyName,this.parties&&this.parties[this.partyName]&&(this.party=this.parties[this.partyName])},watch:{parties:function(){this.party=this.parties[this.partyName]}}},M={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"navbar-padding"},[e("navbar",{scopedSlots:t._u([{key:"center",fn:function(){return[e("span",{staticClass:"accent"},[t._v("พรรค"+t._s(t.partyName))])]},proxy:!0},{key:"right",fn:function(){},proxy:!0}])}),t._v(" "),e("div",{staticClass:"container"},[e("div",{staticClass:"row"},[e("div",{staticClass:"col-12 text-center my-3"},[e("div",{staticClass:"m-auto",staticStyle:{"max-width":"120px"}},[e("div",{staticClass:"party-logo",style:"background-image:url('"+t.partyLogo+"')"})])]),t._v(" "),e("div",{staticClass:"col-12 text-center"},[e("h1",[t._v("พรรค"+t._s(t.partyName))]),t._v(" "),e("p",[t._v("ลงสมัคร "+t._s(t.party?t.party.candidateCount:"N/A")+" จาก 350 เขต")])])]),t._v(" "),e("div",{staticClass:"row mt-3"},[e("div",{staticClass:"col-12"},[e("a",{staticClass:"btn btn-primary btn-block",attrs:{target:"_blank",href:"http://www.google.com/search?q=พรรค"+t.partyName+"+นโยบาย"}},[t._v("\n                    ค้นหานโยบายพรรคใน Google\n                ")]),t._v(" "),e("hr"),t._v(" "),e("h2",[t._v("ข้อมูลผู้สมัครรับเลือกตั้ง")]),t._v(" "),e("floating-card",{staticClass:"mt-3",attrs:{height:1}},[e("h2",[t._v("รายชื่อแคนดิเดตนายกรัฐมนตรี")]),t._v(" "),e("table",{staticClass:"table"},[t._l(t.party.pm_candidates,function(a,n){return e("tr",{key:n},[e("td",[e("a",{attrs:{target:"_blank",href:"http://www.google.com/search?q="+a.firstName+"+"+a.lastName}},[t._v("\n                                    "+t._s(a.title)+" "+t._s(a.firstName)+" "+t._s(a.lastName)+"\n                                    "),e("i",{staticClass:"fas fa-external-link-alt ml-1"})])])])}),t._v(" "),t.party.pm_candidates&&0==t.party.pm_candidates.length?e("tr",[e("td",{staticClass:"text-center"},[t._v("พรรคนี้ไม่ได้ส่งรายชื่อแคนดิเดตนายกรัฐมนตรี")])]):t._e()],2)]),t._v(" "),e("floating-card",{attrs:{height:1}},[e("h2",[t._v("ผู้สมัคร ส.ส. บัญชีรายชื่อ")]),t._v(" "),e("table",{staticClass:"table"},[e("thead",[e("tr",[e("th",[t._v("ลำดับ")]),t._v(" "),e("th",[t._v("ชื่อ-นามสกุล")])])]),t._v(" "),e("tbody",[t._l(t.party.partylist_candidates,function(a,n){return e("tr",{key:n},[e("td",[t._v("\n                                    "+t._s(n+1)+"\n                                ")]),t._v(" "),e("td",[e("a",{attrs:{target:"_blank",href:"http://www.google.com/search?q=พรรค"+a.firstName+"+"+a.lastName}},[t._v("\n                                        "+t._s(a.title)+" "+t._s(a.firstName)+" "+t._s(a.lastName)+"\n                                        "),e("i",{staticClass:"fas fa-external-link-alt ml-1"})])])])}),t._v(" "),t.party.partylist_candidates&&0==t.party.partylist_candidates.length?e("tr",[e("td",{staticClass:"text-center",attrs:{colspan:"2"}},[t._v("พรรคนี้ไม่ได้ส่งรายชื่อผู้สมัคร ส.ส. บรรชีรายชื่อ")])]):t._e(),t._v(" "),t.party.partylist_candidates?t._e():e("tr",[e("td",{staticClass:"text-center",attrs:{colspan:"2"}},[t._v("ขออภัย ยังไม่มีข้อมูล")])])],2)])])],1)])])],1)},staticRenderFns:[]};var K=e("VU/8")(D,M,!1,function(t){e("M40d")},"data-v-7f599b1d",null).exports;n.a.use(u.a);var B=new u.a({routes:[{path:"/",name:"Home",component:h},{path:"/region",name:"Region",component:j},{path:"/region/:province/:area",name:"Region",component:j},{path:"/party/:partyName",name:"Party",component:K}],mode:"history",scrollBehavior:function(t,a,e){var n={x:0,y:0};return e&&(n=e),new d.a(function(t,a){setTimeout(function(){t(n)},250)})}});n.a.config.productionTip=!1,new n.a({el:"#app",router:B,components:{App:c},template:"<App/>"})},QgiZ:function(t,a){},b19c:function(t,a){},cumn:function(t,a){},dnUx:function(t,a){},eWc4:function(t,a){},kdPL:function(t,a){},"t/Ed":function(t,a){}},["NHnr"]);
//# sourceMappingURL=app.f4e22405b05e6507bfef.js.map