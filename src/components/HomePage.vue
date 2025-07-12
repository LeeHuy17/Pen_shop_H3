<template>
  <div class="home-container">
    <div class="background-animation"></div>
    <main class="main-content">
      <div class="banner">
        <h2>Sản phẩm nổi bật</h2>
        <div class="products">
          <div
            v-for="product in featuredProducts"
            :key="product.id"
            class="product-card"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="product-image"
            />
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-price">{{ product.price }}₫</p>
            <button
              class="add-to-cart-btn"
              @click.stop="goToProduct(product.id)"
            >
              Xem chi tiết
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
          name: "Bút Bi Thiên Long",
          price: "7.000",
          image: require("@/img/pen1.png"),
        },
        {
          id: 2,
          name: "Bút Lông Sakura",
          price: "36.000",
          image: require("@/img/pen2.webp"),
        },
        {
          id: 3,
          name: "Bút Máy Hero",
          price: "210.000",
          image: require("@/img/pen3.jpg"),
        },
      ],
    };
  },
  methods: {
    goToProduct(id) {
      this.$router.push(`/product/${id}`);
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
  background-color: #fef6fb; 
  padding: 40px;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0 6px 24px rgba(255, 192, 203, 0.15);
  border: 1px solid #fbd5e5;
  transition: background-color 0.3s ease;
}

.banner:hover {
  background-color: #fff0f7; 
}

.banner h2 {
  font-size: 32px;
  margin-bottom: 30px;
  color: #7b2cbf; 
  font-weight: 600;
  text-shadow: 1px 1px 0 #fefefe;
}
.products {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  margin-top: 10px;
}

.product-card {
  background-color: #ffffff;
  border-radius: 14px;
  padding: 20px;
  width: 220px;
  text-align: center;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.product-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
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
  color: #1a1a1a;
}

.product-price {
  font-size: 16px;
  color: #2b7a78;
  font-weight: bold;
  margin-bottom: 12px;
}

.add-to-cart-btn {
  padding: 10px 16px;
  background-color: #3fada8;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #347d78;
}

.background-animation {
  position: fixed;
  top: 0;
  left: 0;
  width: 200%;
  height: 200%;
  background: linear-gradient(-45deg, #dff6ff, #ffe6e6, #e4ffe3, #f4e8ff);
  background-size: 400% 400%;
  animation: moveBg 20s ease infinite;
  z-index: -1;
  opacity: 0.4;
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