import { TFilterCategory } from '../types';
import { SELECTORS } from '../constants';
import { fetchExercises, ExercisesParams } from '../services/api';
import { openExerciseModal } from './exercise-modal';
import { createExerciseItemMarkup } from './exercise-card';
import { showErrorMessage } from '../utils';

const ITEMS_PER_PAGE = window.innerWidth < 768 ? 8 : 10;

const exercisesListEl = document.querySelector<HTMLUListElement>(
  SELECTORS.exercisesList
);

let currentFilter: TFilterCategory;
let currentCategory: string;
let currentKeyword: string;
let currentPage = 1;


exercisesListEl?.addEventListener('click', (event: MouseEvent) => {
  const target = (event.target as HTMLElement).closest<HTMLElement>(
    '.exercise-item'
  );
  if (!target) {
    return;
  }

  const exerciseId = target.dataset.exerciseId || '';
  if (exerciseId) {
    openExerciseModal(exerciseId);
  }
});

interface RenderOptions {
  filter?: TFilterCategory;
  category?: string;
  keyword?: string;
  page?: number;
  onAction?: (action: string) => void;
}

export async function renderExercises(options: RenderOptions = {}) {
  const selectedFilter =
    options.filter || currentFilter || 
    (document
      .querySelector(SELECTORS.filterBtnActive)
      ?.getAttribute('data-filter') as TFilterCategory);

  if (!selectedFilter) {
    // something went wrong
    console.error('Filter undefined');
    return;
  }

  const selectedCategory = options.category || currentCategory;

  if (!selectedCategory) {
    // something went wrong
    console.error('Category undefined');
    return;
  }

  const selectedKeyword = options.keyword || currentKeyword;

  currentFilter = selectedFilter;
  currentCategory = selectedCategory;
  currentKeyword = selectedKeyword;
  currentPage = options.page || 1;

  const fetchParams: ExercisesParams = {
    bodypart: selectedFilter == 'Body parts' ? selectedCategory : undefined,
    muscles: selectedFilter == 'Muscles' ? selectedCategory : undefined,
    equipment: selectedFilter == 'Equipment' ? selectedCategory : undefined,
    keyword: selectedKeyword,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  };

  //Show loading state
  try {
    const data = await fetchExercises(fetchParams);

    const exerciseList = data.results
      .map(item => createExerciseItemMarkup(item))
      .join('');

    if (!exercisesListEl) return;

    exercisesListEl.innerHTML = exerciseList;

    // if (!pagination) return;

    // pagination.innerHTML = createPaginationMarkup(data.totalPages, page);
  } catch {
    showErrorMessage('Something went wrong. Try later.');
  } finally {
    // Hide loading state
  }
}
