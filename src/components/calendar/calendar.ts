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
        days: 'MM yyyy',
        months: 'yyyy',
        years: 'yyyy1 - yyyy2',
      },
      prevHtml: 'arrow_back',
      nextHtml: 'arrow_forward',
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
