import Cleave from 'cleave.js';

new Cleave('.text-field--masked', {
  date: true,
  delimiter: '.',
  datePattern: ['d', 'm', 'Y'],
});
