const codes = ["00018", "00019"];

function findCode(value) {
  return codes.find((element) => {
    return element === value;
  });
}

export { findCode };
