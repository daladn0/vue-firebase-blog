<template>
  <div class="max-w-lg w-full">
    <div
      class="bg-white shadow-md border border-gray-200 rounded-lg w-full p-4 sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700"
    >
      <form class="space-y-6">
        <h3 class="text-2xl text-center font-medium text-gray-900 dark:text-white">
          Sign in
        </h3>
        <div>
          <label
            for="email"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >Your email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border outline-none focus:ring-2  text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white border-red-500"
            placeholder="example@gmail.com"
          />
            <span class="text-red-500 text-sm">Email is not vaild</span>
        </div>
        <div>
          <label
            for="password"
            class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300"
            >Your password</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            class="bg-gray-50 border outline-none focus:ring-2 border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
          />
        </div>
        <button
          type="submit"
          class="w-full text-white outline-none bg-blue-700 hover:bg-blue-800 ring-blue-700 focus:ring-2 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Login to your account
        </button>
        <div class="text-sm text-center font-medium text-gray-500 dark:text-gray-300">
          Not registered?
          <a href="#" class="text-blue-700 hover:underline dark:text-blue-500"
            >Create account</a
          >
        </div>
      </form>
    </div>
  </div>
</template>
