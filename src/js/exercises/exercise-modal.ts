import { coreOpenModal, coreCloseModal } from '../modal-core';
import { SELECTORS } from '../constants';
import { fetchExerciseById } from '../services/api';

const refs = {
  modal: document.querySelector<HTMLElement>(SELECTORS.modalExercise),
  closeBtn: document.querySelector<HTMLButtonElement>(SELECTORS.modalCloseBtn),
  content: document.querySelector<HTMLElement>('.js-modal-exercise-content'),
};


interface ExerciseData {
  _id: string;
  bodyPart: string;
  equipment: string;
  gifUrl: string;
  name: string;
  target: string;
  description: string;
  rating: number;
  burnedCalories: number;
  time: number;
  popularity: number;
}


export async function openExerciseModal(exerciseId: string): Promise<void> {
  coreOpenModal(refs.modal!, closeExerciseModal);

  refs.closeBtn?.addEventListener('click', closeExerciseModal);
  refs.modal?.removeAttribute('hidden');

  try {
    const data = await fetchExerciseById(exerciseId);

    refs.content!.innerHTML = renderExerciseData(data as ExerciseData);

  } catch (error) {
    console.error('Error fetching exercise data:', error);
    return;
  }


}

export function closeExerciseModal(): void {
  coreCloseModal(refs.modal!);
  refs.closeBtn?.removeEventListener('click', closeExerciseModal);
}

function renderExerciseData(data: ExerciseData): string { 
  // Implementation for rendering exercise data
  return '';
}

/**
 * 
{
  "_id": "64f389465ae26083f39b1a0e",
  "bodyPart": "cardio",
  "equipment": "leverage machine",
  "gifUrl": "https://ftp.goit.study/img/power-pulse/gifs/0798.gif",
  "name": "stationary bike walk",
  "target": "cardiovascular system",
  "description": "While not a muscle, this system is essential for endurance training. Aerobic exercises like running, cycling, and swimming improve cardiovascular health.",
  "rating": 4.11,
  "burnedCalories": 116,
  "time": 3,
  "popularity": 2087
}
  *
 */



