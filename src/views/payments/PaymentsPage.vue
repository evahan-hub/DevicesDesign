<template>
  <div class="page page--locked page--data-grid">
    <bento-header title="Payments" :actions="headerActions" />

    <section class="content-section--flex">
      <bento-data-grid
        class="payments-grid"
        :columns="columns"
        :data="filteredAndSortedData"
        :filters="filtersConfig"
        :filter-values="filterValues"
        :filter-search-term="searchTerm"
        :filter-search-config="searchConfig"
        selectable
        column-panel
        allow-column-drag-and-drop
        fit-content
        :selection="selection"
        :pagination="pagination"
        @update:selection="selection = $event"
        @update:columns="columns = $event"
        @update:pagination="pagination = $event"
        @update:filter-values="filterValues = $event"
        @update:filter-search-term="searchTerm = $event"
      >
        <template #item-amount="{ item }">
          <bento-currency :currency="item.currency" :value="item.amount" />
        </template>

        <template #item-pspReference="{ item }">
          <bento-link 
            :to="{ name: 'payment-details', params: { id: item.pspReference } }" 
            :title="item.pspReference"
          >
            {{ item.pspReference }}
          </bento-link>
        </template>

        <template #item-status="{ item }">
          <div class="status-cell">
            <bento-status :variant="getStatusVariant(item.status)" />
            <span>{{ item.status }}</span>
          </div>
        </template>

        <template #item-paymentMethod="{ item }">
          <div class="payment-method-cell">
            <svg v-if="item.paymentMethod === 'Mastercard'" width="40" height="26" viewBox="0 0 40 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="26" fill="white"/>
              <path d="M14.9429 21.2246H25.0576V4.77539H14.9429V21.2246Z" fill="#F06022"/>
              <path d="M15.9867 13.0001C15.984 11.4183 16.3437 9.85636 17.0388 8.43181C17.7339 7.00726 18.7463 5.75712 19.9999 4.77534C18.1536 3.3243 15.8644 2.53577 13.5064 2.53858C10.7138 2.55618 8.04163 3.66612 6.07321 5.62612C4.10479 7.58612 3 10.237 3 13.0001C3 15.7632 4.10479 18.414 6.07321 20.374C8.04163 22.334 10.7138 23.444 13.5064 23.4616C15.8644 23.4644 18.1536 22.6759 19.9999 21.2248C18.7463 20.243 17.7339 18.9929 17.0388 17.5683C16.3437 16.1438 15.984 14.5819 15.9867 13" fill="#EA1D25"/>
              <path d="M37 13.0002C37.0089 15.7659 35.9069 18.4219 33.9366 20.3838C31.9663 22.3457 29.2889 23.4528 26.4935 23.4616C24.1356 23.4645 21.8464 22.676 20 21.2249C21.2516 20.2413 22.2625 18.9908 22.9574 17.5667C23.6523 16.1425 24.0132 14.5815 24.0132 13.0001C24.0132 11.4187 23.6523 9.8577 22.9574 8.43357C22.2625 7.00943 21.2516 5.75893 20 4.77534C21.8464 3.32426 24.1356 2.53572 26.4935 2.53858C29.2889 2.5474 31.9663 3.65454 33.9366 5.61645C35.9069 7.57836 37.0089 10.2343 37 13.0001" fill="#F79D1D"/>
            </svg>

            <svg v-else-if="item.paymentMethod === 'Visa'" width="40" height="26" viewBox="0 0 40 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="26" fill="white"/>
              <path d="M15.6688 7.38455L10.955 18.6289H7.88L5.56063 9.65705C5.42 9.10393 5.29813 8.90143 4.86875 8.66893C4.16938 8.29017 3.01437 7.93393 2 7.71268L2.06938 7.38643H7.01938C7.64938 7.38643 8.2175 7.80642 8.36 8.53392L9.58438 15.0402L12.6125 7.38643H15.6688V7.38455ZM27.7156 14.9596C27.7288 11.9914 23.6113 11.8283 23.6394 10.5027C23.6488 10.0995 24.0331 9.67018 24.8731 9.56143C25.2894 9.50705 26.4387 9.4658 27.7419 10.0639L28.2519 7.67893C27.5525 7.4258 26.6506 7.18018 25.5312 7.18018C22.655 7.18018 20.6319 8.7083 20.615 10.8983C20.5963 12.5164 22.0588 13.4202 23.1613 13.9583C24.2956 14.5096 24.6763 14.8639 24.6706 15.3552C24.6631 16.1089 23.7669 16.4427 22.9287 16.4558C21.4662 16.4783 20.6187 16.0602 19.9419 15.7452L19.415 18.2089C20.0938 18.5202 21.35 18.792 22.6494 18.807C25.7075 18.807 27.7063 17.2977 27.7156 14.9596ZM35.3094 18.6308H38L35.6506 7.38455H33.1681C32.6094 7.38455 32.1388 7.70893 31.9306 8.20955L27.5656 18.6289H30.62L31.2275 16.9489H34.9588L35.3094 18.6308ZM32.0637 14.6464L33.5956 10.4239L34.4769 14.6464H32.0637ZM19.8238 7.38455L17.4181 18.6289H14.51L16.9156 7.38455H19.8238Z" fill="#1434CB"/>
            </svg>

            <svg v-else-if="item.paymentMethod === 'Amex'" width="40" height="26" viewBox="0 0 40 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="26" fill="#016FD0"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M23.4183 21.8858V12.5696L39.9997 12.5845V15.1579L38.0833 17.2059L39.9997 19.2728V21.9008H36.9398L35.3137 20.1064L33.6991 21.9077L23.4183 21.8858" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.526 20.8643V13.5947H30.69V15.2692H26.5218V16.406H30.5906V18.053H26.5218V19.1695H30.69V20.8643H24.526" fill="#016FD0"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M30.6592 20.8643L34.0699 17.2253L30.6592 13.5948H33.299L35.3832 15.8989L37.4733 13.5948H39.9998V13.652L36.6617 17.2253L39.9998 20.7611V20.8643H37.4479L35.3267 18.5371L33.2274 20.8643H30.6592" fill="#016FD0"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.1919 4.30052H28.1888L29.5926 7.48825V4.30052H34.5271L35.378 6.68889L36.2318 4.30052H39.9998V13.6167H20.0868L24.1919 4.30052Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9486 5.31268L21.723 12.5762H23.9353L24.5439 11.1216H27.8412L28.4493 12.5762H30.7167L27.5045 5.31268H24.9486ZM25.2258 9.49158L26.1931 7.17933L27.1597 9.49158H25.2258Z" fill="#016FD0"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M30.6865 12.5748V5.3114L33.7963 5.3221L35.3964 9.78742L37.0069 5.3114H39.9998V12.5749L38.0739 12.5918V7.60242L36.256 12.5749H34.4981L32.6424 7.58552V12.5749L30.6865 12.5748" fill="#016FD0"/>
            </svg>

            <svg v-else-if="item.paymentMethod === 'PayPal'" width="40" height="26" viewBox="0 0 40 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="26" fill="white"/>
              <path d="M16.9124 20.9877L17.1941 19.1659L16.5668 19.1511H13.5713L15.653 5.70849C15.6594 5.66791 15.6804 5.63007 15.7111 5.6032C15.7418 5.57633 15.7811 5.56152 15.8221 5.56152H20.8728C22.5496 5.56152 23.7068 5.91688 24.3109 6.61827C24.5941 6.9473 24.7745 7.29114 24.8618 7.66952C24.9533 8.06656 24.9549 8.54091 24.8655 9.11946L24.8591 9.16168V9.53239L25.1423 9.69581C25.3808 9.82468 25.5704 9.9722 25.7158 10.1411C25.9581 10.4224 26.1148 10.78 26.181 11.2039C26.2494 11.6398 26.2268 12.1586 26.1148 12.7459C25.9855 13.4216 25.7766 14.01 25.4944 14.4915C25.2349 14.9351 24.9043 15.3031 24.5118 15.5882C24.137 15.8591 23.6917 16.0648 23.1882 16.1964C22.7004 16.3258 22.1441 16.3911 21.5341 16.3911H21.141C20.8599 16.3911 20.5869 16.4942 20.3726 16.679C20.1578 16.8676 20.0156 17.1254 19.972 17.4072L19.9424 17.5712L19.4448 20.782L19.4222 20.8999C19.4163 20.9372 19.4061 20.9558 19.391 20.9685C19.3775 20.98 19.3581 20.9877 19.3393 20.9877H16.9124Z" fill="#253B80"/>
              <path d="M25.4104 9.20459V9.20459V9.20459C25.3954 9.30275 25.3781 9.40311 25.3587 9.5062C24.6927 12.989 22.4139 14.1922 19.5035 14.1922H18.0217C17.6657 14.1922 17.3658 14.4554 17.3104 14.8129V14.8129V14.8129L16.5517 19.7133L16.3368 21.1024C16.3007 21.3371 16.4784 21.5488 16.7111 21.5488H19.3393C19.6505 21.5488 19.9149 21.3185 19.9639 21.0059L19.9897 20.8699L20.4846 17.6717L20.5164 17.4962C20.5648 17.1825 20.8297 16.9522 21.141 16.9522H21.5341C24.0804 16.9522 26.0738 15.8993 26.6564 12.8525C26.8998 11.5797 26.7738 10.5169 26.1298 9.76943C25.9349 9.54404 25.6931 9.35704 25.4104 9.20459Z" fill="#179BD7"/>
              <path d="M24.7137 8.92171C24.612 8.89155 24.507 8.86413 24.3993 8.83945C24.291 8.81532 24.1801 8.79393 24.066 8.77529C23.6664 8.70948 23.2287 8.67822 22.7597 8.67822H18.8009C18.7034 8.67822 18.6108 8.70071 18.5279 8.74129C18.3453 8.83067 18.2097 9.00671 18.1768 9.22222L17.3347 14.6545L17.3104 14.813C17.3659 14.4555 17.6658 14.1923 18.0217 14.1923H19.5036C22.414 14.1923 24.6927 12.9885 25.3588 9.50629C25.3787 9.40319 25.3954 9.30284 25.4105 9.20467C25.242 9.11364 25.0594 9.03577 24.8629 8.96942C24.8144 8.95296 24.7643 8.93706 24.7137 8.92171Z" fill="#222D65"/>
              <path d="M18.1768 9.22203C18.2096 9.00652 18.3453 8.83048 18.5278 8.74165C18.6113 8.70106 18.7034 8.67858 18.8008 8.67858H22.7596C23.2286 8.67858 23.6664 8.70984 24.0659 8.77565C24.1801 8.79429 24.291 8.81568 24.3992 8.83981C24.5069 8.86448 24.6119 8.8919 24.7137 8.92206C24.7643 8.93742 24.8144 8.95332 24.8634 8.96923C25.0599 9.03558 25.2425 9.114 25.411 9.20448C25.6091 7.91742 25.4094 7.0411 24.7261 6.24758C23.9728 5.374 22.6131 5 20.8734 5H15.8226C15.4672 5 15.1641 5.26323 15.1091 5.62132L13.0054 19.2021C12.9639 19.4708 13.1675 19.7132 13.4335 19.7132H16.5517L17.3346 14.6544L18.1768 9.22203Z" fill="#253B80"/>
            </svg>

            <svg v-else-if="item.paymentMethod === 'iDEAL'" width="40" height="26" viewBox="0 0 40 26" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="40" height="26" fill="white"/>
              <path d="M7.00125 3.6254V22.3032C7.00125 23.1973 7.73658 23.9286 8.63487 23.9286H19.8484C28.3259 23.9286 31.9999 19.2057 31.9999 12.9396C31.9999 6.67355 28.3246 2 19.847 2H8.6335C7.73521 2 6.99988 2.73123 6.99988 3.6254H7.00125Z" fill="white"/>
              <path d="M14.5073 6.58474V20.3863H20.542C26.0221 20.3863 28.3979 17.3053 28.3979 12.9494C28.3979 8.59356 26.0207 5.54541 20.542 5.54541H15.5521C14.9729 5.54541 14.5073 6.01646 14.5073 6.58611V6.58474Z" fill="#CC0066"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.095 22.4413H19.846C26.6982 22.4413 30.479 19.0686 30.479 12.9477C30.479 9.42024 29.0987 3.49512 19.846 3.49512H10.095C9.22957 3.49512 8.5271 4.19348 8.5271 5.05616V20.8816C8.5271 21.7429 9.22957 22.4426 10.095 22.4426V22.4413ZM9.04882 5.05616C9.04882 4.47967 9.51439 4.01547 10.0936 4.01547H19.8447C23.6172 4.01547 29.9545 5.17803 29.9545 12.9477C29.9545 18.7345 26.3614 21.9209 19.8447 21.9209H10.095C9.51576 21.9209 9.05019 21.4581 9.05019 20.8802V5.05616H9.04882Z" fill="#232323"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M17.4745 10.9418C17.291 10.876 17.0993 10.8432 16.8912 10.8432V10.835H15.5095V14.1679H16.9076C17.1555 14.1679 17.3705 14.1186 17.5553 14.0365C17.7388 13.9461 17.8908 13.8311 18.0113 13.6832C18.1318 13.5353 18.2194 13.3545 18.2824 13.1491C18.3386 12.9437 18.3701 12.7219 18.3701 12.4754C18.3701 12.1961 18.3304 11.9578 18.2578 11.7524C18.1784 11.5552 18.0743 11.3827 17.9469 11.243C17.8114 11.1116 17.6594 11.0048 17.4759 10.939L17.4745 10.9418ZM17.1472 13.512C17.0432 13.5449 16.9473 13.5613 16.8433 13.5613V13.5695H16.212V11.4676H16.7228C16.898 11.4676 17.0418 11.4922 17.1623 11.5415C17.2828 11.5908 17.3787 11.673 17.4499 11.7634C17.5211 11.8537 17.5772 11.977 17.6101 12.1084C17.6416 12.2399 17.658 12.396 17.658 12.5603C17.658 12.7493 17.6334 12.8972 17.5868 13.0286C17.5389 13.1601 17.4745 13.2587 17.4033 13.3408C17.3321 13.423 17.2431 13.4805 17.1472 13.5134V13.512Z" fill="white"/>
              <path d="M21.2545 10.8443V11.4605H19.5442V12.1753H21.1176V12.7422H19.5442V13.5556H21.2942V14.1718H18.8335V10.8389H21.2545V10.8471V10.8443Z" fill="white"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M24.9123 14.1772L23.6977 10.8442H22.9555L21.7327 14.1772H22.4516L22.7076 13.4378H23.9222L24.1701 14.1772H24.9136H24.9123ZM23.3293 11.6645L23.7374 12.8873H22.8993L23.3225 11.6645H23.3307H23.3293Z" fill="white"/>
              <path d="M26.0725 10.8433V13.5614H27.6541V14.1776H25.3618V10.8446H26.0725V10.8433Z" fill="white"/>
              <path d="M11.7025 14.2266C12.5679 14.2266 13.269 13.5255 13.269 12.6587C13.269 11.7919 12.5679 11.0908 11.7025 11.0908C10.8371 11.0908 10.136 11.7919 10.136 12.6587C10.136 13.5255 10.8371 14.2266 11.7025 14.2266Z" fill="#232323"/>
              <path d="M12.6339 20.4969C11.4207 20.4969 10.4485 19.4494 10.4485 18.1622V16.3396C10.4485 15.696 10.9346 15.1675 11.5453 15.1675C12.1561 15.1675 12.6422 15.6878 12.6422 16.3396V20.4969H12.6339Z" fill="#232323"/>
            </svg>

            <span>{{ item.paymentMethod }}</span>
          </div>
        </template>

      </bento-data-grid>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import {
  BentoHeader, BentoDataGrid, BentoLink, BentoStatus, BentoStatusVariant, BentoCurrency,
} from '@adyen/bento-vue2';
import type { BentoDatagridSelection, BentoFilterValues } from '@adyen/bento-vue2';
import type { Payment } from './payments-page.types';
import { PAYMENTS_COLUMNS, PAYMENTS_FILTERS, MOCK_PAYMENTS } from './payments-page.mock-data';

