<template>
  <div class="top-banner">
    <div class="top-banner__wrap">
      <div class="top-banner__image">
        <img class="top-banner__image" alt="Digital Risk" src="../assets/logo.svg">
      </div>
      <div class="top-banner__cta">
        <a href="tel:+441112223456">{{ msg }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBanner',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$steelBlue: #488CBE;
$white: #ffffff;

.top-banner {
  background-color: $steelBlue;
  padding: 0 10px;

  &__wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-width: 320px;
    max-width: 50vw;
    margin: 40px auto;
  }

  &__image {
    img {
      width: 40px;
      height: auto;
      padding: 10px;
      display: block;
      background: $white;
    }
  }

  &__cta {
    a {
      color: $white;
      font-weight: bold;
      text-decoration: none;
    }
  }
}
</style>
