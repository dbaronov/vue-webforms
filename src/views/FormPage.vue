<template>
  <div class="wrapper">
    <TopBanner msg="Call us on 0222 333 4567"/>
    <div class="wrapper-inner">
      <H1Tag title="One last step"/>
      <PTag pText="To save your quote and process your policy, we'll need to confirm your details"/>
      <TheForm/>
    </div>
  </div>
</template>

<script>
import TopBanner from '@/components/TopBanner.vue'
import H1Tag from '@/components/H1Tag.vue'
import PTag from '@/components/PTag.vue'
import TheForm from '@/components/TheForm.vue'

export default {
  name: 'Form',
  components: {
    TopBanner,
    H1Tag,
    PTag,
    TheForm
  },
  methods: {
  }
}
</script>

<style>
  .wrapper-inner {
    min-width: 420px;
    width: 50vw;
    margin: 0 auto 10px;
  }
</style>
