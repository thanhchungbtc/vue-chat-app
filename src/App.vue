<template>

  <router-view v-if="!loading"/>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {container} from "@/di";

  @Component
  export default class AppComponent extends Vue {
    loading = false

    authStore = container.getAuthStore()

    async mounted() {
      this.loading = true

      this.$subscribeTo(await this.authStore.listen(), (user) => {
        this.loading = false
        if (!user) {
          if (this.$route.name !== 'Login') {
            this.$router.push({name: 'Login'})
          }
        } else {
          if (this.$route.name === 'Login' || this.$route.name === 'Register') {
            this.$router.push({name: 'Home'})
          }
        }
      })
    }

  }
</script>