<template>
  <div class="rounded bg-white shadowmax-w-250px text-gray-500">
    <div class="flex items-center transition-all group hover:bg-gray-100 p-2"> <!--header-->
      <div class="w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
        <img
          class="w-full h-full object-cover"
          src="https://lwlies.com/wp-content/uploads/2017/04/avatar-2009.jpg"
          alt=""
        />
      </div>
      <div class="text-left max-w-3/4 leading-tight">
        <p class="text-gray-800 font-semibold whitespace-nowrap block truncate">
          Mark Kostevych
        </p>
        <p class="text-gray-500 truncate block">markkostevycg@gmail.com</p>
      </div>

      <div class="w-5 h-5 bg-white rounded-tl absolute top-0 right-3.5 tranfrom rotate-45 -translate-y-1/2 -translate-x-px transition-all group-hover:bg-gray-100" /> <!-- pointer -->
    </div>

    <div class="w-full h-px bg-gray-200" />

    <button type="button" class="w-full text-left transition-all hover:bg-gray-100 p-2">
      Profile
    </button>
    <button type="button" class="w-full text-left transition-all hover:bg-gray-100 p-2">
      Create Post
    </button>

    <div class="w-full h-px bg-gray-200" />

    <button type="button" class="w-full text-left transition-all hover:bg-gray-100 p-2">
      Sign out
    </button>
  </div>
</template>
<script>
export default {
  name: "Dropdown",
};
</script>
