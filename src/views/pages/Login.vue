<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <h1 class="font-bold text-2xl">Login</h1>
    <form
      class="flex flex-col bg-white rounded shadow-lg p-12 mt-12"
      @submit.prevent="onSubmit"
    >
      <div>
        <label class="font-semibold text-xs" for="usernameField">Email</label>
        <input
          ref="email"
          class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="text"
          v-model="email"
        />
        <span
          v-if="v$.email.required.$invalid && v$.email.$dirty"
          class="block mt-3 text-red-500 text-xs font-semibold"
        >
          Email is required!
        </span>
        <span
          v-else-if="v$.email.email.$invalid && v$.email.$dirty"
          class="block mt-3 text-red-500 text-xs font-semibold"
        >
          Email is not valid!
        </span>
      </div>
      <div>
        <label class="font-semibold text-xs mt-3" for="passwordField"
          >Password</label
        >
        <input
          class="flex items-center h-12 px-4 w-64 bg-gray-200 mt-2 rounded focus:outline-none focus:ring-2"
          type="password"
          v-model="password"
        />

        <span
          v-if="v$.password.required.$invalid && v$.password.$dirty"
          class="block mt-3 text-red-500 text-xs font-semibold"
        >
          Password is required!
        </span>

        <span
          v-else-if="v$.password.minLength.$invalid && v$.password.$dirty"
          class="block mt-3 text-red-500 text-xs font-semibold"
        >
          Password shouldn't be shorter than
          {{ v$.password.minLength.$params.min }} chars!
        </span>
      </div>
      <button
        class="flex items-center justify-center h-12 px-6 w-64 bg-blue-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-blue-700"
        type="submit"
      >
        <span v-if="!isLoading">Login</span>
        <SpinnerLoading v-else />
      </button>
      <div class="flex mt-6 justify-center text-xs">
        <a class="text-blue-400 hover:text-blue-500" href="#"
          >Forgot Password</a
        >
        <span class="mx-2 text-gray-300">/</span>
        <router-link class="text-blue-400 hover:text-blue-500" to="/signup"
          >Sign Up</router-link
        >
      </div>
    </form>
    <p v-if="error" class="mt-4 text-red-600 text-semibold text-lg">
      {{ error }}
    </p>
  </div>
</template>

<script>
import { required, email, minLength } from "@vuelidate/validators";
import { mapActions } from "vuex";
import useVuelidate from "@vuelidate/core";
import errors from "@/constants/errors";
export default {
  name: "LoginPage",
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      error: null,
    };
  },
  validations() {
    return {
      email: { required, email },
      password: { required, minLength: minLength(6) },
    };
  },
  mounted() {
    this.$refs.email.focus()
  },
  methods: {
    ...mapActions("auth", ["login"]),
    async onSubmit() {
      const isFormValid = await this.v$.$validate();

      if (!isFormValid) {
        this.v$.$touch();
        return;
      }

      this.isLoading = true;
      // Form is valid
      const error = await this.login({
        email: this.email,
        password: this.password,
      });

      if (error && error.code) {
        this.error = errors[error.code] || "Something went wrong!";
        this.email = "";
        this.password = "";
        this.v$.$reset();
      }
      this.isLoading = false;
    },
  },
};
</script>
