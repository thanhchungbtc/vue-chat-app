<template>
  <div class="d-flex justify-content-center align-items-center h-100 flex-column">
    <h3 class="mb-3">Register</h3>
    <b-form>
      <b-list-group class="mb-5">
        <b-list-group-item class="p-1">
          <b-form-input v-model="email" placeholder="Email" style="width: 300px;" class="border-0"></b-form-input>
        </b-list-group-item>
        <b-list-group-item class="p-1 d-flex">
          <b-form-input v-model="password" placeholder="Password" type="password" style="width: 300px;"
                        class="border-0"></b-form-input>
        </b-list-group-item>
        <b-list-group-item class="p-1 d-flex">
          <b-form-input v-model="confirmPassword" placeholder="Confirm password" type="password" style="width: 300px;"
                        class="border-0"></b-form-input>
        </b-list-group-item>

        <b-button block variant="primary" class="mt-3" :disabled="loading" @click="register">Register</b-button>

        <div class="border-top mt-4  mb-3 w-75 text-center align-self-center"></div>

        <div class="text-center">
          <span>Have an account?</span>
          <router-link tag="b-link" :to="{name: 'Login'}" class="pt-2"> Login to your account.</router-link>
        </div>
      </b-list-group>
    </b-form>
  </div>
</template>

<script lang="ts">
  import {Component, Vue} from "vue-property-decorator";
  import {AuthStore} from "@/store/authStore";
  import {getModule} from "vuex-module-decorators";
  import {LoginPayload} from "@/services/interfaces";

  @Component
  export default class LoginComponent extends Vue {

    email = ''
    password = ''
    confirmPassword = ''
    loading = false

    get authStore(): AuthStore {
      return getModule(AuthStore, this.$store)
    }

    async register() {
      const payload = new LoginPayload()
      payload.email = this.email;
      payload.password = this.password;

      this.loading = true;
      (await this.authStore.register(payload)).subscribe(() => {
        this.loading = false
      });
    }
  }
</script>