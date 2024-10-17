<template>
    <v-container class="fill-height" fluid>
        <h1>Login Page</h1>
        <v-row align="center" justify="center">
            <v-col cols="12" md="4">
                <v-card class="elevation-12">
                    <v-card-title class="headline">Login</v-card-title>

                    <v-card-text>
                        <v-form ref="loginForm" v-model="valid" lazy-validation>
                            <v-text-field v-model="username" label="email" prepend-icon="mdi-account"
                                required></v-text-field>
                            <v-text-field v-model="password" label="Password" prepend-icon="mdi-lock"
                                :type="showPassword ? 'text' : 'password'"
                                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                                @click:append="showPassword = !showPassword" required></v-text-field>
                        </v-form>
                    </v-card-text>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" @click="login">Login</v-btn>
                        <v-btn color="secondary" @click="register">Register</v-btn>
                        <!-- <v-btn color="red" @click="admin">admin</v-btn> -->
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import Swal from "sweetalert2";
export default {
    data() {
        return {
            username: '',
            password: '',
            showPassword: false,
            valid: false,
        };
    },
    methods: {
        async login() {
            if (!this.username || !this.password) {
                this.$swal.fire({
            icon: 'error',
            title: 'เกิดข้อผิดพลาด',
            text: 'กรุณากรอก username password',
          });
                return;
            }

            try {
                const response = await this.$axios.$post('/login', {
                    email: this.username,
                    password: this.password,
                });
                this.$swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'loginเรียบร้อยแล้ว!',
          });
                const token = response.token;
                localStorage.setItem('token', token);
                // const id = response.data.id;
                // localStorage.setItem('Id', id);
                console.log(response);
                this.$store.commit('auth/login');
                this.$router.push('/manageSystem/doc1');
            } catch (error) {
                console.error(error.message);
                this.$swal.fire({
                    icon: "error",
                    title: "Error occurred",
                    text: "Something went wrong!",
                });
            }
        },

        register() {
            this.$router.push('/register');
        },
    },
};
</script>

<style scoped>
.v-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f5f5f5;
}

h1 {
    display: flex;
    align-content: center;
    justify-content: center;
    padding-left: 40%;
}
</style>