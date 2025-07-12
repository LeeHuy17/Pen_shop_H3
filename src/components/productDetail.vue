<template>
  <div class="detail-container" v-if="product">
    <div class="product-detail-card">
      <img :src="product.image" :alt="product.name" class="product-image" />
      <div class="product-info">
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-price">{{ product.price }}₫</p>
        <h4 class="description-title">Mô tả sản phẩm:</h4>
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

        <div class="quantity-selection">
          <p>Số lượng:</p>
          <div class="quantity-control">
            <button @click="decreaseQuantity">−</button>
            <input type="number" v-model.number="selectedQuantity" min="1" />
            <button @click="increaseQuantity">+</button>
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
      selectedQuantity: 1,
    };
  },
  mounted() {
    const productId = parseInt(this.$route.params.id);
    const products = [
      {
        id: 1,
        name: "Bút Bi Thiên Long",
        price: "7.000",
        image: require("@/img/pen1.png"),
        description: "Bút bi Thiên Long nổi tiếng với chất lượng cao, viết êm, đều mực. Phù hợp cho học sinh, sinh viên và nhân viên văn phòng.",
        colors: ["Đỏ", "Đen", "Xanh biển"],
      },
      {
        id: 2,
        name: "Bút Lông Sakura",
        price: "36.000",
        image: require("@/img/pen2.webp"),
        description: "Bút lông Sakura Brush đến từ Nhật Bản, thích hợp cho vẽ minh họa, tô màu, thư pháp và bullet journal. Có sẵn nhiều màu sắc tươi sáng, mực đều và lâu phai.",
        colors: [
          "Đỏ", "Hồng", "Cam", "Vàng", "Xanh lá", "Xanh biển",
          "Tím", "Nâu", "Xám", "Đen"
        ],
      },
      {
        id: 3,
        name: "Bút Máy Hero",
        price: "210.000",
        image: require("@/img/pen3.jpg"),
        description: "Bút máy Hero sang trọng với thiết kế kim loại bền đẹp, viết mượt, thích hợp làm quà tặng hoặc sử dụng chuyên nghiệp.",
        colors: ["Đen", "Xanh biển"],
      },
    ];

    this.product = products.find((p) => p.id === productId);
    if (this.product?.colors?.length) {
      this.selectedColor = this.product.colors[0];
    }
  },
  methods: {
    increaseQuantity() {
      this.selectedQuantity++;
    },
    decreaseQuantity() {
      if (this.selectedQuantity > 1) {
        this.selectedQuantity--;
      }
    },
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
        existing.quantity += this.selectedQuantity;
      } else {
        cart.push({
          ...product,
          quantity: this.selectedQuantity,
          color: this.selectedColor,
        });
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("storage"));
      alert(
        `Đã thêm "${product.name}" (${this.selectedColor}) x${this.selectedQuantity} vào giỏ hàng! 🎉`
      );
    },
  }
};
</script>

<style scoped>
  .detail-container {
    display: flex;
    justify-content: center;
    padding: 80px 20px;
  }

  .product-detail-card {
    background-color: #fff9fc; 
    padding: 30px;
    max-width: 900px;
    display: flex;
    flex-wrap: wrap;
    gap: 30px;
    border-radius: 16px;
    box-shadow: 0 10px 24px rgba(211, 132, 187, 0.12);
  }

  .product-image {
    width: 320px;
    height: 320px;
    object-fit: contain;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
    background-color: #fff;
    padding: 10px;
  }

  .product-info {
    flex: 1;
    min-width: 280px;
  }

  .description-title {
    font-size: 18px;
    margin-bottom: 6px;
    color: #7b2cbf;
  }

  .product-description {
    font-size: 15px;
    color: #444;
    line-height: 1.6;
    margin-bottom: 24px;
  }


  .color-selection {
    margin-bottom: 20px;
  }

  .color-options {
    display: flex;
    flex-wrap: wrap;
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
    border: 2px solid #6cb3ff;
    font-weight: bold;
    background-color: #e0f0ff;
  }

  .add-to-cart-btn {
    padding: 10px 20px;
    background-color: #8233b3;
    color: white;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
  }

  .add-to-cart-btn:hover {
    background-color: #7f02bd;
  }

  .not-found {
    padding: 100px;
    text-align: center;
    color: #999;
  }
  .quantity-selection {
    margin-bottom: 20px;
  }

  .quantity-control {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 8px;
  }

  .quantity-control input {
    width: 60px;
    text-align: center;
    font-size: 16px;
    padding: 6px;
    border: 1px solid #ccc;
    border-radius: 6px;
  }

  .quantity-control button {
    width: 32px;
    height: 32px;
    font-size: 18px;
    background: #8233b3;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .quantity-control button:hover {
    background: #7f02bd;
  }
</style>
