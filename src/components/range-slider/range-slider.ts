const leftInput = document.querySelector('.range-slider__element.range-slider__element-left') as HTMLInputElement;
const rightInput = document.querySelector('.range-slider__element.range-slider__element-right') as HTMLInputElement;

const sliderRange = document.querySelector('.slider > .slider__range') as HTMLElement;
const sliderTrack = document.querySelector('.slider > .slider__track') as HTMLElement;
const leftSliderThumb = document.querySelector('.slider > .slider__thumb_left') as HTMLElement;
const rightSliderThumb = document.querySelector('.slider > .slider__thumb_right') as HTMLElement;


const setLeftInputValue = (event: any) => {
  const value = Math.min(parseInt(event.target.value), parseInt(rightInput.value));
  event.target.value = String(value);

  const { min, max } = event.target;

  const percent = ((value - min) / (max - min)) * 100;

  const offset = Math.round((
    sliderTrack.clientWidth * percent / 100
  ) - (
    leftSliderThumb.clientWidth * percent / 100
  ));

  leftSliderThumb.style.left = `${offset}px`;
  sliderRange.style.left = `${percent}%`;
};

const setRightInputValue = (event: any) => {
  const value = Math.max(parseInt(event.target.value), parseInt(leftInput.value));
  event.target.value = String(value);

  const { min, max } = event.target;

  const percent = ((value - min) / (max - min)) * 100;

  const offset = Math.round((
    sliderTrack.clientWidth * percent / 100
  ) - (
    rightSliderThumb.clientWidth * percent / 100
  ));

  rightSliderThumb.style.left = `${offset}px`;
  sliderRange.style.right = `${100 - percent}%`;
};


leftInput?.addEventListener('input', setLeftInputValue);
rightInput?.addEventListener('input', setRightInputValue);
