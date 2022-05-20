<template>
  <div class="max-w-lg w-full">
    <div
      class="bg-white shadow-md border border-gray-200 rounded-lg w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <Form @submit="submit" class="space-y-6">
        <h3 class="text-2xl text-center font-medium text-gray-900 dark:text-white">
          Sign in
        </h3>
        <div>
          <label
            for="email"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >Your email</label
          >
          <Field
            :rules="validateEmail"
            v-model="email"
            type="email"
            name="email"
            class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="example@gmail.com"
          />
          <ErrorMessage class="text-red-500 text-sm" name="email" />
        </div>
        <div>
          <label
            for="password"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >Your password</label
          >
          <Field
            :rules="validatePassword"
            name="password"
            v-model="password"
            type="password"
            placeholder="••••••••"
            class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
          />
          <ErrorMessage class="text-red-500 text-sm" name='password'/>
        </div>
        <button
          type="submit"
          class="w-full h-12 font-semibold text-white outline-none bg-blue-700 hover:bg-blue-800 ring-blue-700 focus:ring-2 rounded-lg px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Spinner class="block mx-auto" v-if="isDataLoading" />
          <span v-else>Login to your account</span>
        </button>
        <p v-if="error" class="text-red-500 text-sm text-center">{{errors[error] || 'Something went wrong'}}</p>
        <div class="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
          Not registered?
          <a href="#" class="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { Form, Field, ErrorMessage } from "vee-validate";
import errors from '@/constants/errors'
export default {
  name: "Login",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    return {
      email: "",
      password: "",
      errors,
    };
  },
  computed: {
    ...mapGetters("auth", ["user", "isDataLoading", "isLoggedIn", "error"]),
  },
  methods: {
    ...mapActions('auth', ['login']),
    async submit() {
      const response = await this.login({
        email: this.email,
        password: this.password,
      });

      if ( response !== true ) return

      this.$router.push("/");
    },
    validateEmail(value) {
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      
      if ( !value ) {
        return "Email can't be an empty string!"
      } else if (!regex.test(value)) {
        return 'This field must be a valid email';
      }

      return true
    },
    validatePassword(value) {
      if (!value) {
        return "Password can't be an empty string!";
      } else if (value.length < 6) {
        return "Password can't be shorter than 6 chars!";
      }

      return true;
    },
  },
};
</script>
