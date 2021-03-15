var debounce = require('lodash.debounce'); // импорт подключенного debounce
import onErrorMessage from './js/notificatioins'; // импорт функции віскакивющей ошибки
import refs from './js/refs'; // импорт ссылок
import fetchCountries from './js/fetchCountries'; // импорт функции fetch с возратом массива значений от сервера
import tempList from './templates/tempList.hbs'; // импорт шаблона
import './styles.css'; // импорт CSS

refs.form.addEventListener(
  'input',
  debounce(event => {
    event.preventDefault();
    const inputName = event.target.value;

    // проверка на сверх удаление строки input. Без нее при удаление свыше 0, выдает ошибку в консоль
    if (inputName.length > 0) {
      fetchCountries(inputName).then(result => {
        if (result.length > 1 && result.length < 11) {
          const list = result.map(
            item => `<li class="countryFindList">${item.name}</li>`,
          );
          addCountryListToHtml(list);
          return;
        }

        if (result.length > 10) {
          clearHtml();
          onErrorMessage();
          return;
        }

        if (result.length === 1) {
          addCountryToHtml(result);
          return;
        }
      });
    }
  }, 500),
);

function innerHtml(value) {
  refs.countryBox.innerHTML = value;
}

function addCountryToHtml(value) {
  const markup = tempList(value);
  innerHtml(markup);
}

function addCountryListToHtml(value) {
  const markup = value.join('');
  innerHtml(markup);
}

function clearHtml() {
  innerHtml('');
}
