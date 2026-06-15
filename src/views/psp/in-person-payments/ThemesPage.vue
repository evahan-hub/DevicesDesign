<template>
  <div class="themes-page">
    <bento-data-grid
      :columns="columns"
      :data="rows"
      :filters="filtersConfig"
      :filter-values="filterValues"
      :filter-search-config="searchConfig"
      :filter-search-term="searchTerm"
      :filters-container-size-layout="{ large: 'multi-line', medium: 'multi-line', small: 'multi-line' }"
      :pagination="pagination"
      fit-content
      @update:pagination="pagination = $event"
      @update:filter-values="filterValues = $event"
      @update:filter-search-term="searchTerm = $event"
    >
      <template #header>
        <bento-header title="Themes">
          <template #tooltip>More information</template>
          <template #actions>
            <bento-button variant="primary" @click="() => {}">
              <template #icon-left>
                <plus-icon />
              </template>
              Create theme
            </bento-button>
          </template>
        </bento-header>
      </template>
    </bento-data-grid>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoHeader,
  BentoButton,
  BentoFilterItemType,
} from '@adyen/bento-vue2';
import type { BentoColumn, BentoFilterBarModel, BentoFilterValues } from '@adyen/bento-vue2';
import PlusIcon from '@adyen/ui-assets-icons-16/vue/plus';

const columns: BentoColumn[] = [
  { field: 'name',      label: 'Name',        minWidth: 280, sortable: true },
  { field: 'mode',      label: 'Appearance',  minWidth: 100 },
  { field: 'account',   label: 'Account',     minWidth: 190, infoIconTooltip: 'Account in which the theme was created' },
  { field: 'createdOn', label: 'Created on',  minWidth: 140, sortable: true },
];

const filtersConfig: BentoFilterBarModel = [
  {
    field: 'mode',
    label: 'Appearance',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [
      { value: 'dark', label: 'Dark mode' },
      { value: 'light', label: 'Light mode' },
    ]},
  },
  {
    field: 'account',
    label: 'Account',
    value: null,
    type: BentoFilterItemType.SELECT,
    options: { listboxItems: [
      { value: 'company-adyentechsupport', label: 'Company.AdyenTechSupport' },
      { value: 'ma-uc-test', label: 'MerchantAccount.AdyenTechSupport_UnifiedCommerce_TEST' },
      { value: 'ma-benkelly-test', label: 'MerchantAccount.AdyenTechSupport_BenKelly_TEST' },
      { value: 'ma-shaunc', label: 'MerchantAccount.ShaunC' },
      { value: 'ma-ash', label: 'MerchantAccount.Ash_tounding_Solutions' },
      { value: 'ma-renanmaia', label: 'MerchantAccount.RenanMaia' },
      { value: 'ma-tamarapatchen', label: 'MerchantAccount.TamaraPatchen_POS' },
    ]},
  },
  {
    field: 'createdOn',
    label: 'Created on',
    value: null,
    type: BentoFilterItemType.DATE_RANGE,
    options: { numberOfMonths: 2 },
  },
];

const searchConfig = {
  placeholder: '',
  inputFieldAriaLabel: 'Search bar',
};

const filterValues = ref<BentoFilterValues>([] as unknown as BentoFilterValues);
const searchTerm = ref('');
const pagination = ref({ page: 1, size: 50, total: 48 });

interface ThemeRow {
  name: string;
  mode: string;
  account: string;
  createdOn: string;
  [key: string]: unknown;
}

