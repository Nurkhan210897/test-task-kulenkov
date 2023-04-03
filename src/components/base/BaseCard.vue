<template>
  <div class="card">
    <v-card variant="outlined">
      <v-btn class="card-remove_btn" icon plain @click="deleteCard">
        <v-icon icon="mdi-delete"></v-icon>
      </v-btn>
      <v-card-title>{{ card.id }}</v-card-title>
      <v-card-title>{{ card.title }}</v-card-title>
      <v-card-text>{{ card.body }}</v-card-text>
      <v-card-actions>
        <v-btn @click="openModal()">Редактировать</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { PropType } from 'vue'
import type { IPosts } from '../../types/gTypes'
import Http from '@/api/index'

export default defineComponent({
  props: {
    card: {
      type: Object as PropType<IPosts>,
      default: () => ({})
    }
  },

  emits: ['openModal', 'deleteCard'],

  setup(props, { emit }) {
    const initialCardData = ref<IPosts>(props.card)

    // methods
    const openModal = () => {
      emit('openModal', initialCardData)
    }

    const deleteCard = async () => {
      try {
        await Http.delete(initialCardData.value?.id as number)
        emit('deleteCard', props.card)
      } catch (error) {
        console.log(error)
      }
    }

    return {
      initialCardData,
      // methods
      openModal,
      deleteCard
    }
  }
})
</script>

<style lang="scss" scoped>
.card {
  &-remove_btn {
    position: absolute;
    right: 0;
    z-index: 3;
  }
}
</style>
