import { initCalendar } from '../calendar/calendar';

$('.js-date-dropdown').each(function () {
  const $from = $('.js-date-dropdown-from', this);
  const $to = $('.js-date-dropdown-to', this);
  const placeholder = $from.text();
  const separator = ',';

  const $calendar = $('.js-calendar', this);
  initCalendar($calendar, {
    dateFormat: 'dd.mm.yyyy',
    multipleDatesSeparator: separator,
    onSelect: (dateFormatted: string) => {
      const [from, to] = dateFormatted.split(separator);

      $from.text(from);
      $to.text(to);
    },
    onClear: () => {
      $from.text(placeholder);
      $to.text(placeholder);
    },
  });
});
