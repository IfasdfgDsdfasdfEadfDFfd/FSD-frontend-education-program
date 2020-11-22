import { initCalendar } from '../calendar/calendar';

$('.filter-date-dropdown').each(function () {
  const $valueContainer = $('.filter-date-dropdown__text', this);
  console.log($valueContainer);
  const separator = ' - ';

  const $calendar = $('.calendar', this);
  initCalendar($calendar, {
    dateFormat: 'dd M',
    multipleDatesSeparator: separator,
    onSelect: (dateFormatted: string) => {
      $valueContainer.text(dateFormatted.toLowerCase());
    },
  });
});
