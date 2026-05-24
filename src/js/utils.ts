import iziToast from 'izitoast';


iziToast.settings({
  timeout: 5000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
  maxWidth: 360,
});

export function showErrorMessage(message: string) {
  iziToast.error({ title: 'Error', message });
}

export function showSuccessMessage(message: string) {
  iziToast.success({ message });
}

export function showWarningMessage(message: string) {
  iziToast.warning({ message });
}

