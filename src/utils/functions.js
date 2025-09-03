function onlyAlphanumeric(e) {
  let char = String.fromCharCode(e.keyCode);
  if (/^[a-zA-Z0-9]+$/.test(char)) return true;
  else e.preventDefault();
}

function onlyLetters(e) {
  let char = String.fromCharCode(e.keyCode);
  if (/^[A-Za-z ]+$/.test(char)) return true;
  else e.preventDefault();
}

function onlyNumbers($event) {
  let keyCode = $event.keyCode ? $event.keyCode : $event.which;
  if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
    $event.preventDefault();
  }
}

function orderByName(options) {
  options.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  });
}

export { onlyAlphanumeric, onlyLetters, onlyNumbers, orderByName };
