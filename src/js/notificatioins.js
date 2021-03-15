import { error } from '@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

function onErrorMessage() {
  error({
    text: 'Too many matches found. Please enter a more specific query!',
    width: '320px',
    destroy: true,
    delay: 2000,
  });
}

export default onErrorMessage;
