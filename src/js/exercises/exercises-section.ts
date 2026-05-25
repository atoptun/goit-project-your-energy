import { initFilters, hideSearchForm, showSearchForm } from './filters';
import {
  renderCategories,
  initCategoryList,
  hideCategoryList,
} from './category-list';
import {
  initExercisesList,
  renderExercises,
  hideExercisesList,
} from './exercises-list';
import { FILTER_CATEGORIES } from '../constants';
import { hidePagination, initPafination } from '../pagination';
import { TFilterCategory } from '../types';


export function initExercisesSection() {
  initPafination();

  initFilters({
    onFilterChange: (filter: TFilterCategory) => {
      hideSearchForm();
      hidePagination();
      hideExercisesList();
      renderCategories({ filter });
    },
    onSearch: (keyword: string) => renderExercises({ keyword }),
  });

  initCategoryList({
    onSelect: (category: string) => {
      showSearchForm();
      hidePagination();
      hideCategoryList();
      // Handle category selection
      renderExercises({ category });
    },
  });

  initExercisesList();

  renderCategories({ filter: FILTER_CATEGORIES.muscles });
}
