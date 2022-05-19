<template>
  <div
    class="w-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
  >
    <div class="flex justify-between items-center px-4 py-2"> <!-- header -->
      <div class="flex items-center">
        <div class="w-8 h-8 rounded-full overflow-hidden mr-4">
          <img class="w-full h-full object-cover" src="https://vrgsoft.net/wp-content/uploads/2019/01/20170301155447.jpg" alt="">
        </div>
        <p class="text-gray-800">Mark Kostevych</p>
      </div>

      <button class="w-8 h-8 transition-all rounded-full flex items-center justify-center hover:bg-gray-100">
        <svg class="w-5 h-5 text-gray-700">
          <use xlink:href="sprite.svg#dots" />
        </svg>
      </button>
    </div>

    <router-link to="/"> <!-- image -->
      <img class="w-full" src="https://vrgsoft.net/wp-content/uploads/2019/01/20170301155447.jpg" alt="" />
    </router-link>

    <div class="p-5"> <!-- content -->
      <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
      </a>
      <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
        chronological order.
      </p>
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="block w-fit text-blue-600 rounded-lg px-2 py-1 transition-all hover:bg-blue-100"
        >
          Read more
        </router-link>
        <div class="flex items-center text-gray-500">
          <p>Web Development</p>
          <div class="w-1 h-1 mx-2 rounded-full bg-gray-400"/>
          <p>18.05.2022 22:01</p>
        </div>
      </div>
    </div>
  </div>
</template>
