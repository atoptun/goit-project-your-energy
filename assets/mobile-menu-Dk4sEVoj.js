import{r as e}from"./rolldown-runtime-DMWpINJ5.js";import{n as t,r as n,t as r}from"./vendor-DcqH4JyS.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function i(e){return e.split(`/`).pop()||`index.html`}function a(){let e=i(window.location.pathname);document.querySelectorAll(`.header-nav-link`).forEach(t=>{i(t.pathname)===e&&t.classList.add(`is-active`)})}n.defaults.baseURL=`https://your-energy.b.goit.study/api`;async function o(e={}){let{data:t}=await n.get(`/filters`,{params:e});return t}async function s(e={}){let{data:t}=await n.get(`/exercises`,{params:e});return t}async function c(e){let{data:t}=await n.get(`/exercises/${e}`);return t}async function l(){let{data:e}=await n.get(`/quote`);return e}async function u(e){let{data:t}=await n.post(`/subscription`,{email:e});return t}var d={categoryList:`.js-category-list`,categoryItem:`.category-item`,exercisesList:`.js-exercises-list`,exerciseItem:`.exercise-card`,showExerciseCardBtn:`.js-show-card-btn`,pagination:`.js-pagination`,paginationItem:`.pagination-item`,paginationItemActive:`.pagination-item.active`,filterList:`.filter-list`,filterBtn:`.filter-btn`,filterBtnActive:`.filter-btn.active`,searchForm:`.search-form`,searchInput:`.search-input`,categoryTitle:`.js-category-title`,categorySeparator:`.js-category-separator`,scrollUpBtn:`.js-scroll-up`,modalBackdrop:`.js-modal-backdrop`,footerYear:`.js-footer-year`,subscriptionForm:`.js-footer-form`,subscriptionBtn:`.js-footer-form-btn`,removeFavoriteBtn:`.js-remove-favorite`},f={muscles:`Muscles`,bodyParts:`Body parts`,equipment:`Equipment`},p=e(r(),1);p.default.settings({timeout:5e3,resetOnHover:!0,icon:`material-icons`,transitionIn:`flipInX`,transitionOut:`flipOutX`,position:`topRight`,maxWidth:360});function m(e){p.default.error({title:`Error`,message:e})}function h(e){p.default.success({message:e})}function g(e){p.default.warning({message:e})}var ee=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function _(){let e=document.querySelector(d.footerYear);e&&(e.textContent=`©${new Date().getFullYear()}`);let n=document.querySelector(d.subscriptionForm);n&&(n.addEventListener(`submit`,async e=>{e.preventDefault();let r=n.elements.namedItem(`email`).value.trim();if(!ee.test(r)){m(`Please enter a valid email address.`);return}let i=n.querySelector(d.subscriptionBtn);i&&(i.disabled=!0);try{h((await u(r)).message||`You have successfully subscribed!`),n.reset()}catch(e){let n=`Something went wrong. Please try again.`;if(t(e)&&(n=e.response?.data?.message??n,e.response?.status===409)){g(n);return}m(n)}finally{i&&(i.disabled=!1)}}),v())}function v(){let e=document.querySelector(d.scrollUpBtn);if(!e)return;let t=()=>{window.scrollY>300?e.classList.add(`is-visible`):e.classList.remove(`is-visible`)};t(),window.addEventListener(`scroll`,t,{passive:!0}),e.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:`smooth`}),e.blur()})}var y=`/goit-advancedjs-fp-03/assets/icons-OU3t1VH8.svg`,b=document.querySelector(d.modalBackdrop),x=null;function S(e,t){!b||!e||(b.removeAttribute(`hidden`),e.removeAttribute(`hidden`),document.body.classList.add(`is-modal-open`),x=t,b.addEventListener(`click`,w),document.addEventListener(`keydown`,T))}function C(e){!b||!e||(b.setAttribute(`hidden`,``),e.setAttribute(`hidden`,``),document.body.classList.remove(`is-modal-open`),b.removeEventListener(`click`,w),document.removeEventListener(`keydown`,T),x=null)}function w(e){e.target===b&&x&&x()}function T(e){e.code===`Escape`&&x&&x()}var E=`favorites`;function D(){let e=localStorage.getItem(E);if(!e)return[];try{return JSON.parse(e)}catch{return[]}}function O(e){let t=D();t.includes(e)||(t.push(e),localStorage.setItem(E,JSON.stringify(t)))}function k(e){let t=D().filter(t=>t!==e);localStorage.setItem(E,JSON.stringify(t))}function A(e){return D().includes(e)}var j={container:`.js-modal-exercise-container`,closeBtn:`.js-modal-exercise-close`,content:`.js-modal-exercise-content`,image:`.js-mcard-image`,name:`.js-mcard-name`,rating:`.js-mcard-rating`,stars:`.js-mcard-star`,target:`.js-mcard-target`,bodyPart:`.js-mcard-body-part`,equipment:`.js-mcard-equipment`,popularity:`.js-mcard-popularity`,burnedCalories:`.js-mcard-burned-calories`,description:`.js-mcard-description`,favBtn:`.js-btn-favorites`,favBtnText:`.js-fav-btn-text`,favBtnIcon:`.js-fav-icon`,ratingBtn:`.js-btn-rating`,isFavoriteClass:`is-favorite`},M={container:document.querySelector(j.container),closeBtn:document.querySelector(j.closeBtn),content:document.querySelector(j.content)},N=null;I();function P(e,t){L(),S(M.container,F),N=t||null,M.closeBtn?.addEventListener(`click`,F);async function n(){try{let t=await c(e);M.content.dataset.exerciseId=t._id,H(t),R()}catch{z()}}n()}function F(){C(M.container),M.closeBtn?.removeEventListener(`click`,F),N&&N()}function I(){M.content?.addEventListener(`click`,e=>{let t=e.target,n=t.closest(j.favBtn);if(n){B(n);return}let r=t.closest(j.ratingBtn);if(r){V(r);return}})}function L(){M.content?.classList.add(`is-loading`),M.content?.classList.remove(`is-error`)}function R(){M.content?.classList.remove(`is-loading`)}function z(){M.content?.classList.add(`is-error`),R()}function B(e){if(!M.content?.dataset.exerciseId)return;let t=e.classList.contains(j.isFavoriteClass);t?k(M.content?.dataset.exerciseId):O(M.content?.dataset.exerciseId),W(!t)}function V(e){m(`Rating feature is not implemented yet.`)}function H(e){let t=M.content?.querySelector(j.image),n=M.content?.querySelector(j.name),r=M.content?.querySelector(j.rating),i=M.content?.querySelector(j.target),a=M.content?.querySelector(j.bodyPart),o=M.content?.querySelector(j.equipment),s=M.content?.querySelector(j.popularity),c=M.content?.querySelector(j.burnedCalories),l=M.content?.querySelector(j.description);t&&(t.src=e.gifUrl,t.alt=e.name),n&&(n.textContent=e.name),r&&(r.textContent=e.rating.toFixed(2)),U(e.rating),i&&(i.textContent=e.target),a&&(a.textContent=e.bodyPart),o&&(o.textContent=e.equipment),s&&(s.textContent=e.popularity.toFixed(0)),c&&(c.textContent=`${e.burnedCalories.toFixed(0)}/${e.time.toFixed(0)} min`),l&&(l.textContent=e.description),W(A(e._id))}function U(e){let t=M.content?.querySelectorAll(j.stars);if(!t)return;let n=Math.round(e);t.forEach((e,t)=>{t<n?e.classList.add(`is-active`):e.classList.remove(`is-active`)})}function W(e){let t=M.content?.querySelector(j.favBtn),n=t?.querySelector(j.favBtnText),r=t?.querySelector(j.favBtnIcon);!t||!n||!r||(e?(t.classList.add(j.isFavoriteClass),n.textContent=`Remove from favorites`,r.setAttribute(`href`,`${y}#icon-trash`)):(t.classList.remove(j.isFavoriteClass),n.textContent=`Add to favorites`,r.setAttribute(`href`,`${y}#icon-heart`)))}function G(e,t=!1){let n=t?`
      <button type="button" class="card-delete-btn js-remove-favorite" aria-label="Remove from favorites">
        <svg width="16" height="16">
          <use href="${y}#icon-trash"></use>
        </svg>
      </button>
    `:``;return`
  
    <li class="exercise-card" data-exercise-id="${e._id}">
      <div class="card-top-line">
        <div class="card-badge-wrapper ${t?`is-favorite`:``}">
          <span class="card-badge">Workout</span>
          ${n}
          <div class="card-rating">
            <span class="rating-value">${e.rating.toFixed(2)}</span>
            <div class="stars-list">
              ${q(e.rating)}
            </div>
          </div>
        </div>

        <button type="button" class="card-start-btn js-show-card-btn">
          Start
          <svg class="icon-arrow" width="16" height="16">
            <use href="${y}#icon-start-arrow"></use>
          </svg>
        </button>
      </div>

      <div class="card-title-line">
        <div class="icon-run-wrapper">
          <svg class="icon-run" width="24" height="24">
            <use href="${y}#running"></use>
          </svg>
        </div>
        <p class="exercise-name">${e.name}</p>
      </div>

      <ul class="card-meta-list">
        <li class="meta-item">
          <span class="meta-label">Burned calories:</span>
          <span class="meta-value">${e.burnedCalories} / ${e.time} min</span>
        </li>
        <li class="meta-item">
          <span class="meta-label">Body part:</span>
          <span class="meta-value">${e.bodyPart}</span>
        </li>
        <li class="meta-item">
          <span class="meta-label">Target:</span>
          <span class="meta-value">${e.target}</span>
        </li>
      </ul>
    </li>`}function K(){return`
    <li class="exercises-empty-state">
      <p class="exercises-empty-text">
        No exercises found. Try a different filter or keyword.
      </p>
    </li>
  `}function q(e){let t=Math.round(e),n=``;for(let e=1;e<=5;e++)n+=`
        <svg class="icon-star${e<=t?` is-active`:``}" width="18" height="18">
          <use href="${y}#icon-star"></use>
        </svg>
      `;return n}var J=`dailyQuote`;function Y(){return new Date().toLocaleDateString(`en-CA`)}function X(){let e=localStorage.getItem(J);if(!e)return null;try{let t=JSON.parse(e);return t.date===Y()?t:(localStorage.removeItem(J),null)}catch{return localStorage.removeItem(J),null}}function Z(e){let t={...e,date:Y()};localStorage.setItem(J,JSON.stringify(t))}async function Q(){let e=X();if(e)return e;let t=await l();return Z(t),t}function $({quote:e,author:t}){let n=document.querySelector(`[data-quote-text]`),r=document.querySelector(`[data-quote-author]`);!n||!r||(n.textContent=e,r.textContent=t)}async function te(){if(document.querySelector(`[data-quote-text]`))try{$(await Q())}catch{$({quote:`The body achieves what the mind believes.`,author:`Unknown`})}}function ne(){let e={openBtn:document.querySelector(`.js-mobile-menu-btn`),closeBtn:document.querySelector(`.js-mobile-menu-close-btn`),menu:document.querySelector(`.js-mobile-menu`)};e.openBtn?.addEventListener(`click`,t),e.closeBtn?.addEventListener(`click`,t);function t(){e.menu?.classList.toggle(`is-open`),document.body.classList.toggle(`is-menu-open`)}re()}function re(){function e(e){if(e.matches){document.body.classList.remove(`is-menu-open`);let e=document.querySelector(`.js-mobile-menu`);e&&e.classList.remove(`is-open`)}}let t=window.matchMedia(`(min-width: 768px)`);t.addEventListener(`change`,e),e(t)}export{P as a,y as c,f as d,d as f,a as g,o as h,G as i,_ as l,s as m,te as n,D as o,c as p,K as r,k as s,ne as t,m as u};
//# sourceMappingURL=mobile-menu-Dk4sEVoj.js.map