// Function Expression
const ask = (message, yesHandler, noHandler) => {
  const response = confirm(message),
    action = response ? yesHandler : noHandler;

  // if (response) {
  //   yesHandler();
  // } else {
  //   noHandler();
  // }

  // условие ? реакцияНаПравду : реакцияНаЛож

  // response ? yesHandler() : noHandler();

  action();
}

ask(
    'Все понятно?',
    () => console.log('Великолепно!'),
    () => console.log('Надо бы повторить материал...')
  );

ask(
  'А может не понятно?',
  () => { console.log('Может!'); },
  () => { console.log('Не может...'); }
);
