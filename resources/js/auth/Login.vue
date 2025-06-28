<template>
  <div class="min-vh-100 d-flex align-items-center justify-content-center bg-light">
    <div class="card p-4 shadow-sm" style="width: 100%; max-width: 400px;">
      <div class="text-center mb-4">
        <h3 class="fw-bold">Welcome Back 👋</h3>
        <p class="text-muted">Please login to your account</p>
      </div>
      <form @submit.prevent="login">
        <div class="mb-3">
          <label class="form-label">Email</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-envelope"></i>
            </span>
            <input
              type="email"
              v-model="email"
              class="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
            <div v-if="errors.email" class="text-danger mt-1">
            {{ errors.email[0] }}
          </div>
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-lock"></i>
            </span>
            <input
              type="password"
              v-model="password"
              class="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
            <div v-if="errors.password" class="text-danger mt-1">
            {{ errors.password[0] }}
          </div>
        </div>

        <div class="d-grid">
          <button class="btn btn-primary" type="submit">
            <i class="bi bi-box-arrow-in-right me-1"></i> Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: '',
      errors: {},
    }
  },
  methods: {
  async login() {
    try {
      this.errors = {};
      const res = await axios.post('http://localhost:8000/api/auth/login', {
        email: this.email,
        password: this.password
      });

      const token = res.data.access_token;
     
      localStorage.setItem('token', token);
     
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;   
     
      this.$router.push({ name: 'List' });

    } catch (err) {
      if (err.response && err.response.status === 401) {
        alert('Invalid email or password');
      } else {
        alert('Login failed. Please try again.');
        console.error(err);
      }
    }
  }
  }
}
</script>
