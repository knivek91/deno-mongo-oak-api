<template>
    <v-app id="inspire">
        <v-navigation-drawer v-model="drawer" app>
            <v-list dense>
                <router-link
                    :to="mi.to"
                    v-for="(mi, idx) in menuItems"
                    :key="idx"
                >
                    <v-list-item link>
                        <v-list-item-action>
                            <v-icon>{{ mi.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title>{{ mi.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </router-link>
            </v-list>
        </v-navigation-drawer>

        <v-app-bar app color="indigo" dark>
            <v-app-bar-nav-icon
                @click.stop="drawer = !drawer"
            ></v-app-bar-nav-icon>
            <v-toolbar-title>Vue + Vuetify</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <v-container class="fill-height" fluid>
                <v-row align="center" justify="center">
                    <v-col class="text-center">
                        <router-view></router-view>
                    </v-col>
                </v-row>
            </v-container>
        </v-main>
    </v-app>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { TMenuItem } from "./types";

@Component
export default class Admin extends Vue {
    drawer = null;

    menuItems: TMenuItem[] = [
        {
            to: { name: "auth" },
            icon: "mdi-account-lock-outline",
            name: "Login"
        },
        {
            to: { name: "admin" },
            icon: "mdi-view-list",
            name: "Start Wars List"
        },
        {
            to: { name: "form" },
            icon: "mdi-account-circle",
            name: "Register"
        }
    ];
}
</script>

<style lang="scss" scoped>
a {
    text-decoration: none;
}
a:visited {
    color: #000;
}
</style>
