import { SELECTORS } from './constants';
import iconsUrl from '../images/icons.svg?url';

const paginationNav = document.querySelector<HTMLUListElement>(SELECTORS.pagination);

type PageChangeHandler = (opts: { page: number }) => void;

let currentRenderHandler: PageChangeHandler | null = null;
let currentTotalPages = 0;

export function initPafination() {
  if (!paginationNav) return;
  paginationNav.addEventListener('click', onPageClickHandler);
}

export function hidePagination() {
  if (paginationNav) paginationNav.innerHTML = '';
  currentRenderHandler = null;
  currentTotalPages = 0;
}

interface ShowOptions {
  totalPages: number;
  currentPage: number;
  onChangedPage: PageChangeHandler | null;
}

export function showPagination({ totalPages, currentPage, onChangedPage }: ShowOptions) {
  if (!paginationNav) return;
  paginationNav.innerHTML = createPaginationMarkup(totalPages, currentPage);
  currentRenderHandler = onChangedPage;
  currentTotalPages = totalPages;
}

function onPageClickHandler(event: MouseEvent) {
  if (!currentRenderHandler) return;

  const target = (event.target as HTMLElement).closest<HTMLLIElement>(SELECTORS.paginationItem);
  if (
    !target ||
    target.classList.contains('disabled') ||
    target.classList.contains('pagination-ellipsis')
  )
    return;

  const currentPage = Number(
    document.querySelector(SELECTORS.paginationItemActive)?.getAttribute('data-page')
  );
  const pageAttr = target.dataset.page;

  let page: number;
  if (pageAttr === 'first') page = 1;
  else if (pageAttr === 'prev') page = Math.max(1, currentPage - 1);
  else if (pageAttr === 'next') page = Math.min(currentTotalPages, currentPage + 1);
  else if (pageAttr === 'last') page = currentTotalPages;
  else page = Number(pageAttr);

  if (!page || page === currentPage) return;
  currentRenderHandler({ page });
}

function createPaginationMarkup(totalPages: number, currentPage: number) {
  if (totalPages <= 1) return '';

  if (totalPages <= 3) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
      .map(
        page =>
          `<li class="pagination-item${page === currentPage ? ' active' : ''}" data-page="${page}">${page}</li>`
      )
      .join('');
  }

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  let windowStart = Math.max(1, currentPage - 1);
  const windowEnd = Math.min(totalPages, windowStart + 2);
  windowStart = Math.max(1, windowEnd - 2);

  const showLeftEllipsis = windowStart > 1;
  const showRightEllipsis = windowEnd < totalPages;

  const icon = (id: string, flip = false) =>
    `<svg width="40" height="40"${flip ? ' style="transform:scaleX(-1)"' : ''}><use href="${iconsUrl}#${id}"></use></svg>`;

  const nav = (iconMarkup: string, action: string, disabled: boolean) =>
    `<li class="pagination-item pagination-nav${disabled ? ' disabled' : ''}" data-page="${action}" aria-label="${action}">${iconMarkup}</li>`;

  const pageItem = (page: number) =>
    `<li class="pagination-item${page === currentPage ? ' active' : ''}" data-page="${page}">${page}</li>`;

  const ellipsis = `<li class="pagination-item pagination-ellipsis" aria-hidden="true">…</li>`;

  const items: string[] = [
    nav(icon('icon-pagination-last', true), 'first', isFirst),
    nav(icon('icon-pagination-next', true), 'prev', isFirst),
  ];

  if (showLeftEllipsis) items.push(ellipsis);
  for (let p = windowStart; p <= windowEnd; p++) items.push(pageItem(p));
  if (showRightEllipsis) items.push(ellipsis);

  items.push(
    nav(icon('icon-pagination-next'), 'next', isLast),
    nav(icon('icon-pagination-last'), 'last', isLast),
  );

  return items.join('');
}