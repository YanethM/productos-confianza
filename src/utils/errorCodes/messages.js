const codes = [
  "00002",
  "00021",
  "00022",
  "00023",
  "00024",
  "00025",
  "00026",
  "00027",
  "00028",
  "00031",
];

function findCode(value) {
  return codes.find((element) => {
    return element === value;
  });
}

export { findCode };
