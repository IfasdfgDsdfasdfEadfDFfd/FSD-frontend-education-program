const dropdowns = Array.from(document.getElementsByClassName('js-dropdown'));

dropdowns.forEach(dropdown => {
  const openClassName = 'dropdown_opened';

  const outsideClickHandler = (event: Event) => {
    const isClickedOutside = !event.composedPath().includes(dropdown);

    if (isClickedOutside) {
      dropdown.classList.remove(openClassName);
      document.body.removeEventListener('click', outsideClickHandler);
    }
  };

  const dropdownClickHandler = (event: Event) => {
    const target = event.target as HTMLElement;

    const isOpened = dropdown.classList.contains(openClassName);
    const isButton = target.classList.contains('dropdown__button');
    const isParentIsButton = target.parentElement?.classList.contains(
      'dropdown__button',
    );
    const isApplyButton = target.classList.contains(
      'action-buttons__apply-button',
    );

    if (isButton || isParentIsButton) {
      if (isOpened) {
        console.log('remove event listener');
        dropdown.classList.remove(openClassName);
        document.body.removeEventListener('click', outsideClickHandler);
      } else {
        dropdown.classList.add(openClassName);
        console.log('add event listener');
        document.body.addEventListener('click', outsideClickHandler);
      }
    } else if (isApplyButton) {
      dropdown.classList.remove(openClassName);
    }
  };

  dropdown.addEventListener('click', dropdownClickHandler);
});
