<template>
    <form @submit.prevent="submit" novalidate>
        <v-text-field
            v-model="username"
            :error-messages="usernameErrors"
            label="Username"
            required
            @input="$v.username.$touch()"
            @blur="$v.username.$touch()"
        ></v-text-field>
        <v-select
            v-model="role"
            :items="roles"
            :error-messages="roleErrors"
            label="Roles"
            required
            @change="$v.role.$touch()"
            @blur="$v.role.$touch()"
        ></v-select>
        <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="E-mail"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
        ></v-text-field>
        <v-text-field
            type="password"
            v-model="password"
            :error-messages="passwordErrors"
            label="Password"
            required
            @input="$v.password.$touch()"
            @blur="$v.password.$touch()"
        ></v-text-field>
        <v-text-field
            type="password"
            v-model="confirmPassword"
            :error-messages="confirmPasswordErrors"
            label="Confirm Password"
            required
            @input="$v.confirmPassword.$touch()"
            @blur="$v.confirmPassword.$touch()"
        ></v-text-field>
        <v-checkbox
            v-model="terms"
            :error-messages="termsErrors"
            label="Do you accept the terms & conditions?"
            required
            @change="$v.terms.$touch()"
            @blur="$v.terms.$touch()"
        ></v-checkbox>
        <v-btn class="mr-4" type="submit">Submit</v-btn>
        <v-btn @click="clear">clear</v-btn>
    </form>
</template>

<script lang="ts">
import { Vue, Component, Model } from "vue-property-decorator";
import { validationMixin } from "vuelidate";
import {
    required,
    maxLength,
    minLength,
    email,
    sameAs
} from "vuelidate/lib/validators";
import { isEmpty, toLower, forEachObjIndexed, flatten } from "ramda";
import { sleep } from "../utils";

@Component({
    mixins: [validationMixin]
})
export default class Form extends Vue {
    validations() {
        return {
            username: {
                required,
                maxLength: maxLength(20),
                minLength: maxLength(5),
                async isUnique(value: string) {
                    if (isEmpty(value)) return true;
                    await sleep(1000);
                    return toLower(value) !== "admin";
                }
            },
            password: {
                required,
                minLength: minLength(6)
            },
            confirmPassword: {
                required,
                sameAsPassword: sameAs("password")
            },
            email: { required, email },
            role: { required },
            terms: {
                checked(val: boolean) {
                    return val;
                }
            }
        };
    }

    // data
    username = "";
    password = "";
    confirmPassword = "";
    email = "";
    role = null;
    roles = [
        { text: "Admin", value: "admin" },
        { text: "Normal", value: "normal" },
        { text: "Read Only", value: "read-only" }
    ];
    terms = false;

    //computed
    get termsErrors(): string[] {
        const errors: string[] = [];
        if (!this.$v.terms.$dirty) return errors;
        !this.$v.terms.checked && errors.push("You must agree to continue!");
        return errors;
    }

    get roleErrors(): string[] {
        const errors: string[] = [];
        if (!this.$v.role.$dirty) return errors;
        !this.$v.role.required && errors.push("Item is required.");
        return errors;
    }
    get usernameErrors(): string[] | null {
        const errors: string[] = [];
        // used $pending to wait the async validation for isUniq ;)
        if (!this.$v.username.$dirty || this.$v.username.$pending)
            return errors;
        !this.$v.username.maxLength &&
            errors.push("Username must be at most 10 characters long.");
        !this.$v.username.required && errors.push("Username is required.");
        !this.$v.username.isUnique && errors.push("Username already exists.");
        return errors;
    }

    get emailErrors(): string[] {
        const errors: string[] = [];
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.email && errors.push("Must be valid e-mail.");
        !this.$v.email.required && errors.push("E-mail is required.");
        return errors;
    }

    get passwordErrors(): string[] {
        const errors: string[] = [];
        if (!this.$v.password.$dirty) return errors;
        !this.$v.password.minLength &&
            errors.push("Password need at leats 6 characters.");
        !this.$v.password.required && errors.push("Password is required.");
        return errors;
    }

    get confirmPasswordErrors(): string[] {
        const errors: string[] = [];
        if (!this.$v.confirmPassword.$dirty) return errors;
        !this.$v.confirmPassword.sameAsPassword &&
            errors.push("Passwords does not match.");
        !this.$v.confirmPassword.required &&
            errors.push("Confirma password is required.");
        return errors;
    }

    get formValues(): object {
        return {
            username: this.username,
            password: this.password,
            confirmPassword: this.confirmPassword,
            email: this.email,
            role: this.role,
            terms: this.terms
        };
    }

    // methods
    submit() {
        this.$v.$touch();
        if (this.$v.$invalid) {
            console.log("submit with errors");
            return;
        }
        console.log(this.formValues);
    }
    clear() {
        this.$v.$reset();
        this.username = "";
        this.password = "";
        this.confirmPassword = "";
        this.email = "";
        this.role = null;
        this.terms = false;
    }
}
</script>
