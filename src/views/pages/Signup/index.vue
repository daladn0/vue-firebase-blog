<template>
  <div class="max-w-lg w-full">
    <div
      class="bg-white shadow-md border border-gray-200 rounded-lg w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <Form
        @submit="submit"
        @invalid-submit="onInvalidSubmit"
        class="space-y-8"
        :validation-schema="validationSchema"
      >
        <h3 class="text-2xl text-center font-medium text-gray-900 dark:text-white">
          Sign up
        </h3>
        <Field
          v-for="({ name, label, placeholder, type = 'text' }, i) in fields"
          :key="name"
          :name="name"
          v-slot="{ field, errors, handleChange, meta }"
        >
          <div>
            <label
              :for="name"
              class="text-sm text-gray-900 font-medium block mb-2 dark:text-gray-300"
            >
              {{ label }}
            </label>
            <input
              :ref="name"
              v-bind="field"
              v-model="fields[i]['model']"
              :type="type"
              @input="handleChange($event, meta.touched)"
              :placeholder="placeholder"
              class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              :class="[validationClasses(errors[0], meta.touched)]"
            />
            <span class="text-red-500 text-sm" v-if="errors[0] && meta.touched">{{errors[0]}}</span>
          </div>
        </Field>

        <button
          type="submit"
          class="w-full h-12 font-semibold text-white outline-none bg-blue-700 hover:bg-blue-800 ring-blue-700 focus:ring-2 rounded-lg px-5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <Spinner class="block mx-auto" v-if="isDataLoading" />
          <span v-else>Login to your account</span>
        </button>
        <p v-if="error" class="text-red-500 text-sm text-center">
          {{ errors[error] || "Something went wrong" }}
        </p>
        <div class="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
          Already have an account?
          <router-link
            to="/login"
            class="text-blue-700 hover:underline dark:text-blue-500"
          >
            Sign in
          </router-link>
        </div>
      </Form>
    </div>
  </div>
</template>

<script>
import { markRaw } from "vue";
import { mapActions, mapGetters } from "vuex";
import { Form, Field, ErrorMessage, configure } from "vee-validate";
import { string, required, password, object, oneOf, ref } from "yup";
import errors from "@/constants/errors";

configure({
  validateOnModelUpdate: false,
  validateOnInput: false,
});

export default {
  name: "Login",

  components: {
    Form,
    Field,
    ErrorMessage,
  },
  data() {
    const passwordMinLength = 6;
    return {
      name: "",
      email: "",
      password: "",
      errors,
      validationSchema: markRaw(
        object({
          name: string().required("Name can't be empty!"),
          email: string().required("Email can't be empty!").email("Not valid email!"),
          password: string()
            .required("Password can't be empty")
            .min(
              passwordMinLength,
              `Yup can't be shorter than ${passwordMinLength} chars!`
            ),
          passwordConfirm: string()
            .required("Password can't be empty")
            .oneOf([ref("password"), null], "Passwords must match!"),
        })
      ),
      fields: [
        {
          name: "name",
          type: "text",
          label: "Your name",
          placeholder: "John Doe",
          model: "",
        },
        {
          name: "email",
          type: "email",
          label: "Your email",
          placeholder: "example@mail.com",
          model: "",
        },
        {
          name: "password",
          type: "password",
          label: "Your password",
          placeholder: "●●●●●●",
          model: "",
        },
        {
          name: "passwordConfirm",
          type: "password",
          label: "Confirm password",
          placeholder: "●●●●●●",
          model: "",
        },
      ],
    };
  },
  computed: {
    ...mapGetters("auth", ["user", "isDataLoading", "isLoggedIn", "error"]),
    validationClasses() {
      return (error, touched) => {
        return error && touched
          ? "ring-red-500 border-red-500 focus:ring-red-500 focus:border-red-500"
          : !error && touched
          ? "ring-green-500 border-green-500 focus:ring-green-600 focus:border-green-600"
          : "focus:ring-blue-500 focus:border-blue-500";
      };
    },
  },
  methods: {
    ...mapActions("auth", ["signup"]),
    async submit(e) {
      this.name = this.fields[0].model
      this.email = this.fields[1].model
      this.password = this.fields[2].model

      const response = await this.signup({
        name: this.name,
        email: this.email,
        password: this.password,
      });

      if (response !== true) return;

      this.$router.push("/");
    },

    onInvalidSubmit({ results }) {
      const invalidFields = [];

      // Setting proper order for inputs
      this.fields.forEach(({ name }) => {
        invalidFields.push({ ...results[name], name });
      });

      // Focusing the very first invalid input
      invalidFields.every(({ name, valid }) => {
        if (!valid) {
          this.$refs[name][0].focus();
          return false;
        }

        return true;
      });
    },
  },
};
</script>
