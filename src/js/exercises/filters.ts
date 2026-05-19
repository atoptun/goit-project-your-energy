interface FilterOptions {
  onFilterChange?: (filter?: string) => void;
  onSearch?: (query?: string) => void;
}

export function initFilters({ onFilterChange, onSearch }: FilterOptions = {}) {
  const buttons = document.querySelectorAll<HTMLButtonElement>('.filter-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      onFilterChange?.(filter);
    });
  });
}
