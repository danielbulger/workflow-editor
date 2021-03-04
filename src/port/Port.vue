<template>
  <div class="port" :class="direction">
    <div class="name">{{ this.port.name }}</div>
    <div class="connection-point"></div>
  </div>
</template>

<script>
export default {
  name: 'Port',
  props: {
    id: Number,
    direction: String
  },
  computed: {
    port() {
      return this.$store.getters['ports/getPortById'](this.id);
    }
  }
};
</script>

<style scoped>

  .port {
    width: 100%;
    display: inline-flex;
    align-items: center;
    font-size: var(--port-name-size);
  }

  .port.incoming {
    justify-content: flex-end;
    flex-direction: row-reverse;
  }

  .port.outgoing {
    justify-content: flex-end;
    flex-direction: row;
  }

  .port > .connection-point {
    width: var(--port-size);
    height: var(--port-size);
    background: var(--port-background-colour);
    border: var(--port-border-size) solid black;
    border-radius: 50%;
    cursor: crosshair;
  }
</style>