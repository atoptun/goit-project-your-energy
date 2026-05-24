import { fetchFilters } from '../services/api';
import { ICategory, TFilterCategory } from '../types';
import { SELECTORS } from '../constants';
import { showPagination, hidePagination } from '../pagination';
import { showErrorMessage } from '../utils'

const ITEMS_PER_PAGE = window.innerWidth < 768 ? 9 : 12;

const categoryListEl = document.querySelector<HTMLUListElement>(
  SELECTORS.categoryList
);

interface CategoryListOptions {
  onSelect?: (category: string) => void;
}

export function initCategoryList({ onSelect }: CategoryListOptions = {}) {
  categoryListEl?.addEventListener('click', (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>(SELECTORS.categoryItem);
    if (!target) {
      return;
    }

    const categoryName = target.dataset.category || '';
    if (categoryName) {
      onSelect?.(categoryName);
    }
  });
}

export function hideCategoryList() {
  if (categoryListEl) {
    categoryListEl.innerHTML = '';
  }
}

interface RenderOptions {
  filter: TFilterCategory;
  page?: number;
}

export async function renderCategories({ filter, page }: RenderOptions) {
  const currentPage = page || 1;

  hidePagination();

  const breadcrumbEl = document.querySelector(SELECTORS.categoryTitle);
  if (breadcrumbEl) {
    breadcrumbEl.textContent = '';
    document.querySelector(SELECTORS.categorySeparator)?.classList.remove('is-visible');
  }
  try {
    const data = await fetchFilters({ filter, limit: ITEMS_PER_PAGE, page });

    if (!data) return;

    const categoryList = data.results.map(item => createCategoryItemMarkup(item)).join('')

    if (!categoryListEl) return;

    categoryListEl.innerHTML = categoryList;

    showPagination({
      totalPages: data.totalPages,
      currentPage: currentPage,
      onChangedPage: ({ page }: { page: number }) =>
        renderCategories({ filter, page }),
    });
  } catch (error) {
    console.error(error);
    showErrorMessage('Failed to load categories. Please try again later.');
  }
}

function createCategoryItemMarkup(category: ICategory) {
  return `
    <li class="category-item" data-category="${category.name}">
      <img class="category-image" src="${category.imgURL}" alt="${category.name}" loading="lazy">
      <div class="category-info">
        <h3 class="category-name">${category.name}</h3>
        <p class="category-filter">${category.filter}</p>
      </div>
    </li>
    `;
}
