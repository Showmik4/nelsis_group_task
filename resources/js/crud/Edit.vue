<template>
  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Edit Product</h5>
            <button class="btn btn-secondary btn-sm" @click="goToList">
              <i class="bi bi-arrow-left"></i> Back to List
            </button>
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
              </div>

              <div class="mb-3">
                <label for="productDescription" class="form-label">Description</label>
                <textarea
                  class="form-control"
                  id="productDescription"
                  v-model="form.description"
                  rows="3"
                  placeholder="Enter description"
                ></textarea>
              </div>

              <div class="mb-4">
                <label for="productImage" class="form-label">Product Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="productImage"
                  @change="handleImage"
                />

                <!-- Image preview -->
                <div class="mt-2">
                  <img
                    v-if="form.preview"
                    :src="form.preview"
                    alt="Product Image"
                    class="img-thumbnail"
                    width="100"
                  />
                </div>
              </div>

              <div class="d-grid">
                <button type="submit" class="btn btn-primary">
                  <i class="bi bi-check2-circle"></i> Update Product
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
        preview: null,         
      },
       successMessage: '',
       errorMessage: ''
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
   fetchProduct() {
    axios.get(`/api/products/${this.$route.params.id}`
    )
    .then(response => {
      console.log('Product resource:', response.data);     
      const product = response.data.data || response.data;   
      if (!product) {
        throw new Error("Product not found in response.");
      }

      this.form.name = product.name;
      this.form.price = product.price;
      this.form.description = product.description;
      this.form.preview = product.image ? `/storage/${product.image}` : null;
    })
    .catch(error => {
      console.error('Failed to load product:', error);
      alert('Failed to load product.');
      this.$router.push({ name: 'List' });
    });
},

    handleImage(event) {
      this.form.image = event.target.files[0];      
      this.form.preview = URL.createObjectURL(this.form.image);
    },

    goToList() {
    this.$router.push({ name: 'List' });
    },

    handleSubmit() {
      const id = this.$route.params.id;
      const formData = new FormData();
      formData.append('name', this.form.name);
      formData.append('price', this.form.price);
      formData.append('description', this.form.description);

      if (this.form.image) {
        formData.append('image', this.form.image);
      }
   
      formData.append('_method', 'PUT');
      axios.post(`/api/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(() => {        
        this.successMessage = 'Product updated successfully!';
        this.errorMessage = '';  

        setTimeout(() => {
          this.$router.push({ name: 'List' });
        }, 2000);
      })
     .catch(error => {
        console.error('Update failed:', error.response?.data?.errors || error);
        this.errorMessage = 'Failed to update product. Please check the input.';
        this.successMessage = '';
      });
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
