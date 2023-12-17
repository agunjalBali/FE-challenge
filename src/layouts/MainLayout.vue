<template>
  <q-layout class="layout" view="lHh Lpr lFf">
    <q-drawer :width="360" class="layout__drawer" show-if-above bordered>
      <FullLogo class="layout__drawer__logo"/>
      <div class="layout__drawer__text">
        Trusted way of banking for 3,000+ SMEs and startups in Singapore
      </div>
      <q-list>
        <q-item
          v-for="tab of tabs"
          :key="tab.id"
          class="layout__drawer__item"
          exact-active-class="layout__footer__tab--active"
          content-class="layout__footer__tab__content"
          manual-focus
          exact
          :to="tab.to"
        >
          <component
            class="layout__drawer__item__logo"
            :is="tab.logo"
          ></component>
          {{ tab.label }}
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="layout__footer">
      <q-tabs
        no-caps
        active-color="primary"
        indicator-color="transparent"
        active-bg-color="white"
        class="layout__footer__tabs"
      >
        <q-route-tab
          v-for="tab of tabs"
          :key="tab.id"
          exact
          :to="tab.to"
          class="layout__footer__tab"
          exact-active-class="layout__footer__tab--active"
          content-class="layout__footer__tab__content"
          :ripple="false"
        >
          <component :is="tab.logo" />
          <span class="layout__footer__tab__content__label">
            {{ tab.label }}
          </span>
        </q-route-tab>
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import Logo from 'assets/Logo.svg';
import Account from 'assets/Account.svg';
import Cards from 'assets/Cards.svg';
import Credit from 'assets/Credit.svg';
import Payments from 'assets/Payments.svg';
import FullLogo from 'assets/FullLogo.svg';
import { ref } from 'vue';

const tabs = ref([
  {
    id: 1,
    to: '/home',
    label: 'Home',
    logo: Logo,
  },
  {
    id: 2,
    to: '/cards',
    label: 'Cards',
    logo: Cards,
  },
  {
    id: 3,
    to: '/payments',
    label: 'Payments',
    logo: Payments,
  },
  {
    id: 4,
    to: '/credit',
    label: 'Credit',
    logo: Credit,
  },
  {
    id: 5,
    to: '/profile',
    label: 'Profile',
    logo: Account,
  },
]);
</script>

<style lang="scss">
.layout {
  &__drawer {
    @apply p-12 bg-[#0C365A] w-[340px];
    @apply overflow-hidden;
    @apply hidden  lg:block #{!important};
    &__logo {
      @apply text-brand mb-5 h-[35px] w-[125px];
    }

    &__text {
      @apply text-[#FFFFFF] text-[15px] leading-5 mb-20 opacity-30;
    }

    &__item {
      @apply p-0 mb-10 text-white;

      &__logo {
        @apply mr-4;
      }
    }
  }

  &__footer {
    @apply bg-white;
    @apply block lg:hidden #{!important};
    &__tabs {
      @apply text-[#dddddd] py-2 pt-1;
    }

    &__tab {
      &__content__label {
        @apply text-[9px] leading-tight pt-1;
      }

      &--active {
        @apply text-[#01d167] #{!important};
      }
    }
  }
}
</style>
