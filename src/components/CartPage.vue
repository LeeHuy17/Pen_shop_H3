<template>
  <div style="display: flex; justify-content: flex-start;">
    <div class="cart-container">
      <h2>🛒 Giỏ Hàng Của Bạn</h2>

      <div v-if="cart.length === 0" class="empty-cart">
        Giỏ hàng đang trống 😢
      </div>

      <div v-else class="cart-items">
        <div
          class="cart-item"
          v-for="(item, index) in cart"
          :key="`${item.id}-${item.color}`"
        >
          <img :src="item.image" alt="Ảnh sản phẩm" />
          <div class="details">
            <h3>{{ item.name }}</h3>
            <p>Giá: {{ item.price }}₫</p>
            <p>Màu: {{ item.color }}</p>

            <div class="quantity-control">
              <button @click="decreaseQuantity(index)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(index)">+</button>
            </div>

            <button @click="removeFromCart(index)">❌ Xóa</button>
          </div>
        </div>

        <div class="cart-total">
          Tổng cộng: {{ totalPrice }}₫
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CartPage",
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    totalPrice() {
      return this.cart.reduce((sum, item) => {
        return sum + parseInt(item.price.replace(".", "")) * item.quantity;
      }, 0).toLocaleString("vi-VN");
    },
  },
  mounted() {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) {
      this.cart = storedCart;
    }
  },
  methods: {
    removeFromCart(index) {
      this.cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    increaseQuantity(index) {
      this.cart[index].quantity++;
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    decreaseQuantity(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
      } else {
        this.removeFromCart(index);
      }
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
  },
};
</script>


<style scoped>
.cart-container {
  padding: 40px 20px;
  max-width: 1000px;
  width: 100%;
  margin: 0;
  font-family: "Segoe UI", sans-serif;
  color: #fff;
  text-align: left;
}

h2 {
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 26px;
  font-weight: bold;
  justify-content: flex-start;
}

.empty-cart {
  font-size: 18px;
  color: #ccc;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  gap: 15px;
  background: #1e1e1e;
  padding: 10px 15px;
  border-radius: 10px;
  width: 100%;
}

.cart-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 6px;
  background: #333;
}

.details {
  flex: 1;
}

.details h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.details p {
  margin: 3px 0;
  font-size: 14px;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 10px 0;
}

.quantity-control button {
  width: 30px;
  height: 30px;
  font-size: 18px;
  background: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.quantity-control span {
  min-width: 20px;
  text-align: center;
  font-size: 16px;
}

.details button {
  padding: 6px 12px;
  background: crimson;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.cart-total {
  margin-top: 30px;
  font-size: 18px;
  font-weight: bold;
}
</style>
