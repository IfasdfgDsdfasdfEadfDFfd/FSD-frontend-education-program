import { createStore } from '../../store/store';

export const store = createStore({}, () => {});


const getCalendarRepresentationByMonth = (year: number, month: number) => {
  const getDaysInMonth = (year: number, month: number) => {
    return [...new Array(new Date(year, month+1, 0).getDate()).keys()].map((i: number) => ++i);
  }

  const prevMonth = new Date(Number(new Date(year, month)) - 1);
  const nextMonth = new Date(Number(new Date(year, month)) + 1);
  const daysInPrevMonth = getDaysInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
  const daysInNextMonth = getDaysInMonth(nextMonth.getFullYear(), nextMonth.getMonth());

  const displayDays = [
    ...daysInPrevMonth.slice(daysInPrevMonth.length - new Date(year, month).getDay() + 1),
    ...getDaysInMonth(year, month),
    ...daysInNextMonth.slice(0, 7 - new Date(year, month+1, 0).getDay()),
  ];

  return displayDays;
};


Array(...document.getElementsByClassName('calendar') as unknown as Array<HTMLElement>).forEach((calendar: HTMLElement) => {
  const calendarTable = calendar.querySelector('.calendar__table')?.firstChild;


  const months = ['Январь', 'Февраль', 'Март', 'Арель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const [month, year] = calendar.querySelector('.calendar__year-month')?.textContent?.split(' ') || ['', ''];

  const curMonth = months.indexOf(month);
  const curYear = Number(year);

  const calendarData = getCalendarRepresentationByMonth(curYear, curMonth);

  for (let row = 0; row < 35; row += 7) {
    const tableRow = document.createElement('tr');
    tableRow.classList.add('calendar__table-row');

    for (let column = 0; column < 7; column++) {
      const tableCell = document.createElement('td');
      const cellButton = document.createElement('button');

      cellButton.textContent = String(calendarData[row + column]);
      tableCell.appendChild(cellButton);
      tableRow.appendChild(tableCell);
    }

    calendarTable?.appendChild(tableRow);
  }
});
