<template>
  <div class="container ">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <div class="card shadow-sm p-4">
          <h3 class="mb-4">Login</h3>
          <form @submit.prevent="login">
            <div class="mb-3">
              <label class="form-label">Email</label>
              <input type="email" v-model="email" class="form-control" required />
            </div>
            <div class="mb-3">
              <label class="form-label">Password</label>
              <input type="password" v-model="password" class="form-control" required />
            </div>
            <button class="btn btn-primary w-100">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:8000/api/auth/login', {
          email: this.email,
          password: this.password
        })

        localStorage.setItem('token', res.data.access_token)
        this.$router.push({ name: 'List' }) 
      } catch (err) {
        alert('Invalid email or password')
      }
    }
  }
}
</script>
