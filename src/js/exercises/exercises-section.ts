import { initFilters } from './filters';
import { renderCategories, initCategoryList } from './category-list';
import { FILTER_CATEGORIES } from '../constants';
import { TFilterCategory } from '../types';

const state = {
  filter: FILTER_CATEGORIES.muscles as TFilterCategory,
  keyword: '',
  categoryPage: 1,
  exercisePage: 1,
};

function loadCategories() {
  void renderCategories(state.filter, state.categoryPage);
}

export function initExercisesSection() {
  initFilters({
    onFilterChange: (filter) => {
      state.filter = filter;
      state.keyword = '';
      state.categoryPage = 1;
      loadCategories();
    },
    onSearch: (keyword) => {
      state.keyword = keyword;
      state.exercisePage = 1;
    },
  });

  initCategoryList({
    onPageChange: (page) => {
      state.categoryPage = page;
      loadCategories();
    },
    onSelect: (category) => {
      console.log('Category selected:', category);
      // Exercise list will be implemented in the next task.
      // state.keyword will carry the active search keyword into that view.
    },
  });

  loadCategories();
}