<template>
  	<div class="limiter">
		<div class="container-login100">
            

			<div class="wrap-login100">
                
				<div class="login100-pic js-tilt" data-tilt>
					<img src="../assets/images/img-01.png" alt="IMG">
				</div>
				<form class="login100-form validate-form" @submit.prevent="login">
                
					<span class="login100-form-title">
                        <h4>HOSTEL MANAGEMENT</h4>
                        <br />
						Admin Login
					</span>
                    <div class="alert alert-danger" v-if="wrongCredentials">
                        {{ wrongCredentials }}
                    </div>
					<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
						<input class="input100" type="text" name="email" @keyup="emailError = ''" placeholder="Email" v-model="email">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-envelope" aria-hidden="true"></i>
						</span>
                        <span v-if="emailError" style="color:red">{{ emailError }}</span>
					</div>

					<div class="wrap-input100 validate-input" data-validate = "Password is required">
						<input class="input100" type="password" name="pass" @keyup="passwordError = ''" placeholder="Password" v-model="password">
						<span class="focus-input100"></span>
						<span class="symbol-input100">
							<i class="fa fa-lock" aria-hidden="true"></i>
						</span>
                        <span v-if="passwordError" style="color:red"> {{ passwordError }}</span>
					</div>
					
					<div class="container-login100-form-btn">
						<button class="login100-form-btn" type="submit">
                            <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
							Login
						</button>
					</div>

					<div class="text-center p-t-12">
						<span class="txt1">
							<!-- Forgot -->
						</span>
						<a class="txt2" href="#">
							<!-- Username / Password? -->
						</a>
					</div>

					<div class="text-center p-t-136">
						<a class="txt2" href="#">
							
							<i class="fa fa-long-arrow-right m-l-5" aria-hidden="true"></i>
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: '',
            password: '',

            emailError: '',
            passwordError: '',

            wrongCredentials: '',
            loading: false
        }
    },

    methods: {
        login() {
        
            if (!this.email && !this.password) {
                this.emailError = "Email field is required!";
                this.passwordError = "Password field is required!";
                return;
            } else if (!this.email) {
                this.emailError = "Email field is required!";
                return;
            }
            else if (!this.password) {
                this.passwordError = "Password field is required!";
                return;
            } else {
                this.emailError = '';
                this.passwordError = ''
                this.loading = true;
                axios.post('https://uenr-hostel-management-api.herokuapp.com/api/admin/login', {
                    email: this.email,
                    password: this.password
                })
                     .then(response => {
                         localStorage.token = response.data.bearer_token
                         this.$router.push('/dashboard');
                     }).catch(err => {
                         this.wrongCredentials = err.response.data.message;
                         this.loading = false;
                     });

            }
        }
    },
    mounted() {
        if (localStorage.token) {
            this.$router.push('/students');
        }
    }
}
</script>

<style>

</style>