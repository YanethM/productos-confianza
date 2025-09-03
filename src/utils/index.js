import { departamentos } from "./ubigeo/departamentos";
import { provincias } from "./ubigeo/provincias";
import { distritos } from "./ubigeo/distritos";

import { documentType } from "./documentType";
import { origins } from "./origins";

import { encd, encma, encmac, encmp, encmr, enct } from "./encrypt";
import { onlyAlphanumeric, onlyLetters, onlyNumbers } from "./functions";

import { findCode as findCodeEmail } from "./errorCodes/email";
import { findCode as findCodeMessage } from "./errorCodes/messages";
import { findCode as findCodeName } from "./errorCodes/name";
import { findCode as findCodePhone } from "./errorCodes/phone";

export {
  departamentos,
  provincias,
  distritos,
  documentType,
  origins,
  encd,
  encmr,
  encma,
  encmac,
  encmp,
  enct,
  onlyAlphanumeric,
  onlyLetters,
  onlyNumbers,
  findCodeEmail,
  findCodeMessage,
  findCodeName,
  findCodePhone,
};
