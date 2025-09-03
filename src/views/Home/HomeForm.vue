<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <form-title />

    <div class="product_wizard_step_1__form-item section-accept">
      <Field v-slot="{ field }" name="accept" :value="false" type="checkbox">
        <label>
          <input type="checkbox" name="accept" v-bind="field" :value="false" />
          He leído y comprendo el uso de mis datos para las finalidades
          necesarias señaladas en la
          <a
            href="https://confianza.pe/docs/2025/03/FC288-M-001 Politica de Privacidad y Proteccion de Datos Personales - CE.pdf"
            target="_blank"
            title="Política de privacidad"
          >
            Política de privacidad
          </a>
        </label>
      </Field>
      <ErrorMessage name="accept" class="message-error" />
    </div>

    <div class="product_wizard_step_1__form-item section-document-type">
      <Field
        as="select"
        name="document_type"
        class="input-select"
        v-model="data.document_type"
        @change="inputAttr()"
      >
        <option
          :value="option.id"
          v-for="(option, index) in documents_type"
          :key="index"
        >
          {{ option.name }}
        </option>
      </Field>
      <ErrorMessage name="document_type" class="message-error" />
    </div>

    <div class="product_wizard_step_1__form-item section-document-number">
      <Field
        :type="input.type"
        name="document_number"
        class="input-text"
        placeholder="Número de documento"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        equal="false"
        :minlength="input.min"
        :maxlength="input.max"
        @keypress="
          input.type === 'text' ? onlyAlphanumeric($event) : onlyNumbers($event)
        "
        v-model="data.document_num"
      />
      <ErrorMessage name="document_number" class="message-error" />
    </div>

    <div class="product_wizard_step_1__form-item section-phone">
      <Field
        type="tel"
        name="phone"
        class="input-text"
        placeholder="Celular"
        minlength="9"
        maxlength="9"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        equal="false"
        @keypress="onlyNumbers($event)"
        v-model="data.phone"
      />
      <ErrorMessage name="phone" class="message-error" />
    </div>

    <div class="product_wizard_step_1__form-item section-email">
      <Field
        name="email"
        class="input-text"
        placeholder="Correo electrónico"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        equal="false"
        v-model="data.email"
      />
      <ErrorMessage name="email" class="message-error" />
    </div>

    <div class="product_wizard_step_1__form-item section-origin">
      <Field
        as="select"
        name="origin"
        class="input-select"
        v-model="data.origin"
      >
        <option value="0" selected>¿Cómo te enteraste de este canal?</option>
        <option
          :value="option.id"
          v-for="(option, index) in origins"
          :key="index"
        >
          {{
            $route.params.product === "prestamo" && option.id === 11
              ? option.name_credito
              : option.name
          }}
        </option>
      </Field>
      <ErrorMessage name="origin" class="message-error" />
    </div>

    <div
      class="product_wizard_step_1__form-item section-reference-code"
      v-if="data.origin === 11 && $route.params.product !== 'prestamo'"
    >
      <Field
        :type="input.type"
        name="referenceCode"
        class="input-text"
        placeholder="Código Referente"
        autocorrect="off"
        autocapitalize="off"
        autocomplete="off"
        spellcheck="false"
        equal="false"
        :minlength="code.min"
        :maxlength="code.max"
        @keypress="
          input.type === 'text' ? onlyAlphanumeric($event) : onlyNumbers($event)
        "
        v-model="data.referenceCode"
      />
      <ErrorMessage name="referenceCode" class="message-error" />

      <span class="icon-info">
        <i class="las la-info"></i>
        <span>Digitar Nro DNI de su Asesor Comercial</span>
      </span>
    </div>

    <div class="product_wizard_step_1__form-item section-captcha">
      <vue-recaptcha
        :sitekey="google_recaptcha"
        @verify="onVerify"
      ></vue-recaptcha>
      <div
        v-show="google_recaptcha_message"
        class="message-error message-captcha"
      >
        Marque la casilla del captcha
      </div>
    </div>

    <div class="product_wizard_step_1__form-item section-button">
      <BaseLoading v-if="loading"></BaseLoading>
      <button v-else type="submit" class="button">¡Empecemos!</button>
    </div>
  </Form>
