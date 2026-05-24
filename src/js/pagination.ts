import * as pagination from '@zag-js/pagination';
import { normalizeProps, VanillaMachine } from '@zag-js/vanilla';
import { SELECTORS } from './constants';

const paginationNav = document.querySelector<HTMLUListElement>(
  SELECTORS.pagination
);

type PageChangeHandler = (opts: { page: number }) => void;

let currentRenderHandler: PageChangeHandler | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let machineService: VanillaMachine<any> | null = null;

export function initPafination() {
  if (!paginationNav) return;
  paginationNav.addEventListener('click', onPageClickHanddler);
}

export function hidePagination() {
  if (paginationNav) {
    paginationNav.innerHTML = '';
  }
  if (machineService) {
    machineService.stop();
    machineService = null;
  }
  currentRenderHandler = null;
}

interface ShowOptions {
  totalPages: number;
  currentPage: number;
  onChangedPage: PageChangeHandler | null;
}

export function showPagination({
  totalPages,
  currentPage,
  onChangedPage,
}: ShowOptions) {
  if (!paginationNav) return;

  if (totalPages <= 1) {
    hidePagination();
    return;
  }

  currentRenderHandler = onChangedPage;

  if (machineService) {
    machineService.stop();
  }

  machineService = new VanillaMachine(pagination.machine, {
    id: 'exercises-pagination',
    count: totalPages,
    pageSize: 1,
    page: currentPage,
    onPageChange(details) {
      if (currentRenderHandler) {
        currentRenderHandler({ page: details.page });
      }
    },
  });

  machineService.start();

  const render = () => {
    if (!machineService) return;
    const api = pagination.connect(machineService.service, normalizeProps);

    const pagesMarkup = api.pages
      .map(page => {
        if (page.type === 'page') {
          const isActive = api.page === page.value;
          return `<li class="pagination-item ${isActive ? 'active' : ''}" data-page="${page.value}" role="button" aria-label="Page ${page.value}" aria-current="${isActive ? 'page' : 'true'}">${page.value}</li>`;
        } else {
          return `<li class="pagination-item ellipsis" aria-hidden="true">...</li>`;
        }
      })
      .join('');

    paginationNav.innerHTML = pagesMarkup;
  };

  machineService.subscribe(render);
  render();
}

function onPageClickHanddler(event: MouseEvent) {
  if (!machineService) return;

  const target = (event.target as HTMLElement).closest<HTMLLIElement>(
    SELECTORS.paginationItem
  );
  if (!target || target.classList.contains('ellipsis')) {
    return;
  }

  const page = Number(target.dataset.page || '1');
  if (!page) return;

  const api = pagination.connect(machineService.service, normalizeProps);
  api.setPage(page);
}

