import { TFilterCategory } from '../types';
import { FILTER_CATEGORIES, SELECTORS } from '../constants';
import { fetchExercises, ExercisesParams } from '../services/api';
import { openExerciseModal } from './exercise-modal';
import {
  createExerciseItemMarkup,
  createExerciseEmptyMessage,
} from './exercise-card';
import { showErrorMessage } from '../utils';
import { showPagination, hidePagination } from '../pagination';

const ITEMS_PER_PAGE = window.innerWidth < 768 ? 8 : 10;

const exercisesListEl = document.querySelector<HTMLUListElement>(
  SELECTORS.exercisesList
);

let currentCategory: string | undefined;
let currentPage = 1;

export function initExercisesList() {
  exercisesListEl?.addEventListener('click', (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>(
      SELECTORS.showExerciseCardBtn
    );
    if (!target) return;

    const card = target.closest<HTMLElement>(SELECTORS.exerciseItem);
    const exerciseId = card?.dataset.exerciseId || '';
    if (exerciseId) {
      openExerciseModal(exerciseId);
    }
  });
}

export function hideExercisesList() {
  if (exercisesListEl) {
    exercisesListEl.innerHTML = '';
  }
}

interface RenderOptions {
  filter?: TFilterCategory;
  category?: string;
  keyword?: string;
  page?: number;
}

export async function renderExercises(options: RenderOptions) {
  if (!exercisesListEl) {
    return;
  }

  const selectedFilter =
    options.filter ||
    (document
      .querySelector(SELECTORS.filterBtnActive)
      ?.getAttribute('data-filter') as TFilterCategory);

  if (!selectedFilter) {
    showErrorMessage('Something went wrong. Filter undefined.');
    return;
  }

  const selectedCategory = options.category || currentCategory;

  if (!selectedCategory) {
    showErrorMessage('Something went wrong. Category undefined.');
    return;
  }

  const categoryTitleEl = document.querySelector(SELECTORS.categoryTitle);
  if (categoryTitleEl) {
    categoryTitleEl.textContent =
      selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1);
  }

  const selectedKeyword = options.keyword;

  currentCategory = selectedCategory;
  currentPage = options.page || 1;

  const fetchParams: ExercisesParams = {
    bodypart:
      selectedFilter == FILTER_CATEGORIES.bodyParts
        ? selectedCategory
        : undefined,
    muscles:
      selectedFilter == FILTER_CATEGORIES.muscles
        ? selectedCategory
        : undefined,
    equipment:
      selectedFilter == FILTER_CATEGORIES.equipment
        ? selectedCategory
        : undefined,
    keyword: selectedKeyword,
    page: currentPage,
    limit: ITEMS_PER_PAGE,
  };

  try {
    const data = await fetchExercises(fetchParams);

    if (data.results.length === 0) {
      exercisesListEl.innerHTML = createExerciseEmptyMessage();
      hidePagination();
      return;
    }

    const exerciseList = data.results
      .map(item => createExerciseItemMarkup(item))
      .join('');

    exercisesListEl.innerHTML = exerciseList;

    showPagination({
      totalPages: data.totalPages,
      currentPage: currentPage,
      onChangedPage: ({ page }: { page: number }) =>
        renderExercises({
          filter: selectedFilter,
          category: currentCategory,
          keyword: selectedKeyword,
          page,
        }),
    });
  } catch {
    exercisesListEl.innerHTML = createExerciseEmptyMessage();
    hidePagination();
    showErrorMessage('Something went wrong. Try later.');
  }
}
