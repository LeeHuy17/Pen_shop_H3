<template>
  <div class="detail-container" v-if="product">
    <div class="product-detail-card">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <div class="product-info">
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-price">{{ product.price }}₫</p>
        <p class="product-description">
          {{ product.description }}
        </p>

        <div class="color-selection">
          <p>Chọn màu bút:</p>
          <div class="color-options">
            <button
              v-for="color in product.colors"
              :key="color"
              :class="['color-btn', { selected: selectedColor === color }]"
              @click="selectedColor = color"
            >
              {{ color }}
            </button>
          </div>
        </div>

        <button class="add-to-cart-btn" @click="addToCart(product)">
          🛒 Thêm vào giỏ hàng
        </button>
      </div>
    </div>
  </div>
  <div v-else class="not-found">
    <h2>Không tìm thấy sản phẩm!</h2>
  </div>
</template>

<script>
export default {
  name: "ProductDetail",
  data() {
    return {
      product: null,
      selectedColor: "",
    };
  },
  mounted() {
    const productId = parseInt(this.$route.params.id);
    const products = [
      {
        id: 1,
        name: "Bút Bi",
        price: "25.000",
        image: require("@/img/butbi.png"),
        description: "Bút bi tiện lợi, dễ viết.",
        colors: ["Đỏ", "Đen", "Xanh biển"],
      },
      {
        id: 2,
        name: "Bút Máy Sang Trọng",
        price: "120.000",
        image: "/images/pen2.jpg",
        description: "Bút máy thiết kế sang trọng, phù hợp làm quà tặng.",
        colors: ["Đỏ", "Đen", "Xanh biển"],
      },
      {
        id: 3,
        name: "Bút Gel Mực Mịn",
        price: "18.000",
        image: "/images/pen3.jpg",
        description: "Bút gel mực mịn, không lem, không nhòe.",
        colors: ["Đỏ", "Đen", "Xanh biển"],
      },
    ];

    this.product = products.find((p) => p.id === productId);
    if (this.product?.colors?.length) {
      this.selectedColor = this.product.colors[0];
    }
  },
  methods: {
    addToCart(product) {
      if (!this.selectedColor) {
        alert("Vui lòng chọn màu bút!");
        return;
      }

      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find(
        (item) => item.id === product.id && item.color === this.selectedColor
      );

      if (existing) {
        existing.quantity++;
      } else {
        cart.push({ ...product, quantity: 1, color: this.selectedColor });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
      alert(`Đã thêm "${product.name}" (${this.selectedColor}) vào giỏ hàng! 🎉`);
    },
  },
};
</script>

<style scoped>
.detail-container {
  display: flex;
  justify-content: center;
  padding: 80px 20px;
}

.product-detail-card {
  background-color: #fff;
  padding: 30px;
  max-width: 800px;
  display: flex;
  gap: 30px;
  border-radius: 12px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 300px;
  height: 300px;
  object-fit: contain;
  border-radius: 8px;
}

.product-info {
  flex: 1;
}

.product-name {
  font-size: 28px;
  color: #333;
  margin-bottom: 12px;
}

.product-price {
  font-size: 20px;
  color: #007bff;
  margin-bottom: 12px;
}

.product-description {
  font-size: 16px;
  color: #555;
  margin-bottom: 20px;
}

.color-selection {
  margin-bottom: 20px;
}

.color-options {
  display: flex;
  gap: 10px;
  margin-top: 8px;
}

.color-btn {
  padding: 8px 14px;
  border-radius: 8px;
  border: 2px solid #ddd;
  background-color: #f4f4f4;
  cursor: pointer;
}

.color-btn.selected {
  border: 2px solid #007bff;
  font-weight: bold;
  background-color: #e0f0ff;
}

.add-to-cart-btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
}

.not-found {
  padding: 100px;
  text-align: center;
  color: #999;
}
</style>
