import{r as e}from"./rolldown-runtime-DMWpINJ5.js";import{n as t,t as n}from"./vendor-BMtsypGf.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();function r(e){return e.split(`/`).pop()||`index.html`}function i(){let e=r(window.location.pathname);document.querySelectorAll(`.header-nav-link`).forEach(t=>{r(t.pathname)===e&&t.classList.add(`is-active`)})}t.defaults.baseURL=`https://your-energy.b.goit.study/api`;async function a(e={}){let{data:n}=await t.get(`/filters`,{params:e});return n}async function o(e={}){let{data:n}=await t.get(`/exercises`,{params:e});return n}async function s(e){let{data:n}=await t.get(`/exercises/${e}`);return n}async function c(){let{data:e}=await t.get(`/quote`);return e}var l=`/goit-advancedjs-fp-03/assets/icons-BVop3-xk.svg`,u=e(n(),1);u.default.settings({timeout:5e3,resetOnHover:!0,icon:`material-icons`,transitionIn:`flipInX`,transitionOut:`flipOutX`,position:`topRight`});function d(e){u.default.error({title:`Error`,message:e})}function f(e,t=!1){let n=t?`
      <button type="button" class="card-delete-btn js-remove-favorite" aria-label="Remove from favorites">
        <svg width="16" height="16">
          <use href="${l}#icon-trash"></use>
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
            <use href="${l}#icon-start-arrow"></use>
          </svg>
        </button>
      </div>

      <div class="card-title-line">
        <div class="icon-run-wrapper">
          <svg class="icon-run" width="24" height="24">
            <use href="${l}#running"></use>
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
    </li>`}function p(){return`
    <li class="exercises-empty-state">
      <p class="exercises-empty-text">
        No exercises found. Try a different filter or keyword.
      </p>
    </li>
  `}var m=`dailyQuote`;function h(){return new Date().toLocaleDateString(`en-CA`)}function g(){let e=localStorage.getItem(m);if(!e)return null;try{let t=JSON.parse(e);return t.date===h()?t:(localStorage.removeItem(m),null)}catch{return localStorage.removeItem(m),null}}function _(e){let t={...e,date:h()};localStorage.setItem(m,JSON.stringify(t))}async function v(){let e=g();if(e)return e;let t=await c();return _(t),t}function y({quote:e,author:t}){let n=document.querySelector(`[data-quote-text]`),r=document.querySelector(`[data-quote-author]`);!n||!r||(n.textContent=e,r.textContent=t)}async function b(){if(document.querySelector(`[data-quote-text]`))try{y(await v())}catch{y({quote:`The body achieves what the mind believes.`,author:`Unknown`})}}function x(){let e={openBtn:document.querySelector(`.js-mobile-menu-btn`),closeBtn:document.querySelector(`.js-mobile-menu-close-btn`),menu:document.querySelector(`.js-mobile-menu`)};e.openBtn?.addEventListener(`click`,t),e.closeBtn?.addEventListener(`click`,t);function t(){e.menu?.classList.toggle(`is-open`),document.body.classList.toggle(`is-menu-open`)}S()}function S(){function e(e){if(e.matches){document.body.classList.remove(`is-menu-open`);let e=document.querySelector(`.js-mobile-menu`);e&&e.classList.remove(`is-open`)}}let t=window.matchMedia(`(min-width: 768px)`);t.addEventListener(`change`,e),e(t)}export{d as a,o as c,f as i,a as l,b as n,l as o,p as r,s,x as t,i as u};
//# sourceMappingURL=mobile-menu-B2vTKRP2.js.map