</template>

<script>
import axios from "@/axios.js";
import moment from "moment";
import {
  documentType,
  origins,
  encd,
  encmr,
  enct,
  onlyAlphanumeric,
  onlyNumbers,
} from "@/utils";
import * as yup from "yup";

import { ErrorMessage, Field, Form } from "vee-validate";
import { VueRecaptcha } from "vue-recaptcha";
import BaseLoading from "@/components/BaseLoading.vue";
import FormTitle from "./FormTitle.vue";

export default {
  components: {
    BaseLoading,
    FormTitle,
    VueRecaptcha,
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
      data: {
        document_type: 21,
        document_num: "",
        referenceCode: "",
        email: "",
        phone: "",
        origin: 0,
        ip: "",
      },
      documents_type: documentType,
      origins: origins,
      google_recaptcha: import.meta.env.VITE_GOOGLE_RECAPTCHA,
      google_recaptcha_response: false,
      google_recaptcha_message: false,
      loading: false,
      input: {
        type: "tel",
        min: 8,
        max: 8,
        regex: /[0-9]{8}/,
      },
      code: {
        type: "tel",
        min: 8,
        max: 9,
        regex: /[0-9]{8,9}/,
      },
    };
  },
  async created() {
    const response = await axios.get("https://api.ipify.org?format=json");
    this.data.ip = response.data.ip;

    window.fbq("init", "809519867644567");
    window.fbq("track", "PageView");
  },
  methods: {
    onlyAlphanumeric,
    onlyNumbers,
    inputAttr() {
      const value = this.documents_type.filter((document) => {
        return document.id === this.data.document_type;
      });

      this.input.min = value[0].min;
      this.input.max = value[0].max;
      this.input.regex = value[0].regex;
      this.input.type = value[0].type;
    },
    onVerify(response) {
      if (response) this.google_recaptcha_response = true;
    },
    onSubmit() {
      if (!this.google_recaptcha_response) {
        this.google_recaptcha_message = true;
        return;
      }

      this.google_recaptcha_message = false;
      this.loading = true;

      let url, data, headers;

      if (this.$route.params.product === "prestamo") {
        url = "/landing-credit-apply";

        data = {
          documentType: `${this.data.document_type}`,
          documentNumber: encd(this.data.document_num.toUpperCase()),
          phone: encd(this.data.phone),
          email: this.data.email ? encd(this.data.email) : encd("a@a.com"),
          origin: `${this.data.origin}`,
          mode: "1",
        };

        headers = {
          "x-api-key": enct(this.data.document_num.toUpperCase()),
          "X-MAC": encmr(data, false),
          "x-address": encd(this.data.ip),
        };
      } else {
        url = "/landing-registration";

        data = {
          documentType: `${this.data.document_type}`,
          documentNumber: encd(this.data.document_num.toUpperCase()),
          phone: encd(this.data.phone),
          email: this.data.email ? encd(this.data.email) : encd("a@a.com"),
          origin: `${this.data.origin}`,
          referenceCode: encd(this.data.referenceCode.toUpperCase()),
          productType: this.$route.params.product.toUpperCase(),
          mode: "1",
        };

        headers = {
          "x-address": encd(this.data.ip),
          "x-api-key": enct(this.data.document_num.toUpperCase()),
          "X-MAC": encmr(data),
        };
      }

      axios
        .post(url, data, { headers: headers })
        .then((response) => {
          if (response.data.code === "0") {
            this.$store.dispatch("user/SET_DOC_NUM", this.data.document_num);
            this.$store.dispatch("user/SET_DOC_TYPE", this.data.document_type);
            this.$store.dispatch("token/SET_API", {
              xAddress: encd(this.data.ip),
              xApiKey: enct(this.data.document_num.toUpperCase()),
            });
            this.$store.dispatch("token/SET_TOKEN", response.data);
            this.$store.dispatch(
              "token/SET_TIME",
              moment().add(5, "m").format("X")
            );

            if (this.$route.params.product === "prestamo") {
              if (response.data.existBT === "S") {
                this.$store.dispatch("user/SET_NAME", response.data.nameCF);
                this.$store.dispatch("credit/SET_CREDIT", response.data);

                if (
                  (response.data.offerExists === "N" &&
                    response.data.adviserExists === "S") ||
                  (response.data.offerExists === "N" &&
                    response.data.adviserExists === "N")
                ) {
                  this.$router.push({
                    name: "Amount",
                    params: { product: this.$route.params.product },
                  });
                } else {
                  this.$router.push({
                    name: "Active",
                    params: { product: this.$route.params.product },
                  });
                }
              } else {
                this.$store.dispatch("credit/SET_CREDIT", {
                  adviserExists: "N",
                  offerExists: "N",
                  extensionExists: "N",
                  extensionMessage: "",
                  approvedLoan: "0.00",
                  monthlyFee: "0.00",
                  tea: "0.00",
                  tcea: "0.00",
                  period: "0",
                });

                this.$router.push({
                  name: "Amount",
                  params: { product: this.$route.params.product },
                });
              }
            } else {
              this.$store.dispatch("user/SET_NAME", response.data.nombre);

              this.$router.push({
                name: "Selection",
                params: { product: this.$route.params.product },
              });
            }
          } else {
            this.$store.dispatch("message/SET_MESSAGE", response.data.message);

            this.$router.push({
              name: "Message",
              params: { product: this.$route.params.product },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
  },
  computed: {
    schema() {
      if (this.$route.params.product === "prestamo") {
        return yup.object({
          accept: yup.boolean().required("Acepte la Política de privacidad"),
          document_type: yup.number().required("El campo es requerido"),
          document_number: yup
            .string()
            .matches(this.input.regex, "Debe ser un documento válido")
            .required("El campo es requerido")
            .min(this.input.min, "Mínimo ${min} dígitos")
            .max(this.input.max, "Máximo ${max} dígitos")
            .label("Número de documento"),
          phone: yup
            .string()
            .matches(/(9)([0-9]){8}/, "Debe ser un celular válido", {
              excludeEmptyString: true,
            })
            .required("El campo es requerido")
            .max(9, "Máximo ${max} dígitos"),
          email: yup.string().email("Debe ser un email válido"),
          origin: yup
            .number()
            .min(1, "Seleccione un opción")
            .required("El campo es requerido"),
        });
      } else {
        return yup.object({
          accept: yup.boolean().required("Acepte la Política de privacidad"),
          document_type: yup.number().required("El campo es requerido"),
          document_number: yup
            .string()
            .matches(this.input.regex, "Debe ser un documento válido")
            .required("El campo es requerido")
            .min(this.input.min, "Mínimo ${min} dígitos")
            .max(this.input.max, "Máximo ${max} dígitos")
            .label("Número de documento"),
          phone: yup
            .string()
            .matches(/(9)([0-9]){8}/, "Debe ser un celular válido", {
              excludeEmptyString: true,
            })
            .required("El campo es requerido")
            .max(9, "Máximo ${max} dígitos"),
          email: yup.string().email("Debe ser un email válido"),
          origin: yup
            .number()
            .min(1, "Seleccione un opción")
            .required("El campo es requerido"),
          referenceCode: yup
            .string()
            .when("origin", {
              is: 11,
              then: yup.string().required("El campo es requerido"),
            })
            .matches(this.code.regex, "Debe ser un código de referente válido")
            .min(this.code.min, "Mínimo ${min} dígitos")
            .max(this.code.max, "Máximo ${max} dígitos")
            .label("Código Referente"),
        });
      }
    },
  },
};
</script>
