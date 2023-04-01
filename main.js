(()=>{"use strict";var e=function(e){"Escape"===e.code&&t(document.querySelector(".popup_opened"))},t=function(t){t.classList.remove("popup_opened"),document.removeEventListener("keydown",e)},n=function(t){t.classList.add("popup_opened"),document.addEventListener("keydown",e)},o={baseUrl:"https://nomoreparties.co/v1/plus-cohort-22",headers:{authorization:"e946af28-6776-4621-8721-b1a2f230a011","Content-Type":"application/json"}},r=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"GET",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],c={method:t,headers:o.headers};return n&&["POST","PATCH"].includes(t)&&(c.body=JSON.stringify(n)),r&&console.log("Run sendRequest(\n\nURL:".concat(o.baseUrl+e,",\nMETHOD:").concat(t,",\nBODY:").concat(n,",\n\n)")),fetch(o.baseUrl+e,c).then((function(e){return e.ok?e.json():Promise.reject("Ошибка сетевого взаимодействия: ".concat(e.status))})).then((function(e){return e})).catch((function(e){console.log(e)}))},c=function(e){return r("/cards/".concat(e),"DELETE").then((function(e){return e}))},u=function(e){return r("/cards/likes/".concat(e),"PUT").then((function(e){return e}))},i=function(e){return r("/cards/likes/".concat(e),"DELETE").then((function(e){return e}))},a=document.querySelector(".newplace-form"),l=document.querySelector(".profile__add-button"),s=document.querySelector(".popup-newplace"),d=document.querySelector(".newPlaceName"),m=document.querySelector(".newPlaceURL"),f=document.querySelector(".elements"),p=document.querySelector(".element-template").content,v=document.querySelector(".popup-img"),_=v.querySelector(".popup__caption"),y=v.querySelector(".popup__view"),S=document.querySelector(".popup-confirm"),h=S.querySelector(".confirm-form");function q(e,o,r,a,l,s){var d=p.querySelector(".element").cloneNode(!0),m=d.querySelector(".element__img"),f=d.querySelector(".element__trash"),q=d.querySelector(".element__likes-count"),L=d.querySelector(".element__link");if(q.textContent=s.length,s.forEach((function(e){e._id===a&&L.classList.add("element__link_active")})),m.src=o,m.alt="Изображение "+e,d.setAttribute("data-id",l),d.querySelector(".element__title").textContent=e,d.querySelector(".element__link").addEventListener("click",(function(e){e.target.classList.contains("element__link_active")?Promise.resolve(i(d.dataset.id)).then((function(){e.target.classList.toggle("element__link_active"),q.textContent=Number(q.textContent)-1})):Promise.resolve(u(d.dataset.id)).then((function(){e.target.classList.toggle("element__link_active"),q.textContent=Number(q.textContent)+1}))})),r===a){var b=function e(){Promise.resolve(c(d.dataset.id)).then((function(){d.remove(),h.removeEventListener("submit",e),t(S)}))};f.addEventListener("click",(function(){n(S),h.addEventListener("submit",b)}))}else f.hidden=!0;return d.querySelector(".element__show").addEventListener("click",(function(){_.textContent=e,y.alt="Изображение "+e,y.src=o,n(v)})),d}function L(e,t){e.disabled=!0,e.classList.add(t)}function b(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?function(e,t){e.disabled=!1,e.classList.remove(t)}(t,n):L(t,n)}function E(e,t,n,o){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n,o){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n),r.classList.remove(o),r.textContent=""}(e,t,n,o):function(e,t,n,o,r){var c=e.querySelector(".".concat(t.id,"-error"));t.classList.add(o),c.classList.add(r),c.textContent=n}(e,t,t.validationMessage,n,o)}var k=function(e,t,n,o){var r=document.querySelector(e);r.querySelectorAll(t).forEach((function(e){E(r,e,n,o)}))},g="popup__save-button_deactivate",C="popup__text-input_invalid",x="popup__text-input-error_active",P=".popup__inputs",w=".popup__text-input",T=".popup__save-button",A=document.querySelector(".popup-editprofile"),D=document.querySelector(".profile__edit-button"),N=document.querySelector(".profile-editor"),U=document.querySelector(".editProfileName"),M=document.querySelector(".editProfileAboutMe"),O=document.querySelector(".profile__name"),H=document.querySelector(".profile__about-me"),R=document.querySelector(".profile__avatar"),j=R.querySelector(".profile__avatar-btn"),I=document.querySelector(".popup-avatar"),V=I.querySelector(".avatarLink"),z=I.querySelector(".avatar-form"),B=function(){U.value=O.textContent,M.value=H.textContent},G=function(){V.value=R.style.backgroundImage.slice(5,-2)},J=function(e){O.textContent=e.name,H.textContent=e.about},Y=function(e){R.style.backgroundImage="url('".concat(e.avatar,"')")};document.querySelectorAll(".popup").forEach((function(e){e.addEventListener("mousedown",(function(n){(n.target.classList.contains("popup_opened")||n.target.classList.contains("popup__close-button"))&&t(e)}))})),Promise.resolve(r("/users/me").then((function(e){return e}))).then((function(e){var o,c,u,i,a,l,s;return J(o=e),Y(o),B(),G(),D.addEventListener("click",(function(){B(),n(A),k(".profile-editor",w,C,x)})),N.addEventListener("submit",(function(e){var n,o;e.preventDefault(),e.submitter.textContent="Сохранение...",Promise.resolve((n=U.value,o=M.value,r("/users/me","PATCH",{name:n,about:o}).then((function(e){return e})))).then((function(e){J(e)})),t(A),e.submitter.textContent="Сохранить"})),j.addEventListener("click",(function(){G(),n(I),k(".avatar-form",w,C,x)})),z.addEventListener("submit",(function(e){var n;e.preventDefault(),e.submitter.textContent="Сохранение...",Promise.resolve((n=V.value,r("/users/me/avatar","PATCH",{avatar:n}).then((function(e){return e})))).then((function(e){Y(e)})),t(I),e.submitter.textContent="Сохранить"})),c=P,u=w,i=T,a=g,l=C,s=x,document.querySelectorAll(c).forEach((function(e){var t=e.querySelector(i),n=Array.from(e.querySelectorAll(u));n.forEach((function(t){t.addEventListener("input",(function(){E(e,t,l,s)}))})),b(n,t,a),e.addEventListener("input",(function(){b(n,t,a)})),e.addEventListener("reset",(function(){L(t,a)}))})),Promise.resolve(e._id)})).then((function(e){Promise.resolve(r("/cards").then((function(e){return e}))).then((function(t){!function(e,t){e.forEach((function(e){f.append(q(e.name,e.link,e.owner._id,t,e._id,e.likes))}))}(t,e)})),function(e){l.addEventListener("click",(function(){n(s)})),a.addEventListener("submit",(function(n){var o,c;n.preventDefault(),n.submitter.textContent="Сохранение...",Promise.resolve((o=d.value,c=m.value,r("/cards","POST",{name:o,link:c}).then((function(e){return e})))).then((function(t){f.prepend(q(t.name,t.link,t.owner._id,e,t._id,t.likes))})),n.target.reset(),t(s),n.submitter.textContent="Сохранить"}))}(e)}))})();