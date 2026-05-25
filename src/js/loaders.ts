const DEFAULT_OVERLAY_CLASS = 'overlay-loader-mix';

export function startLoading(
  target: string | HTMLElement | null | undefined,
  addOverlayClass: boolean = false
): void {
  const element = getElement(target);
  if (!element) return;

  if (addOverlayClass) {
    element.classList.add(DEFAULT_OVERLAY_CLASS);
  }

  element.classList.add('is-loading');
}

export function stopLoading(
  target: string | HTMLElement | null | undefined,
  removeOverlayClass: boolean = false
): void {
  const element = getElement(target);
  if (!element) return;

  element.classList.remove('is-loading');

  if (removeOverlayClass) {
    element.classList.remove(DEFAULT_OVERLAY_CLASS);
  }
}

function getElement(
  target: string | HTMLElement | null | undefined
): HTMLElement | null {
  if (!target) return null;

  const element =
    typeof target === 'string'
      ? document.querySelector<HTMLElement>(target)
      : target;

  return element;
}
