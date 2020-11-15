const checkboxLists = Array.from(
  document.getElementsByClassName('expandable-checkbox-list'),
);

checkboxLists.forEach(list => {
  const button = list.querySelector('.expandable-checkbox-list__button');

  button?.addEventListener('click', () => {
    const className = 'expandable-checkbox-list--closed';
    list.classList.toggle(className);
  });
});
