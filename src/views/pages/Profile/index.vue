<template>
  <Spinner v-if="isDataLoading" class="mx-auto mt-5" />
  <div v-else >
    <img class="absolute invisible opacity-0 pointer-events-none" :src="userPicture" @error="invalidImageHandle" alt="" />
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
        <div @click="showModal = true" class="w-28 h-28 rounded-full overflow-hidden mr-2 p-0.5 border-2 border-gray-400">
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
            <FieldInput v-bind="field" :value="userName" ref="user-name-input" class="py-1 text-lg" v-model="userName" @keyup.esc="discardNameChanges" />
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
  </div>
</template>
<script>
import ProfileButton from '@views/pages/Profile/components/ProfileButton.vue';
import Modal from '@views/components/common/Modal.vue'
import { mapGetters, mapActions } from 'vuex';
import { Form, Field } from 'vee-validate'
import { string, required } from 'yup'

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
        editMode: false,
        userName: '',
        userPicture: '',
        userPictureInput: '',
        userNameValidation: string().required('User name can\'t be empty!'),
        userImageValidation: string().matches(
            /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
            'Enter correct url!'
        ).required('You\'ve to provide an image url!'),
        showModal: false,
      }
    },
    computed: {
      ...mapGetters('auth', ['user', 'isDataLoading', 'isLoggedIn']),
    },
    methods: {
      ...mapActions('toast', ['SHOW_ERROR']),
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
      },
      setUserPicture() {
        this.userPicture = this.userPictureInput
        this.userPictureInput = ''
        this.showModal = false
      },
      invalidImageHandle() {
        this.userPicture = this.user.photoURL
        this.SHOW_ERROR('You\'ve provided invalid image url!')
      }
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