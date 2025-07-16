<template>
  <div class="admin-container">
    <h1>🛠 Quản lý sản phẩm</h1>

    <form @submit.prevent="onSubmit" class="admin-form">
      <input v-model="form.name" placeholder="Tên sản phẩm" required />
      <input v-model="form.brand_id" placeholder="ID thương hiệu" required />
      <input v-model="form.category_id" placeholder="ID danh mục" required />
      <input v-model="form.image" placeholder="Link ảnh sản phẩm" required />
      <button type="submit">{{ isEditing ? "Lưu chỉnh sửa" : "Thêm sản phẩm" }}</button>
    </form>

    <form @submit.prevent="onAddBrand" class="admin-form">
      <input v-model="brandName" placeholder="Tên thương hiệu mới" required />
      <button type="submit">Thêm thương hiệu</button>
    </form>

    <h2 class="shop-title">Sản phẩm hiện có</h2>
    <div class="product-list">
      <div v-for="product in products" :key="product.pen_id" class="product-item">
        <img :src="product.image" alt="Ảnh sản phẩm" />
        <div class="info">
          <h3>{{ product.name }}</h3>
          <p>ID thương hiệu: {{ product.brand_id }}</p>
          <p>ID danh mục: {{ product.category_id }}</p>
          <p>Trạng thái: {{ product.visible ? 'Hiện' : 'Ẩn' }}</p>
          <p>Ngày tạo: {{ new Date(product.created_at).toLocaleString() }}</p>
          <div class="actions">
            <button @click="editProduct(product)">Chỉnh sửa</button>
            <button @click="deleteProduct(product.pen_id)">Xóa</button>
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
        brand_id: "",
        category_id: "",
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
      this.form = {
        name: product.name,
        brand_id: product.brand_id,
        category_id: product.category_id,
        image: product.image
      };
      this.editId = product.pen_id;
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
      this.form = {
        name: "",
        brand_id: "",
        category_id: "",
        image: ""
      };
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
  max-width: 1000px;
  margin: 60px auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  background: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
  font-size: 28px;
  color: #5c3d99;
}

.shop-title {
  font-size: 22px;
  color: #333;
  margin: 40px 0 20px;
  font-weight: bold;
}

.admin-form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 30px;
}

.admin-form input {
  flex: 1 1 220px;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
}

.admin-form button {
  padding: 12px 18px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
}

.product-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.product-item {
  display: flex;
  gap: 20px;
  background: white;
  padding: 16px;
  border-radius: 10px;
  align-items: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}

.product-item img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
  background: #f0f0f0;
}

.info {
  flex: 1;
  font-size: 16px;
}

.info h3 {
  font-size: 20px;
  margin-bottom: 8px;
  color: #2a2a2a;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.actions button {
  font-size: 16px;
  background: #007bff;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.2s;
}

.actions button:hover {
  background: #0056b3;
}
</style>
