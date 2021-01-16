import { initCalendar } from '../../components/calendar/calendar';

const $calendarHolder = $('.js-ui-kit-cards-calendar .js-calendar-container');

if ($calendarHolder.length) {
  initCalendar($calendarHolder, {
    fromDate: new Date(new Date().setDate(19)),
    toDate: new Date(new Date().setDate(23)),
  });
}
