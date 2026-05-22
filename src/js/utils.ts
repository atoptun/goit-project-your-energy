import iziToast from 'izitoast';


iziToast.settings({
  timeout: 5000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
}); 

export function showSuccessMessage(message: string) {
  iziToast.success({
    title: 'Success',
    message: message,
  });
}

export function showWarningMessage(message: string) {
  iziToast.warning({
    title: 'Warning',
    message: message,
  });
}

export function showErrorMessage(message: string) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

