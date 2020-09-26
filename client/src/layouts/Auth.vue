<template>
    <router-view></router-view>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
    name: "AuthTemplate"
})
export default class AuthTemplate extends Vue {}
</script>
