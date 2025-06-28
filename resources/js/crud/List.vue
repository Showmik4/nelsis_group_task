<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card">        
          <div class="card-header">          
            <button class="btn btn-success btn-sm me-2" @click="addProduct">Add Product</button>
            <button class="btn btn-danger btn-sm" @click="logout">Logout</button>
          </div>
          
          <table class="table">
            <thead>
              <tr>            
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Image</th>
                <th scope="col">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(product, index) in products" :key="product.id">           
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.description }}</td>
                <td>
                  <img
                    :src="getImageUrl(product.image)"
                    @error="handleImageError"
                    alt="Product Image"
                    width="60"
                    height="60"
                  />
                </td>
                <td>
                  <button class="btn btn-warning btn-sm me-2" @click="editProduct(product.id)">
                    Edit
                  </button>
                  <button class="btn btn-danger btn-sm" @click="deleteProduct(product.id)">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
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
      products: [],
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
  fetchProducts() {
    axios.get('/api/products',{
       headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }

       })
       
      .then((response) => {
        this.products = response.data;
      })
      .catch((error) => {
        console.error('Error loading products:', error);
      });
  },

   addProduct() {
    this.$router.push({ name: 'AddNew' });
    },

  editProduct(id) {
  console.log('Editing product with ID:', id);
  this.$router.push({ name: 'Edit', params: { id } });
  },

  deleteProduct(id) {
    console.log('Token:', localStorage.getItem('token'));
    if (confirm('Are you sure you want to delete this product?')) {
      axios.delete(`/api/products/${id}`)
        .then(() => {
          this.products = this.products.filter(p => p.id !== id);
          alert('Product deleted successfully.');
        })
        .catch(err => {
          alert('Failed to delete product');
          console.error(err);
        });
    }
  },

  logout() {
  axios.post('/api/logout', {}, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  .then(() => {
    localStorage.removeItem('token');
    this.$router.push({ name: 'Login' });
  })
  .catch(error => {
    console.error('Logout error:', error);
    alert('Error logging out.');
  });
 },

  getImageUrl(photo) {    
      return photo ? `/storage/${photo}` : '/images/default.jpg';
  },

  handleImageError(event) {
    event.target.src = '/images/placeholder.png';
  }
}
};
</script>
<style lang="">
    
</style>