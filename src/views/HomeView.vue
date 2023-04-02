<template>
  <v-container>
    <create-post-form @createPost="createPost" class="mb-12"/>
    <div class="text-center" v-if="isPostsLoading">
      <v-progress-circular
        class="mt-n12"
        indeterminate
        color="primary"
        :size="128"
        :width="9"
      ></v-progress-circular>
    </div>
    <v-container v-else>
      <v-row no-gutters>
        <v-col md="4" v-for="(post, index) in posts" :key="index" class="pa-3">
          <baseCard
            :card="post"
            @openModal="openEditModal(post)"
            @deleteCard="deleteCard"
          ></baseCard>
        </v-col>
      </v-row>
      <v-pagination :length="6" v-model="currentPage" @input="updatePage"></v-pagination>
    </v-container>
  </v-container>
  <BaseEditModal
    v-if="isEditModal"
    :data="initialCardData"
    :isEditModal="isEditModal"
    @close="isEditModal = false"
    @save="saveChangedData"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import Http from '@/api/index'
// type imports
import type { IPosts } from '../types/gTypes'
// components
import BaseCard from '../components/base/BaseCard.vue'
import BaseEditModal from '../components/base/BaseEditModal.vue'
import CreatePostForm from '../components/app/CreatePostForm.vue'

export default defineComponent({
  components: { BaseCard, BaseEditModal, CreatePostForm },

  setup() {
    const posts = ref<IPosts[]>([])
    const isEditModal = ref(false)
    const initialCardData = ref<IPosts>({} as IPosts)
    const currentPage = ref(1)
    const isPostsLoading = ref(false)

    // methods
    const getPosts = async () => {
      const params = {
        _page: currentPage.value,
        _limit: 10
      }
      isPostsLoading.value = true
      try {
        posts.value = await Http.get<IPosts[]>(params)
      } catch (error) {
        console.log(error)
      } finally {
        isPostsLoading.value = false
      }
    }

    const openEditModal = (post: IPosts) => {
      isEditModal.value = true
      initialCardData.value = post
    }

    const updatePosts = (updatedPost: IPosts) => {
      
      posts.value = posts.value.map((post) => {
        if (post.id === updatedPost?.id) {
          return updatedPost
        }
        return post
      });
    }

    const saveChangedData = async (data: IPosts) => {
      try {
        const updatedPost = await Http.put<IPosts>(data);
        updatePosts(updatedPost);
      } catch (error) {
        console.log(error)
      } finally {
        isEditModal.value = false
      }
    }

    const createPost = (post: IPosts) => {
      posts.value.unshift(post)
    }

    const deleteCard = (card: IPosts) => {
      posts.value = posts.value.filter((post) => post.id !== card.id)
    }

    // watchers
    watch(
      () => currentPage.value,
      async () => {
        await getPosts()
      }
    )

    // mounted
    onMounted(async () => {
      await getPosts()
    })

    return {
      posts,
      isEditModal,
      initialCardData,
      currentPage,
      isPostsLoading,
      // methods
      saveChangedData,
      openEditModal,
      deleteCard,
      createPost
    }
  }
})
</script>

<style></style>
