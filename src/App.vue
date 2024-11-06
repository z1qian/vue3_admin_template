<script setup lang="ts" name="App">
let str = "我爱你祖国";

const testMethod=()=>
{
  console.log("test");
}

testMethod()
</script>

<template>
  <div class="box">
    <h1>我是App</h1>
  </div>
</template>

<style scoped lang="scss">
.box{
  width: 600px;
  height: 400px;
  background-color: black;
  h1{
    color: white;
  }
}
</style>
