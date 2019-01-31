<template>
  <div class="wrapper">
    <TopBanner msg="Call us on 0333 772 0759"/>
    <div class="wrapper-inner">
      <H1Tag title="All done!"/>
      <PTag pText="Thanks for choosing us as your independent insurance provider!"/>
    </div>
  </div>
</template>

<script>
import TopBanner from '@/components/TopBanner.vue'
import H1Tag from '@/components/H1Tag.vue'
import PTag from '@/components/PTag.vue'

export default {
  name: 'Success',
  components: {
    TopBanner,
    H1Tag,
    PTag
  },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .signUp {
    margin-top: 40px;
  }

  input {
    margin-right: 10px;
    width: 20%;
    padding: 15px;
  }

  button {
    margin: 10px 0;
    padding: 15px 10px;
    width: 10%;
    cursor: pointer;
  }

  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>
