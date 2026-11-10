import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../css/estilos.css';

const form = document.querySelector('#regex-form');
const regexInput = document.querySelector('#regex-input');
const flagsInput = document.querySelector('#flags-input');
const textInput = document.querySelector('#text-input');
const charCount = document.querySelector('#char-count');
const result = document.querySelector('#result');
const resultIcon = document.querySelector('#result-icon');
const resultTitle = document.querySelector('#result-title');
const resultDetail = document.querySelector('#result-detail');
const clearButton = document.querySelector('#clear-button');

const showResult = (type, title, detail, icon) => {
  result.className = `result result-${type}`;
  resultIcon.textContent = icon;
  resultTitle.textContent = title;
  resultDetail.textContent = detail;
  result.hidden = false;
};

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const expression = regexInput.value;
  const text = textInput.value;

  if (expression.length === 0) {
    showResult('error', 'Falta la expresión regular', 'Escribe un patrón antes de comparar.', '!');
    regexInput.focus();
    return;
  }

  try {
    const matcher = new RegExp(expression, flagsInput.value.trim());
    matcher.lastIndex = 0;
    const match = matcher.exec(text);

    if (!match) {
      showResult('no-match', 'No se encontró una coincidencia', 'El texto no cumple con el patrón ingresado.', '×');
      return;
    }

    showResult(
      'match',
      '¡Se encontró una coincidencia!',
      `Coincidencia: "${match[0]}" · posición ${match.index}.`,
      '✓',
    );
  } catch (error) {
    showResult('error', 'Expresión regular no válida', error.message, '!');
  }
});

textInput.addEventListener('input', () => {
  const count = textInput.value.length;
  charCount.textContent = `${count} ${count === 1 ? 'carácter' : 'caracteres'}`;
});

clearButton.addEventListener('click', () => {
  form.reset();
  charCount.textContent = '0 caracteres';
  result.hidden = true;
  result.className = 'result';
  resultIcon.textContent = '';
  resultTitle.textContent = '';
  resultDetail.textContent = '';
  regexInput.focus();
});
