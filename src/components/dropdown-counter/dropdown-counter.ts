const dropdowns = Array(...document.getElementsByClassName('dropdown-counter') as unknown as Array<HTMLElement>);

console.log(dropdowns)

dropdowns.forEach(dropdown => {
  const button = dropdown.querySelector('.dropdown-counter__btn');

  button?.addEventListener('click', () => {
    const className = 'dropdown-counter_closed';
    if (dropdown.classList.contains(className)) {
      dropdown.classList.remove(className);
    } else {
      dropdown.classList.add(className);
    }
  });
});
