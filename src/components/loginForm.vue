<template>
  <div class="background">
    <div class="login-container">
      <h2>🔐 Đăng nhập</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="username" type="text" placeholder="Tên đăng nhập" required />
        <input v-model="password" type="password" placeholder="Mật khẩu" required />
        <button type="submit">Đăng nhập</button>
        <p class="error" v-if="errorMessage">{{ errorMessage }}</p>
        <p class="register-link">
          Bạn chưa có tài khoản?
          <router-link to="/register">Đăng ký</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    if (!response.ok) {
      errorMessage.value = 'Sai tài khoản hoặc mật khẩu!'
      return
    }

    const data = await response.json()

    if (data.status === 'success') {
      const token = data.data.token
      const role = data.data.role?.toUpperCase() || ''

      // Lưu thông tin vào localStorage
      localStorage.setItem('token', token)
      localStorage.setItem('username', username.value)
      localStorage.setItem('role', role)

      // Gửi event để App.vue biết user đã đăng nhập
      window.dispatchEvent(new Event('user-logged-in'))

      // Chuyển hướng
      if (role.includes('ADMIN')) {
        router.push({ name: 'admin' })
      } else {
        router.push({ name: 'home' })
      }
    } else {
      errorMessage.value = data.message || 'Sai tài khoản hoặc mật khẩu!'
    }
  } catch (err) {
    errorMessage.value = 'Không thể kết nối đến máy chủ.'
    console.error('Lỗi kết nối:', err)
  }
}
</script>

<style scoped>
@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.background {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(-45deg, #a79aff, #fad0c4, #fbc2eb, #a18cd1);
  background-size: 400% 400%;
  animation: gradientMove 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.login-container {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 30px 25px;
  border-radius: 16px;
  backdrop-filter: blur(12px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
  width: 320px;
  text-align: center;
}

.login-container h2 {
  color: #fff;
  margin-bottom: 20px;
  font-size: 22px;
}

.login-container input {
  width: 100%;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  border: none;
  outline: none;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 14px;
}

.login-container input::placeholder {
  color: #ddd;
}

.login-container button {
  width: 100%;
  padding: 12px;
  margin-top: 10px;
  background: #ffffffcc;
  color: #333;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;
  font-size: 14px;
}

.login-container button:hover {
  background: #fff;
}

.login-container .error {
  color: #ffdddd;
  margin-top: 10px;
  font-size: 14px;
}

.register-link {
  margin-top: 16px;
  color: #eee;
  font-size: 14px;
}

.register-link a {
  color: #ffe0f7;
  font-weight: bold;
  text-decoration: none;
}

.register-link a:hover {
  color: #fff;
}
</style>
