<template>
  <div>
    <v-text-field v-model="inputValue" label="Введите ID карточки" type="number"></v-text-field>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
export default {
  props: {
    modelValue: String
  },
  setup(props, { emit }) {
    const inputValue = computed({
      get: () => props.modelValue,
      set: (value) => emit('update:modelValue', value)
    })

    return {
      inputValue
    }
  }
}
</script>

<style></style>
