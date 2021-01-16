const header = document.getElementById('header-id');

const hidingClass = 'header_hidden';
const attachingClass = 'header_attached';

let lastScrollYPosition = window.scrollY;

window.addEventListener('scroll', () => {
  if (lastScrollYPosition < window.scrollY) {
    if (!header?.classList.contains(hidingClass)) {
      header?.classList.add(hidingClass);
    }
  } else {
    if (header?.classList.contains(hidingClass))
      header?.classList.remove(hidingClass);
  }

  lastScrollYPosition = window.scrollY;
});
