<template>
  <div class="app-container">
    <header class="header">
      <img alt="Pen logo" class="logo" src="@/assets/pen-logo.webp" width="50" height="50" />
      <nav class="nav">
        <router-link to="/">Trang chủ</router-link>
        <router-link to="/login">Đăng nhập</router-link>
        <router-link to="/register">Đăng ký</router-link>
        <router-link to="/cart">Giỏ hàng</router-link>
      </nav>
    </header>

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
  name: 'App'
}
</script>

<style>
.app-container {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background-color: rgba(255, 255, 255, 0.95);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.logo {
  font-size: 20px;
  color: #007bff;
  font-weight: bold;
}

.nav a {
  margin-left: 20px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  font-size: 14px;
}

.nav a:hover {
  color: #007bff;
}

.main-view {
  flex: 1;
  padding: 20px;
}

.footer {
  background-color: #f9f9f9;
  color: #333;
  text-align: center;
  padding: 16px;
  border-top: 1px solid #ddd;
}
</style>
