<template>
  <div class="container">
    <h1>Online <span>shop</span></h1>
    <div v-if="products.length > 0" class="wrapper">
      <card
        v-for="product of this.products"
        :key="product.id"
        :product="product"
        @click="$router.push(`/product/${product.id}`)"
      />
    </div>
    <div v-else class="load">
      <div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import card from "@/components/card.vue";

export default {
  components: {
    card,
  },
  data: () => ({
    products: [],
    product: {},
  }),
  methods: {
    async getPost() {
      let res = await axios.get("https://fakestoreapi.com/products");

      if (res.status === 200) {
        this.products = [...res.data];
      }
    },
    // async basic(id) {
    //    let res = await axios.get(`https://fakestoreapi.com/products/${id}`)
    //    this.product = {...res.data}
    //    console.log(this.product);
    // }
  },
  mounted() {
    this.getPost();
  },
};
</script>




<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.container {
  max-width: 1300px;
  margin: auto;
  h1 {
    margin: 20px 0px;
    text-align: center;
    font-weight: 500;
    span {
      font-weight: 500;
      display: inline-block;
      transform: rotate(-15deg);
      color: rgb(63, 155, 236);
    }
  }
}
.wrapper {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 30px;
  .card {
    width: 250px;
    padding: 20px;
    background-color: rgba(206, 206, 206, 0.574);
    border-radius: 10px;
    cursor: pointer;
    &-img {
      height: 250px;
      overflow: hidden;
      border-radius: 10px;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
    &-title {
      margin-top: 15px;
      font-size: 18px;
    }
    &-price {
      margin-top: 20px;
    }
  }
}

// loader
.load {
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loader {
  --dim: 3rem;
  width: var(--dim);
  height: var(--dim);
  position: relative;
  animation: spin988 2s linear infinite;
}

.loader .circle {
  --color: #333;
  --dim: 1.2rem;
  width: var(--dim);
  height: var(--dim);
  background-color: var(--color);
  border-radius: 50%;
  position: absolute;
}

.loader .circle:nth-child(1) {
  top: 0;
  left: 0;
}

.loader .circle:nth-child(2) {
  top: 0;
  right: 0;
}

.loader .circle:nth-child(3) {
  bottom: 0;
  left: 0;
}

.loader .circle:nth-child(4) {
  bottom: 0;
  right: 0;
}

@keyframes spin988 {
  0% {
    transform: scale(1) rotate(0);
  }

  20%, 25% {
    transform: scale(1.3) rotate(90deg);
  }

  45%, 50% {
    transform: scale(1) rotate(180deg);
  }

  70%, 75% {
    transform: scale(1.3) rotate(270deg);
  }

  95%, 100% {
    transform: scale(1) rotate(360deg);
  }
}
</style>
