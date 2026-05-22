interface FilterOptions {
  onFilterChange: (filter: string) => void;
  onSearch: (keyword: string) => void;
}

export function initFilters({ onFilterChange, onSearch }: FilterOptions) {
  const filterList = document.querySelector<HTMLUListElement>('.filter-list');
  const searchForm = document.querySelector<HTMLFormElement>('.search-form');
  const searchInput = searchForm?.querySelector<HTMLInputElement>('.search-input');
  const clearBtn = searchForm?.querySelector<HTMLButtonElement>('.clear-btn');

  const toggleClearBtn = () => {
    if (clearBtn) {
      clearBtn.hidden = !searchInput?.value;
    }
  };

  if (filterList) {
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