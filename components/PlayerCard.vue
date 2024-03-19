<script setup lang="ts">
import type { Player } from "~/models/player.model";

defineProps<{
  player: Player
}>()

</script>

<template>
  <UCard class="w-full">
    <NuxtImg v-if="player.image" :src="player.image?.url" alt="" class="w-full h-60 object-cover" />
    <nuxt-link :href="`/players/${player.slug}`" class="flex items-center justify-between mt-4">
      <span>{{ player.first_name }} {{ player.last_name }}</span>
      <Icon class="h-6 w-6" name="material-symbols:arrow-right-alt-rounded" />
    </nuxt-link>
  </UCard>
</template>
