import { TFilterCategory } from '../types';
import { SELECTORS, FILTER_CATEGORIES } from '../constants';

interface FilterOptions {
  onFilterChange: (filter: TFilterCategory) => void;
  onSearch: (keyword: string) => void;
}

function isFilterCategory(value: unknown): value is TFilterCategory {
  return typeof value === 'string' && (Object.values(FILTER_CATEGORIES) as string[]).includes(value);
}

export function initFilters({ onFilterChange, onSearch }: FilterOptions) {
  const filterList = document.querySelector<HTMLUListElement>(SELECTORS.filterList);
  const searchForm = document.querySelector<HTMLFormElement>(SELECTORS.searchForm);
  const searchInput = searchForm?.querySelector<HTMLInputElement>(SELECTORS.searchInput);
  const clearBtn = searchForm?.querySelector<HTMLButtonElement>('.clear-btn');

  const toggleClearBtn = () => {
    if (clearBtn) {
      clearBtn.hidden = !searchInput?.value;
    }
  };

  if (filterList) {
    filterList.addEventListener('click', (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest<HTMLButtonElement>(
        SELECTORS.filterBtn
      );
      if (!target) {
        return;
      }

      const currentActive = filterList.querySelector<HTMLButtonElement>(
        SELECTORS.filterBtnActive
      );
      if (currentActive === target) {
        // need to reload if exercise list is opened
        // return;
      }

      const filter = target.dataset.filter;
      if (!filter || !isFilterCategory(filter)) {
        return;
      }

      currentActive?.classList.remove('active');
      target.classList.add('active');

      if (searchInput) {
        searchInput.value = '';
        toggleClearBtn();
      }

      onFilterChange(filter);
    });
  }

  if (searchForm && searchInput) {
    searchInput.addEventListener('input', toggleClearBtn);

    clearBtn?.addEventListener('click', () => {
      searchInput.value = '';
      toggleClearBtn();
      searchInput.focus();
    });

    searchForm.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const keyword = searchInput.value.trim();
      onSearch(keyword);
      searchInput.value = '';
      toggleClearBtn();
    });
  }
}

export function hideSearchForm() {
  const searchFormEl = document.querySelector<HTMLFormElement>(
    SELECTORS.searchForm
  );
  searchFormEl?.classList.add('hidden');
}

export function showSearchForm() {
  const searchFormEl = document.querySelector<HTMLFormElement>(
    SELECTORS.searchForm
  );
  searchFormEl?.classList.remove('hidden');
}
