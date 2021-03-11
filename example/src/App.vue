<template>
  <div id="app">
    <p>渐进式加载图片</p>
    <Imgx :src="'https://img.kaikeba.com/91326120210202eutg.png'" width='100' height='100' :delayTime="0.6"/>
  </div>
</template>

<script>
import Imgx from '../../'

export default {
  name: 'app',
  components:{
    Imgx
  }
}

</script>

<style>

</style>
