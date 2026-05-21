import { TFilterCategory } from '../types';
import { SELECTORS, FILTER_CATEGORIES } from '../constants';

interface FilterOptions {
  onFilterChange?: (filter: TFilterCategory) => void;
  onSearch?: (keyword: string) => void;
}

function isFilterCategory(value: unknown): value is TFilterCategory {
  return typeof value === 'string' && [
    FILTER_CATEGORIES.muscles,
    FILTER_CATEGORIES.bodyParts,
    FILTER_CATEGORIES.equipment
  ].includes(value as TFilterCategory);
}

export function initFilters({ onFilterChange, onSearch }: FilterOptions = {}) {
  const filterList = document.querySelector<HTMLUListElement>(SELECTORS.filterList);

  if (!filterList) {
    console.error('Filter list not found');
    return;
  }

  filterList.addEventListener('click', (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>(SELECTORS.filterBtn);
    if (!target) {
      return;
    }

    const currentActive = filterList.querySelector<HTMLButtonElement>(SELECTORS.filterBtnActive);
    if (currentActive === target) {
      return;
    }

    const filter = target.dataset.filter;
    if (!filter || !isFilterCategory(filter)) {
      return;
    }

    currentActive?.classList.remove('active');
    target.classList.add('active');

    onFilterChange?.(filter);
  });

  const searchForm = document.querySelector<HTMLFormElement>(SELECTORS.searchForm);
  if (searchForm) {
    searchForm.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const searchInput = searchForm.querySelector<HTMLInputElement>(SELECTORS.searchInput);
      const keyword = searchInput?.value.trim() || '';
      onSearch?.(keyword);
    });
  }
}
