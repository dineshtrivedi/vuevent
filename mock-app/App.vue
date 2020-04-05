<template>
  <p>Hello World</p>
</template>

<script>
export default {
  events: {
    document: {
      mouseover() {
        console.log('Mouseover!')
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.$events.remove.document.mouseover()
    }, 5000)
  }
}
</script>
