import{r as e}from"./rolldown-runtime-DMWpINJ5.js";import{n as t,r as n,t as r}from"./vendor-DcqH4JyS.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function i(e){return e.split(`/`).pop()||`index.html`}function a(){let e=i(window.location.pathname);document.querySelectorAll(`.header-nav-link`).forEach(t=>{i(t.pathname)===e&&t.classList.add(`is-active`)})}n.defaults.baseURL=`https://your-energy.b.goit.study/api`;async function o(e={}){let{data:t}=await n.get(`/filters`,{params:e});return t}async function s(e={}){let{data:t}=await n.get(`/exercises`,{params:e});return t}async function c(e){let{data:t}=await n.get(`/exercises/${e}`);return t}async function l(){let{data:e}=await n.get(`/quote`);return e}async function u(e){let{data:t}=await n.post(`/subscription`,{email:e});return t}var d={categoryList:`.js-category-list`,categoryItem:`.category-item`,exercisesList:`.js-exercises-list`,exerciseItem:`.exercise-item`,pagination:`.js-pagination`,paginationItem:`.pagination-item`,paginationItemActive:`.pagination-item.active`,filterList:`.filter-list`,filterBtn:`.filter-btn`,filterBtnActive:`.filter-btn.active`,searchForm:`.search-form`,searchInput:`.search-input`,categoryTitle:`.js-category-title`,categorySeparator:`.js-category-separator`,scrollUpBtn:`.js-scroll-up`,modalBackdrop:`.js-modal-backdrop`,modalCloseBtn:`.js-modal-close`,modalExercise:`.js-modal-exercise`,footerYear:`.js-footer-year`,subscriptionForm:`.js-footer-form`,subscriptionBtn:`.js-footer-form-btn`},f={muscles:`Muscles`,bodyParts:`Body parts`,equipment:`Equipment`},p=e(r(),1);p.default.settings({timeout:5e3,resetOnHover:!0,icon:`material-icons`,transitionIn:`flipInX`,transitionOut:`flipOutX`,position:`topRight`,maxWidth:360});function m(e){p.default.error({title:`Error`,message:e})}function h(e){p.default.success({message:e})}function g(e){p.default.warning({message:e})}var _=/^\w+(\.\w+)?@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;function v(){let e=document.querySelector(d.footerYear);e&&(e.textContent=`©${new Date().getFullYear()}`);let n=document.querySelector(d.subscriptionForm);n&&(n.addEventListener(`submit`,async e=>{e.preventDefault();let r=n.elements.namedItem(`email`).value.trim();if(!_.test(r)){m(`Please enter a valid email address.`);return}let i=n.querySelector(d.subscriptionBtn);i&&(i.disabled=!0);try{h((await u(r)).message||`You have successfully subscribed!`),n.reset()}catch(e){let n=`Something went wrong. Please try again.`;if(t(e)&&(n=e.response?.data?.message??n,e.response?.status===409)){g(n);return}m(n)}finally{i&&(i.disabled=!1)}}),y())}function y(){let e=document.querySelector(d.scrollUpBtn);if(!e)return;let t=()=>{window.scrollY>300?e.classList.add(`is-visible`):e.classList.remove(`is-visible`)};t(),window.addEventListener(`scroll`,t,{passive:!0}),e.addEventListener(`click`,()=>{window.scrollTo({top:0,behavior:`smooth`}),e.blur()})}var b=`/goit-advancedjs-fp-03/assets/icons-ExCxXG2e.svg`;function x(e,t=!1){let n=t?`
      <button type="button" class="card-delete-btn js-remove-favorite" aria-label="Remove from favorites">
        <svg width="16" height="16">
          <use href="${b}#icon-trash"></use>
        </svg>
      </button>
    `:``;return`
  
    <li class="exercise-card" data-exercise-id="${e._id}">
      <div class="card-top-line">
        <div class="card-badge-wrapper ${t?`is-favorite`:``}">
          <span class="card-badge">Workout</span>
          ${n}
        </div>

        <button type="button" class="card-start-btn">
          Start
          <svg class="icon-arrow" width="16" height="16">
            <use href="${b}#icon-start-arrow"></use>
          </svg>
        </button>
      </div>

      <div class="card-title-line">
        <div class="icon-run-wrapper">
          <svg class="icon-run" width="24" height="24">
            <use href="${b}#running"></use>
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
    </li>`}function S(){return`
    <li class="exercises-empty-state">
      <p class="exercises-empty-text">
        No exercises found. Try a different filter or keyword.
      </p>
    </li>
  `}var C=`dailyQuote`;function w(){return new Date().toLocaleDateString(`en-CA`)}function T(){let e=localStorage.getItem(C);if(!e)return null;try{let t=JSON.parse(e);return t.date===w()?t:(localStorage.removeItem(C),null)}catch{return localStorage.removeItem(C),null}}function E(e){let t={...e,date:w()};localStorage.setItem(C,JSON.stringify(t))}async function D(){let e=T();if(e)return e;let t=await l();return E(t),t}function O({quote:e,author:t}){let n=document.querySelector(`[data-quote-text]`),r=document.querySelector(`[data-quote-author]`);!n||!r||(n.textContent=e,r.textContent=t)}async function k(){if(document.querySelector(`[data-quote-text]`))try{O(await D())}catch{O({quote:`The body achieves what the mind believes.`,author:`Unknown`})}}function A(){let e={openBtn:document.querySelector(`.js-mobile-menu-btn`),closeBtn:document.querySelector(`.js-mobile-menu-close-btn`),menu:document.querySelector(`.js-mobile-menu`)};e.openBtn?.addEventListener(`click`,t),e.closeBtn?.addEventListener(`click`,t);function t(){e.menu?.classList.toggle(`is-open`),document.body.classList.toggle(`is-menu-open`)}j()}function j(){function e(e){if(e.matches){document.body.classList.remove(`is-menu-open`);let e=document.querySelector(`.js-mobile-menu`);e&&e.classList.remove(`is-open`)}}let t=window.matchMedia(`(min-width: 768px)`);t.addEventListener(`change`,e),e(t)}export{b as a,f as c,s as d,o as f,x as i,d as l,k as n,v as o,a as p,S as r,m as s,A as t,c as u};
//# sourceMappingURL=mobile-menu-DaLQ9002.js.map