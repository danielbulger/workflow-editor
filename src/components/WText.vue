<template>
  <component :is="component" :class="[`align-${align}`, `colour-${colour}`]">
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'WText',
  props: {
    component: {
      type: String,
      default: 'div',
    },
    align: {
      type: String,
      default: 'left',
    },
    colour: {
      type: String,
      default: 'default',
    },
  },
};
</script>

<style scoped>
.align-center {
  text-align: center;
}

.align-left {
  text-align: left;
}

.align-right {
  text-align: right;
}

.colour-default {
  color: var(--text-colour);
}

</style>