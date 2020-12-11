import { initCalendar } from '../calendar/calendar';

$('.js-filter-date-dropdown').each(function () {
  const $valueContainer = $('.dropdown__button__text', this);
  const placeholder = $valueContainer.text();
  const separator = ' - ';

  const $calendar = $('.js-calendar__container', this);
  initCalendar($calendar, {
    dateFormat: 'dd M',
    multipleDatesSeparator: separator,
    onSelect: (dateFormatted: string) => {
      $valueContainer.text(dateFormatted.toLowerCase());
    },
    onClear: () => {
      $valueContainer.text(placeholder);
    },
  });
});
