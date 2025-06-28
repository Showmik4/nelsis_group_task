<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card shadow-sm p-4" style="width: 100%; max-width: 400px;">
      <div class="text-center mb-4">
        <h3 class="fw-bold">Create an Account</h3>
        <p class="text-muted">Register to get started</p>
      </div>

      <form @submit.prevent="handleRegister">
        <div class="mb-3">
          <label class="form-label">Name</label>
          <input v-model="form.name" type="text" class="form-control" placeholder="Enter your name" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input v-model="form.email" type="email" class="form-control" placeholder="Enter your email" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input v-model="form.password" type="password" class="form-control" placeholder="Create a password" required />
        </div>

        <div class="mb-3">
          <label class="form-label">Confirm Password</label>
          <input v-model="form.password_confirmation" type="password" class="form-control" placeholder="Confirm your password" required />
        </div>

        <button type="submit" class="btn btn-primary w-100">Register</button>
      </form>

      <div v-if="error" class="alert alert-danger mt-3 text-center">
        {{ error }}
      </div>
      <div class="text-center">
        <span class="text-muted">Back to login?</span>
        <router-link to="/login" class="ms-1 text-decoration-none">Login</router-link>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      error: null,
    };
  },
  methods: {
    async handleRegister() {
      this.error = null;
      try {
        const response = await axios.post('/api/auth/register', this.form);
        const token = response.data.access_token;      
        localStorage.setItem('token', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;       
        this.$router.push('/login'); 
      } catch (err) {
        if (err.response && err.response.data) {
          this.error = err.response.data.message || 'Registration failed';
        } else {
          this.error = 'Something went wrong';
        }
      }
    }
  }
};
</script>
