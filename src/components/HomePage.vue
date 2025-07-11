<template>
  <div class="home-container">
    <div class="background-animation"></div>
    <main class="main-content">
      
      <div class="banner">
        <h2>Sản phẩm nổi bật ✨</h2>
        <div class="products">
          <div
            class="product-card"
            v-for="product in featuredProducts"
            :key="product.id"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="product-image"
            />
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">{{ product.price }}₫</p>
            <button class="add-to-cart-btn" @click="addToCart(product)">
              🛒 Thêm vào giỏ
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      featuredProducts: [
        {
          id: 1,
          name: "Bút Bi",
          price: "25.000",
          image: require("@/img/butbi.png"),
        },
        {
          id: 2,
          name: "Bút Máy Sang Trọng",
          price: "120.000",
          image: "/images/pen2.jpg",
        },
        {
          id: 3,
          name: "Bút Gel Mực Mịn",
          price: "18.000",
          image: "/images/pen3.jpg",
        },
      ],
    };
  },
  methods: {
    addToCart(product) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage")); // Thông báo App.vue cập nhật
      alert(`Đã thêm "${product.name}" vào giỏ hàng! 🎉`);
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  color-scheme: light;
}

.main-content {
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 20px 200px;
  position: relative;
}

.banner {
  background-color: rgba(255, 255, 255, 0.85);
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.banner h2 {
  font-size: 32px;
  margin-bottom: 30px;
  color: #333;
}

.products {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 10px;
}

.product-card {
  background-color: #fff;
  border-radius: 10px;
  padding: 20px;
  width: 220px;
  text-align: center;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: contain;
  margin-bottom: 15px;
}

.product-name {
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
}

.product-price {
  font-size: 16px;
  color: #007bff;
  margin-bottom: 12px;
}

.add-to-cart-btn {
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
}

.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  background: linear-gradient(-45deg, #b2e0ff, #ffe6f0, #d2ffea, #f9e6ff);
  background-size: 400% 400%;
  animation: moveBg 15s ease infinite;
  z-index: -1;
  opacity: 0.3;
}

@keyframes moveBg {
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
</style>
