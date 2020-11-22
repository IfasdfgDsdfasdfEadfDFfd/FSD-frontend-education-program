import { initCalendar } from '../calendar/calendar';

$('.date-dropdown').each(function () {
  const $from = $('.date-dropdown__from-date', this);
  const $to = $('.date-dropdown__to-date', this);
  const placeholder = $from.text();
  const separator = ',';

  const $calendar = $('.calendar', this);
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
