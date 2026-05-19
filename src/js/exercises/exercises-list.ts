
interface IExercise {
  id: string
}

interface RenderOptions {
  onAction?: string;
}

export function renderExercises(exercises: IExercise[], { onAction }: RenderOptions = {}) { }