const codes = ["00014", "00015", "00016", "00017"];

function findCode(value) {
  return codes.find((element) => {
    return element === value;
  });
}

export { findCode };
