import iziToast from 'izitoast';


iziToast.settings({
  timeout: 5000,
  resetOnHover: true,
  icon: 'material-icons',
  transitionIn: 'flipInX',
  transitionOut: 'flipOutX',
  position: 'topRight',
}); 

export function showErrorMessage(message: string) {
  iziToast.error({
    title: 'Error',
    message: message,
  });
}

