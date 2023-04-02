<template>
  <button>
    <slot></slot>
  </button>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'

export default defineComponent({
  props: {
    type: {
      type: String as PropType<
        'primary' | 'danger' | 'danger-outlined' | 'icon' | 'default'
      >,
      default: 'primary'
    }
  },
  setup() {
    return {}
  }
})
</script>

<style></style>
