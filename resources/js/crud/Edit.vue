<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">            
            <button class="btn btn-primary" @click="goToList">List</button>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="productName">Name</label>

                <input
                  type="text"
                  class="form-control"
                  id="productName"
                  v-model="form.name"
                  placeholder="Enter Name"
                />
              </div>

              <div class="form-group">
                <label for="productPrice">Price</label>
                <input
                  type="text"
                  class="form-control"
                  id="productPrice"
                  v-model="form.price"
                  placeholder="Price"
                />
              </div>

              <div class="form-group">
                <label for="productDescription">Description</label>
                <textarea
                  class="form-control"
                  id="productDescription"
                  v-model="form.description"
                  placeholder="Enter Description"
                ></textarea>
              </div>

              <div class="form-group mb-2">
                <label for="productImage">Image</label>
                <input
                  type="file"
                  class="form-control"
                  id="productImage"
                  @change="handleImage"
                />
                <!-- Show current image preview -->
                <img
                  v-if="form.preview"
                  :src="form.preview"
                  alt="Current Image"
                  class="mt-2"
                  width="80"
                />
              </div>

              <button type="submit" class="btn btn-primary">Update</button>
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
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
   fetchProduct() {
  axios.get(`/api/products/${this.$route.params.id}`)
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
        alert('Product updated successfully!');
        this.$router.push({ name: 'List' });
      })
      .catch(error => {
        console.error('Update failed:', error.response?.data?.errors || error);
      });
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
