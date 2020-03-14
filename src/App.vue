<template>
  <router-view></router-view>
</template>

<script lang="ts">
  import Vue from "vue";
  import {mapGetters} from "vuex";

  export default Vue.extend({

    mounted: function () {
      this.$store.dispatch("auth/bootstrap");
    },

    watch: {
      user() {
        if (this.$route.name !== 'Login') {
          this.$router.push({name: 'Login'})
        } else {
          if (this.$route.name === 'Login' || this.$route.name === 'Register') {
            this.$router.push({name: 'Home'})
          }
        }
      },

      error(err: Error) {
        this.$bvToast.toast(err.message, {
          title: 'Error occurred',
          variant: 'danger',
        })
      }

    },

    computed: {
      ...mapGetters('auth', ['user', 'error'])
    },

    methods: {}
  })

</script>