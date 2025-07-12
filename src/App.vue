<template>
  <div class="app-container">
    <header class="header">
      <router-link to="/" class="logo-link">
        <img alt="Pen logo" class="logo" src="@/assets/pen-logo.webp" width="50" height="50" />
      </router-link>

      <nav class="nav">
        
      <router-link to="/login">Đăng nhập</router-link>
      <router-link to="/register">Đăng ký</router-link>
      <router-link to="/cart">
          🛒 Giỏ hàng <span class="cart-count" v-if="cartCount > 0">({{ cartCount }})</span>
        </router-link>
      </nav>
    </header>

    <div class="banner-image">
      <img src="@/assets/backgroundPen2.jpg" alt="Banner dưới header" />
    </div>

    <main class="main-view">
      <router-view />
    </main>

    <footer class="footer">
      © 2025 Pen Store. All rights reserved.
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
  font-family: 'Segoe UI', Roboto, Avenir, Helvetica, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fefeff;
}

.header {
  background-color: #8c808e; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  box-shadow: 0 4px 10px rgba(52, 47, 47, 0);
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.nav a {
  margin-left: 20px;
  text-decoration: none;
  color: #1f1f21; 
  font-weight: 600;
  font-size: 15px;
  transition: color 0.2s ease;
}

.nav a:hover {
  color: #ffffff; 
}

.cart-count {
  color: #ffffff; 
  font-weight: bold;
  margin-left: 5px;
}

.banner-image img {
  width: 100%;
  height: auto;
  display: block;
  max-height: 320px;
  object-fit: cover;
  border-bottom: 4px solid #f3d9fa;
}

.main-view {
  flex: 1;
  padding: 24px;
  background-color: #e6f7f1;
  color: #2d2d2d;
}

.footer {
  background-color: #8c808e; 
  color: #ffffff;
  text-align: center;
  padding: 16px;
  border-top: 1px solid #8c808e;
  font-size: 14px;
  box-shadow: #3d3c3c;
}
</style>
