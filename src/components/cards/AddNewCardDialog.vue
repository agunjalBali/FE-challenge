<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="toggleDialog($event)"
  >
    <div class="add-new-card">
      <div class="flex justify-between">
        <div class="add-new-card__title">Add New Card</div>
        <q-icon
          class="add-new-card__close-icon"
          @click="toggleDialog(false)"
          name="close"
        ></q-icon>
      </div>

      <q-form class="add-new-card__form" @submit="addCard">
        <div class="col-12">
          <q-input
            v-model="cardHolder"
            outlined
            label="Name on Card"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Cardholder name is required',
            ]"
          />
        </div>

        <div class="col-12 flex justify-end mt-4">
          <q-btn
            color="primary"
            class="add-new-card__form__submit-btn"
            type="submit"
            unelevated
            size="md"
            >Add New Card</q-btn
          >
        </div>
      </q-form>
    </div>
  </q-dialog>
</template>

<script setup lang="ts">
import { CardStatus } from 'src/models/card';
import { useCardStore } from 'src/stores/cards';
import {
  generateCreditCardNumber,
  generateCvv,
  generateExpiryDate,
} from 'src/utils';
import { ref, watchEffect } from 'vue';

const props = defineProps(['modelValue']);
const emit = defineEmits<{
  (event: 'update:model-value', value: boolean): void;
}>();
const cardHolder = ref();

const cardStore = useCardStore();

const addCard = async () => {
  await cardStore.addNewCard({
    id: cardStore.cards.length + 1,
    cardHolder: cardHolder.value,
    cardNumber: generateCreditCardNumber(),
    cvv: generateCvv(),
    expiryDate: generateExpiryDate(),
    status: CardStatus.Active,
  });
  emit('update:model-value', false);
};

const toggleDialog = (value: boolean) => {
  emit('update:model-value', value);
};

watchEffect(() => {
  if (!props.modelValue) {
    cardHolder.value = '';
  }
});
</script>

<style lang="scss" scoped>
.add-new-card {
  @apply bg-white p-5 w-96;

  &__title {
    @apply text-xl font-semibold mb-4;
  }

  &__close-icon {
    @apply text-2xl;
  }
}
</style>
