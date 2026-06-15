<template>
  <div class="android">
    <bento-header
      title="Android"
      description="Manage Android payment app versions and registered apps"
      variant="page"
    />

    <bento-tabs
      :active-tab-index="activeTabIndex"
      @update:active-tab-index="activeTabIndex = $event"
    >
      <bento-tab title="Apps" />
      <bento-tab title="Certificates" />
      <bento-tab title="Profiles" />
      <bento-tab title="Actions overview" />
      <bento-tab title="Actions" />
    </bento-tabs>

    <!-- ── Apps ──────────────────────────────────────────────────────── -->
    <template v-if="activeTabIndex === 0">
      <div class="android__grid-wrap">
        <div class="u-display-flex u-flex-direction-column u-overflow-y-hidden u-height-full">
          <div class="android__grid-wrapper u-margin-top-16">
            <bento-data-grid
              class="android__data-grid"
              :columns="appColumns"
              :data="appsData"
              :pagination="appsPagination"
              @update:pagination="appsPagination = $event"
            >
              <template #item-appName="{ item }">
                <figure class="u-display-flex u-justify-content-flex-start u-align-items-center u-margin-0">
                  <img :src="defaultAppIcon" aria-hidden="true" height="24" class="u-margin-right-8" />
                  <figcaption class="u-margin-0">{{ item.appName }}</figcaption>
                </figure>
              </template>
              <template #item-status="{ item }">
                <bento-tag variant="green">{{ item.status }}</bento-tag>
              </template>
            </bento-data-grid>
          </div>
        </div>
      </div>
    </template>

    <!-- ── Placeholder tabs ───────────────────────────────────────────── -->
    <p v-if="activeTabIndex === 1" class="android__placeholder b-margin-top-100">Certificates content</p>
    <p v-if="activeTabIndex === 2" class="android__placeholder b-margin-top-100">Profiles content</p>
    <p v-if="activeTabIndex === 3" class="android__placeholder b-margin-top-100">Actions overview content</p>
    <p v-if="activeTabIndex === 4" class="android__placeholder b-margin-top-100">Actions content</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import {
  BentoHeader, BentoTabs, BentoTab,
  BentoDataGrid, BentoTag,
} from '@adyen/bento-vue2';
import type { BentoColumn } from '@adyen/bento-vue2';
import { BentoColumnOverflow } from '@adyen/bento-vue2';

const activeTabIndex = ref(0);

const defaultAppIcon = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='24'%20height='24'%20fill='none'%20viewBox='0%200%2024%2024'%3e%3cpath%20fill='%23DCE0E5'%20d='M24%2012a12%2012%200%201%201-24%200%2012%2012%200%200%201%2024%200'/%3e%3cpath%20fill='%23fff'%20fill-rule='evenodd'%20d='m20.62%2020.36-2.32-2.33A8.8%208.8%200%200%200%2018.42%206l2.26-2.27-.39-.39-2.25%202.27a8.7%208.7%200%200%200-12.08%200L3.7%203.35l-.39.39L5.58%206a8.8%208.8%200%200%200%20.12%2012.02l-2.32%202.33.4.38%202.31-2.33a8.7%208.7%200%200%200%2011.82%200l2.32%202.33.39-.38zM14.95%208.72%2017.65%206a8.15%208.15%200%200%200-11.3%200l2.7%202.72a4.35%204.35%200%200%201%205.9%200m.38.4%202.7-2.72a8.27%208.27%200%200%201-.12%2011.24l-2.7-2.72a4.4%204.4%200%200%200%20.12-5.8M12%2011.69l2.57-2.58a3.8%203.8%200%200%200-5.14%200zm.39.39%202.56-2.57a3.86%203.86%200%200%201-.12%205.02zm-.78%200L9.05%209.51a3.86%203.86%200%200%200%20.12%205.02zm-2.04%202.83L12%2012.47l2.43%202.44a3.8%203.8%200%200%201-4.86%200m-.39.4a4.35%204.35%200%200%200%205.64%200l2.7%202.71a8.15%208.15%200%200%201-11.04%200l2.7-2.72zm-.4-.39a4.4%204.4%200%200%201-.11-5.8L5.97%206.4a8.27%208.27%200%200%200%20.12%2011.24z'%20clip-rule='evenodd'/%3e%3c%2fsvg%3e";

const appsPagination = ref({ page: 1, size: 10, totalCount: 22, pageSizes: [10, 25, 50] });

const appColumns: BentoColumn[] = [
  { field: 'appName',      label: 'App name',             minWidth: 200 },
  { field: 'description',  label: 'Description',          minWidth: 220, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'packageName',  label: 'Package name',         minWidth: 220, overflow: BentoColumnOverflow.ELLIPSIS },
  { field: 'status',       label: 'Latest version status', minWidth: 180 },
  { field: 'versionName',  label: 'Latest version name',  minWidth: 200 },
  { field: 'versionCode',  label: 'Latest version code',  minWidth: 200 },
  { field: 'lastUpload',   label: 'Last upload',          minWidth: 220 },
  { field: 'uploadedBy',   label: 'Uploaded by',          minWidth: 160 },
];

interface AppRow {
  id: string;
  appName: string;
  description: string;
  packageName: string;
  status: string;
  versionName: string;
  versionCode: number;
  lastUpload: string;
  uploadedBy: string;
  [key: string]: unknown;
}

const appsData: AppRow[] = [
  { id: 'ra-1', appName: 'Adyen Retail POS',    description: 'shaunc',     packageName: 'com.adyen.retailpos',           status: 'Ready to install', versionName: '1.0',   versionCode: 1,  lastUpload: 'Apr 21, 2026, 20:37', uploadedBy: 'shaunc' },
  { id: 'ra-2', appName: 'mPOS 3.0',            description: 'MyCashless', packageName: 'com.mycashless.mpos.android',   status: 'Ready to install', versionName: '3.2.20', versionCode: 37, lastUpload: 'Apr 15, 2026, 18:19', uploadedBy: 'eduardot' },
  { id: 'ra-3', appName: 'NRA Demo',             description: 'NRA Demo',   packageName: 'com.adyen.mystore.nra',         status: 'Ready to install', versionName: '1.0',   versionCode: 1,  lastUpload: 'May 21, 2022, 00:22', uploadedBy: 'timon' },
  { id: 'ra-4', appName: 'sample barcode',       description: '',           packageName: 'com.adyen.pos.android.sample',  status: 'Ready to install', versionName: '2.0',   versionCode: 2,  lastUpload: 'Apr 29, 2022, 22:13', uploadedBy: 'katies' },
  { id: 'ra-5', appName: 'NexoApp',              description: '',           packageName: 'com.adyen.nexoapp',             status: 'Ready to install', versionName: '12.0',  versionCode: 12, lastUpload: 'Jun 11, 2021, 03:52', uploadedBy: 'petewalton_MotoUser1' },
];
</script>

<style lang="scss" scoped>
.android {
  &__grid-wrap {
    padding-inline: 40px;
  }

  &__data-grid {
    border: var(--b-border-width-s) solid var(--b-color-separator-primary);
    border-radius: var(--b-border-radius-m);
    overflow: hidden;
  }

  &__placeholder {
    padding-inline: 40px;
    color: var(--b-color-label-secondary);
    font-family: var(--b-text-body-font-family);
    font-size: var(--b-text-body-font-size);
  }
}
</style>
