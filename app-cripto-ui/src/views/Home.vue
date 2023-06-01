<template>
  <div class="container d-flex m-75">
    <ListTransaction />
  </div>
</template>

<script>
import ListTransaction from "../components/ListTransaction";

export default {
  name: "Home",
  components: {
    ListTransaction
  },
  methods: {},
};
</script>

<style scoped></style>