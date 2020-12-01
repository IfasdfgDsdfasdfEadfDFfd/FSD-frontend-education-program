const dropdowns = Array.from(
  document.getElementsByClassName('dropdown-container'),
);

dropdowns.forEach(dropdown => {
  const openClassName = 'dropdown-container_opened';

  dropdown.addEventListener('click', event => {
    const target = event.target as HTMLElement;

    if (
      target.classList.contains('dropdown') ||
      target.parentElement?.classList.contains('dropdown')
    ) {
      dropdown.classList.toggle(openClassName);
    }

    if (target.classList.contains('form-action-buttons__apply-button')) {
      dropdown.classList.toggle(openClassName);
    }
  });
});
