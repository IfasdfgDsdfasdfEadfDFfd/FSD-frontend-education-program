const dropdowns = Array(
  ...((document.getElementsByClassName(
    'dropdown-container',
  ) as unknown) as Array<HTMLElement>),
);

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', event => {
    const target = event.target as HTMLElement;

    if (
      target.classList.contains('dropdown') ||
      target.parentElement?.classList.contains('dropdown')
    ) {
      dropdown.classList.toggle('dropdown-container--opened');
    }

    if (target.classList.contains('form-action-buttons__apply-button')) {
      dropdown.classList.toggle('dropdown-container--opened');
    }
  });
});
