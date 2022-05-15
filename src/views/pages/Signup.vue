<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <h1 class="font-bold text-2xl">Sign up</h1>
    <form class="flex flex-col bg-white rounded shadow-lg p-12 mt-12" @submit.prevent="onSubmit">
      <!-- Name field -->
      <div>
        <label class="font-semibold text-xs" for="usernameField">Name</label>
        <input
          class="
            flex
            items-center
            h-12
            px-4
            w-64
            bg-gray-200
            mt-2
            rounded
            focus:outline-none focus:ring-2
          "
          type="text"
          v-model="name"
        />
        <span v-if="v$.name.required.$invalid && v$.name.$dirty" class="block mt-3 text-red-500 text-xs font-semibold">
          Name is required!
        </span>
      </div> <!-- End Name field -->

      <!-- Email field -->
      <div>
        <label class="font-semibold text-xs" for="usernameField">Email</label>
        <input
          class="
            flex
            items-center
            h-12
            px-4
            w-64
            bg-gray-200
            mt-2
            rounded
            focus:outline-none focus:ring-2
          "
          type="text"
          v-model="email"
        />
        <span v-if="v$.email.required.$invalid && v$.email.$dirty" class="block mt-3 text-red-500 text-xs font-semibold">
          Email is required!
        </span>
        <span v-else-if="v$.email.email.$invalid && v$.email.$dirty" class="block mt-3 text-red-500 text-xs font-semibold">
          Email is not valid!
        </span>
      </div> <!-- End Email field -->

      <!-- Password field -->
      <div>
        <label class="font-semibold text-xs mt-3" for="passwordField"
          >Password</label
        >
        <input
          class="
            flex
            items-center
            h-12
            px-4
            w-64
            bg-gray-200
            mt-2
            rounded
            focus:outline-none focus:ring-2
          "
          type="password"
          v-model="password"
        />

        <span v-if="v$.password.required.$invalid && v$.password.$dirty" class="block mt-3 text-red-500 text-xs font-semibold">
          Password is required!
        </span>

        <span v-else-if="v$.password.minLength.$invalid && v$.password.$dirty" class="block mt-3 text-red-500 text-xs font-semibold">
          Password shouldn't be shorter than {{v$.password.minLength.$params.min}} chars!
        </span>
      </div> <!-- End Password Field -->

      <!-- Password Repeat field -->
      <div>
        <label class="font-semibold text-xs mt-3" for="passwordField"
          >Confirm password</label
        >
        <input
          class="
            flex
            items-center
            h-12
            px-4
            w-64
            bg-gray-200
            mt-2
            rounded
            focus:outline-none focus:ring-2
          "
          type="password"
          v-model="password_repeat"
        />
        <span v-if="v$.password_repeat.required.$invalid && v$.password_repeat.$dirty" class="block mt-3 text-red-500 text-xs font-semibold">
          This field is required!
        </span>
        <span v-else-if="v$.password_repeat.sameAs.$invalid && v$.password_repeat.$dirty" class="block mt-3 text-red-500 text-xs font-semibold">
          Passwords have to match!
        </span>
      </div> <!-- End Password repeat Field -->

      <button
        class="
          flex
          items-center
          justify-center
          h-12
          px-6
          w-64
          bg-blue-600
          mt-8
          rounded
          font-semibold
          text-sm text-blue-100
          hover:bg-blue-700
        "
        type="submit"
      >
        <SpinnerLoading v-if="isLoading" />
        <span v-else >Login</span>
      </button>
      <div class="flex mt-6 justify-center text-xs">
        <a class="text-blue-400 hover:text-blue-500" href="#"
          >Forgot Password</a
        >
        <span class="mx-2 text-gray-300">/</span>
        <router-link class="text-blue-400 hover:text-blue-500" to="/login">Login</router-link>
      </div>
    </form>
    <p v-if="errorMessage" class="mt-4 text-red-600 text-semibold text-lg">{{errorMessage}}</p>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import useVuelidate from '@vuelidate/core'
import errors from '@/constants/errors';

export default {
  name: "LoginPage",
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_repeat: '',
      isLoading: false,
      errorMessage: null,
    }
  },
  validations() {
    return {
      name: { required },
      email: { required, email },
      password: { required, minLength: minLength(6) },
      password_repeat: { required, sameAs: sameAs(this.password) }
    }
  },
  methods: {
    ...mapActions('auth', ['signup']),
    async onSubmit() {
      const isFormValid = await this.v$.$validate()

      if ( !isFormValid ) {
        this.v$.$touch()
        return 
      }

      this.isLoading = true
      const error = await this.signup({
        email: this.email,
        password: this.password,
        name: this.name
      })

      if ( error && error.code ) {
        this.errorMessage = errors[error.code] || 'Something went wrong'
        this.name = ''
        this.email = ''
        this.password = ''
        this.password_repeat = ''
        this.v$.$reset()
      }

      this.isLoading = false
    }
  }
};
</script>