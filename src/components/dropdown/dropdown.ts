const dropdowns = Array(...document.getElementsByClassName('dropdown-container') as unknown as Array<HTMLElement>);

dropdowns.forEach(dropdown => {
  dropdown.addEventListener('click', () => {
    dropdown.classList.toggle('dropdown-container--opened');
  });
})