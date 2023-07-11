<script setup>
import { computed, watch } from 'vue';
import { Ads } from '../../../stores/ads'
import Categories from '../../menus/Categories.vue';
import ShowUserAds from './ShowUserAds/UserAds.vue'
import AdminNav from '../../menus/AdminNav.vue';
import Headerr from '../../header/Header.vue';
import SideMenuVue from '../../menus/SideMenu.vue';

const ads = Ads()

function isEmpty(){
    if(ads.userAnuncios)
        return true
    else
        return false
}
</script>

<template>
    <SideMenuVue/>
    <div class="container">
        <div class="row">
            <Headerr :home="'/admin'" />
        </div>
        <div class="row">
            <div class="col-9">
                <div class="overflow-auto">
                    <div v-if="ads.categoryAdsButton">
                        <ShowUserAds :anuncios="ads.categoryAds" :empty="ads.categoryEmpty"/>
                    </div>
                    <div v-else>
                        <ShowUserAds :anuncios="ads.userAnuncios" :empty="isEmpty()"/>
                    </div>
                </div>
            </div>
            <div class="col-3">
                <div class="mb-4">
                    <AdminNav />
                </div>
                <div class="mt=4">
                    <Categories :In="'/admin/category/'" :Out="'/admin'" :user="true" />
                </div>
            </div>
        </div>
    </div>
</template>