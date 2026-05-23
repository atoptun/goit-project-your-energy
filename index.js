import{r as e}from"./assets/rolldown-runtime-DMWpINJ5.js";import{a as t,i as n,n as r,r as i,t as a}from"./assets/mobile-menu-D9ccfRW2.js";import{t as o}from"./assets/vendor-BMtsypGf.js";var s={categoryList:`.js-category-list`,categoryItem:`.category-item`,exercisesList:`.js-exercises-list`,exerciseItem:`.exercise-item`,pagination:`.js-pagination`,paginationItem:`.pagination-item`,paginationItemActive:`.pagination-item.active`,filterList:`.filter-list`,filterBtn:`.filter-btn`,filterBtnActive:`.filter-btn.active`,searchForm:`.search-form`,searchInput:`.search-input`,categoryTitle:`.js-category-title`,modalBackdrop:`.js-modal-backdrop`,modalCloseBtn:`.js-modal-close`,modalExercise:`.js-modal-exercise`},c={muscles:`Muscles`,bodyParts:`Body parts`,equipment:`Equipment`};function l(e){return typeof e==`string`&&Object.values(c).includes(e)}function u({onFilterChange:e,onSearch:t}){let n=document.querySelector(s.filterList),r=document.querySelector(s.searchForm),i=r?.querySelector(s.searchInput),a=r?.querySelector(`.clear-btn`),o=()=>{a&&(a.hidden=!i?.value)};n&&n.addEventListener(`click`,t=>{let r=t.target.closest(s.filterBtn);if(!r)return;let a=n.querySelector(s.filterBtnActive),c=r.dataset.filter;!c||!l(c)||(a?.classList.remove(`active`),r.classList.add(`active`),i&&(i.value=``,o()),e(c))}),r&&i&&(i.addEventListener(`input`,o),a?.addEventListener(`click`,()=>{i.value=``,o(),i.focus()}),r.addEventListener(`submit`,e=>{e.preventDefault(),t(i.value.trim()),i.value=``,o()}))}function d(){document.querySelector(s.searchForm)?.classList.add(`hidden`)}function f(){document.querySelector(s.searchForm)?.classList.remove(`hidden`)}var p=document.querySelector(s.pagination),m=null;function h(){p&&p.addEventListener(`click`,v)}function g(){p&&(p.innerHTML=``),m=null}function _({totalPages:e,currentPage:t,onChangedPage:n}){p&&(p.innerHTML=y(e,t),m=n)}function v(e){if(!m)return;let t=e.target.closest(s.paginationItem);if(!t)return;let n=Number(document.querySelector(s.paginationItemActive)?.getAttribute(`data-page`)),r=Number(t.dataset.page||`1`);!r||r===n||m({page:r})}function y(e,t){return e<=1?``:Array.from({length:e},(e,t)=>t+1).map(e=>`<li class="pagination-item ${t===e?`active`:``}" data-page="${e}">${e}</li>`).join(``)}var b=e(o(),1);b.default.settings({timeout:5e3,resetOnHover:!0,icon:`material-icons`,transitionIn:`flipInX`,transitionOut:`flipOutX`,position:`topRight`});function x(e){b.default.error({title:`Error`,message:e})}var S=window.innerWidth<768?9:12,C=document.querySelector(s.categoryList);function w({onSelect:e}={}){C?.addEventListener(`click`,t=>{let n=t.target.closest(s.categoryItem);if(!n)return;let r=n.dataset.category||``;r&&e?.(r)})}function T(){C&&(C.innerHTML=``)}async function E({filter:e,page:t}){let r=t||1;g();let i=document.querySelector(s.categoryTitle);i&&(i.textContent=``);try{let i=await n({filter:e,limit:S,page:t});if(!i)return;let a=i.results.map(e=>D(e)).join(``);if(!C)return;C.innerHTML=a,_({totalPages:i.totalPages,currentPage:r,onChangedPage:({page:t})=>E({filter:e,page:t})})}catch(e){console.error(e),x(`Failed to load categories. Please try again later.`)}}function D(e){return`
    <li class="category-item" data-category="${e.name}">
      <img class="category-image" src="${e.imgURL}" alt="${e.name}">
      <div class="category-info">
        <h3 class="category-name">${e.name}</h3>
        <p class="category-filter">${e.filter}</p>
      </div>
    </li>
    `}var O=document.querySelector(s.modalBackdrop),k=null;function A(e,t){!O||!e||(O.removeAttribute(`hidden`),e.removeAttribute(`hidden`),document.body.classList.add(`is-modal-open`),k=t,O.addEventListener(`click`,M),document.addEventListener(`keydown`,N))}function j(e){!O||!e||(O.setAttribute(`hidden`,``),e.setAttribute(`hidden`,``),document.body.classList.remove(`is-modal-open`),O.removeEventListener(`click`,M),document.removeEventListener(`keydown`,N),k=null)}function M(e){e.target===O&&k&&k()}function N(e){e.code===`Escape`&&k&&k()}var P={modal:document.querySelector(s.modalExercise),closeBtn:document.querySelector(s.modalCloseBtn)};function F(e){A(P.modal,I),P.closeBtn?.addEventListener(`click`,I),P.modal?.removeAttribute(`hidden`)}function I(){j(P.modal),P.closeBtn?.removeEventListener(`click`,I)}function L(e){function t(e){let t=Math.round(e),n=``;for(let e=1;e<=5;e++)n+=`
        <svg class="icon-star${e<=t?` is-active`:``}" width="18" height="18">
          <use href="./images/icons.svg#icon-star"></use>
        </svg>
      `;return n}return`
  
    <li class="exercise-card" data-exercise-id="${e._id}">
      <div class="card-top-line">
        <div class="card-badge-wrapper">
          <span class="card-badge">Workout</span>
          <div class="card-rating">
            <span class="rating-value">${e.rating||`0.0`}</span>
            <div class="stars-list">
              ${t(e.rating||0)}
            </div>
          </div>
        </div>

        <button type="button" class="card-start-btn">
          Start
          <svg class="icon-arrow" width="16" height="16">
            <use href="./images/icons.svg#icon-arrow"></use>
          </svg>
        </button>
      </div>

      <div class="card-title-line">
        <div class="icon-run-wrapper">
          <svg class="icon-run" width="24" height="24">
            <use href="./images/icons.svg#icon-run"></use>
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
    </li>`}function R(){return`
    <li class="exercises-empty-state">
      <p class="exercises-empty-text">
        No exercises found. Try a different filter or keyword.
      </p>
    </li>
  `}var z=window.innerWidth<768?8:10,B=document.querySelector(s.exercisesList),V,H=1;function U(){B?.addEventListener(`click`,e=>{let t=e.target.closest(s.exerciseItem);if(!t)return;let n=t.dataset.exerciseId||``;n&&F(n)})}function W(){B&&(B.innerHTML=``)}async function G(e){if(!B)return;g();let t=e.filter||document.querySelector(s.filterBtnActive)?.getAttribute(`data-filter`);if(!t){x(`Something went wrong. Filter undefined.`);return}let n=e.category||V;if(!n){x(`Something went wrong. Category undefined.`);return}let r=document.querySelector(s.categoryTitle);r&&(r.textContent=n);let a=e.keyword;V=n,H=e.page||1;let o={bodypart:t==c.bodyParts?n:void 0,muscles:t==c.muscles?n:void 0,equipment:t==c.equipment?n:void 0,keyword:a,page:H,limit:z};try{let e=await i(o);if(e.results.length===0){B.innerHTML=R();return}B.innerHTML=e.results.map(e=>L(e)).join(``),_({totalPages:e.totalPages,currentPage:H,onChangedPage:({page:e})=>G({filter:t,category:V,keyword:a,page:e})})}catch{B.innerHTML=R(),x(`Something went wrong. Try later.`)}}function K(){h(),u({onFilterChange:e=>{d(),W(),E({filter:e})},onSearch:e=>G({keyword:e})}),w({onSelect:e=>{f(),T(),G({category:e})}}),U(),E({filter:c.muscles})}t(),r(),K(),a();
//# sourceMappingURL=index.js.map