<template>
  <p>{{ pText }}</p>
</template>

<script>
export default {
  name: 'PTag',
  props: {
    pText: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$mineShaft: #333333;

p {
  font-size: 18px;
  color: $mineShaft;
  font-weight: normal;
  margin-bottom: 10px;
  text-align: left;
  padding: 0 10px;
}
</style>
