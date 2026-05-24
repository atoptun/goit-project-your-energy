import { IExercise } from '../types';
import iconsUrl from '../../images/icons.svg?url';

export function createExerciseItemMarkup(exercise: IExercise, isFavorite: boolean = false) {
  const badgeContent = isFavorite
    ? `
      <button type="button" class="card-delete-btn js-remove-favorite" aria-label="Remove from favorites">
        <svg width="16" height="16">
          <use href="${iconsUrl}#icon-trash"></use>
        </svg>
      </button>
    `
    : '';

  return `
  
    <li class="exercise-card" data-exercise-id="${exercise._id}">
      <div class="card-top-line">
        <div class="card-badge-wrapper ${isFavorite ? 'is-favorite' : ''}">
          <span class="card-badge">Workout</span>
          ${badgeContent}
        </div>

        <button type="button" class="card-start-btn">
          Start
          <svg class="icon-arrow" width="16" height="16">
            <use href="${iconsUrl}#icon-start-arrow"></use>
          </svg>
        </button>
      </div>

      <div class="card-title-line">
        <div class="icon-run-wrapper">
          <svg class="icon-run" width="24" height="24">
            <use href="${iconsUrl}#running"></use>
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
