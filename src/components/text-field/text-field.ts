import $ from 'jquery';
import Cleave from 'cleave.js';

$('.text-field_masked')
  .toArray()
  .forEach(input => {
    new Cleave(input, {
      date: true,
      delimiter: '.',
      datePattern: ['d', 'm', 'Y'],
    });
  });
