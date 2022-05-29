<template>
  <Spinner v-if="isDataLoading || !user" class="mx-auto mt-5" />
  <div v-else >
    <img 
      class="absolute invisible opacity-0 pointer-events-none" 
      :src="userPicture" 
      @error="invalidImageHandle" 
      @load="changeUserImage"
      alt=""
    />
    <Modal v-if="showModal" @close="showModal = false" @keyup.esc="showModal = false" >
      <Form @submit="setUserPicture">
        <Field name="user-image" :rules="userImageValidation" v-slot="{ field, errors }">
          <div >
            <FieldInput v-bind="field" ref="user-image-input" v-model="userPictureInput" placeholder="Image URL" class="w-96 mr-4 py-2" />
            <MainButton type="submit">submit</MainButton>
          </div>
          <span class="block w-full text-red-500 mt-1 font-semibold" >{{errors[0]}}</span>
        </Field>
      </Form>
    </Modal>
    <Form 
      @submit="saveNameChanges" 
      @invalid-submit="$refs['user-name-input'].focus()"
      class="flex items-center justify-between"
    >
      <div class="flex items-center">
        <div @click="showModal = true" class="w-28 h-28 rounded-full overflow-hidden mr-2 p-0.5 border-2 border-gray-400 cursor-pointer">
          <img 
            class="w-full h-full rounded-full object-cover" 
            :src="userPicture" 
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
            <FieldInput 
              v-bind="field" 
              ref="user-name-input" 
              class="py-1 text-lg" 
              v-model="userName" 
              :placeholder="user.displayName" 
              @keyup.esc="discardNameChanges"
            />
            <span class="text-red-500 mt-1 absolute left-0 top-full font-semibold" >{{errors[0]}}</span>
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
    <Form 
      @submit="sendEmailLink"
      @invalid-submit="$refs['user-email-input'].focus()"
      class="mt-8 mx-auto space-y-8"
    >
        <h2 class="text-2xl text-black">Reset password</h2>
        <Field name="user-email" v-slot="{ field, errors }" :rules="userEmailValidation">
          <div class="relative">
            <label for="user-email" class="block mb-2">Your email address:</label>
            <FieldInput 
              ref="user-email-input"
              v-model="userEmail" 
              v-bind="field" 
              id="user-email"
              placeholder="example@mail.com" 
              class="w-full py-2"
            /> 
            <span class="text-sm text-red-500">{{errors[0]}}</span>
          </div>
        </Field>

      <div class="flex items-center">
        <MainButton type="submit" class="mr-4">Send reset link</MainButton>
        <router-link to="/" class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg px-5 py-2.5 text-center" >Discard</router-link>
      </div>
    </Form>
  </div>
</template>
<script>
import { signOut } from "firebase/auth"
import ProfileButton from '@views/pages/Profile/components/ProfileButton.vue';
import Modal from '@views/components/common/Modal.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex';
import { Form, Field } from 'vee-validate'
import { string, required, email } from 'yup'

export default {
    name: "Profile",
    components: { 
      ProfileButton, 
      Form,
      Field,
      Modal,
    },
    data() {
      return {
        showModal: false,
        editMode: false,
        userEmail: '',
        userName: '',
        userPicture: '',
        userPictureInput: '',
        userNameValidation: string().test(
          "same-user-name",
          "User name is the same as before",
          (value) => value !== this.user.displayName
        ).
        required('User name can\'t be empty!'),
        userImageValidation: string().required('You\'ve to provide an image url!'),
        userEmailValidation: string()
          .required('Email is empty!')
          .email('Email isn\'t valid!')
          .test(
            "email-invalid",
            "You have to provide your email!",
            (value) => value === this.user.email
          )
      }
    },
    computed: {
      ...mapGetters('auth', ['user', 'isDataLoading', 'isLoggedIn']),
    },
    methods: {
      ...mapActions('toast', ['SHOW_ERROR', 'SHOW_SUCCESS']),
      ...mapActions('auth', ['updateUserName', 'updateUserImage', 'sendPasswordResetLink', 'logout']),
      sendEmailLink() {
        this.sendPasswordResetLink()
        this.logout()
        this.SHOW_SUCCESS('Check your email')
        this.$router.push('/login')
      },
      enableEditMode() {
        this.editMode = true
        setTimeout(() => {
          this.$refs['user-name-input'].focus()
        }, 0)
      },
      saveNameChanges() {
        this.editMode = false
        this.updateUserName(this.userName)
      },  
      discardNameChanges() {
        this.userName = this.user.displayName
        this.editMode = false
      },
      setUserPicture() {
        this.userPicture = this.userPictureInput
        this.userPictureInput = ''
        this.showModal = false
      },
      changeUserImage() {
        if ( this.userPicture !== this.user.photoURL ) {
          this.updateUserImage(this.userPicture)
        }
      },
      invalidImageHandle() {
        this.userPicture = this.user.photoURL
        this.SHOW_ERROR('You\'ve provided invalid image url!')
      },
      signOut,
    },
    watch: {
      user(value) {
        if ( !this.isLoggedIn || !value.displayName ) return
        this.userName = value.displayName
        this.userPicture = value.photoURL
      },
      showModal(value) {
        if ( value ) {
          setTimeout(() => {
            this.$refs['user-image-input'].focus()
          }, 0)
        }
      }
    },
    created() {
      if ( !this.isLoggedIn ) return
      this.userName = this.user.displayName
      this.userPicture = this.user.photoURL
    }
}
</script>