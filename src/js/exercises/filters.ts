interface FilterOptions {
  onFilterChange?: (filter: string) => void;
  onSearch?: (keyword: string) => void;
}

export function initFilters({ onFilterChange, onSearch }: FilterOptions = {}) {
  const filterList = document.querySelector<HTMLUListElement>('.filter-list');

  if (!filterList) {
    console.error('Filter list not found');
    return;
  }

  filterList.addEventListener('click', (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest<HTMLButtonElement>('.filter-btn');
    if (!target) {
      return;
    }

    const currentActive = filterList.querySelector<HTMLButtonElement>('.filter-btn.active');
    if (currentActive === target) {
      return;
    }

    const filter = target.dataset.filter;
    if (!filter) {
      return;
    }

    currentActive?.classList.remove('active');
    target.classList.add('active');

    onFilterChange?.(filter);
  });

  const searchForm = document.querySelector<HTMLFormElement>('#js-search-form');
  if (searchForm) {
    searchForm.addEventListener('submit', (event: Event) => {
      event.preventDefault();
      const searchInput = searchForm.querySelector<HTMLInputElement>('.search-input');
      const keyword = searchInput?.value.trim() || '';
      onSearch?.(keyword);
    });
  }
}
