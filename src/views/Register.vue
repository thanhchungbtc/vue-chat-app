<template>
  <b-container class="h-100">
    <b-row align-h="center" align-v="center" class="h-100">
      <b-col md="4" sm="12">
        <h3 class="mb-3 text-center">Register</h3>

        <b-form>
          <b-list-group class="mb-5">
            <b-list-group-item class="p-1">
              <b-form-input autocomplete="email"
                            class="border-0"
                            placeholder="Email" style="width: 300px;" v-model="payload.email"></b-form-input>
            </b-list-group-item>
            <b-list-group-item class="p-1 d-flex">
              <b-form-input autocomplete="password" class="border-0" placeholder="Password" style="width: 300px;"
                            type="password"
                            v-model="payload.password"></b-form-input>
            </b-list-group-item>
            <b-list-group-item class="p-1 d-flex">
              <b-form-input autocomplete="password" class="border-0" placeholder="Password" style="width: 300px;"
                            type="password"
                            v-model="payload.confirmPassword"></b-form-input>
            </b-list-group-item>

            <b-button :disabled="loading" @click="register()" block class="mt-3" variant="primary">Register</b-button>

            <div class="border-top mt-4  mb-3 w-75 text-center align-self-center"></div>

            <div class="text-center">
              <span>Have an account?</span>
              <router-link :to="{name: 'Login'}" class="pt-2" tag="b-link">Login</router-link>
            </div>
          </b-list-group>
        </b-form>

      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
  import Vue from 'vue'

  export default Vue.extend({

    data() {
      return {
        payload: {
          email: '',
          password: '',
          confirmPassword: '',
        },
        loading: false,
      }
    },


    methods: {
      async register() {
        try {
          this.loading = true
          await this.$store.dispatch('auth/register', this.payload)
        } finally {
          this.loading = false;
        }
      }
    }

  })

</script>