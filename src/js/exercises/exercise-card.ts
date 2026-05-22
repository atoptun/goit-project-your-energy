import { IExercise } from '../types';

export function createExerciseItemMarkup(exercise: IExercise) {
  function createStarsMarkup(rating: number) {
    const totalStars = 5;
    const activeStarsCount = Math.round(rating);
    let html = '';

    for (let i = 1; i <= totalStars; i++) {
      const isActive = i <= activeStarsCount ? ' is-active' : '';

      html += `
        <svg class="icon-star${isActive}" width="18" height="18">
          <use href="./images/sprite.svg#icon-star"></use>
        </svg>
      `;
    }

    return html;
  }

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

        <button type="button" class="card-start-btn">
          Start
          <svg class="icon-arrow" width="16" height="16">
            <use href="./images/sprite.svg#icon-arrow"></use>
          </svg>
        </button>
      </div>

      <div class="card-title-line">
        <div class="icon-run-wrapper">
          <svg class="icon-run" width="24" height="24">
            <use href="./images/sprite.svg#icon-run"></use>
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