const OptionsVerticalIcon = {
  render(h: any) {
    return h('svg', { attrs: { width: '16', height: '16', viewBox: '0 0 16 16', fill: 'none', 'aria-hidden': 'true' } }, [
      h('circle', { attrs: { cx: '8', cy: '3', r: '1.25', fill: 'currentColor' } }),
      h('circle', { attrs: { cx: '8', cy: '8', r: '1.25', fill: 'currentColor' } }),
      h('circle', { attrs: { cx: '8', cy: '13', r: '1.25', fill: 'currentColor' } }),
    ]);
  },
};

const headerActions = [
  { title: 'Export', variant: 'secondary' as const, event: () => {} },
  { title: 'More actions', variant: 'secondary' as const, iconOnly: true, icon: OptionsVerticalIcon, event: () => {} },
];

const selection = ref<BentoDatagridSelection>([]);
const pagination = ref({ page: 1, size: 20, totalCount: 16, pageSizes: [10, 20, 50, 100] });
const searchTerm = ref('');
const filterValues = ref<BentoFilterValues>([]);
const searchConfig = { placeholder: 'Search PSP reference or Merchant reference', inputFieldAriaLabel: 'Search PSP reference or Merchant reference' };
const filtersConfig = PAYMENTS_FILTERS;
const columns = ref(PAYMENTS_COLUMNS);
const payments = ref<Payment[]>(MOCK_PAYMENTS.map(p => ({ ...p })));

