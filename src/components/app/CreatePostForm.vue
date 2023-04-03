<template>
  <v-sheet width="300" class="mx-auto">
    <v-form fast-fail @submit.prevent>
      <v-text-field
        v-model="post.title"
        label="Название"
        :rules="titleRules"
        required
      ></v-text-field>

      <v-text-field v-model="post.body" label="Описание" required></v-text-field>

      <v-btn type="submit" block class="mt-2" @click="createPost">Создать</v-btn>
    </v-form>
  </v-sheet>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import type { INewPost, IPosts } from '../../types/gTypes'
import Http from '@/api/index'

export default defineComponent({
  setup(_, { emit }) {
    const post = reactive<INewPost>({
      title: '',
      body: '',
      userId: 1
    })

    const titleRules = [(v) => !!v || 'Не должно быть пустым']

    const createPost = async () => {
      try {
        if (post.title.length) {
          const newPost = await Http.post<IPosts, INewPost>(post)
          emit('createPost', newPost)
        }
      } catch (error) {
        console.log(error)
      }
    }

    return {
      post,
      titleRules,
      createPost
    }
  }
})
</script>

<style></style>
