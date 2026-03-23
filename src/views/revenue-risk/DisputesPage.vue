<template>
  <div class="page">
    <div class="page-header">
      <div class="header-content">
        <div class="header-title">
          <h1>Dispute</h1>
        </div>
      </div>
    </div>
    
    <div class="content-section">
      <!-- Tabs -->
      <div :style="{ 
        marginBottom: 'var(--b-spacer-090)', 
        display: 'flex', 
        gap: 'var(--b-spacer-040, 8px)', 
        borderBottom: '1px solid var(--b-color-outline-primary, #e5e7eb)',
        alignItems: 'flex-end'
      }">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          :style="{
            padding: 'var(--b-spacer-040, 8px) var(--b-spacer-060, 12px)',
            border: 'none',
            backgroundColor: 'transparent',
            borderBottom: activeTabId === tab.id ? '2px solid var(--b-color-outline-primary, #3b82f6)' : '2px solid transparent',
            color: activeTabId === tab.id ? 'var(--b-color-label-primary, #111827)' : 'var(--b-color-label-secondary, #6b7280)',
            fontFamily: 'var(--b-text-body-font-family)',
            fontSize: 'var(--b-text-body-font-size)',
            fontWeight: activeTabId === tab.id ? 'var(--b-text-body-stronger-font-weight)' : 'var(--b-text-body-font-weight)',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            marginBottom: '-1px',
            outline: 'none',
            borderRadius: '0'
          }"
          @click="activeTabId = tab.id"
        >
          {{ tab.title }}
        </button>
      </div>

      <!-- Filter Bar -->
      <div :style="{ marginBottom: 'var(--b-spacer-090)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--b-spacer-040, 8px)', backgroundColor: 'var(--b-color-background-secondary, #f9fafb)', borderRadius: 'var(--b-border-radius-m, 6px)', border: '1px solid var(--b-color-outline-secondary, #e5e7eb)' }">
        <div :style="{ display: 'flex', alignItems: 'center', gap: 'var(--b-spacer-040, 8px)' }">
          <span :style="{ fontFamily: 'var(--b-text-body-font-family)', fontSize: 'var(--b-text-body-font-size)', color: 'var(--b-color-label-secondary, #6b7280)' }">
            Filter by:
          </span>
          <select :style="{
            padding: 'var(--b-spacer-020, 4px) var(--b-spacer-040, 8px)',
            border: '1px solid var(--b-color-outline-secondary, #e5e7eb)',
            borderRadius: 'var(--b-border-radius-s, 4px)',
            backgroundColor: 'var(--b-color-background-primary, white)',
            fontFamily: 'var(--b-text-body-font-family)',
            fontSize: 'var(--b-text-body-font-size)'
          }">
            <option>All Status</option>
            <option>Won</option>
            <option>Lost</option>
            <option>Open</option>
          </select>
        </div>
      </div>

      <!-- Data Grid -->
      <div :style="{ 
        backgroundColor: 'var(--b-color-background-primary, white)', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'flex-start', 
        position: 'relative', 
        width: '100%' 
      }">
        <!-- Header Row -->
        <div :style="{
          backgroundColor: 'var(--b-color-background-primary, white)',
          borderBottom: '1px solid var(--b-color-outline-primary, #dbdee2)',
          borderTop: '1px solid var(--b-color-outline-primary, #dbdee2)',
          display: 'flex',
          gap: 'var(--b-spacer-020, 4px)',
          height: '36px',
          alignItems: 'center',
          overflow: 'hidden',
          paddingLeft: 'var(--b-spacer-040, 8px)',
          paddingRight: 'var(--b-spacer-020, 4px)',
          paddingTop: 'var(--b-spacer-050, 10px)',
          paddingBottom: 'var(--b-spacer-050, 10px)',
          flexShrink: 0,
          width: '100%'
        }">
          <input 
            type="checkbox" 
            :style="{
              width: '16px',
              height: '16px',
              cursor: 'pointer',
              accentColor: 'var(--b-color-outline-primary, #3b82f6)'
            }"
          />
          <button 
            :style="{
              background: 'none',
              border: 'none',
              padding: '4px',
              cursor: 'pointer',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>

        <!-- Data Rows -->
        <div v-for="item in disputes" :key="item.id" :style="{
          backgroundColor: item.id % 2 === 0 ? 'var(--b-color-background-primary-hover, #f7f7f8)' : 'var(--b-color-background-primary, white)',
          borderBottom: '1px solid var(--b-color-outline-primary, #dbdee2)',
          display: 'flex',
          gap: 'var(--b-spacer-070, 0px)',
          height: '48px',
          alignItems: 'center',
          overflow: 'hidden',
          paddingLeft: 'var(--b-spacer-040, 8px)',
          paddingRight: 'var(--b-spacer-090, 24px)',
          paddingTop: 'var(--b-spacer-050, 10px)',
          paddingBottom: 'var(--b-spacer-050, 10px)',
          flexShrink: 0,
          width: '100%'
        }">
          <!-- Checkbox Column -->
          <div :style="{ display: 'flex', alignItems: 'center', width: '40px' }">
            <input 
              type="checkbox" 
              :style="{
                width: '16px',
                height: '16px',
                cursor: 'pointer',
                accentColor: 'var(--b-color-outline-primary, #3b82f6)'
              }"
            />
          </div>

          <!-- Reference Column -->
          <div :style="{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0px', 
            height: '48px', 
            alignItems: 'flex-start', 
            justifyContent: 'center', 
            overflow: 'hidden', 
            paddingLeft: 'var(--b-spacer-070, 16px)', 
            paddingRight: 'var(--b-spacer-070, 16px)', 
            paddingTop: 'var(--b-spacer-050, 10px)', 
            paddingBottom: 'var(--b-spacer-050, 10px)', 
            flex: 1 
          }">
            <p :style="{
              fontFamily: 'var(--b-text-body-font-family)',
              fontWeight: 'var(--b-text-body-font-weight)',
              fontSize: 'var(--b-text-body-font-size)',
              lineHeight: 'var(--b-text-body-line-height)',
              color: 'var(--b-color-label-primary, #00112c)',
              margin: 0,
              width: '100%'
            }">{{ item.reference }}</p>
          </div>

          <!-- PSP Reference Column -->
          <div :style="{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0px', 
            height: '48px', 
            alignItems: 'flex-start', 
            justifyContent: 'center', 
            overflow: 'hidden', 
            paddingLeft: 'var(--b-spacer-070, 16px)', 
            paddingRight: 'var(--b-spacer-070, 16px)', 
            paddingTop: 'var(--b-spacer-050, 10px)', 
            paddingBottom: 'var(--b-spacer-050, 10px)', 
            flex: 1 
          }">
            <p :style="{
              fontFamily: 'var(--b-text-body-font-family)',
              fontWeight: 'var(--b-text-body-font-weight)',
              fontSize: 'var(--b-text-body-font-size)',
              lineHeight: 'var(--b-text-body-line-height)',
              color: 'var(--b-color-label-primary, #00112c)',
              margin: 0,
              width: '100%'
            }">{{ item.pspReference }}</p>
          </div>

          <!-- Amount Column -->
          <div :style="{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0px', 
            height: '48px', 
            alignItems: 'flex-start', 
            justifyContent: 'center', 
            overflow: 'hidden', 
            paddingLeft: 'var(--b-spacer-070, 16px)', 
            paddingRight: 'var(--b-spacer-070, 16px)', 
            paddingTop: 'var(--b-spacer-050, 10px)', 
            paddingBottom: 'var(--b-spacer-050, 10px)', 
            flex: 1 
          }">
            <p :style="{
              fontFamily: 'var(--b-text-body-font-family)',
              fontWeight: item.status === 'Won' ? 'var(--b-text-body-stronger-font-weight)' : 'var(--b-text-body-font-weight)',
              fontSize: 'var(--b-text-body-font-size)',
              lineHeight: 'var(--b-text-body-line-height)',
              color: item.status === 'Won' ? 'var(--b-color-label-positive, #027a48)' : 'var(--b-color-label-primary, #00112c)',
              margin: 0,
              width: '100%'
            }">{{ item.amount }}</p>
          </div>

          <!-- Status Column -->
          <div :style="{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0px', 
            height: '48px', 
            alignItems: 'flex-start', 
            justifyContent: 'center', 
            overflow: 'hidden', 
            paddingLeft: 'var(--b-spacer-070, 16px)', 
            paddingRight: 'var(--b-spacer-070, 16px)', 
            paddingTop: 'var(--b-spacer-050, 10px)', 
            paddingBottom: 'var(--b-spacer-050, 10px)', 
            flex: 1 
          }">
            <p :style="{
              fontFamily: 'var(--b-text-body-font-family)',
              fontWeight: 'var(--b-text-body-font-weight)',
              fontSize: 'var(--b-text-body-font-size)',
              lineHeight: 'var(--b-text-body-line-height)',
              color: item.status === 'Won' ? 'var(--b-color-label-positive, #027a48)' : item.status === 'Lost' ? 'var(--b-color-label-critical, #d92d20)' : 'var(--b-color-label-secondary, #6b7280)',
              margin: 0,
              width: '100%'
            }">{{ item.status }}</p>
          </div>

          <!-- Date Column -->
          <div :style="{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '0px', 
            height: '48px', 
            alignItems: 'flex-start', 
            justifyContent: 'center', 
            overflow: 'hidden', 
            paddingLeft: 'var(--b-spacer-070, 16px)', 
            paddingRight: 'var(--b-spacer-070, 16px)', 
            paddingTop: 'var(--b-spacer-050, 10px)', 
            paddingBottom: 'var(--b-spacer-050, 10px)', 
            flex: 1 
          }">
            <p :style="{
              fontFamily: 'var(--b-text-body-font-family)',
              fontWeight: 'var(--b-text-body-font-weight)',
              fontSize: 'var(--b-text-body-font-size)',
              lineHeight: 'var(--b-text-body-line-height)',
              color: 'var(--b-color-label-primary, #00112c)',
              margin: 0,
              width: '100%'
            }">{{ item.date }}</p>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div :style="{ marginTop: 'var(--b-spacer-090)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }">
        <div :style="{ 
          fontFamily: 'var(--b-text-body-font-family)', 
          fontSize: 'var(--b-text-body-font-size)', 
          color: 'var(--b-color-label-secondary, #6b7280)' 
        }">
          Showing 10 of 100 items
        </div>
        
        <div :style="{ display: 'flex', alignItems: 'center', gap: 'var(--b-spacer-040, 8px)' }">
          <!-- Page Dropdown -->
          <select :style="{
            padding: 'var(--b-spacer-020, 4px) var(--b-spacer-040, 8px)',
            border: '1px solid var(--b-color-outline-secondary, #e5e7eb)',
            borderRadius: 'var(--b-border-radius-s, 4px)',
            backgroundColor: 'var(--b-color-background-primary, white)',
            fontFamily: 'var(--b-text-body-font-family)',
            fontSize: 'var(--b-text-body-font-size)',
            cursor: 'pointer'
          }">
            <option value="10">10</option>
            <option value="20" selected>20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          
          <span :style="{ 
            fontFamily: 'var(--b-text-body-font-family)', 
            fontSize: 'var(--b-text-body-font-size)', 
            color: 'var(--b-color-label-secondary, #6b7280)' 
          }">of 10</span>
          
          <!-- Navigation Buttons -->
          <button 
            :style="{
              background: 'none',
              border: '1px solid var(--b-color-outline-secondary, #e5e7eb)',
              padding: '6px 8px',
              cursor: 'not-allowed',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: '0.5'
            }"
            disabled
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M10 12L6 8l4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <button 
            :style="{
              background: 'none',
              border: '1px solid var(--b-color-outline-secondary, #e5e7eb)',
              padding: '6px 8px',
              cursor: 'not-allowed',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: '0.5'
            }"
            disabled
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 10L4 6h8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <button 
            :style="{
              background: 'none',
              border: '1px solid var(--b-color-outline-secondary, #e5e7eb)',
              padding: '6px 8px',
              cursor: 'pointer',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
                          }"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 10l4-4-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          
          <button 
            :style="{
              background: 'none',
              border: '1px solid var(--b-color-outline-secondary, #e5e7eb)',
              padding: '6px 8px',
              cursor: 'pointer',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
                          }"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M6 10l4-4-4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'DisputesPage',
  data() {
    return {
      activeTabId: 'allDisputesTab',
      tabs: [
        { id: 'allDisputesTab', title: 'All disputes' },
        { id: 'openDisputesTab', title: 'Open disputes' },
        { id: 'closedDisputesTab', title: 'Closed disputes' }
      ],
      disputes: [
        {
          id: 1,
          reference: 'DSP-2024-001',
          pspReference: 'PSP-REF-12345',
          amount: '€1,250.00',
          status: 'Won',
          date: 'Jul 20, 2025, 03:45:51'
        },
        {
          id: 2,
          reference: 'DSP-2024-002',
          pspReference: 'PSP-REF-12346',
          amount: '€850.00',
          status: 'Lost',
          date: 'Sep 22, 2025, 16:55:05'
        },
        {
          id: 3,
          reference: 'DSP-2024-003',
          pspReference: 'PSP-REF-12347',
          amount: '€2,100.00',
          status: 'Open',
          date: 'Nov 11, 2025, 13:13:13'
        },
        {
          id: 4,
          reference: 'DSP-2024-004',
          pspReference: 'PSP-REF-12348',
          amount: '€950.00',
          status: 'Won',
          date: 'Jan 15, 2025, 10:20:30'
        },
        {
          id: 5,
          reference: 'DSP-2024-005',
          pspReference: 'PSP-REF-12349',
          amount: '€1,800.00',
          status: 'Lost',
          date: 'Feb 28, 2025, 14:40:15'
        },
        {
          id: 6,
          reference: 'DSP-2024-006',
          pspReference: 'PSP-REF-12350',
          amount: '€3,200.00',
          status: 'Open',
          date: 'Mar 10, 2025, 09:15:33'
        },
        {
          id: 7,
          reference: 'DSP-2024-007',
          pspReference: 'PSP-REF-12351',
          amount: '€1,800.00',
          status: 'Won',
          date: 'Mar 10, 2025, 09:15:33'
        },
        {
          id: 8,
          reference: 'DSP-2024-008',
          pspReference: 'PSP-REF-12352',
          amount: '€650.00',
          status: 'Open',
          date: 'Apr 05, 2025, 16:45:27'
        },
        {
          id: 9,
          reference: 'DSP-2024-009',
          pspReference: 'PSP-REF-12353',
          amount: '€2,500.00',
          status: 'Won',
          date: 'May 12, 2025, 11:30:44'
        },
        {
          id: 10,
          reference: 'DSP-2024-010',
          pspReference: 'PSP-REF-12354',
          amount: '€1,100.00',
          status: 'Lost',
          date: 'Jun 18, 2025, 08:20:11'
        }
      ]
    };
  }
});
</script>

