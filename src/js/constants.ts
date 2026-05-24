export const SELECTORS = {
  categoryList: '.js-category-list',
  categoryItem: '.category-item',
  exercisesList: '.js-exercises-list',
  exerciseItem: '.exercise-item',
  pagination: '.js-pagination',
  paginationItem: '.pagination-item',
  paginationItemActive: '.pagination-item.active',
  filterList: '.filter-list',
  filterBtn: '.filter-btn',
  filterBtnActive: '.filter-btn.active',
  searchForm: '.search-form',
  searchInput: '.search-input',
  categoryTitle: '.js-category-title',
  categorySeparator: '.js-category-separator',
  scrollUpBtn: '.js-scroll-up',
  // modals
  modalBackdrop: '.js-modal-backdrop',
  modalCloseBtn: '.js-modal-close',
  modalExercise: '.js-modal-exercise',
  // footer
  footerYear: '.js-footer-year',
  subscriptionForm: '.js-footer-form',
  subscriptionBtn: '.js-footer-form-btn'
} as const;

export const FILTER_CATEGORIES = {
  muscles: 'Muscles',
  bodyParts: 'Body parts',
  equipment: 'Equipment',
} as const;
