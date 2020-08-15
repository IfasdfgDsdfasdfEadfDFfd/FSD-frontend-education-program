const checkboxLists = Array(...document.getElementsByClassName('expandable-checkbox-list') as unknown as Array<HTMLElement>);

checkboxLists.forEach(list => {
  const button = list.querySelector('.expandable-checkbox-list__btn');

  button?.addEventListener('click', () => {
    const className = 'expandable-checkbox-list_closed';
    if (list.classList.contains(className)) {
      list.classList.remove(className);
    } else {
      list.classList.add(className);
    }
  });
});
