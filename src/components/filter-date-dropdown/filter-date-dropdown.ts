import { initCalendar } from '../calendar/calendar';

$('.js-filter-date').each(function () {
  const $valueContainer = $('.js-filter-date-text', this);
  const placeholder = $valueContainer.text();
  const separator = ' - ';

  const $calendar = $('.js-calendar', this);
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
