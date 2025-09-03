<template>
  <TimerView></TimerView>

  <Form
    @submit="saveData"
    :validation-schema="schema"
    class="product_wizard product_wizard_step_2"
  >
    <div class="container">
      <div class="product_wizard_step_2__title">
        <h4>¡Hola {{ clientName }}!</h4>
        <h5>Antes de continuar, por favor ingresa el monto que necesitas</h5>
      </div>

      <div class="product_wizard_step_2__inputs">
        <div class="product_wizard_step_2__inputs-item" v-if="!isClient">
          <Field
            name="name"
            class="input-text"
            placeholder="Nombres"
            v-model="data.name"
            @keypress="onlyLetters($event)"
          />
          <ErrorMessage name="name" class="message-error" />
        </div>

        <div class="product_wizard_step_2__inputs-item" v-if="!isClient">
          <Field
            name="last_name"
            class="input-text"
            placeholder="Apellidos"
            v-model="data.last_name"
            @keypress="onlyLetters($event)"
          />
          <ErrorMessage name="last_name" class="message-error" />
        </div>

        <div class="product_wizard_step_2__inputs-item" v-if="isCE">
          <Field
            type="text"
            :max="isOlder"
            name="birthDate"
            class="input-text"
            placeholder="Fecha de nacimiento (dd/mm/aaaa)"
            v-model="data.birthDate"
          />
          <ErrorMessage name="birthDate" class="message-error" />
        </div>

        <div class="product_wizard_step_2__inputs-item" v-if="isCE">
          <Field
            type="text"
            name="expirationDate"
            class="input-text"
            placeholder="Fecha de Expiración de DOI (dd/mm/aaaa)"
            v-model="data.expirationDate"
          />
          <ErrorMessage name="expirationDate" class="message-error" />
        </div>

        <div class="product_wizard_step_2__inputs-item">
          <Field
            type="tel"
            name="amount"
            class="input-text"
            placeholder="Monto a solicitar"
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            equal="false"
            v-model="data.amount"
            @keypress="onlyNumbers($event)"
          />
          <ErrorMessage name="amount" class="message-error" />
        </div>
      </div>

      <div
        class="product_active__selection-office"
        v-if="$store.state.credit.adviserExists === 'N'"
      >
        <p class="product_active__selection-office-title">
          Selecciona el lugar donde vives para que selecciones la oficina mas
          cerca a tí:
        </p>
        <div class="product_wizard_step_2__selects">
          <div class="product_wizard_step_2__selects-item">
            <label>Departamento</label>
            <Field
              as="select"
              name="departamento"
              class="input-select"
              v-model="data.departamento"
              @change="getDepartamento()"
            >
              <option
                :value="departamento.id"
                v-for="departamento in departamentos"
                :key="departamento"
              >
                {{ departamento.name }}
              </option>
            </Field>
            <ErrorMessage name="departamento" class="message-error" />
          </div>

          <div class="product_wizard_step_2__selects-item">
            <label>Provincia</label>
            <Field
              as="select"
              name="provincia"
              class="input-select"
              v-model="data.provincia"
              @change="getProvincia()"
            >
              <option
                :value="provincia.id"
                v-for="provincia in provincias_select"
                :key="provincia"
              >
                {{ provincia.name }}
              </option>
            </Field>
            <ErrorMessage name="provincia" class="message-error" />
          </div>

          <div class="product_wizard_step_2__selects-item">
            <label>Distrito</label>
            <Field
              as="select"
              name="distrito"
              class="input-select"
              v-model="data.distrito"
              @change="findOffices()"
            >
              <option
                :value="distrito.id"
                v-for="distrito in distritos_select"
                :key="distrito"
              >
                {{ distrito.name }}
              </option>
            </Field>
            <ErrorMessage name="distrito" class="message-error" />
          </div>
        </div>

        <div v-show="loading" class="product_wizard_step_2__result">
          <BaseLoading></BaseLoading>
        </div>

        <div v-if="offices.length > 0" class="product_wizard_step_2__result">
          <ul>
            <li v-for="(office, index) in offices" :key="index">
              <Field
                v-slot="{ field }"
                name="agency"
                type="radio"
                :value="false"
                v-model="data.agency"
              >
                <label>
                  <input
                    type="radio"
                    name="terms"
                    v-bind="field"
                    :value="office.code"
                  />
                  {{ office.name }} <span>{{ office.address }}</span>
                </label>
              </Field>
            </li>
          </ul>
          <ErrorMessage name="agency" class="message-error" />

          <BaseLoading v-show="loading"></BaseLoading>
        </div>
      </div>

      <div class="product_wizard_step_2__result">
        <BaseLoading v-show="loading"></BaseLoading>
        <button v-show="!loading" type="submit" class="button">
          Solicitar
        </button>
      </div>
    </div>
  </Form>
