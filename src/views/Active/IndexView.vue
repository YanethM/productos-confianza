<template>
  <TimerView></TimerView>

  <Form @submit="saveData">
    <div class="container">
      <div class="product_wizard product_active">
        <div class="product_active__title">
          <h2>
            {{ $store.state.credit.messageTitle }}
          </h2>
        </div>

        <div class="product_active__apply">
          <div class="product_active__apply-sup">
            <p class="product_active__apply-title">Préstamo Al Toque</p>
            <p class="product_active__apply-subtitle">
              {{ $store.state.credit.feeMessage }}
            </p>
            <p class="product_active__apply-amount">
              S/ {{ $store.state.credit.monthlyFee }} <span>*</span>
            </p>
            <span
              class="product_active__apply-subtitle"
              v-if="$store.state.credit.offerExists === 'S'"
            >
              Plazo: {{ $store.state.credit.period }}
            </span>
            <p class="product_active__apply-subtitle">
              Incluye seguro de desgravamen
            </p>

            <span
              class="product_active__customize-need__input-message_bottom"
              v-if="$store.state.credit.extensionExists === 'S'"
            >
              {{ $store.state.credit.extensionMessage }}
            </span>
            <table>
              <tr>
                <td>TEA <i class="icon-circle-sm">?</i></td>
                <td class="text-right">{{ $store.state.credit.tea }}%</td>
              </tr>
              <tr>
                <td>TCEA <i class="icon-circle-sm">?</i></td>
                <td class="text-right">{{ $store.state.credit.tcea }}%</td>
              </tr>
            </table>
            <ul>
              <li>
                <i class="las la-check"></i>
                <span
                  >Contrata tu créditos desde nuestros canales digitales.</span
                >
              </li>
              <li>
                <i class="las la-check"></i>
                <span>Cuota referencial. *</span>
              </li>
            </ul>

            <BaseLoading v-if="loading"></BaseLoading>
            <button
              v-else
              type="submit"
              class="product_active__apply-btn button"
            >
              Solicitar
            </button>
          </div>

          <div class="product_active__apply-inf">
            <ul>
              <li>{{ $store.state.credit.text1 }}</li>
              <li>{{ $store.state.credit.text2 }}</li>
            </ul>
          </div>

          <div class="product_active__apply-inf">
            <div class="product_active__apply-amount-link">
              <p>
                Si deseas solicitar un monto diferente, haz clic
                <router-link :to="{ name: 'Amount' }">Aquí</router-link>
              </p>
            </div>

            <div class="product_active__apply-banner">
              <img src="https://via.placeholder.com/550x120.png?text=Banner" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </Form>
</template>

<script>
import axios from "@/axios.js";
import { encmac } from "@/utils";

import { Form } from "vee-validate";
import BaseLoading from "@/components/BaseLoading.vue";
import TimerView from "@/components/TimerView.vue";

export default {
  components: {
    BaseLoading,
    Form,
    TimerView,
  },
  data() {
    return {
      offices: [],
      loading: false,
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
    saveData() {
      this.loading = true;

      let data = {
        token: `${this.$store.state.token.token}`,
        tokenBT: `${this.$store.state.token.tokenBT}`,
        amountRequested: `${this.$store.state.credit.approvedLoan}`,
        mode: "2",
      };

      let headers = {
        "x-address": this.$store.state.token.xAddress,
        "x-api-key": this.$store.state.token.xApiKey,
        "X-MAC": encmac(data),
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
};
</script>

<style scoped>
.product_wizard {
  max-width: 950px;
  margin: 0 auto;
}

.product_active__apply-inf ul {
  margin-top: 1rem;
}

.product_active__apply-inf ul li {
  font-size: 12px;
  text-align: justify;
  line-height: 16px;
}
</style>
