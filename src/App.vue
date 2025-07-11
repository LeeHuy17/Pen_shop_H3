<template>
  <div class="app-container">
    <header class="header">
      <img alt="Pen logo" class="logo" src="@/assets/pen-logo.webp" width="50" height="50" />
      <nav class="nav">
        
      <router-link to="/login">🔐 Đăng nhập</router-link>
      <router-link to="/register">📝 Đăng ký</router-link>
      <router-link to="/cart">
          🛒 Giỏ hàng <span class="cart-count" v-if="cartCount > 0">({{ cartCount }})</span>
        </router-link>
      </nav>
    </header>

    <!-- 🖼 Ảnh hiển thị ngay dưới thanh header -->
    <div class="banner-image">
      <img src="@/assets/ht.png" alt="Banner dưới header" />
    </div>

    <main class="main-view">
      <router-view />
    </main>

    <footer class="footer">
      © 2025 Bút Store. All rights reserved.
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      cartCount: 0
    };
  },
  created() {
    this.updateCartCount();
    window.addEventListener("storage", this.updateCartCount);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.updateCartCount);
  },
  methods: {
    updateCartCount() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    }
  }
};
</script>

<style>
.app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: #1c1c1c;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.nav a {
  margin-left: 20px;
  text-decoration: none;
  color: white;
  font-weight: 500;
  font-size: 14px;
}

.nav a:hover {
  color: #007bff;
}

.cart-count {
  color: red;
  font-weight: bold;
  margin-left: 5px;
}

.banner-image img {
  width: 100%;
  height: auto;
  display: block;
  max-height: 300px;
  object-fit: cover;
  border-bottom: 2px solid #333;
}

.main-view {
  flex: 1;
  padding: 20px;
  background-color: #0f1a17;
  color: white;
}

.footer {
  background-color: #f9f9f9;
  color: #333;
  text-align: center;
  padding: 16px;
  border-top: 1px solid #ddd;
}
</style>
