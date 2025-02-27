<template>
  <v-data-table
    :class="{ 'flex-fill': height === undefined }"
    :headers="headersBySize"
    :height="height"
    :items="data"
    :no-data-text="messageNoContent"
    :expand-on-click="showExpand"
    :fixed-header="fixedHeader"
    hover
  >
    <template #item.createdAt="{ item }">
      {{ formatDate(item.createdAt) }}
    </template>
    <template #item.updatedAt="{ item }">
      {{ formatDate(item.updatedAt) }}
    </template>
    <template #item.startAt="{ value }">
      {{ formatDate(value) }}
    </template>
    <template #item.endAt="{ value }">
      {{ formatDate(value) }}
    </template>
    <template #item.id="{ item }">
      <slickteam-clipboard-button :text="item.id" :value="item.id" />
    </template>
    <template #item.actions="{ item }">
      <v-btn-group color="secondary" density="compact">
        <slot name="actions" :item="item"></slot>
      </v-btn-group>
    </template>
    <template v-for="k in headersKeys" #[`item.${k}`]="slotData">
      <slot :name="`item.${k}`" v-bind="slotData">{{ slotData.value }}</slot>
    </template>
    <template v-slot:expanded-row="slotData">
      <tr>
        <td :colspan="slotData.columns.length">
          <slot name="expanded-row" v-bind="slotData">{{ slotData }}</slot>
        </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useDisplay } from 'vuetify';

import SlickteamClipboardButton from '@/components/molecules/button/SlickteamClipboardButton.vue';
import { formatDate } from '@/components/utils';

const { name } = useDisplay();

const props = withDefaults(
  defineProps<{
    headers?: { key: string; title: string; align?: 'start' | 'end' | 'center'; sortable?: boolean; rDisplay?: string }[];
    data?: any[];
    height?: string | number;
    messageNoContent?: string;
    overrideKeys?: string[];
    showExpand?: boolean;
    fixedHeader?: boolean;
  }>(),
  {
    headers: () => [],
    data: () => [],
    messageNoContent: 'Pas de données à afficher',
    overrideKeys: () => [],
    showExpand: false,
    fixedHeader: true,
  },
);

const forbiddenKeysList = ['id', 'createdAt', 'updatedAt', 'actions'];
const forbiddenKeys = computed(() => {
  const overrideKeysFiltered = props.overrideKeys.filter((o) => o !== 'actions');
  return forbiddenKeysList.filter((f) => !overrideKeysFiltered.includes(f));
});
const headersKeys = computed(() => props.headers.map((h) => h.key).filter((k) => !forbiddenKeys.value.includes(k)));
const headersBySize = computed(() => props.headers.filter((h) => haveToBeDisplayFromSizeName(name.value, h.rDisplay)));

function haveToBeDisplayFromSizeName(value: string, sizeName: string | undefined): boolean {
  let result = false;
  switch (value) {
    case 'xs':
      result = sizeName === 'xs' || sizeName === undefined;
      break;
    case 'sm':
      result = sizeName === 'xs' || sizeName === 'sm' || sizeName === undefined;
      break;
    case 'md':
      result = sizeName === 'xs' || sizeName === 'sm' || sizeName === 'md' || sizeName === undefined;
      break;
    case 'lg':
      result = sizeName === 'xs' || sizeName === 'sm' || sizeName === 'md' || sizeName === 'lg' || sizeName === undefined;
      break;
    case 'xl':
      result =
        sizeName === 'xs' || sizeName === 'sm' || sizeName === 'md' || sizeName === 'lg' || sizeName === 'xl' || sizeName === undefined;
      break;
    case 'xxl':
      result =
        sizeName === 'xs' ||
        sizeName === 'sm' ||
        sizeName === 'md' ||
        sizeName === 'lg' ||
        sizeName === 'xl' ||
        sizeName === 'xxl' ||
        sizeName === undefined;
      break;
  }
  return result;
}
</script>
