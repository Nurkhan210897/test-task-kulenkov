<template>
  <v-select
    label="Сортировка"
    v-model="selectedSortItem"
    :items="sortItems"
    item-value="sort"
    item-title="name"
    return-object
    @update:modelValue="onChange"
  >
  </v-select>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import type { ISortItem } from '../../types/gTypes'

export default defineComponent({
  emits: ['onChange'],

  setup(_, { emit }) {
    const sortItems: ISortItem[] = [
      {
        name: 'По возрастанию ID',
        sort: 1
      },
      {
        name: 'По убыванию Id',
        sort: -1
      }
    ]
    const selectedSortItem = ref(sortItems[0])

    const onChange = (sortItem: ISortItem) => {
        emit('onChange', sortItem)
    }

    return {
      sortItems,
      selectedSortItem,
      onChange
    }
  }
})
</script>

<style></style>