const rows: ThemeRow[] = [
  { name: 'TestHY',                          mode: 'Dark mode',  account: 'MerchantAccount.AdyenTechSupport_UnifiedCommerce_TEST',            createdOn: 'May 25, 2026, 08:56' },
  { name: 'Team Theme',                      mode: 'Light mode', account: 'MerchantAccount.AdyenTechSupport_BenKelly_TEST',                   createdOn: 'May 20, 2026, 14:52' },
  { name: 'TestingforZenoti',                mode: 'Dark mode',  account: 'MerchantAccount.AdyenTechSupport_BenKelly_TEST',                   createdOn: 'May 9, 2026, 10:07' },
  { name: 'Dark mode',                       mode: 'Dark mode',  account: 'Company.AdyenTechSupport',                                        createdOn: 'May 5, 2026, 00:10' },
  { name: 'Light Mode',                      mode: 'Light mode', account: 'Company.AdyenTechSupport',                                        createdOn: 'May 4, 2026, 23:53' },
  { name: 'New theme - Apr 10, 2026, 14:55', mode: 'Dark mode',  account: 'MerchantAccount.ShaunC',                                          createdOn: 'Apr 10, 2026, 20:55' },
  { name: 'JackT',                           mode: 'Dark mode',  account: 'MerchantAccount.AdyenTechSupport_UnifiedCommerce_TEST',            createdOn: 'Apr 6, 2026, 08:05' },
  { name: 'Ash Test',                        mode: 'Dark mode',  account: 'MerchantAccount.Ash_tounding_Solutions',                           createdOn: 'Apr 2, 2026, 11:49' },
  { name: 'New theme',                       mode: 'Light mode', account: 'MerchantAccount.ShaunC',                                          createdOn: 'Mar 27, 2026, 22:39' },
  { name: 'Testing without Adyen logo',      mode: 'Light mode', account: 'MerchantAccount.RenanMaia',                                       createdOn: 'Mar 18, 2026, 15:22' },
  { name: 'Tamara',                          mode: 'Light mode', account: 'MerchantAccount.TamaraPatchen_POS',                               createdOn: 'Mar 5, 2026, 17:49' },
  { name: 'IPPP Scalability',                mode: 'Dark mode',  account: 'MerchantAccount.AdyenTechSupport_Rajnikant_TEST',                  createdOn: 'Mar 3, 2026, 16:48' },
  { name: 'New theme - Feb 25, 2026, 11:12', mode: 'Light mode', account: 'Company.AdyenTechSupport',                                        createdOn: 'Feb 25, 2026, 11:12' },
  { name: 'Evdp - Feb 10, 2026',             mode: 'Dark mode',  account: 'MerchantAccount.AdyenTechSupport_Elizabethvanderput_TEST',         createdOn: 'Feb 10, 2026, 14:33' },
  { name: 'Nfcpayment',                      mode: 'Light mode', account: 'MerchantAccount.AdyenTechSupport_BenKelly_TEST',                   createdOn: 'Jan 30, 2026, 12:29' },
  { name: 'Jonny TEST',                      mode: 'Light mode', account: 'Company.AdyenTechSupport',                                        createdOn: 'Jan 15, 2026, 11:05' },
  { name: 'Dark mode test',                  mode: 'Dark mode',  account: 'MerchantAccount.AdyenTechSupport_UnifiedCommerce_TEST',            createdOn: 'Dec 12, 2025, 09:22' },
  { name: 'CanopySSTest',                    mode: 'Light mode', account: 'Company.AdyenTechSupport',                                        createdOn: 'Nov 20, 2025, 15:47' },
  { name: 'Canopy-SFO1-Test',               mode: 'Light mode', account: 'Company.AdyenTechSupport',                                        createdOn: 'Nov 15, 2025, 08:30' },
  { name: 'New theme - Nov 5, 2025',         mode: 'Dark mode',  account: 'MerchantAccount.ShaunC',                                          createdOn: 'Nov 5, 2025, 22:18' },
  { name: 'Sophie Test',                     mode: 'Light mode', account: 'MerchantAccount.AdyenTechSupport_SophieHa_TEST',                  createdOn: 'Oct 22, 2025, 10:15' },
  { name: 'New theme - Oct 18, 2025',        mode: 'Dark mode',  account: 'MerchantAccount.AdyenTechSupport_BenKelly_TEST',                   createdOn: 'Oct 18, 2025, 16:55' },
  { name: 'Evdp - Sep 2, 2025, 10:27',      mode: 'Light mode', account: 'MerchantAccount.AdyenTechSupport_Elizabethvanderput_TEST',         createdOn: 'Sep 2, 2025, 16:27' },
  { name: 'New theme - Sep 11, 2025',        mode: 'Dark mode',  account: 'MerchantAccount.AdyenTechSupport_SophieHa_TEST',                  createdOn: 'Sep 11, 2025, 17:29' },
  { name: 'New theme - Sep 8, 2025, 14:38',  mode: 'Dark mode',  account: 'MerchantAccount.AdyenTechSupport_SophieHa_TEST',                  createdOn: 'Sep 8, 2025, 14:44' },
  { name: 'New theme - Aug 27, 2025, 11:24', mode: 'Light mode', account: 'MerchantAccount.AdyenTechSupport_BenKelly_TEST',                   createdOn: 'Aug 27, 2025, 11:24' },
  { name: 'New theme - Aug 27, 2025, 11:21', mode: 'Dark mode',  account: 'MerchantAccount.AdyenTechSupport_MariaMoraleda_TEST',              createdOn: 'Aug 27, 2025, 11:22' },
  { name: 'TestTheme',                       mode: 'Dark mode',  account: 'MerchantAccount.AdyenTechSupport_JackyPan_TEST',                   createdOn: 'Aug 19, 2025, 23:35' },
  { name: 'Dark mode',                       mode: 'Dark mode',  account: 'MerchantAccount.LucaBroers',                                      createdOn: 'Aug 8, 2025, 11:24' },
  { name: 'AutoGenerated_MerchantAccount.LucaBroers',                              mode: 'Light mode', account: 'MerchantAccount.LucaBroers',                  createdOn: 'Aug 8, 2025, 11:21' },
  { name: 'Jonny TEST',                      mode: 'Light mode', account: 'Company.AdyenTechSupport',                                        createdOn: 'Jul 21, 2025, 23:36' },
  { name: 'CanopySSTest',                    mode: 'Light mode', account: 'Company.AdyenTechSupport',                                        createdOn: 'Jul 15, 2025, 00:24' },
  { name: 'Canopy-SFO1-Test',               mode: 'Light mode', account: 'Company.AdyenTechSupport',                                        createdOn: 'Jul 15, 2025, 00:20' },
  { name: 'AutoGenerated_MerchantAccount.AnupTest',                                mode: 'Light mode', account: 'MerchantAccount.AnupTest',                    createdOn: 'Jul 14, 2025, 20:30' },
  { name: 'AutoGenerated_MerchantAccount.AdyenTechSupport_Rajnikant_TEST',         mode: 'Light mode', account: 'MerchantAccount.AdyenTechSupport_Rajnikant_TEST', createdOn: 'Jun 23, 2025, 10:36' },
  { name: 'AutoGenerated_Company.AdyenTechSupport2',                               mode: 'Light mode', account: 'Company.AdyenTechSupport',                   createdOn: 'Jun 11, 2025, 08:11' },
  { name: 'AutoGenerated_MerchantAccount.MartinWong_POS',                          mode: 'Light mode', account: 'MerchantAccount.MartinWong_POS',             createdOn: 'May 8, 2025, 09:23' },
  { name: 'AutoGenerated_MerchantAccount.AdyenTechSupport_DiegoGuadarrama_POS_TEST', mode: 'Light mode', account: 'MerchantAccount.AdyenTechSupport_DiegoGuadarrama_POS_TEST', createdOn: 'May 8, 2025, 09:23' },
  { name: 'AutoGenerated_MerchantAccount.JonathanRosario',                         mode: 'Light mode', account: 'MerchantAccount.JonathanRosario',            createdOn: 'May 8, 2025, 09:23' },
  { name: 'AutoGenerated_MerchantAccount.AdyenTechSupport_ElidaQPOS_TEST',         mode: 'Dark mode',  account: 'MerchantAccount.AdyenTechSupport_ElidaQPOS_TEST', createdOn: 'May 8, 2025, 09:23' },
  { name: 'AutoGenerated_Company.AdyenTechSupport',                                mode: 'Light mode', account: 'Company.AdyenTechSupport',                   createdOn: 'May 8, 2025, 09:23' },
  { name: 'AutoGenerated_MerchantAccount.AndrewKnuesel',                           mode: 'Light mode', account: 'MerchantAccount.AndrewKnuesel',              createdOn: 'May 8, 2025, 09:23' },
];
</script>

<style lang="scss" scoped>
.themes-page {
  height: 100%;
}
</style>
