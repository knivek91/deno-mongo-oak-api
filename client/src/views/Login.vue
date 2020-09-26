<template>
    <v-layout justify-center>
        <v-flex xs5>
            <v-toolbar color="pink">
                <v-toolbar-title class="white--text">
                    Sign In using credentials
                </v-toolbar-title>
            </v-toolbar>
            <v-card>
                <v-form
                    v-model="valid"
                    ref="form"
                    lazy-validation
                    
                >
                    <v-container>
                        <!-- <v-alert
                            outline
                            color="error"
                            icon="warning"
                            :value="errorSummary"
                            >{{ errorSummary }}</v-alert
                        > -->
                        <v-layout column>
                            <v-text-field
                                label="Email"
                                v-model="userName"
                                required
                                
                            ></v-text-field>

                            <v-text-field
                                label="Password"
                                v-model="password"
                                type="password"
                                required
                            ></v-text-field>

                            <v-checkbox
                                label="Remember Me"
                                v-model="rememberMe"
                            ></v-checkbox>
                        </v-layout>
                    </v-container>
                </v-form>
                <v-card-actions>
                    <v-flex offset-xs2 mb-2>
                        <v-btn
                            flat
                            href="/vuetify/register"
                            
                            >Register New User</v-btn
                        >
                        <v-btn
                            color="primary"
                            @click="submit"
                            
                            >Sign In</v-btn
                        >
                    </v-flex>
                </v-card-actions>
            </v-card>
            <v-flex>
                <v-toolbar>
                    <v-toolbar-title>
                        Quick Login
                    </v-toolbar-title>
                </v-toolbar>
                <v-card>
                    <v-layout>
                        <v-flex>
                            <v-btn  flat
                                >admin@email.com</v-btn
                            >
                        </v-flex>
                        <v-flex>
                            <v-btn  flat
                                >new@user.com</v-btn
                            >
                        </v-flex>
                    </v-layout>
                </v-card>
            </v-flex>

            <div class="src">
                <h4>Source Code and References</h4>
                <div>
                    <a
                        href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/vuetify/_layout.html"
                        class="ref"
                        >/vuetify/_layout.html</a
                    >
                </div>
                <div>
                    <a
                        href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/vuetify/login.html"
                        class="ref"
                        >/vuetify/login.html</a
                    >
                </div>
                <div>
                    <a
                        href="https://github.com/NetCoreApps/Validation/blob/master/world/wwwroot/vuetify/login.ts"
                        class="ref"
                        >/vuetify/login.ts</a
                    >
                </div>
            </div>
        </v-flex>
    </v-layout>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";

import { sleep } from "../utils";
import { over } from "ramda";

@Component({
    name: "Login",
    mixins: [validationMixin]
})
export default class Login extends Vue {
    validations() {
        return {
            login: {
                username: {
                    required
                },
                password: {
                    required
                }
            }
        };
    }
    login = {
        username: "",
        password: ""
    };
    overlay = false;

    get usernameErrors(): string[] {
        const errors: string[] = [];
        const { username } = this.$v.login;
        if (username && !username.$dirty) return errors;
        username && !username.required && errors.push("Username is required.");
        return errors;
    }

    get passwordErrors(): string[] {
        const errors: string[] = [];
        const { password } = this.$v.login;
        if (password && !password.$dirty) return errors;
        password && !password.required && errors.push("Password is required.");
        return errors;
    }

    async submit() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
            this.overlay = true;
            await sleep(3000);
            this.overlay = false;
            this.$router.push({ name: "admin" });
        }
    }
}
</script>
