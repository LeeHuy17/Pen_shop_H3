<template>
  <div class="khungnendong">
    <div class="regin">
      <h2>Đăng ký tài khoản</h2>
      <form @submit.prevent="handleRegister">
        <input v-model="username" type="text" placeholder="Tên đăng nhập" required />
        <input v-model="password" type="password" placeholder="Mật khẩu" required />
        <input v-model="confirmPassword" type="password" placeholder="Nhập lại mật khẩu" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <button type="submit">Đăng ký</button>
      </form>
      <p>Đã có tài khoản? <router-link to="/login">Đăng nhập</router-link></p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const email = ref('')
const router = useRouter()

const handleRegister = async () => {
  if (password.value !== confirmPassword.value) {
    alert('❌ Mật khẩu không khớp!')
    return
  }

  try {
    const response = await axios.post('http://localhost:8080/user/register', {
      username: username.value,
      password: password.value,
      email: email.value
    })

    if (response.data && response.data.status === 'success') {
      alert('✅ Đăng ký thành công!')
      localStorage.setItem('token', response.data.data.token)
      router.push('/login')
    } else {
      alert('❌ Đăng ký thất bại!')
    }
  } catch (error) {
    console.error('Lỗi đăng ký:', error)
    alert('❌ Lỗi kết nối hoặc tài khoản đã tồn tại!')
  }
}
</script>

<style scoped>
@keyframes gradientMove {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.khungnendong {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(-45deg, #117958, #fad0c4, #d87bbe, #a18cd1);
  background-size: 400% 400%;
  animation: gradientMove 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.regin {
  background-color: rgba(255, 255, 255, 0.15);
  padding: 40px 30px;
  border-radius: 20px;
  backdrop-filter: blur(16px);
  box-shadow: 0 12px 35px rgba(0, 0, 0, 0.3);
  width: 350px;
  text-align: center;
  color: #fff;
}

.regin h2 {
  margin-bottom: 25px;
  font-weight: 700;
  font-size: 22px;
}

.regin input {
  width: 100%;
  padding: 12px 16px;
  margin: 12px 0;
  border: none;
  border-radius: 10px;
  outline: none;
  background-color: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-size: 14px;
}

.regin input::placeholder {
  color: #eeeeee;
}

.regin input:focus {
  background-color: rgba(255, 255, 255, 0.3);
}

.regin button {
  width: 100%;
  padding: 12px;
  margin-top: 20px;
  background-color: #00cec9;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.regin button:hover {
  background-color: #00b894;
}

.regin p {
  margin-top: 20px;
  font-size: 14px;
}

.regin a {
  color: #ffd6ff;
  font-weight: bold;
  text-decoration: underline;
  transition: color 0.3s;
}

.regin a:hover {
  color: #ffe0f7;
}
</style>
