<template>
  <div class="cards">
    <template v-if="cards.length">
      <SwiperComponent
        class="swiper"
        :slides-per-view="$q.screen.lt.md ? 'auto' : 1"
        :space-between="16"
        :modules="swiperModules"
        @activeIndexChange="onActiveIndexChange"
        :pagination="{
          el: '.swiper-pagination',
          clickable: true,
        }"
      >
        <SwiperSlide
          v-for="card of cards"
          v-slot="{ isActive }"
          :key="card.id"
          class="slide-item"
        >
          <Card :card="card" :isActive="isActive" />
        </SwiperSlide>
      </SwiperComponent>
      <div class="cards__pagination">
        <div class="swiper-pagination"></div>
      </div>
    </template>
    <div class="text-white" v-else>
      Begin your journey with Aspire, Add New Card
    </div>
  </div>
</template>

<script lang="ts" setup>
import 'swiper/css/pagination';
import { Swiper as SwiperComponent, SwiperSlide } from 'swiper/vue';
import { computed, ref, watchEffect } from 'vue';
import Card from './CardComponent.vue';
import { useCardStore } from 'src/stores/cards';
import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';
// Import Swiper styles
import 'swiper/css';

const cardStore = useCardStore();

const cards = computed(() => cardStore.cards);

const swiperModules = [Pagination];

const activeIndex = ref(0);

const onActiveIndexChange = (swiper: Swiper) => {
  activeIndex.value = swiper.activeIndex;
};

const currentCard = computed(() => {
  return cards.value[activeIndex.value];
});

watchEffect(() => {
  if (currentCard.value) {
    cardStore.getTransactionsList(currentCard.value?.id);
  }
});

defineExpose({ currentCard });
</script>

<style lang="scss">
.cards {
  .swiper {
    @apply pt-4 lg:pt-0;
  }

  .swiper-slide {
    @apply lg:pt-2;
    &:last-child {
      margin-right: 20px; /* Adjust the value according to your design */
    }
  }
  .swiper-pagination-bullet {
    @apply bg-brand opacity-10 transition-all duration-300;
  }
  .swiper-pagination-bullet-active {
    @apply opacity-100 w-4 rounded-lg #{!important};
  }

  .swiper-wrapper {
    width: calc(100% - 30px);
  }

  &__pagination {
    @apply mt-4;
    .swiper-pagination {
      @apply static;
    }
  }
}
</style>
