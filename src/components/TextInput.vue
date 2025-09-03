<template>
  <div :class="{ 'has-error': !!errorMessage, success: meta.valid }">
    <input
      class="input-text"
      :name="name"
      :id="name"
      :type="type"
      :value="inputValue"
      :placeholder="placeholder"
      v-bind="field"
      @input="handleChange"
      @blur="handleBlur"
    />

    <p class="help-message-error" v-show="errorMessage || meta.valid">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
import { toRef } from "vue";
import { useField } from "vee-validate";

export default {
  props: {
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    name: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const name = toRef(props, "name");
    const {
      value: inputValue,
      errorMessage,
      handleBlur,
      handleChange,
      meta,
    } = useField(name, undefined, {
      initialValue: props.value,
    });

    return {
      handleChange,
      handleBlur,
      errorMessage,
      inputValue,
      meta,
    };
  },
};
</script>

<style>
.help-message-error {
  color: red;
  font-size: 14px;
  margin-top: 0.5rem;
  font-weight: 500;
}
</style>
