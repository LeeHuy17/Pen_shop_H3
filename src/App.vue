<template>
  <div class="app-container">
    <header class="header">
      <router-link to="/" class="logo-link">
        <img alt="Pen logo" class="logo" src="@/assets/pen-logo.webp" width="50" height="50" />
      </router-link>

      <div class="search-bar">
        <input
          v-model="searchQuery"
          @keyup.enter="handleSearch"
          class="search-input"
          placeholder="Tìm kiếm sản phẩm..."
        />
        <button @click="handleSearch" class="search-button">
          <img :src="require('@/assets/icons/search.png')" alt="Tìm kiếm" width="20" height="20" />
        </button>
      </div>
      
      <nav class="nav">
        <template v-if="isLoggedIn">
          <span class="welcome">Xin chào, {{ username }} !</span>

          <router-link to="/cart" class="icon-link" title="Giỏ hàng">
            <img src="@/assets/icons/cart.png" alt="Giỏ hàng" width="28" height="28" />
            <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
          </router-link>

          <a href="#" @click.prevent="logout" class="icon-link" title="Đăng xuất">
            <img src="@/assets/icons/logout.png" alt="Đăng xuất" width="28" height="28" />
          </a>
        </template>

        <template v-else>
          <router-link to="/login" class="icon-link" title="Đăng nhập">
            <img src="@/assets/icons/login.png" alt="Đăng nhập" width="28" height="28" />
          </router-link>

          <router-link to="/register" class="icon-link" title="Đăng ký">
            <img src="@/assets/icons/register.png" alt="Đăng ký" width="28" height="28" />
          </router-link>

          <router-link to="/cart" class="icon-link" title="Giỏ hàng">
            <img src="@/assets/icons/cart.png" alt="Giỏ hàng" width="28" height="28" />
            <span class="cart-count" v-if="cartCount > 0">{{ cartCount }}</span>
          </router-link>
        </template>
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
      cartCount: 0,
      username: '',
      isLoggedIn: false,
      searchQuery: '', 
    };
  },
  created() {
    this.loadCartCount();
    this.checkLogin();
    window.addEventListener('storage', this.syncFromStorage);
    window.addEventListener('user-logged-in', this.handleUserLogin);
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.syncFromStorage);
    window.removeEventListener('user-logged-in', this.handleUserLogin);
  },
  methods: {
    syncFromStorage() {
      this.loadCartCount();
      this.checkLogin();
    },
    handleUserLogin() {
      this.checkLogin();
      this.loadCartCount();
    },
    loadCartCount() {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    },
    async checkLogin() {
      const token = localStorage.getItem('token');
      if (!token) {
        this.isLoggedIn = false;
        this.username = '';
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/auth/introspect', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();
        if (response.ok && data.status === 'success') {
          const userDetails = data.data.details;
          this.username = userDetails.username || localStorage.getItem('username') || 'Người dùng';
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
          this.username = '';
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error('Lỗi introspect:', error);
        this.isLoggedIn = false;
        this.username = '';
        localStorage.removeItem('token');
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('role');
      this.username = '';
      this.isLoggedIn = false;
      this.cartCount = 0;
      this.$router.push('/login');
    },
    handleSearch() {
      if (this.searchQuery.trim()) {
        console.log('Tìm kiếm:', this.searchQuery);
        alert(`🔍 Bạn vừa tìm: ${this.searchQuery}`);
        this.searchQuery = '';
      }
    },
  },
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
  flex-wrap: wrap;
  gap: 10px;
}

.logo {
  font-size: 20px;
  font-weight: bold;
  border-radius: 37%;
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  max-width: 500px;
  margin: 0 auto;
  padding: 10px;
  background: #fff0fa;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(200, 100, 200, 0.15);
}

.search-input {
  flex: 1;
  padding: 10px 16px;
  border-radius: 12px 0 0 12px;
  border: 1px solid #ccc;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}

.search-input:focus {
  border-color: #45e3c4;
}

.search-button {
  padding: 10px 20px;
  background-color: #5ee4ff;
  border: none;
  color: white;
  font-weight: bold;
  border-radius: 0 12px 12px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:hover {
  background-color: #f0ba94;
}


.nav {
  display: flex;
  align-items: center;
}

.nav a,
.nav span {
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

.logout-link {
  cursor: pointer;
  color: #ffddcc;
  font-weight: 600;
}

.logout-link:hover {
  color: red;
}

.welcome {
  color: #ffffff;
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
}

.logout-link {
  display: inline-block;
  cursor: pointer;
  padding: 6px;
  transition: transform 0.2s;
}

.logout-link:hover {
  transform: scale(1.1);
}
</style>
