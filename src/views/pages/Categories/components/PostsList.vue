<template>
    <table class="table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-100 border-b-2"
        >
          <tr>
            <th class="w-3/12 px-6 py-3">Title</th>
            <th class="w-2/12 px-6 py-3">Image</th>
            <th class="w-3/12 px-6 py-3">Category</th>
            <th class="w-3/12 px-6 py-3">Date</th>
            <th class="w-20 px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="i in 50" :key="i" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th
              class="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
            >
                <p class="block truncate">Lorem ipsum dolor set</p>
            </th>
            <td class="px-6 py-4">
              <div class="w-full max-w-100px">
                <img src="https://navsurf.com/wp-content/uploads/2019/09/webdev.jpg" alt="" />
              </div>
            </td>
            <td class="px-6 py-4">Web development</td>
            <td class="px-6 py-4">22.05.2022 17:26</td>
            <td class="px-6 py-4 text-right">
              <router-link
                to="/"
                class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >
                Open
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
</template>