"use strict";(self["webpackChunkbamxx"]=self["webpackChunkbamxx"]||[]).push([[461],{4834:(e,o,t)=>{t.d(o,{Z:()=>E});var r=t(3673);const s={class:"full-width row justify-between q-py-lg q-px-xl"},l={class:"col-6 col-md-11 flex"},a=(0,r._)("span",{class:"dialog__title q-my-auto q-pl-md text-h5"}," Importar beneficiarios ",-1),i={class:"col-6 col-md-1 flex"},n={class:"q-py-xl q-px-xl"},c=(0,r._)("div",{class:"text-h6"}," Archivo ",-1),d=(0,r._)("div",null,[(0,r.Uk)(" * El archivo tiene que ser el original que se genera en "),(0,r._)("a",{href:"https://sigoplus.bamx.org.mx/",target:"_blank",class:"text-red"}," SIGO+ ")],-1),p={class:"column content-center"};function m(e,o,t,m,u,h){const f=(0,r.up)("q-icon"),b=(0,r.up)("q-btn"),g=(0,r.up)("q-file"),_=(0,r.up)("q-form"),x=(0,r.up)("q-card-section"),v=(0,r.up)("q-card"),w=(0,r.Q2)("close-popup");return(0,r.wg)(),(0,r.j4)(v,{class:"dialog full-width column"},{default:(0,r.w5)((()=>[(0,r.Wm)(x,{class:"full-width column"},{default:(0,r.w5)((()=>[(0,r.Wm)(_,null,{default:(0,r.w5)((()=>[(0,r._)("div",s,[(0,r._)("div",l,[(0,r.Wm)(f,{name:"file_upload",size:"300%"}),a]),(0,r._)("div",i,[(0,r.wy)((0,r.Wm)(b,{class:"q-ml-auto",size:"md",icon:"cancel",flat:"",round:""},null,512),[[w]])])]),(0,r._)("div",n,[c,(0,r.Wm)(g,{outlined:"",class:"dialog__upload q-my-md",modelValue:u.file,"onUpdate:modelValue":o[0]||(o[0]=e=>u.file=e),accept:".xls, .xlsx",onRejected:o[1]||(o[1]=e=>h.error("Solo se permiten archivos .xls o .xlsx"))},{prepend:(0,r.w5)((()=>[(0,r.Wm)(f,{name:"attach_file"})])),_:1},8,["modelValue"]),d]),(0,r._)("div",p,[(0,r.Wm)(b,{size:"lg",push:"",icon:"check",color:"green",label:"Confirmar",onClick:o[2]||(o[2]=e=>h.importBeneficiary())})])])),_:1})])),_:1})])),_:1})}var u=t(5474),h=t(6249);const f={data(){return{file:null}},methods:{success(e){this.$q.notify({message:e,icon:"done",color:"green"})},error(e){this.$q.notify({message:e,icon:"error",color:"red"})},importBeneficiary(){h.Z.show();let e=new FormData;e.append("xlsx",this.file),u.api.post("api/beneficiary/import",e,{headers:{"x-access-token":this.$store.getters.token,"Content-Type":"multipart/form-data"}}).then((e=>{h.Z.hide(),this.$emit("close-modal"),u.api.get("api/beneficiary/import/finish",{headers:{"x-access-token":this.$store.getters.token}}).then((e=>{location.reload()})).catch((e=>{this.error("Error al importar el archivo. Inténtelo de nuevo"),401==e.status&&(this.$store.commit("updateAuth",{auth:!1}),this.$router.push("login"))}))})).catch((e=>{h.Z.hide(),this.error("Error al importar el archivo. Inténtelo de nuevo"),401==e.status&&(this.$store.commit("updateAuth",{auth:!1}),this.$router.push("login"))}))}}};var b=t(4260),g=t(151),_=t(5589),x=t(8689),v=t(4554),w=t(8240),y=t(1052),q=t(677),C=t(7518),k=t.n(C);const V=(0,b.Z)(f,[["render",m]]),E=V;k()(f,"components",{QCard:g.Z,QCardSection:_.Z,QForm:x.Z,QIcon:v.Z,QBtn:w.Z,QFile:y.Z}),k()(f,"directives",{ClosePopup:q.Z})},3461:(e,o,t)=>{t.r(o),t.d(o,{default:()=>te});var r=t(3673);function s(e,o,t,s,l,a){const i=(0,r.up)("TableComponent");return(0,r.wg)(),(0,r.j4)(i,{title:"Reportes de entrega",row:{rows:l.rows},cols:{cols:l.cols},csv:!0,xls:!0,search:!0,reports:!0,buttons:!0,buttonIcon:"pen"},null,8,["row","cols"])}var l=t(5474),a=t(6249);const i={class:"q-pa-md text-uppercase"},n={class:"col q-pa-md q-gutter-sm"},c={class:"q-pa-sm flex justify-end"};function d(e,o,t,s,l,a){const d=(0,r.up)("q-btn"),p=(0,r.up)("q-icon"),m=(0,r.up)("q-input"),u=(0,r.up)("q-table"),h=(0,r.up)("ImportBeneficiaries"),f=(0,r.up)("q-dialog"),b=(0,r.up)("ReportsModal");return(0,r.wg)(),(0,r.iD)(r.HY,null,[(0,r._)("div",i,[(0,r._)("div",null,[(0,r.Wm)(u,{"title-class":"title",class:"my-sticky-header-table",title:t.title,rows:l.rows,columns:l.columns,"row-key":"name",flat:"",bordered:"",filter:l.filter,grid:e.$q.screen.xs,"no-data-label":"Sin información disponible","no-results-label":"Sin coincidencias"},{"top-right":(0,r.w5)((()=>[(0,r._)("div",n,[t.xls?((0,r.wg)(),(0,r.j4)(d,{key:0,color:"green-9","icon-right":"description",label:"Descargar xls","no-caps":"",onClick:o[0]||(o[0]=e=>a.exportTable(!0))})):(0,r.kq)("",!0),t.csv?((0,r.wg)(),(0,r.j4)(d,{key:1,color:"yellow-8","icon-right":"archive",label:"Descargar csv","no-caps":"",onClick:o[1]||(o[1]=e=>a.exportTable(!1))})):(0,r.kq)("",!0),t.reports?((0,r.wg)(),(0,r.j4)(d,{key:2,color:"blue-9","icon-right":"summarize",label:"Generar Reporte","no-caps":"",onClick:a.generateReport},null,8,["onClick"])):(0,r.kq)("",!0),t.importBtn?((0,r.wg)(),(0,r.j4)(d,{key:3,color:"red","icon-right":"file_upload",label:"Importar","no-caps":"",onClick:o[2]||(o[2]=e=>s.importBeneficiaries=!0)})):(0,r.kq)("",!0)]),t.search?((0,r.wg)(),(0,r.j4)(m,{key:0,class:"q-px-sm",borderless:"",dense:"",debounce:"300",modelValue:l.filter,"onUpdate:modelValue":o[3]||(o[3]=e=>l.filter=e),placeholder:"Buscar"},{append:(0,r.w5)((()=>[(0,r.Wm)(p,{name:"search"})])),_:1},8,["modelValue"])):(0,r.kq)("",!0)])),_:1},8,["title","rows","columns","filter","grid"])]),(0,r._)("div",c,[t.info?((0,r.wg)(),(0,r.j4)(d,{key:0,color:"primary","icon-right":"arrow_forward",label:"Ver mas información",onClick:o[4]||(o[4]=e=>a.redirect())})):(0,r.kq)("",!0)])]),(0,r.Wm)(f,{modelValue:s.importBeneficiaries,"onUpdate:modelValue":o[5]||(o[5]=e=>s.importBeneficiaries=e),persistent:""},{default:(0,r.w5)((()=>[(0,r.Wm)(h)])),_:1},8,["modelValue"]),(0,r.Wm)(f,{modelValue:s.report,"onUpdate:modelValue":o[6]||(o[6]=e=>s.report=e)},{default:(0,r.w5)((()=>[(0,r.Wm)(b,{onCloseModal:a.closeReportsModal},null,8,["onCloseModal"])])),_:1},8,["modelValue"])],64)}var p=t(1959),m=t(2841),u=t(4834),h=t(8880);const f={class:"full-width row justify-between q-px-xl q-pt-xl"},b={class:"col-11 flex"},g=(0,r._)("span",{class:"dialog__title q-my-auto q-pl-md text-h5"}," Generar reporte ",-1),_={class:"col-1 flex"},x={class:"row"},v={class:"col-12"},w={class:"q-py-md q-px-lg"},y={class:"row q-py-md"},q={class:"col-12 col-sm-4 items-start q-pa-md"},C={class:"col-12 col-sm-4 items-start q-pa-md"},k={class:"col-12 col-sm-4 items-start q-pa-md"},V={class:"row q-py-md"},E={class:"col-5 q-px-md"},Z={class:"col-2 text-center q-pa-xs"},G={class:"col-5 q-px-md"},$={class:"col-12 items-start q-px-md q-pt-xl q-pb-md"},j=(0,r._)("div",{class:"col-4"},null,-1);function R(e,o,t,s,l,a){const i=(0,r.up)("q-icon"),n=(0,r.up)("q-btn"),c=(0,r.up)("q-select"),d=(0,r.up)("q-checkbox"),p=(0,r.up)("q-input"),m=(0,r.up)("q-table"),u=(0,r.up)("q-card"),R=(0,r.Q2)("close-popup");return(0,r.wg)(),(0,r.j4)(u,{class:"dialog"},{default:(0,r.w5)((()=>[(0,r._)("div",f,[(0,r._)("div",b,[(0,r.Wm)(i,{name:"summarize",size:"300%"}),g]),(0,r._)("div",_,[(0,r.wy)((0,r.Wm)(n,{class:"q-ml-auto",size:"md",icon:"cancel",flat:"",round:""},null,512),[[R]])])]),(0,r._)("div",x,[(0,r._)("div",v,[(0,r._)("div",w,[(0,r._)("div",y,[(0,r._)("div",q,[(0,r.Wm)(c,{color:"red",filled:"",modelValue:s.rCommunity,"onUpdate:modelValue":o[1]||(o[1]=e=>s.rCommunity=e),options:s.optCommunity,label:"Comunidad"},(0,r.Nv)({_:2},[s.rCommunity?{name:"append",fn:(0,r.w5)((()=>[(0,r.Wm)(i,{name:"cancel",onClick:o[0]||(o[0]=(0,h.iM)((e=>s.rCommunity=null),["stop"])),class:"cursor-pointer"})]))}:void 0]),1032,["modelValue","options"])]),(0,r._)("div",C,[(0,r.Wm)(c,{color:"red",filled:"",modelValue:s.rGroup,"onUpdate:modelValue":o[3]||(o[3]=e=>s.rGroup=e),options:s.optGroup,label:"Grupo"},(0,r.Nv)({_:2},[s.rGroup?{name:"append",fn:(0,r.w5)((()=>[(0,r.Wm)(i,{name:"cancel",onClick:o[2]||(o[2]=(0,h.iM)((e=>s.rGroup=null),["stop"])),class:"cursor-pointer"})]))}:void 0]),1032,["modelValue","options"])]),(0,r._)("div",k,[(0,r.Wm)(d,{"keep-color":"",modelValue:s.pCheck,"onUpdate:modelValue":o[4]||(o[4]=e=>s.pCheck=e),label:"Productos extra",color:"red"},null,8,["modelValue"])])]),(0,r._)("div",V,[(0,r._)("div",E,[(0,r.Wm)(p,{modelValue:s.rSDate,"onUpdate:modelValue":o[5]||(o[5]=e=>s.rSDate=e),filled:"",type:"date",hint:"Fecha inicio"},null,8,["modelValue"])]),(0,r._)("div",Z,[(0,r.Wm)(i,{name:"swap_horiz",style:{color:"#ccc","font-size":"3em"}})]),(0,r._)("div",G,[(0,r.Wm)(p,{modelValue:s.rEDate,"onUpdate:modelValue":o[6]||(o[6]=e=>s.rEDate=e),filled:"",type:"date",hint:"Fecha fin"},null,8,["modelValue"])])]),(0,r._)("div",$,[(0,r.Wm)(n,{color:"red","icon-right":"summarize",label:"Generar Reporte","no-caps":"",onClick:o[7]||(o[7]=e=>a.getReport())})])])]),j]),(0,r.Wm)(m,{class:"hidden",title:"Reporte xd",rows:s.rows,columns:s.columns,"row-key":"dia"},null,8,["rows","columns"])])),_:1})}function B(e,o,t){let r=void 0!==o?o(e,t):e;return r=void 0===r||null===r?"":String(r),r=r.split('"').join('""'),`"${r}"`}const W=[{name:"nombre_beneficiario",label:"nombre_beneficiario",field:"nombre_beneficiario",sortable:!0},{name:"nombre_grupo",label:"nombre_grupo",field:"nombre_grupo",sortable:!0},{name:"dia",label:"dia",field:"dia",sortable:!0},{name:"nombre_comunidad",label:"nombre_comunidad",field:"nombre_comunidad",sortable:!0},{name:"folio",label:"folio",field:"folio",sortable:!0},{name:"fecha",label:"fecha",field:"fecha",sortable:!0},{name:"productos_extra",label:"productos_extra",field:"productos_extra",sortable:!0}],S={name:"ReportsModal",data(){return{today:"1943/04/19"}},setup(){return{columns:W,rows:[],report_data:[],rCommunity:(0,p.iH)("Todas"),optCommunity_json:[],optCommunity:["Todas","VERGEL"],rGroup:(0,p.iH)("Todos"),optGroup_json:[],optGroup:["Todos","TVERGEL DOMINGO","TVERGEL SÁBADO","VEGEL JUEVES\t","VEGEL MARTES","VERGEL","vergel lunes","VERGEL MIERCOLES\t","VERGEL VIERNES","VOLUNTARIAS"],pCheck:(0,p.iH)(!1),rSDate:(0,p.iH)("1943/04/19"),rEDate:(0,p.iH)("2069/04/20")}},methods:{success(e){this.$q.notify({message:e,icon:"done",color:"green"})},error(e){this.$q.notify({message:e,icon:"error",color:"red"})},getCommunityOptions(){l.api.get("api/report/community-select2",{headers:{"x-access-token":this.$store.getters.token}}).then((e=>{this.optCommunity_json=e.data,this.optCommunity_json.forEach(((e,o)=>{this.optCommunity.push(this.optCommunity_json[o].name)}))})).catch((e=>{this.error(e.response.data.Message)}))},getGroupOptions(){l.api.get("api/report/group-select2/",{headers:{"x-access-token":this.$store.getters.token}}).then((e=>{this.optGroup_json=e.data,this.optGroup_json.forEach(((e,o)=>{this.optGroup.push(this.optGroup_json[o].name)}))})).catch((e=>{this.error(e.response.data.Message)}))},exportTable(e){const o=[this.columns.map((e=>B(e.label)))].concat(this.rows.map((e=>this.columns.map((o=>B("function"===typeof o.field?o.field(e):e[void 0===o.field?o.name:o.field],o.format,e))).join(",")))).join("\r\n");let t=!0===e?this.$props.title+".xls":"reporte_filtrado.csv",r=!0===e?"text/xsl":"text/csv";const s=(0,m.Z)(t,o,r);!0!==s&&$q.notify({message:"Browser denied file download...",color:"negative",icon:"warning"})},getReport(){const e={rCommunity:this.rCommunity,rGroup:this.rGroup,rSDate:this.rSDate+" 00:00:00",rEDate:this.rEDate+" 00:00:00",pCheck:this.pCheck};l.api.post("api/report/filtered-deliveries",e,{headers:{"x-access-token":this.$store.getters.token}}).then((e=>{this.report_data=e.data,this.report_data.forEach(((e,o)=>{var t=new Object;t.nombre_beneficiario=this.report_data[o]["nombre_beneficiario"],t.nombre_grupo=this.report_data[o]["nombre_grupo"],t.dia=this.report_data[o]["dia"],t.nombre_comunidad=this.report_data[o]["nombre_comunidad"],t.folio=this.report_data[o]["folio"],t.fecha=this.report_data[o]["fecha"],t.productos_extra=this.report_data[o]["productos_extra"],this.rows.push(t)})),this.exportTable(!1),this.$emit("close-modal")})).catch((e=>{this.error("No hay registros para generar el reporte"),console.log(e)}))}},mounted(){this.getCommunityOptions(),this.getGroupOptions()}};var D=t(4260),T=t(151),Q=t(4554),I=t(8240),P=t(5863),M=t(1420),N=t(4689),O=t(9178),A=t(677),U=t(7518),z=t.n(U);const H=(0,D.Z)(S,[["render",R]]),L=H;function F(e,o,t){let r=void 0!==o?o(e,t):e;return r=void 0===r||null===r?"":String(r),r=r.split('"').join('""'),`"${r}"`}z()(S,"components",{QCard:T.Z,QIcon:Q.Z,QBtn:I.Z,QSelect:P.Z,QCheckbox:M.Z,QInput:N.Z,QTable:O.Z}),z()(S,"directives",{ClosePopup:A.Z});const J={name:"TableComponent",components:{ImportBeneficiaries:u.Z,ReportsModal:L},props:{title:String,row:{type:Object,required:!0},cols:{type:Object,required:!0},csv:Boolean,xls:Boolean,search:Boolean,reports:Boolean,importBtn:Boolean,buttons:Boolean,info:Boolean,redirectTo:String},data(){return{filter:(0,p.iH)(""),color:"#b4c5d5",rows:this.$props.row.rows,columns:[],colProps:{name:"",label:"",field:"",sortable:!0,required:!0,align:"left"}}},setup(){return{importBeneficiaries:(0,p.iH)(!1),report:(0,p.iH)(!1)}},computed:{computedColor:function(){return this.color}},methods:{redirect(){this.$router.push(this.$props.redirectTo)},generateReport(){this.report=!0},exportTable(e){const o=[this.columns.map((e=>F(e.label)))].concat(this.rows.map((e=>this.columns.map((o=>F("function"===typeof o.field?o.field(e):e[void 0===o.field?o.name:o.field],o.format,e))).join(",")))).join("\r\n");let t=!0===e?this.$props.title+".xls":this.$props.title+".csv",r=!0===e?"text/xsl":"text/csv";const s=(0,m.Z)(t,o,r);!0!==s&&$q.notify({message:"Browser denied file download...",color:"negative",icon:"warning"})},closeReportsModal(){this.report=!1}},mounted(){this.$props.cols.cols.forEach((e=>{this.colProps.name=e,this.colProps.label=e,this.colProps.field=e,this.colProps.sortable=!0,this.colProps.align="left",this.columns.push(this.colProps),this.colProps={}}))}};var Y=t(6778);const K=(0,D.Z)(J,[["render",d]]),X=K;z()(J,"components",{QTable:O.Z,QBtn:I.Z,QInput:N.Z,QIcon:Q.Z,QDialog:Y.Z});const ee={name:"Delivieries",components:{TableComponent:X},data(){return{temppDelivery:{},cols:["Folio","Nombre","Comunidad","Grupo","Fecha de entrega","Producto extra","Costo","Atendido por"],rows:[]}},methods:{getRecentDeliveries(){a.Z.show(),l.api.get("api/attendance/delivery/recent",{headers:{"x-access-token":this.$store.getters.token}}).then((e=>{e.data.forEach((e=>{this.tempAttendace={Folio:e.familyId,Nombre:e.familyName,Grupo:e.groupName,Comunidad:e.communityName,"Producto extra":0==e.extraProduct?"No":"Si","Fecha de entrega":e.date.substr(8,2)+"/"+e.date.substr(5,2)+"/"+e.date.substr(0,4)+" - "+e.date.substr(11,5),"Atendido por":e.attendedBy,Costo:null==e.extraProductPrice?"No disponible":e.extraProductPrice},this.rows.push(this.tempAttendace)})),a.Z.hide()})).catch((e=>{a.Z.hide(),401==e.response.status&&(this.$store.commit("updateAuth",{auth:!1}),this.$router.push("login")),404==e.response.status&&this.$q.notify({message:"Hubo un error al recuperar la informacion de las entregas",icon:"error",color:"red"})}))}},mounted(){this.getRecentDeliveries()}},oe=(0,D.Z)(ee,[["render",s]]),te=oe}}]);