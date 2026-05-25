export const SELECTORS = {
  categoryList: '.js-category-list',
  categoryItem: '.category-item',
  exercisesList: '.js-exercises-list',
  exerciseItem: '.exercise-card',
  showExerciseCardBtn: '.js-show-card-btn',
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
  // footer
  footerYear: '.js-footer-year',
  subscriptionForm: '.js-footer-form',
  subscriptionBtn: '.js-footer-form-btn',
  // favorites
  removeFavoriteBtn: '.js-remove-favorite',
  // quote
  quoteCard: '.js-quote-card',
} as const;

export const FILTER_CATEGORIES = {
  muscles: 'Muscles',
  bodyParts: 'Body parts',
  equipment: 'Equipment',
} as const;
