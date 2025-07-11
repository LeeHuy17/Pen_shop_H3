<template>
  <div class="admin-container">
    <h1>🛠 Admin quản lý sản phẩm </h1>

   
    <form @submit.prevent="onSubmit" class="admin-form">
      <input v-model="form.name" placeholder="Tên sản phẩm" required />
      <input v-model="form.price" placeholder="Giá (đ)" required />
      <input v-model="form.image" placeholder="Link ảnh" required />
      <button type="submit">{{ isEditing ? "Lưu chỉnh sửa" : "Thêm sản phẩm" }}</button>
    </form>

   
    <div class="product-list">
      <div v-for="(product, index) in products" :key="index" class="product-item">
        <img :src="product.image" alt="Ảnh" />
        <div class="info">
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }}₫</p>
          <div class="actions">
            <button @click="editProduct(index)">✏️</button>
            <button @click="deleteProduct(index)">🗑️</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPage",
  data() {
    return {
      products: JSON.parse(localStorage.getItem("adminProducts")) || [],
      form: { name: "", price: "", image: "" },
      isEditing: false,
      editIndex: null,
    };
  },
  methods: {
    onSubmit() {
      if (this.isEditing) {
        this.products[this.editIndex] = { ...this.form };
      } else {
        this.products.push({ ...this.form });
      }
      this.saveProducts();
      this.resetForm();
    },
    editProduct(index) {
      this.form = { ...this.products[index] };
      this.isEditing = true;
      this.editIndex = index;
    },
    deleteProduct(index) {
      this.products.splice(index, 1);
      this.saveProducts();
    },
    saveProducts() {
      localStorage.setItem("adminProducts", JSON.stringify(this.products));
    },
    resetForm() {
      this.form = { name: "", price: "", image: "" };
      this.isEditing = false;
      this.editIndex = null;
    },
  },
};
</script>

<style scoped>
.admin-container {
  max-width: 800px;
  margin: 60px auto;
  padding: 20px;
  font-family: sans-serif;
  background: #f7f7f7;
  border-radius: 10px;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.admin-form {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.admin-form input {
  flex: 1 1 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.admin-form button {
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.product-item {
  display: flex;
  gap: 15px;
  background: white;
  padding: 12px;
  border-radius: 8px;
  align-items: center;
}

.product-item img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
}

.info {
  flex: 1;
}

.actions {
  display: flex;
  gap: 10px;
}

.actions button {
  font-size: 18px;
  background: none;
  border: none;
  cursor: pointer;
}
</style>
