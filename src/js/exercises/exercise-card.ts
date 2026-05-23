import { IExercise } from '../types';

export function createExerciseItemMarkup(exercise: IExercise) {
  return `
  
    <li class="exercise-card" data-exercise-id="${exercise._id}">
      <div class="card-top-line">
        <div class="card-badge-wrapper">
          <span class="card-badge">Workout</span>
          <div class="card-rating">
            <span class="rating-value">${exercise.rating || '0.0'}</span>
            <div class="stars-list">
              ${createStarsMarkup(exercise.rating || 0)}
            </div>
          </div>
        </div>

        <button type="button" class="card-start-btn js-show-card-btn">
          Start
          <svg class="icon-arrow" width="16" height="16">
            <use href="./images/icons.svg#icon-arrow"></use>
          </svg>
        </button>
      </div>

      <div class="card-title-line">
        <div class="icon-run-wrapper">
          <svg class="icon-run" width="24" height="24">
            <use href="./images/icons.svg#icon-run"></use>
          </svg>
        </div>
        <p class="exercise-name">${exercise.name}</p>
      </div>

      <ul class="card-meta-list">
        <li class="meta-item">
          <span class="meta-label">Burned calories:</span>
          <span class="meta-value">${exercise.burnedCalories} / ${exercise.time} min</span>
        </li>
        <li class="meta-item">
          <span class="meta-label">Body part:</span>
          <span class="meta-value">${exercise.bodyPart}</span>
        </li>
        <li class="meta-item">
          <span class="meta-label">Target:</span>
          <span class="meta-value">${exercise.target}</span>
        </li>
      </ul>
    </li>`;
}

export function createExerciseEmptyMessage() {
  return `
    <li class="exercises-empty-state">
      <p class="exercises-empty-text">
        No exercises found. Try a different filter or keyword.
      </p>
    </li>
  `;
}

export function createExerciseModalCardMarkup(data: IExercise): string {
  return `
    <div class="modal-exercise-card">
      <div class="mcard-image-wrapper">
        <img
          class="mcard-image"
          src="${data.gifUrl}"
          alt="${data.name}"
        />
      </div>
      <div class="mcard-content-wrapper">
        <div class="mcard-header">
          <p class="mcard-exercise-name">${data.name}</p>
          <div class="card-rating">
            <span class="rating-value">${data.rating.toFixed(2)}</span>
            <div class="stars-list">
              ${createStarsMarkup(data.rating)}
            </div>
          </div>
        </div>

        <ul class="mcard-meta-list">
          <li class="mcard-meta-item">
            <span class="mcard-meta-label">Target</span
            ><span class="mcard-meta-value">${data.target}</span>
          </li>
          <li class="mcard-meta-item">
            <span class="mcard-meta-label">Body Part</span
            ><span class="mcard-meta-value">${data.bodyPart}</span>
          </li>
          <li class="mcard-meta-item">
            <span class="mcard-meta-label">Equipment</span
            ><span class="mcard-meta-value">${data.equipment}</span>
          </li>
          <li class="mcard-meta-item">
            <span class="mcard-meta-label">Popular</span
            ><span class="mcard-meta-value">${data.popularity}</span>
          </li>
          <li class="mcard-meta-item">
            <span class="mcard-meta-label">Burned Calories</span
            ><span class="mcard-meta-value">${data.burnedCalories}/${data.time} min</span>
          </li>
        </ul>

        <p class="mcard-description">${data.description}</p>

        <div class="mcard-actions">
          <button type="button" class="btn btn-white btn-favorites js-btn-favorites">
            <span class="js-fav-btn-text">Add to favorites</span>
            <svg class="btn-icon" width="20" height="20">
              <use href="./images/icons.svg#icon-heart" class="js-fav-icon"/>
            </svg>
          </button>
          <button type="button" class="btn btn-black btn-rating">
            Give a rating
          </button>
        </div>

      </div>
    </div>
    `;
}

function createStarsMarkup(rating: number) {
  const totalStars = 5;
  const activeStarsCount = Math.round(rating);
  let html = '';

  for (let i = 1; i <= totalStars; i++) {
    const isActive = i <= activeStarsCount ? ' is-active' : '';

    html += `
        <svg class="icon-star${isActive}" width="18" height="18">
          <use href="./images/icons.svg#icon-star"></use>
        </svg>
      `;
  }

  return html;
}
