const dropdowns = Array.from(document.getElementsByClassName('js-dropdown'));

dropdowns.forEach(dropdown => {
  const openClassName = 'dropdown_opened';

  dropdown.addEventListener('click', event => {
    const target = event.target as HTMLElement;

    if (
      target.classList.contains('dropdown__button') ||
      target.parentElement?.classList.contains('dropdown__button')
    ) {
      dropdown.classList.toggle(openClassName);
    }

    if (target.classList.contains('action-buttons__apply-button')) {
      dropdown.classList.toggle(openClassName);
    }
  });
});
