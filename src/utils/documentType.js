const documentType = [
  {
    id: 2,
    name: "Carné Extranjería",
    type: "tel",
    min: 9,
    max: 9,
    regex: /[0-9]{9}/,
  },
  { id: 5, name: "Pasaporte", type: "tel", min: 9, max: 9, regex: /[0-9]{9}/ },
  { id: 21, name: "DNI", type: "tel", min: 8, max: 8, regex: /[0-9]{8}/ },
  { id: 25, name: "PTP/CPP", type: "tel", min: 9, max: 9, regex: /[0-9]{9}/ },
  {
    id: 28,
    name: "Carnet de refugiado",
    type: "tel",
    min: 9,
    max: 9,
    regex: /[0-9]{9}/,
  },
  {
    id: 29,
    name: "Documento CEPR",
    type: "tel",
    min: 9,
    max: 9,
    regex: /[0-9]{9}/,
  },
  {
    id: 26,
    name: "Carnet de identidad",
    type: "tel",
    min: 8,
    max: 8,
    regex: /[0-9]{8}/,
  },
  {
    id: 27,
    name: "Cédula de identidad",
    type: "text",
    min: 8,
    max: 12,
    regex: /[a-zA-Z0-9]{8,12}/,
  },
];

export { documentType };
