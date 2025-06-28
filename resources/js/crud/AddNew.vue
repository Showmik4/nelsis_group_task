<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Add New Product</h5>
            <button class="btn btn-secondary btn-sm" @click="goToList">Back to List</button>
          </div>
          <div class="card-body">
            <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
            {{ successMessage }}
            <button type="button" class="btn-close" @click="successMessage = ''" aria-label="Close"></button>
            </div>

            <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
              {{ errorMessage }}
              <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
            </div>

            <form @submit.prevent="handleSubmit">
              <div class="mb-3">
                <label for="productName" class="form-label">Product Name</label>
                <input 
                  type="text"
                  class="form-control"
                  id="productName"
                  v-model="form.name"
                  placeholder="Enter product name"
                />
                <small v-if="errors.name" class="text-danger">{{ errors.name[0] }}</small>
              </div>

              <div class="mb-3">
                <label for="productPrice" class="form-label">Price</label>
                <input
                  type="text"
                  class="form-control"
                  id="productPrice"
                  v-model="form.price"
                  placeholder="Enter price"
                />
                <small v-if="errors.price" class="text-danger">{{ errors.price[0] }}</small>
              </div>

              <div class="mb-3">
                <label for="productDescription" class="form-label">Description</label>
                <textarea
                  class="form-control"
                  id="productDescription"
                  v-model="form.description"
                  rows="3"
                  placeholder="Write a short description"
                ></textarea>
                <small v-if="errors.description" class="text-danger">{{ errors.description[0] }}</small>
              </div>

              <div class="mb-4">
                <label for="productImage" class="form-label">Product Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="productImage"
                  @change="handleImage"
                />
                <small v-if="errors.image" class="text-danger">{{ errors.image[0] }}</small>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-upload"></i> Submit Product
                </button>
              </div>
            </form>
          </div>
        </div>
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
        price: '',
        description: '',
        image: null,
      },
      errors: {},
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    handleImage(event) {
      this.form.image = event.target.files[0];
    },
    goToList() {
    this.$router.push({ name: 'List' });
    },
    handleSubmit() {
      const formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('price', this.form.price);
      formData.append('description', this.form.description);
      if (this.form.image) {
        formData.append('image', this.form.image);
      }

      axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        this.errors = {};
        this.successMessage = 'Product added successfully!';
        this.errorMessage = '';       
        this.form = {
          name: '',
          price: '',
          description: '',
          image: null
        };        
        setTimeout(() => {
          this.$router.push({ name: 'List' });
        }, 2000);
      })
      .catch(error => {
        this.successMessage = '';
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors;
        } else {
          this.errorMessage = 'Something went wrong. Please try again later.';
        }
      });
    }
  },
};
</script>

<style>
/* Add any custom styles here */
</style>