</template>

<script>
import axios from "@/axios";
import {
  departamentos,
  distritos,
  encd,
  encma,
  onlyLetters,
  onlyNumbers,
  provincias,
} from "@/utils";
import * as yup from "yup";

import { ErrorMessage, Field, Form } from "vee-validate";
import BaseLoading from "@/components/BaseLoading.vue";
import TimerView from "@/components/TimerView.vue";
import moment from "moment";

export default {
  components: {
    BaseLoading,
    Field,
    Form,
    ErrorMessage,
    TimerView,
  },
  data() {
    return {
      data: {
        departamento: "",
        provincia: "",
        distrito: "",
        agency: "",
        amount: "",
        name: "",
        last_name: "",
        birthDate: "",
        expirationDate: "",
      },
      offices: [],
      loading: false,
      departamentos,
      provincias_select: [],
      distritos_select: [],
    };
  },
  beforeCreate() {
    if (!this.$store.state.token.token) {
      this.$router.push({
        name: "Home",
        params: { product: this.$route.params.product },
      });
    }
  },
  methods: {
    onlyLetters,
    onlyNumbers,
    getDepartamento() {
      this.data.provincia = "";
      this.data.distrito = "";
      this.data.agency = "";
      this.provincias_select = [];
      this.distritos_select = [];
      this.provincias_select = provincias.filter((provincia) => {
        return provincia.departamento_id === this.data.departamento;
      });
    },
    getProvincia() {
      this.data.distrito = "";
      this.data.agency = "";
      this.distritos_select = [];
      this.distritos_select = distritos.filter((distrito) => {
        return distrito.provincia_id === this.data.provincia;
      });
    },
    findOffices() {
      this.data.agency = "";
      this.loading = true;
      this.offices = [];

      let options = {
        params: {
          country: "604",
          department: `${this.data.departamento}`,
          province: `${this.data.provincia}`,
          district: `${this.data.distrito}`,
        },
        headers: {
          "x-address": this.$store.state.token.xAddress,
          "x-api-key": this.$store.state.token.xApiKey,
          token: this.$store.state.token.token,
          "token-bt": this.$store.state.token.tokenBT,
        },
      };

      axios
        .get("/landing-agency", options)
        .then((response) => {
          if (response.data.code === "0") {
            this.offices = response.data.agencies;
          } else {
            this.$store.dispatch("message/SET_MESSAGE", response.data.message);

            this.$router.push({
              name: "Message",
              params: { product: this.$route.params.product },
            });
          }
        })
        .catch(() => {
          this.$store.dispatch(
            "message/SET_MESSAGE",
            "Se ha generado un error al procesar la solicitud. Intente nuevamente en unos minutos."
          );

          this.$router.push({
            name: "Message",
            params: { product: this.$route.params.product },
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    saveData() {
      this.loading = true;

      let data = {
        token: `${this.$store.state.token.token}`,
        tokenBT: `${this.$store.state.token.tokenBT}`,
        names: encd(this.data.name),
        lastNames: encd(this.data.last_name),
        ubigeoDepartment: `${this.data.departamento}`,
        ubigeoProvince: `${this.data.provincia}`,
        ubigeoDistrict: `${this.data.distrito}`,
        agency: `${this.data.agency}`,
        amountRequested: `${this.data.amount}`,
        birthDate: encd(this.data.birthDate),
        expirationDate: encd(this.data.expirationDate),
        mode: "2",
      };

      let headers = {
        "x-address": this.$store.state.token.xAddress,
        "x-api-key": this.$store.state.token.xApiKey,
        "X-MAC": encma(data),
      };

      axios
        .put("/landing-credit-apply", data, { headers: headers })
        .then((response) => {
          if (response.data.code === "0") {
            this.$store.dispatch("message/SET_MESSAGE", response.data.message);

            this.$router.push({
              name: "Message",
              params: { product: this.$route.params.product },
            });
          } else {
            this.$store.dispatch("message/SET_MESSAGE", response.data.message);

            this.$router.push({
              name: "Message",
              params: { product: this.$route.params.product },
            });
          }
        })
        .catch(() => {
          this.$store.dispatch(
            "message/SET_MESSAGE",
            "Se ha generado un error al procesar la solicitud. Intente nuevamente en unos minutos."
          );

          this.$router.push({
            name: "Message",
            params: { product: this.$route.params.product },
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    clientName() {
      return this.$store.state.token.existeBT === "S"
        ? this.$store.state.user.name
        : this.$store.state.user.document_num;
    },
    isClient() {
      return this.$store.state.token.existeBT === "S";
    },
    isCE() {
      return this.$store.state.user.document_type === 2;
    },
    isOlder() {
      return moment().subtract(19, "years").format("YYYY-MM-DD");
    },
    schema() {
      if (this.isClient) {
        if (this.$store.state.credit.adviserExists === "S") {
          return yup.object({
            amount: yup
              .number()
              .required("El campo es requerido")
              .min(300, "El monto debe ser mayor o igual a S/ 300")
              .max(70000, "El monto debe ser menor o igual a S/ 70,000")
              .typeError("Ingrese el monto"),
          });
        } else {
          return yup.object({
            amount: yup
              .number()
              .required("El campo es requerido")
              .min(300, "El monto debe ser mayor o igual a S/ 300")
              .max(70000, "El monto debe ser menor o igual a S/ 70,000")
              .typeError("Ingrese el monto"),
            departamento: yup.string().required("El campo es requerido"),
            provincia: yup.string().required("El campo es requerido"),
            distrito: yup.string().required("El campo es requerido"),
            agency: yup.string().required("Seleccione la agencia más cercana."),
          });
        }
      } else if (this.isCE) {
        const today = new Date();

        return yup.object({
          name: yup
            .string()
            .required("El campo es requerido")
            .matches(
              /[a-zA-Z ]{2,254}/,
              "El campo solo puede contener letras",
              {
                excludeEmptyString: true,
              }
            ),
          last_name: yup
            .string()
            .required("El campo es requerido")
            .matches(
              /[a-zA-Z ]{2,254}/,
              "El campo solo puede contener letras",
              {
                excludeEmptyString: true,
              }
            ),
          birthDate: yup
            .string()
            .transform((originalValue) => {
              return moment(originalValue, "DD/MM/YYYY", true).format(
                "YYYY-MM-DD"
              );
            })
            .required("El campo es requerido")
            .test("is-valid-date", "La fecha ingresada no es válida", (value) =>
              moment(value, "YYYY-MM-DD", true).isValid()
            )
            .test("is-older-than-19", "Debes ser mayor a 19 años", (value) => {
              if (moment(value, "YYYY-MM-DD", true).isValid()) {
                const today = moment();
                const birthDate = moment(value, "YYYY-MM-DD");
                const age = today.diff(birthDate, "years");
                return age >= 19;
              }
              return true;
            }),
          expirationDate: yup
            .string()
            .transform((originalValue) => {
              return moment(originalValue, "DD/MM/YYYY", true).format(
                "YYYY-MM-DD"
              );
            })
            .required("El campo es requerido")
            .test("is-valid-date", "La fecha ingresada no es válida", (value) =>
              moment(value, "YYYY-MM-DD", true).isValid()
            )
            .test(
              "is-valid-expiration-date",
              "La fecha de vencimiento no puede ser anterior a la actual",
              (value) => {
                if (moment(value, "YYYY-MM-DD", true).isValid()) {
                  return moment(value, "YYYY-MM-DD").isSameOrAfter(
                    today,
                    "day"
                  );
                }
                return true;
              }
            ),
          amount: yup
            .number()
            .required("El campo es requerido")
            .min(300, "El monto debe ser mayor o igual a S/ 300")
            .max(70000, "El monto debe ser menor o igual a S/ 70,000")
            .typeError("Ingrese el monto"),
          departamento: yup.string().required("El campo es requerido"),

          provincia: yup.string().required("El campo es requerido"),
          distrito: yup.string().required("El campo es requerido"),
          agency: yup.string().required("Seleccione la agencia más cercana."),
        });
      } else {
        return yup.object({
          name: yup
            .string()
            .required("El campo es requerido")
            .matches(
              /[a-zA-Z ]{2,254}/,
              "El campo solo puede contener letras",
              {
                excludeEmptyString: true,
              }
            ),
          last_name: yup
            .string()
            .required("El campo es requerido")
            .matches(
              /[a-zA-Z ]{2,254}/,
              "El campo solo puede contener letras",
              {
                excludeEmptyString: true,
              }
            ),
          amount: yup
            .number()
            .required("El campo es requerido")
            .min(300, "El monto debe ser mayor o igual a S/ 300")
            .max(70000, "El monto debe ser menor o igual a S/ 70,000")
            .typeError("Ingrese el monto"),
          departamento: yup.string().required("El campo es requerido"),
          provincia: yup.string().required("El campo es requerido"),
          distrito: yup.string().required("El campo es requerido"),
          agency: yup.string().required("Seleccione la agencia más cercana."),
        });
      }
    },
  },
};
</script>

<style scoped>
.product_wizard {
  margin-top: 0;
}
</style>
