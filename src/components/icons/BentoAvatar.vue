<template>
  <div
    class="bento-avatar"
    :class="[
      `bento-avatar--${size}`,
      { 'bento-avatar--square': square },
    ]"
    :style="{
      backgroundColor,
      color: textColor,
      width: avatarSize,
      height: avatarSize,
      fontSize: avatarFontSize,
    }"
    v-bind="$attrs"
  >
    <span v-if="text" class="bento-avatar__text">{{ text }}</span>
    <slot v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'BentoAvatar',
  props: {
    text: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'medium',
      validator: (value: string) => ['small', 'medium', 'large'].includes(value),
    },
    square: {
      type: Boolean,
      default: false,
    },
    backgroundColor: {
      type: String,
      default: 'var(--b-color-background-secondary, #e9ecef)',
    },
    textColor: {
      type: String,
      default: 'var(--b-color-label-primary, #000)',
    },
  },
  setup(props) {
    const avatarSize = computed(() => {
      switch (props.size) {
        case 'small':
          return '20px';
        case 'medium':
          return '32px';
        case 'large':
          return '48px';
        default:
          return '32px';
      }
    });

    const avatarFontSize = computed(() => {
      switch (props.size) {
        case 'small':
          return '9px';
        case 'medium':
          return '14px';
        case 'large':
          return '20px';
        default:
          return '14px';
      }
    });

    return { avatarSize, avatarFontSize };
  },
});
</script>

<style scoped>
.bento-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: 600;
  text-transform: uppercase;
  flex-shrink: 0;
  overflow: hidden;
}

.bento-avatar--square {
  border-radius: 4px;
}

.bento-avatar__text {
  font-family: var(--b-text-caption-font-family, system-ui);
  line-height: 1;
}
</style>
