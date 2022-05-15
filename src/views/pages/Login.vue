<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <h1 class="font-bold text-2xl">Login</h1>
    <form class="flex flex-col bg-white rounded shadow-lg p-12 mt-12" action="">
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
        />
        <span class="block mt-3 text-red-500 text-xs font-semibold">
          Email is required!
        </span>
        <span class="block mt-3 text-red-500 text-xs font-semibold">
          Invalid emails is provided!
        </span>
      </div>
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
        />
        <span class="block mt-3 text-red-500 text-xs font-semibold">
          Password is required!
        </span>

        <span class="block mt-3 text-red-500 text-xs font-semibold">
          Password shouldn't be shorter than 6 chars!
        </span>
      </div>
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
      >
        Login
      </button>
      <div class="flex mt-6 justify-center text-xs">
        <a class="text-blue-400 hover:text-blue-500" href="#"
          >Forgot Password</a
        >
        <span class="mx-2 text-gray-300">/</span>
        <a class="text-blue-400 hover:text-blue-500" href="#">Sign Up</a>
      </div>
    </form>
  </div>
</template>
<script>
export default {
  name: "LoginPage",
};
</script>