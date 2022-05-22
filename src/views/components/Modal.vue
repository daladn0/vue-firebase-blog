<template>
    <div @click.self="$emit('close')" class="flex items-center justify-center fixed inset-0 w-full h-full z-20 bg-black bg-opacity-70"> <!-- wrapper -->

        <div class="max-w-2xl rounded-lg bg-white p-4"> <!-- content -->
            <slot/>
        </div>

        <!-- close btn -->
        <button type="button" @click="$emit('close')" class="flex items-center justify-center absolute top-4 right-4 w-12 h-12 rounded bg-black bg-opacity-0 duration-100 transition-all hover:bg-opacity-60">
            <svg class="w-8 h-8 text-white">
                <use xlink:href='sprite.svg#close' />
            </svg>
        </button>

    </div>
</template>