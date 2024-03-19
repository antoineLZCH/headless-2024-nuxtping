<script lang="ts" setup>
import type {Player} from "~/models/player.model";
import type {Meta} from "~/models/strapi.model";
import type {Competition} from "~/models/competition.model";

const {find} = useStrapi4()
const client = useStrapiClient()

const filters = ref<string[]>([])

const page = ref(1)
const pageSize = ref(2)

const {
  data: players,
  pending: playersPending,
  error: playersError,
  refresh: refreshPlayers
} = useAsyncData('players', () => find<{
      data: Player[],
      meta: Meta
    }>('players',
        {
          populate: '*',
          pagination: {
            page: page.value,
            pageSize: pageSize.value
          },
          filters: {
            competitions: {
              name: {
                $in: filters.value
              }
            },
          }
        }
    ), {
      watch: [page, filters],
    }
)

const {data: competitions, pending: competitionsPending} = useAsyncData('competitions', () => find<{
  data: Competition[]
}>('competitions'))

const addFilter = (filter: string) => {
  if (!filters.value.includes(filter)) {
    filters.value.push(filter)
  } else {
    filters.value = filters.value.filter((f) => f !== filter)
  }
  refreshPlayers()
}


</script>

<template>
  <div class="container">
    <div class="flex gap-4">
      <template v-if="competitionsPending">
        <span>Chargement des filtres...</span>
      </template>
      <template v-else>
        <div class="w-1/3 flex flex-col gap-4 py-4 mx-2">
          <h3>Compétitions</h3>
          <button v-for="competition in competitions?.data"
                  :class="[filters.includes(competition.name) ? 'bg-gray-200' : 'bg-white']"
                  class="text-left py-2 hover:underline"
                  @click="addFilter(competition.name)"
          >
            {{ competition.name }}
          </button>
        </div>
      </template>
      <template v-if="playersPending">
        <span>Chargement des joueurs...</span>
      </template>
      <template v-else>
        <div class="w-2/3 flex flex-col items-center justify-center">
          <div class="grid grid-cols-2 gap-4 w-full">
            <PlayerCard v-for="player in players?.data" :key="player.slug" :player="player"/>
          </div>
          <UPagination v-if="players?.meta && players?.meta.pagination.pageCount > 1"
                       v-model="page"
                       :page-count="players?.meta.pagination.pageCount"
                       :total="players?.meta.pagination.total"
                       class="mx-auto mt-8"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped></style>
