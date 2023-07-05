<script>
import router from '../../router';
import { onMounted } from 'vue';
import { Auth } from '../../stores/auth';




export default {
    components: {
    },

    data() {
        onMounted(() => {
            if (this.logged())
                this.$refs.getAds.click()
            else
                router.push('/')
        })
        return {
            auth: Auth()
        }
    },
    methods: {
        logged() {
            if (this.auth.role == 'Admin')
                return true
            else
                return false
        },
        getAds() {
            this.auth.getUserAds()
            router.push('/admin/ads')
        },
        users() {
            router.push('/admin/users')
        },
        setup() {

        },
    }
}

</script>


<template>
        
   
        <div class="container position-fixed end-0 mt-5" style="width: 20%;">
            <div class="container-fluid">
                <div class="row">
                    <button class="btn" @click="getAds()" ref="getAds">
                        <h5>Anuncios</h5>
                    </button>
                </div>
                <div class="row">
                    <button class="btn" @click="users()">
                        <h5>Usuarios</h5>
                    </button>
                </div>
            </div>
       

    </div>
</template>