const filteredAndSortedData = computed(() =>
  payments.value.filter(item => {
    const matchesFilters = filterValues.value.length > 0
      ? filterValues.value.every((filter: any) => {
          if (!filter.value || filter.field === 'dateFilter') return true;
          return String(item[filter.field as keyof typeof item]).toLowerCase().includes(String(filter.value).toLowerCase());
        })
      : true;
    const matchesSearch = searchTerm.value
      ? String(item.pspReference).toLowerCase().includes(searchTerm.value.toLowerCase()) ||
        String(item.account).toLowerCase().includes(searchTerm.value.toLowerCase())
      : true;
    return matchesFilters && matchesSearch;
  })
);

function getStatusVariant(status: string): BentoStatusVariant {
  switch (status) {
    case 'Authorised': case 'Settled': return BentoStatusVariant.GREEN;
    case 'Refused': case 'Cancelled': return BentoStatusVariant.RED;
    case 'SentForSettle': return BentoStatusVariant.YELLOW;
    default: return BentoStatusVariant.GREY;
  }
}
</script>

<style scoped>
.status-cell {
  display: flex;
  align-items: center;
  gap: var(--b-spacer-030);
  width: 100%;
}

.payment-method-cell {
  display: flex;
  align-items: center;
  gap: var(--b-spacer-040);
}

.payment-method-cell svg {
  flex-shrink: 0;
  border-radius: var(--b-border-radius-s);
  border: 1px solid var(--b-color-outline-secondary);
}

/* --- FIX: FORCE SINGLE-LINE COLUMN HEADERS --- */
/* Strictly prevents any header text from wrapping, forcing the grid to scroll horizontally instead */
::v-deep .b-data-grid__column-headers .b-data-grid-cell__cell-content {
  white-space: nowrap !important;
}
</style>