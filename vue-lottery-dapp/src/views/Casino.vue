<template>
  <HelloMetaMask />
</template>

<script>
// @ is an alias to /src
import HelloMetaMask from '@/components/HelloMetaMask'
export default {
  name: 'casino',
  components: {
    HelloMetaMask,
  },
  beforeCreate() {
    console.log('registerWeb3 Action dispatched from Casino Component');
    this.$store.dispatch('registerWeb3');
  }
}
</script>

<style lang="scss" scoped>

</style>