<style scoped>
.page {
  padding: var(--b-spacer-090);
}

.page-header {
  margin-bottom: var(--b-spacer-090);
  width: 100%;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  width: auto;
}

.header-title {
  display: flex;
  flex-direction: column;
  font-family: var(--b-text-title-l-font-family);
  font-weight: var(--b-text-title-l-font-weight);
  justify-content: center;
  line-height: var(--b-text-title-l-line-height);
  position: relative;
  flex-shrink: 0;
  font-size: var(--b-text-title-l-font-size);
  width: auto;
  height: 100%;
}

.header-title h1 {
  font-family: var(--b-text-title-l-font-family);
  font-weight: var(--b-text-title-l-font-weight);
  font-size: var(--b-text-title-l-font-size);
  line-height: var(--b-text-title-l-line-height);
  letter-spacing: var(--b-text-title-l-letter-spacing);
  color: var(--b-color-label-primary);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: var(--b-spacer-040);
  align-items: center;
  justify-content: flex-end;
  padding: var(--b-spacer-000);
  position: relative;
  flex-shrink: 0;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: var(--b-spacer-090);
}

.info-card {
  padding: var(--b-spacer-090);
  background-color: var(--b-color-background-secondary);
  border-radius: var(--b-border-radius-m);
  border: 1px solid var(--b-color-outline-secondary);
}

.info-card h3 {
  font-family: var(--b-text-body-font-family);
  font-size: var(--b-text-body-font-size);
  font-weight: var(--b-text-body-stronger-font-weight);
  color: var(--b-color-label-primary);
  margin-bottom: var(--b-spacer-040);
}

.info-card p {
  font-family: var(--b-text-body-font-family);
  font-size: var(--b-text-body-font-size);
  color: var(--b-color-label-secondary);
}
</style>
