<template>
  <div class="admin-container">
    <h1>🛠 Admin quản lý sản phẩm (Bút)</h1>

    <!-- Form thêm sản phẩm -->
    <form @submit.prevent="onSubmit" class="admin-form">
      <input v-model="form.name" placeholder="Tên sản phẩm" required />
      <input v-model.number="form.price" placeholder="Giá (đ)" required />
      <input v-model="form.image" placeholder="Link ảnh" required />
      <button type="submit">{{ isEditing ? "Lưu chỉnh sửa" : "Thêm sản phẩm" }}</button>
    </form>

    <!-- Form thêm brand -->
    <form @submit.prevent="onAddBrand" class="admin-form">
      <input v-model="brandName" placeholder="Tên thương hiệu mới" required />
      <button type="submit">➕ Thêm thương hiệu</button>
    </form>

    <!-- Danh sách sản phẩm -->
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-item">
        <img :src="product.image" alt="Ảnh sản phẩm" />
        <div class="info">
          <h3>{{ product.name }}</h3>
          <p>{{ product.price }}₫</p>
          <div class="actions">
            <button @click="editProduct(product)">✏️</button>
            <button @click="deleteProduct(product.id)">🗑️</button>
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
      products: [],
      form: {
        name: "",
        price: 0,
        image: ""
      },
      brandName: "",
      isEditing: false,
      editId: null
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    getToken() {
      return localStorage.getItem("access_token");
    },
    async fetchProducts() {
      try {
        const response = await fetch("http://localhost:8080/pen/admin/get-list", {
          headers: {
            "Authorization": `Bearer ${this.getToken()}`
          }
        });
        const data = await response.json();
        this.products = data.pen || [];
      } catch (err) {
        console.error("Lỗi lấy sản phẩm:", err);
      }
    },
    async onSubmit() {
      const url = this.isEditing
        ? `http://localhost:8080/pen/update-pen/${this.editId}`
        : "http://localhost:8080/pen/add-pen";
      const method = this.isEditing ? "PATCH" : "POST";

      try {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.getToken()}`
          },
          body: JSON.stringify(this.form)
        });

        if (!response.ok) throw new Error("Lỗi gửi dữ liệu");

        await this.fetchProducts();
        this.resetForm();
      } catch (err) {
        console.error("Lỗi thêm/sửa sản phẩm:", err);
      }
    },
    editProduct(product) {
      this.form = { ...product };
      this.editId = product.id;
      this.isEditing = true;
    },
    async deleteProduct(penId) {
      if (!confirm("Bạn có chắc muốn xoá sản phẩm này?")) return;

      try {
        const response = await fetch(`http://localhost:8080/pen/delete/${penId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${this.getToken()}`
          }
        });

        if (!response.ok) throw new Error("Lỗi khi xóa sản phẩm");
        await this.fetchProducts();
      } catch (err) {
        console.error("Lỗi xoá sản phẩm:", err);
      }
    },
    resetForm() {
      this.form = { name: "", price: 0, image: "" };
      this.isEditing = false;
      this.editId = null;
    },
    async onAddBrand() {
      try {
        const response = await fetch("http://localhost:8080/brand/add-brand", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this.getToken()}`
          },
          body: JSON.stringify({ name: this.brandName })
        });

        if (!response.ok) throw new Error("Thêm brand thất bại");

        alert("✅ Thêm thương hiệu thành công!");
        this.brandName = "";
      } catch (err) {
        console.error("Lỗi thêm brand:", err);
        alert("❌ Không thể thêm thương hiệu");
      }
    }
  }
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
  background-color: #28a745;
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
