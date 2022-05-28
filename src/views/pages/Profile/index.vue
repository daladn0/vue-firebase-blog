<template>
  <Spinner v-if="isDataLoading" class="mx-auto mt-5" />
  <div v-else >
    <Form 
      @submit="saveNameChanges" 
      @invalid-submit="$refs['user-name-input'].focus()"
      class="flex items-center justify-between"
    >
      <div class="flex items-center">
        <div class="w-28 h-28 rounded-full overflow-hidden mr-2 p-0.5 border-2 border-gray-400">
          <img 
            class="w-full h-full rounded-full object-cover" 
            :src="userPicture " 
            alt=""
          >
        </div>
        <Field 
          v-if="editMode" 
          name="user-name" 
          :rules="userNameValidation" 
          v-slot="{field, errors}"
        >
          <div class="relative">
            <FieldInput v-bind="field" :value="userName" ref="user-name-input" class="py-1 text-lg" v-model="userName" />
            <span class="text-red-500 mt-1 absolute left-0 top-full" >{{errors[0]}}</span>
          </div>
        </Field>
        <p v-if="!editMode" class="text-lg text-gray-800 font-semibold ml-2">{{userName}}</p>
      </div>
      <div class="flex items-center">
        <ProfileButton type="button" v-if="!editMode" icon="pen" @click="enableEditMode" />
        <template v-else>
          <ProfileButton type="submit" icon="tick"/>
          <ProfileButton type="button" icon="close" class="ml-2" @click="discardNameChanges" />
        </template>
      </div>
    </Form>
  </div>
</template>
<script>
import ProfileButton from '@views/pages/Profile/components/ProfileButton.vue';
import { mapGetters } from 'vuex';
import { Form, Field } from 'vee-validate'
import { string, required } from 'yup'

export default {
    name: "Profile",
    components: { 
      ProfileButton, 
      Form,
      Field,
    },
    data() {
      return {
        editMode: false,
        userName: '',
        userPicture: '',
        userNameValidation: string().required('User name can\'t be empty!'),
      }
    },
    computed: {
      ...mapGetters('auth', ['user', 'isDataLoading', 'isLoggedIn']),
    },
    methods: {
      enableEditMode() {
        this.editMode = true
        setTimeout(() => {
          this.$refs['user-name-input'].focus()
        }, 0)
      },
      saveNameChanges() {
        this.editMode = false
      },  
      discardNameChanges() {
        this.userName = this.user.displayName
        this.editMode = false
      }
    },
    watch: {
      user(value) {
        if ( !this.isLoggedIn || !value.displayName ) return
        this.userName = value.displayName
        this.userPicture = value.photoURL
      }
    },
    created() {
      if ( !this.isLoggedIn ) return
      this.userName = this.user.displayName
      this.userPicture = this.user.photoURL
    }
}
</script>