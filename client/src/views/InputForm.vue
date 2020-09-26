<template>
    <v-text-field
        v-model="username"
        :error-messages="usernameErrors"
        label="Username"
        required
        @input="$v.username.$touch()"
        @blur="$v.username.$touch()"
    ></v-text-field
></template>
<script lang="ts">

</script>
