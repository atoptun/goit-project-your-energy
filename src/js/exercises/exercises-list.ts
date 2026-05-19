
interface IExercise {
  id: string
}

interface RenderOptions {
  onAction?: (action: string) => void;
}

export function renderExercises(exercises: IExercise[], { onAction }: RenderOptions = {}) { }