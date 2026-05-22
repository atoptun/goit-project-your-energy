export const SELECTORS = {
  categoryList: '.js-category-list',
  exercisesList: '.js-exercises-list',
  pagination: '.js-pagination',
  paginationItem: '.pagination-item',
  paginationItemActive: '.pagination-item.active',
  filterList: '.filter-list',
  filterBtn: '.filter-btn',
  filterBtnActive: '.filter-btn.active',
  searchForm: '.search-form',
  searchFormClass: '.search-form',
  searchInput: '.search-input',
  categoryTitle: '.js-category-title',
} as const;

export const FILTER_CATEGORIES = {
  muscles: 'Muscles',
  bodyParts: 'Body parts',
  equipment: 'Equipment',
} as const;
