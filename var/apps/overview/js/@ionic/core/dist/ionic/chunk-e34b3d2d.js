const e=500,o="cubic-bezier(0.36,0.66,0.04,1)",t="opacity",n="transform",r="translateX",l="0%",d=.8;function a(e){return e.shadowRoot||e}function c(c,s,i){const m="rtl"===document.dir,f=m?"-99.5%":"99.5%",u=m?"33%":"-33%",b=i.enteringEl,y=i.leavingEl,S=new c;if(S.addElement(b).duration(i.duration||e).easing(i.easing||o).beforeRemoveClass("ion-page-invisible"),y&&s){const e=new c;e.addElement(s),S.add(e)}const T="back"===i.direction,E=b.querySelector(":scope > ion-content"),p=b.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *"),w=b.querySelector(":scope > ion-header > ion-toolbar"),q=new c;if(E||w||0!==p.length?(q.addElement(E),q.addElement(p)):q.addElement(b.querySelector(":scope > .ion-page, :scope > ion-nav, :scope > ion-tabs")),S.add(q),T?q.beforeClearStyles([t]).fromTo(r,u,l,!0).fromTo(t,d,1,!0):q.beforeClearStyles([t]).fromTo(r,f,l,!0),w){const e=new c;e.addElement(w),S.add(e);const o=new c;o.addElement(w.querySelector("ion-title"));const n=new c;n.addElement(w.querySelectorAll("ion-buttons,[menuToggle]"));const d=new c;d.addElement(a(w).querySelector(".toolbar-background"));const s=new c,i=w.querySelector("ion-back-button");if(s.addElement(i),e.add(o).add(n).add(d).add(s),o.fromTo(t,.01,1,!0),n.fromTo(t,.01,1,!0),T)o.fromTo(r,u,l,!0),s.fromTo(t,.01,1,!0);else if(o.fromTo(r,f,l,!0),d.beforeClearStyles([t]).fromTo(t,.01,1,!0),s.fromTo(t,.01,1,!0),i){const o=new c;o.addElement(a(i).querySelector(".button-text")).fromTo(r,m?"-100px":"100px","0px"),e.add(o)}}if(y){const e=new c;e.addElement(y.querySelector(":scope > ion-content")),e.addElement(y.querySelectorAll(":scope > ion-header > *:not(ion-toolbar), :scope > ion-footer > *")),S.add(e),T?e.beforeClearStyles([t]).fromTo(r,l,m?"-100%":"100%"):e.fromTo(r,l,u,!0).fromTo(t,1,d,!0);const o=y.querySelector(":scope > ion-header > ion-toolbar");if(o){const e=new c;e.addElement(o);const d=new c;d.addElement(o.querySelector("ion-title"));const s=new c;s.addElement(o.querySelectorAll("ion-buttons,[menuToggle]"));const i=new c;i.addElement(a(o).querySelector(".toolbar-background"));const f=new c,b=o.querySelector("ion-back-button");if(f.addElement(b),e.add(d).add(s).add(f).add(i),S.add(e),f.fromTo(t,.99,0,!0),d.fromTo(t,.99,0,!0),s.fromTo(t,.99,0,!0),T){if(d.fromTo(r,l,m?"-100%":"100%"),i.beforeClearStyles([t]).fromTo(t,1,.01,!0),b){const o=new c;o.addElement(a(b).querySelector(".button-text")),o.fromTo(r,l,(m?-124:124)+"px"),e.add(o)}}else d.fromTo(r,l,u).afterClearStyles([n]),f.afterClearStyles([t]),d.afterClearStyles([t]),s.afterClearStyles([t])}}return Promise.resolve(S)}export{a as shadow,c as iosTransitionAnimation};