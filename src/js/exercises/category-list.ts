import { fetchFilters } from '../services/api';
import { ICategory } from '../types';
import { SELECTORS } from '../constants';

const categoryListEl = document.querySelector<HTMLUListElement>(SELECTORS.categoryList);

interface CategoryListOptions {
  onSelect?: (category: string) => void;
  onPageChange?: (page: number) => void;
}

export function initCategoryList({ onSelect, onPageChange }: CategoryListOptions = {}) {
  categoryListEl?.addEventListener('click', (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest<HTMLElement>('.category-item');
    if (!target) {
      return;
    }

    const categoryName = target.dataset.category || '';
    if (categoryName) {
      onSelect?.(categoryName);
    }
  });

  const paginationNav = document.querySelector<HTMLUListElement>(SELECTORS.pagination);
  paginationNav?.addEventListener('click', (event: MouseEvent) => {
    const target = (event.target as HTMLElement).closest<HTMLLIElement>(SELECTORS.paginationItem);

    if (!target) {
      return;
    }

    const page = Number(target.dataset.page);
    onPageChange?.(page);
  });
}


function createCategoryItemMarkup(category: ICategory) {
  return `
      <li class="category-item" data-category="${category.name}">
        <img class="category-image" src="${category.imgURL}" alt="${category.name}">
        <div class="category-info">
          <h3 class="category-name">${category.name}</h3>
          <p class="category-filter">${category.filter}</p>
        </div>
      </li>
      `
}

function createPaginationMarkup(totalPages: number, currentPage: number) {
  return Array.from({ length: totalPages }, (_, idx) => idx + 1).map(page => {
    return `<li class="pagination-item ${currentPage === page ? 'active' : ''}" data-page="${page}">${page}</li>`
  }).join('');
}

export async function renderCategories(filter?: string, page?: number) {
  page ||= 1;
  const ITEMS_PER_PAGE = window.innerWidth < 768 ? 9 : 12;

  const pagination = document.querySelector<HTMLElement>(SELECTORS.pagination);

  try {
    const data = await fetchFilters({ filter, limit: ITEMS_PER_PAGE, page })

    const categoryList = data.results.map(item => createCategoryItemMarkup(item)).join("")

    if (!categoryListEl) return;

    categoryListEl.innerHTML = categoryList;

    if (!pagination) return;

    pagination.innerHTML = createPaginationMarkup(data.totalPages, page);

  } catch (error) {
    console.error(error);
  }
}
