export const SELECTORS = {
  categoryList: '.js-category-list',
  categoryItem: '.category-item',
  exercisesList: '.js-exercises-list',
  pagination: '.js-pagination',
  paginationItem: '.pagination-item',
  paginationItemActive: '.pagination-item.active',
  filterList: '.filter-list',
  filterBtn: '.filter-btn',
  filterBtnActive: '.filter-btn.active',
  searchForm: '.search-form',
  searchInput: '.search-input',
  categoryTitle: '.js-category-title',
  footerYear: '.js-footer-year',
} as const;

export const FILTER_CATEGORIES = {
  muscles: 'Muscles',
  bodyParts: 'Body parts',
  equipment: 'Equipment',
} as const;
