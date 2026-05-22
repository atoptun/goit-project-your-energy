import { initFilters } from './filters';
import { renderCategories } from './category-list';

export function initExercisesSection() {
  initFilters({
    onFilterChange: (filter: string) => {
      renderCategories(filter);
    },
    onSearch: (keyword: string) => {
      console.log('Search keyword:', keyword);
    },
  });

  renderCategories('Muscles');
}