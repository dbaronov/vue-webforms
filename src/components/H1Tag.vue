<template>
  <h1>{{ title }}</h1>
</template>

<script>
export default {
  name: 'H1Tag',
  props: {
    title: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$steelBlue: #488CBE;

h1 {
  font-size: 28px;
  color: $steelBlue;
  font-weight: 900;
  text-align: left;
  margin-bottom: 10px;
  padding: 0 10px;
}
</style>
