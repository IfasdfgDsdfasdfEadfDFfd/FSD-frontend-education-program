import { initCalendar } from '../calendar/calendar';

$('.js-date-dropdown').each(function () {
  const $dateText = $('.js-dropdown__button .dropdown__button__text', this);
  const placeholder = $dateText.first().text();
  const separator = ',';

  const $calendar = $('.js-calendar__container', this);
  initCalendar($calendar, {
    dateFormat: 'dd.mm.yyyy',
    multipleDatesSeparator: separator,
    onSelect: (dateFormatted: string) => {
      const [from, to] = dateFormatted.split(separator);

      $dateText.first().text(from);
      $dateText.last().text(to);
    },
    onClear: () => {
      $dateText.first().text(placeholder);
      $dateText.last().text(placeholder);
    },
  });
});
