const codes = ["00006", "00020"];

function findCode(value) {
  return codes.find((element) => {
    return element === value;
  });
}

export { findCode };
