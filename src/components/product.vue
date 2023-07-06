<template lang="">
  <div class="shop">
    <h2 class="buy">Xarid qilish</h2>
    <div v-if="post.title" class="shop-card">
      <div class="shop-card__left">
        <div class="shop-img">
          <img :src="`${this.post.image}`" alt="" />
        </div>
      </div>
      <div class="shop-card__right">
        <div class="title">{{ post.title }}</div>
        <div class="description">{{ post.description }}</div>
        <div class="price">${{ post.price }}</div>
        <div class="d-flex">
          <div class="rating">{{ rating }}+</div>
          <div class="count">Count {{ count }}</div>
        </div>
        <div class="category">
          Category: <span>{{ post.category }}</span>
        </div>
        <button @click="back()" class="shop-btn">ortga</button>
      </div>
    </div>
    <div v-else class="load">
      <div class="loader">
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
        <div class="circle"></div>
      </div>
    </div>
    <div class="products">
      <div class="product" v-for="item,index of newProduct" ::key="index">
        <div class="product-img">
          <img :src="item.image" alt="">
        </div>
        <div class="product-title">
          {{item.title}}
        </div>
        <div class="product-price">
          $ {{item.price}}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data: () => ({
    id: "",
    post: {},
    postProduct: [],
    newProduct: [],
    rating: "",
    count: "",
    name: "",
    number: ''
  }),
  methods: {
    async getPostById() {
      let res = await axios.get(`https://fakestoreapi.com/products/${this.id}`);
      if (res.status === 200) {
        this.post = { ...res.data };
        this.rating = this.post.rating.rate;
        this.count = this.post.rating.count;
        this.name = this.post.category 
        this.number = this.post.id
      }
      let resProduct = await axios.get(`https://fakestoreapi.com/products`);
      if (resProduct.status === 200) {
        this.postProduct = [...resProduct.data]
        this.newProduct = this.postProduct.filter((item) => item.category.trim() === this.name.trim() && item.id !== this.number)
      }
      console.log(this.newProduct);
    },
    back() {
      this.$router.push("/");
    },

    

  },
  mounted() {
    this.id = this.$route.params.id;
    this.getPostById();
  },
};
</script>



<style lang="scss">
.shop {
  max-width: 1200px;
  margin: 50px auto 0px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px #000;
  h2 {
    margin: 20px 0px;
    text-align: center;
  }
  &-btn {
    border: 0;
    background-color: #2b8dd3;
    color: #fff;
    font-size: 16px;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      opacity: 0.8;
      clip-path: polygon(25% 0%, 100% 0%, 100% 100%, 25% 100%, 0% 50%);
    }
    &:active {
      transform: translateX(-10px);
    }
  }
  &-img {
    text-align: center;
  }
  &-card {
    padding: 20px 0px;
    display: flex;
    &__left {
      width: 50%;
    }
    &__right {
      padding: 15px;
      width: 50%;
      .title {
        font-size: 30px;
      }
      .description {
        margin-top: 20px;
        margin-bottom: 30px;
        font-size: 15px;
        line-height: 23px;
      }
      .price {
        font-size: 23px;
        padding: 10px;
        display: inline-block;
        color: #fff;
        background-color: #d13f3f;
        border-radius: 10px;
      }
      .d-flex {
        margin: 25px 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
      .category {
        margin-bottom: 40px;
        font-size: 20px;
        span {
          font-size: 16px;
        }
      }
    }
  }
  &-img {
    height: 500px;
    img {
      width: 60%;
      height: 100%;
      object-fit: cover;
    }
  }
  .rating {
    font-size: 80px;
    font-weight: 500;
  }
  .count {
    padding: 10px;
    border-radius: 10px;
    font-size: 16px;
    background-color: rgb(51, 176, 51);
    display: inline-block;
    color: #fff;
  }
}
.products {
  padding: 30px 0px;
  
  display: flex;
  justify-content: space-evenly;
  gap: 20px;
  flex-wrap: wrap;
  .product {
    width: 250px;
    box-shadow: 0px 0px 5px;
    border-radius: 5px;
    &-img {
      height: 250px;
      text-align: center;
    }
    img {
      width: 80%;
      height: 100%;
      object-fit: cover;
    }
    &-title {
      margin: 20px 0px;
      font-size: 18px;
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

  20%,
  25% {
    transform: scale(1.3) rotate(90deg);
  }

  45%,
  50% {
    transform: scale(1) rotate(180deg);
  }

  70%,
  75% {
    transform: scale(1.3) rotate(270deg);
  }

  95%,
  100% {
    transform: scale(1) rotate(360deg);
  }
}
</style>
