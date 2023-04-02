<template>
  <v-dialog width="500" v-model="isModal">
    <v-card>
      <v-card-title class="headline black" primary-title> Редактирование поста </v-card-title>
      <v-card-text class="pa-5">
        <v-form ref="sendForm">
          <v-text-field v-model="initialCardData.title" label="Название"></v-text-field>
          <v-text-field v-model="initialCardData.body" label="Описание"></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions class="pa-5">
        <v-btn class="ml-auto" @click="close()" outlined color="primary">Закрыть</v-btn>
        <v-btn @click="saveChangedData()">Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, ref } from 'vue'
import type { PropType } from 'vue'
import type { IPosts } from '../../types/gTypes'

export default defineComponent({
  props: {
    isEditModal: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object as PropType<IPosts>,
      default: () => ({})
    }
  },

  emits: ['close', 'save'],

  setup(props, { emit }) {
    const initialCardData = reactive({ ...props.data })

    // computed
    const isModal = computed(() => props.isEditModal)

    // methods
    const close = () => emit('close')
    const saveChangedData = () => emit('save', initialCardData)

    return {
      initialCardData,
      //   computed
      isModal,
      //   methods
      close,
      saveChangedData
    }
  }
})
</script>

<style></style>
