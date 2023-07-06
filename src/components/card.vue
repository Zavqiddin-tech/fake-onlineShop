<template lang="">
    <div class="card">
        <div class="card-img">
           <img :src="`${product.image}`" alt="">
        </div>
        <div class="card-title">
            {{product.title}}
        </div>
        <div class="card-price">
            {{product.price}}
        </div>
    </div>
</template>
<script>
export default {
    props: ['product']
}
</script>
<style lang="">
    
</style>