<template>
  <img  :src="src" :alt="alt" @load="onLoad" :style="{opacity:loaded?'1':'0',position:'absolute',width:'100%',height:'100%',top:0,left:0,transition:'.5s'}"/>
</template>

<script>
export default {
  methods:{
    onLoad() {
      this.$emit("onLoad");
    },
  },
  props:{
    src:{type:String},
    loaded:{type:Boolean},
    alt:{type:String}
  }
}
</script>