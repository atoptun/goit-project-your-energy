import { SELECTORS } from './constants';

const paginationNav = document.querySelector<HTMLUListElement>(
  SELECTORS.pagination
);

let currentRenderHandler: CallableFunction | null = null;

export function initPafination() {
  if (!paginationNav) return;
  paginationNav.addEventListener('click', onPageClickHanddler);
}

export function hidePagination() {
  if (paginationNav) {
    paginationNav.innerHTML = '';
  }
  currentRenderHandler = null;
}

interface ShowOptions {
  totalPages: number;
  currentPage: number;
  onChangedPage: CallableFunction | null;
}

export function showPagination({
  totalPages,
  currentPage,
  onChangedPage: renderHandler,
}: ShowOptions) {
  if (!paginationNav) return;

  paginationNav.innerHTML = createPaginationMarkup(totalPages, currentPage);
  currentRenderHandler = renderHandler;
}

function onPageClickHanddler(event: MouseEvent) {
  if (!currentRenderHandler) return;

  const target = (event.target as HTMLElement).closest<HTMLLIElement>(
    SELECTORS.paginationItem
  );
  if (!target) {
    return;
  }

  const currentPage = Number(
    document
      .querySelector(SELECTORS.paginationItemActive)
      ?.getAttribute('data-page')
  );
  const page = Number(target.dataset.page || '1');
  if (!page || page === currentPage) {
    return;
  }
  currentRenderHandler({ page: page });
}

function createPaginationMarkup(totalPages: number, currentPage: number) {
  return Array.from({ length: totalPages }, (_, idx) => idx + 1)
    .map(page => {
      return `<li class="pagination-item ${currentPage === page ? 'active' : ''}" data-page="${page}">${page}</li>`;
    })
    .join('');
}
