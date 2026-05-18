export function initFilters({ onFilterChange, onSearch } = {}) {
  const buttons = document.querySelectorAll('.filter-btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;
      onFilterChange?.(filter);
    });
  });
}
