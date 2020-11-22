const initCalendar = (
  element: JQuery<HTMLElement>,
  customProps: Record<string, any>,
) => {
  const datepicker = element
    .datepicker({
      language: 'ru',
      inline: true,
      range: true,
      navTitles: {
        days: 'MM<br/>yyyy',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2',
      },
      classes: 'calendar__element',
      ...customProps,
    })
    .data('datepicker');

  const cancelButton = $(
    '.calendar-container .form-action-buttons__cancel-button',
  );
  cancelButton.css('visibility', 'visible');
  cancelButton.on('click', () => {
    datepicker.clear();
    customProps.onClear && customProps.onClear();
  });
};

export { initCalendar };
