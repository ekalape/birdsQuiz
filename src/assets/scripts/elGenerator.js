export default function elGenerator(tag, classlist, text = '') {
  const el = document.createElement(tag);
  if (Array.isArray(classlist)) {
    el.classList.add(...classlist);
  } else {
    el.classList.add(classlist);
  }

  el.textContent = text;
  return el;
}
