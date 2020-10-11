const dropdowns = Array(...document.getElementsByClassName('dropdown-container') as unknown as Array<HTMLElement>);

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', event => {
    const target = event.target as HTMLElement;

    if (target.nodeName === 'BUTTON' || target.parentElement?.nodeName === 'BUTTON') {
      dropdown.classList.toggle('dropdown-container--opened');
    }
  });
})