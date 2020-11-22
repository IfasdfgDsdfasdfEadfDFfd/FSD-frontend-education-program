const initCalendar = (
  element: JQuery<HTMLElement>,
  customProps: Record<string, any>,
) => {
  element.datepicker({
    language: 'ru',
    inline: true,
    range: true,
    classes: 'calendar__element',
    ...customProps,
  });
};

export { initCalendar };
