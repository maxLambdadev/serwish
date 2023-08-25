"use strict";(self.webpackChunkserwish=self.webpackChunkserwish||[]).push([[450],{8450:(I,p,o)=>{o.r(p),o.d(p,{ContactPageModule:()=>M});var m=o(1316),a=o(4006),f=o(1652),v=o(694),t=o(4650),d=o(8869),s=o(6895),w=o(5746),x=o(8203),g=o(461),y=o(3497),b=o(5893);const C=["*"];let Z=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275cmp=t.Xpm({type:e,selectors:[["sw-breadcrumb"]],ngContentSelectors:C,decls:2,vars:0,consts:[[1,"sw-breadcrumb__content"]],template:function(n,i){1&n&&(t.F$t(),t.TgZ(0,"div",0),t.Hsn(1),t.qZA())},styles:[".sw-breadcrumb__content{display:flex;align-items:center}.sw-breadcrumb__item{font-family:var(--body-family);font-size:var(--body-size);font-weight:var(--body-weight);line-height:var(--body-height);letter-spacing:var(--body-spacing);color:var(--primary-dark_100)}.sw-breadcrumb__item--home{cursor:pointer;color:var(--primary_100)}.sw-breadcrumb__separator{margin-right:2px;color:var(--primary-dark_100)}\n"],encapsulation:2,changeDetection:0}),e})();var h=o(4463);function A(e,c){if(1&e){const n=t.EpF();t.ynx(0),t.TgZ(1,"div",18),t._uU(2),t.ALo(3,"translate"),t.qZA(),t.TgZ(4,"form",19,20),t.NdJ("ngSubmit",function(){t.CHM(n);const l=t.oxw();return t.KtG(l.onSubmit())}),t.TgZ(6,"div",21),t._UZ(7,"sw-input",22),t.ALo(8,"translate"),t.ALo(9,"translate"),t.qZA(),t.TgZ(10,"div",21),t._UZ(11,"sw-input",23),t.ALo(12,"translate"),t.qZA(),t.TgZ(13,"div",21),t._UZ(14,"sw-input",24),t.ALo(15,"translate"),t.qZA(),t.TgZ(16,"div",21),t._UZ(17,"sw-textarea",25),t.ALo(18,"translate"),t.ALo(19,"translate"),t.qZA(),t.TgZ(20,"button",26)(21,"sw-button",27),t._uU(22),t.ALo(23,"translate"),t._UZ(24,"sw-icon",28),t.qZA()()(),t.BQk()}if(2&e){const n=t.MAs(5),i=t.oxw();t.xp6(2),t.hij(" ",t.lcZ(3,34,"Contact.FILL")," "),t.xp6(2),t.Q6J("formGroup",i.contactForm),t.xp6(3),t.Q6J("name","name")("size","medium")("type","title-in")("placeholderDraft",t.lcZ(8,36,"Registration.FIRST_AND_LAST_NAME_PLACEHOLDER"))("labelText",t.lcZ(9,38,"Registration.FIRST_AND_LAST_NAME"))("inputType","text")("showErrors",n.submitted)("required",!0),t.xp6(4),t.Q6J("name","phone")("size","medium")("type","title-in")("placeholderDraft","555 555 555")("labelText",t.lcZ(12,40,"Registration.PHONE_NUMBER"))("inputType","tel")("showErrors",n.submitted)("required",!0)("mask","000 000 000"),t.xp6(3),t.Q6J("name","email")("size","medium")("type","title-in")("placeholderDraft","giorgi@example.com")("labelText",t.lcZ(15,42,"Registration.EMAIL"))("inputType","email")("showErrors",n.submitted),t.xp6(3),t.Q6J("size","large")("placeholderDraft",t.lcZ(18,44,"Registration.ENTER_MESSAGE"))("labelText",t.lcZ(19,46,"Registration.YOUR_MESSAGE"))("showErrors",n.submitted),t.xp6(4),t.Q6J("disabled",!i.contactForm.valid),t.xp6(1),t.hij(" ",t.lcZ(23,48,"Contact.SEND")," "),t.xp6(2),t.Q6J("iconName","arrow-right-2")("iconSize","size-24")}}function T(e,c){1&e&&(t.ynx(0),t.TgZ(1,"div",29)(2,"div",30)(3,"div",31),t._UZ(4,"sw-image",32),t.qZA()(),t.TgZ(5,"h1",33),t._uU(6),t.ALo(7,"translate"),t.qZA(),t.TgZ(8,"p",34),t._uU(9),t.ALo(10,"translate"),t.qZA()(),t.BQk()),2&e&&(t.xp6(4),t.Q6J("alt","Contact Success")("src","./assets/img/Illustration-21"),t.xp6(2),t.hij(" ",t.lcZ(7,4,"Contact.HEY")," "),t.xp6(3),t.hij(" ",t.lcZ(10,6,"Contact.SUCCESS")," "))}function S(e,c){if(1&e&&(t.ynx(0),t.TgZ(1,"div",35)(2,"a",36),t._UZ(3,"sw-icon",37),t.qZA()(),t.BQk()),2&e){const n=c.$implicit;t.xp6(2),t.s9C("href",n.url,t.LSH),t.xp6(1),t.Q6J("colored",!0)("iconName",n.iconCodeRec)("iconSize","size-48")}}const z=function(e){return{"sw-container--desktop":e}},L=function(){return["/"]},E=[{path:"",component:(()=>{class e{constructor(n,i,l){this.contactService=n,this.deviceService=i,this.cdr=l,this.className=!0,this.device=this.deviceService.getDevice(),this.DEVICE=f.A,this.socials=v.H,this.successMessage=!1,this.contactForm=new a.nJ({name:new a.p4("",[a.kI.required]),email:new a.p4("",[a.kI.email]),description:new a.p4("",[a.kI.required]),phone_number:new a.p4("",{validators:[a.kI.required,a.kI.minLength(9)]})})}onSubmit(){this.contactForm.valid&&this.contactService.submitContact({title:this.contactForm.value.name,email:this.contactForm.value.email,description:this.contactForm.value.description,phone:this.contactForm.value.phone_number}).subscribe(()=>{this.successMessage=!0,this.cdr.markForCheck()})}trackBy(n,i){return n}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(d.yq),t.Y36(d.U8),t.Y36(t.sBO))},e.\u0275cmp=t.Xpm({type:e,selectors:[["sw-contact-page"]],hostVars:2,hostBindings:function(n,i){2&n&&t.ekj("sw-contact-page",i.className)},decls:31,vars:28,consts:[[1,"sw-page","sw-page--contact"],[1,"sw-container",3,"ngClass"],[1,"sw-contact"],["routerLink","/","queryParamsHandling","merge",1,"sw-contact__back"],[1,"sw-contact__back__icon"],[3,"iconName","iconSize"],[1,"sw-contact__back__text"],[1,"sw-contact__content"],[1,"sw-contact__title"],[1,"sw-contact__breadcrumb"],["queryParamsHandling","merge",1,"sw-breadcrumb__item","sw-breadcrumb__item--home",3,"routerLink"],[1,"sw-breadcrumb__separator"],[1,"sw-breadcrumb__item"],[4,"ngIf"],[1,"sw-contact__socials"],[1,"sw-contact__socials__title"],[1,"sw-contact__socials__content"],[4,"ngFor","ngForOf","ngForTrackBy"],[1,"sw-contact__desc"],[1,"sw-contact__form",3,"formGroup","ngSubmit"],["localForm","ngForm"],[1,"sw-contact__form__item"],["formControlName","name",3,"name","size","type","placeholderDraft","labelText","inputType","showErrors","required"],["formControlName","phone_number",3,"name","size","type","placeholderDraft","labelText","inputType","showErrors","required","mask"],["formControlName","email",3,"name","size","type","placeholderDraft","labelText","inputType","showErrors"],["formControlName","description",3,"size","placeholderDraft","labelText","showErrors"],["type","submit",1,"sw-contact__form__send"],["swPrimaryButton","","swRightIconButton","",3,"disabled"],["righticon","",3,"iconName","iconSize"],[1,"sw-contact__success"],[1,"sw-contact__success__image-wrapper"],[1,"sw-contact__success__image"],[3,"alt","src"],[1,"sw-contact__success__title"],[1,"sw-contact__success__desc"],[1,"sw-contact__socials__item"],["target","_blank",3,"href"],[3,"colored","iconName","iconSize"]],template:function(n,i){1&n&&(t.TgZ(0,"section",0)(1,"div",1)(2,"div",2)(3,"a",3)(4,"div",4),t._UZ(5,"sw-icon",5),t.qZA(),t.TgZ(6,"div",6),t._uU(7),t.ALo(8,"translate"),t.qZA()(),t.TgZ(9,"div",7)(10,"div",8),t._uU(11),t.ALo(12,"translate"),t.qZA(),t.TgZ(13,"div",9)(14,"sw-breadcrumb")(15,"a",10),t._uU(16),t.ALo(17,"translate"),t.qZA(),t.TgZ(18,"div",11),t._UZ(19,"sw-icon",5),t.qZA(),t.TgZ(20,"div",12),t._uU(21),t.ALo(22,"translate"),t.qZA()()(),t.YNc(23,A,25,50,"ng-container",13),t.YNc(24,T,11,8,"ng-container",13),t.qZA(),t.TgZ(25,"div",14)(26,"div",15),t._uU(27),t.ALo(28,"translate"),t.qZA(),t.TgZ(29,"div",16),t.YNc(30,S,4,4,"ng-container",17),t.qZA()()()()()),2&n&&(t.xp6(1),t.Q6J("ngClass",t.VKq(25,z,i.device===i.DEVICE.DESKTOP)),t.xp6(4),t.Q6J("iconName","arrow-left-2")("iconSize","size-28"),t.xp6(2),t.Oqu(t.lcZ(8,15,"Contact.BACK")),t.xp6(4),t.hij(" ",t.lcZ(12,17,"Contact.CONTACT_US")," "),t.xp6(4),t.Q6J("routerLink",t.DdM(27,L)),t.xp6(1),t.hij(" ",t.lcZ(17,19,"Contact.HOME")," "),t.xp6(3),t.Q6J("iconName","arrow-right-small")("iconSize","size-24"),t.xp6(2),t.hij(" ",t.lcZ(22,21,"Contact.CONTACT_US")," "),t.xp6(2),t.Q6J("ngIf",!i.successMessage),t.xp6(1),t.Q6J("ngIf",i.successMessage),t.xp6(3),t.hij(" ",t.lcZ(28,23,"Contact.WE_ARE_SOCIALS")," "),t.xp6(3),t.Q6J("ngForOf",i.socials)("ngForTrackBy",i.trackBy))},dependencies:[s.mk,s.sg,s.O5,m.yS,w.o,x.c,g.r0,g.JL,g.HR,y.am,b.U5,a._Y,a.JJ,a.JL,a.Q7,a.sg,a.u,Z,h.X$],styles:['.sw-contact{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;max-width:70%;margin:0 auto}.sw-contact__back{cursor:pointer;display:flex;align-items:center;align-self:flex-start;padding:48px 0}.sw-contact__back__icon{margin-right:16px}.sw-contact__back__text{font-family:var(--h2-family);font-size:var(--h2-size);font-weight:var(--h2-weight);line-height:var(--h2-height);letter-spacing:var(--h2-spacing);font-feature-settings:"case" on}.sw-contact__back:hover{color:var(--primary-dark_100)}.sw-contact__content{background:var(--neutral_100);border-radius:16px;padding:32px;margin-bottom:32px;width:100%}.sw-contact__title{color:var(--primary_100);font-family:var(--h2-family);font-size:var(--h2-size);font-weight:var(--h2-weight);line-height:var(--h2-height);letter-spacing:var(--h2-spacing);margin-bottom:8px;padding-top:0;font-feature-settings:"case" on}.sw-contact__breadcrumb{padding-bottom:58px}.sw-contact__desc{font-family:var(--h3-family);font-size:var(--h3-size);font-weight:var(--h3-weight);line-height:var(--h3-height);letter-spacing:var(--h3-spacing);margin-bottom:16px;font-feature-settings:"case" on}.sw-contact__form{margin-bottom:64px}.sw-contact__form__item{margin-bottom:24px}.sw-contact__form__send{width:100%;padding:0}.sw-contact__success{display:flex;flex-direction:column;align-items:center;margin-bottom:64px}.sw-contact__success__image{width:208px;height:208px;position:absolute;left:50%;transform:translate(-50%);top:40px;border-radius:50%;background:var(--neutral_100)}.sw-contact__success__image-wrapper{margin-bottom:67px;border-radius:24px;height:221px;width:100%;position:relative}.sw-contact__success__image .image__wrapper{width:auto;height:auto}.sw-contact__success__image .image__wrapper img{height:256px;width:256px}.sw-contact__success__title{text-align:center;margin-bottom:8px;font-family:var(--h1-bold-family);font-size:var(--h1-bold-size);font-weight:var(--h1-bold-weight);line-height:var(--h1-bold-height);letter-spacing:var(--h1-bold-spacing);color:var(--primary100)}.sw-contact__success__desc{text-align:center;font-family:var(--h3-family);font-size:var(--h3-size);font-weight:var(--h3-weight);line-height:var(--h3-height);letter-spacing:var(--h3-spacing);max-width:395px;color:var(--primary-dark_100)}.sw-contact__socials{display:flex;flex-direction:column;align-items:center}.sw-contact__socials__title{margin-bottom:16px;font-family:var(--h2-family);font-size:var(--h2-size);font-weight:var(--h2-weight);line-height:var(--h2-height);letter-spacing:var(--h2-spacing);color:var(--primary-dark_100);font-feature-settings:"case" on}.sw-contact__socials__content{display:flex;align-items:center;justify-content:center}.sw-contact__socials__item{margin-right:12px}.sw-contact__socials__item:last-child{margin-right:0}\n'],encapsulation:2,changeDetection:0}),e})()}];let F=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[m.Bz.forChild(E),m.Bz]}),e})();var u=o(8823),U=o(7118),B=o(2145),N=o(5940),J=o(7353),_=o(9434);let R=(()=>{class e{constructor(n){this.iconRegistry=n,this.iconRegistry.register([])}}return e.\u0275fac=function(n){return new(n||e)(t.LFG(_.L))},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[s.ez,u.Q]}),e})();var r=o(5711),Q=o(7293);let M=(()=>{class e{constructor(n){this.iconRegistry=n,this.iconRegistry.register([r.U4,r.n1,r.m3,r.r5,r.Dw,r.CF,r.SH,r.a0,r.U2,r.qt,r.Gx])}}return e.\u0275fac=function(n){return new(n||e)(t.LFG(_.L))},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({providers:[Q.y],imports:[s.ez,F,h.aw,u.Q,U.$,B.h,m.Bz,N.g,J.U,a.u5,a.UX,R]}),e})()}}]);