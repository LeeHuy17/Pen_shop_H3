<template>
  <div style="display: flex; justify-content: flex-start;">
    <div class="cart-container">
      <h2>🛒 Giỏ Hàng Của Bạn</h2>

      <div v-if="cart.length === 0" class="empty-cart">
        Giỏ hàng đang trống !
      </div>

      <div v-else class="cart-items">
        <div
          class="cart-item"
          v-for="(item, index) in cart"
          :key="`${item.id}-${item.color}`"
        >
          <div class="checkbox-wrapper">
            <input
              type="checkbox"
              v-model="selectedItems"
              :value="`${item.id}-${item.color}`"
            />
          </div>

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
          </div>
        </div>

        <div class="cart-footer" v-if="selectedItems.length > 0">
        <div class="cart-total">
          Tổng cộng: {{ totalPrice }}₫
        </div>

        <div class="cart-buttons">
            <button class="pay-btn" @click="checkoutSelected">
              Thanh toán đã chọn
            </button>
            <button class="remove-selected-btn" @click="removeSelectedItems">
              Xóa đã chọn
            </button>
          </div>
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
        selectedItems: [],
      };
    },
    computed: {
      totalPrice() {
        return this.cart.reduce((sum, item) => {
          const key = `${item.id}-${item.color}`;
          if (this.selectedItems.includes(key)) {
            return sum + parseInt(item.price.replace(".", "")) * item.quantity;
          }
          return sum;
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
      removeFromCart(index) {
        const key = `${this.cart[index].id}-${this.cart[index].color}`;
        this.cart.splice(index, 1);
        this.selectedItems = this.selectedItems.filter((k) => k !== key);
        localStorage.setItem("cart", JSON.stringify(this.cart));
      },
      removeSelectedItems() {
        this.cart = this.cart.filter((item) => {
          const key = `${item.id}-${item.color}`;
          return !this.selectedItems.includes(key);
        });
        localStorage.setItem("cart", JSON.stringify(this.cart));
        this.selectedItems = [];
      },
      checkoutSelected() {
        const selectedProducts = this.cart.filter((item) => {
          const key = `${item.id}-${item.color}`;
          return this.selectedItems.includes(key);
        });

        if (selectedProducts.length === 0) {
          alert("Vui lòng chọn sản phẩm để thanh toán.");
          return;
        }

        alert(`Thanh toán thành công ${selectedProducts.length} sản phẩm! 🎉`);
        this.removeSelectedItems();
      },
    },
  };
</script>

<style scoped>
.cart-container {
  padding: 40px 20px;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  font-family: "Segoe UI", sans-serif;
  color: #000;
}

h2 {
  margin-bottom: 30px;
  font-size: 28px;
  font-weight: bold;
  text-align: center;
  color: #7b2cbf;
}

.empty-cart {
  font-size: 18px;
  color: #ccc;
  text-align: center;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.cart-item {
  display: flex;
  gap: 20px;
  background: #fffafc;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  align-items: center;
  flex-wrap: wrap;
  position: relative;
}

.checkbox-wrapper {
  position: absolute;
  top: 16px;
  left: 16px;
}

.checkbox-wrapper input[type="checkbox"] {
  transform: scale(1.5);
  cursor: pointer;
}

.cart-item img {
  width: 100px;
  height: 100px;
  object-fit: contain;
  border-radius: 10px;
  background: #f2f2f2;
  padding: 8px;
  flex-shrink: 0;
  margin-left: 40px;
}

.details {
  flex: 1;
  min-width: 250px;
}

.details h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
  color: #333;
}

.details p {
  margin: 6px 0;
  font-size: 16px;
  color: #555;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 12px 0;
}

.quantity-control button {
  width: 36px;
  height: 36px;
  font-size: 20px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s;
}

.quantity-control button:hover {
  background: #0056b3;
}

.quantity-control span {
  font-size: 18px;
  font-weight: bold;
  min-width: 24px;
  text-align: center;
}

.details button {
  margin-top: 10px;
  padding: 8px 16px;
  background: crimson;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 15px;
}

.details button:hover {
  background: #a3002c;
}

.cart-total {
  margin-top: 30px;
  font-size: 20px;
  font-weight: bold;
  text-align: right;
  color: #222;
}

.cart-actions {
  margin-top: 20px;
  text-align: right;
}

.remove-selected-btn {
  padding: 10px 20px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.remove-selected-btn:hover {
  background-color: #a3002c;
}

.cart-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  flex-wrap: wrap;
  gap: 10px;
}

.cart-buttons {
  display: flex;
  gap: 12px;
}

.pay-btn {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
}

.pay-btn:hover {
  background-color: #1e7e34;
}

</style>