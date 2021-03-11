<template>
  <div :style="{position:'relative',overflow:'hidden',height,width}" >
    <img :src="handlePlaceholderSrc()" style="display: block;width:100%;height:100%;opacity:1" />
    <LazyLoadImage :src='imgUrl' @onLoad="onLoad" :loaded="loaded" :alt="alt"/>
    <div :style="{
      width:'100%',
      height:'100%',
      position:'absolute',
      left:0,
      top:0,
      backgroundColor: 'transparent',
      ...loadedClassName,
      ...blurLayoutCss
    }">
      <img
          :src="handlePlaceholderSrc()"
          :style="{
            width: '100%',
            height: '100%'
          }"
          :alt="alt||''"
        />
    </div>
  </div>
</template>

<script>
import { checkWebpFeature, getImgGzip } from 'utils/util';
import LazyLoadImage from './LazyLoadImage'
let iswebp = false
const pattern = new RegExp('http(s)?://[^s]*');
const defaultImg = 'https://img.kaikeba.com/22857172219102bybu.jpeg';
const imglazyLoadInit = {
  filter: 'blur(20px)',
  opacity: 1,
};
const imglazyLoadLoaded = {
  filter: 'blur(0px)',
  opacity: 0,
  transition: 'filter ease 1',
  animationFillMode: 'both',
};
export default {
  data(){
    return{
      loaded:false,
      imgUrl:'',
      loadedClassName:imglazyLoadInit,
      blurTimer:null,
      img2:"",
      blurLayoutCss:{
        zIndex: 2,
      },
    }
  },
  components:{
    LazyLoadImage
  },
  mounted(){
    this.img2 = this.handlePlaceholderSrc()
    this.handleImgUrl()

  },
  methods:{
   
    async handleImgUrl(){
      const {src,imgHitWidth,quality} = this
      iswebp = await checkWebpFeature();
      const newUrlStr = getImgGzip({ src, width: imgHitWidth, quality, iswebp });
      this.imgUrl = newUrlStr
    },
    onLoad(){
      const {delayTime} = this
      const _time = delayTime || 0.6;
      this.loadedClassName = {
        transitionDuration: `${_time}s`,
        ...imglazyLoadLoaded,
      }
      this.$emit("beforeLoad");
      // 动效remove
      this.blurTimer = setTimeout(() => {
        this.loaded = 1
        this.blurLayoutCss = {
          zIndex: -1,
          display: 'none',
        }
      }, _time * 1000);
    },
    // 占位符图片url
    handlePlaceholderSrc(){
      const {src,placeholderSrc,imageLoadType} = this
      const {fillerPlaceholderSrc} = this
      let curSrc = src;
      curSrc = pattern.test(src) ? fillerPlaceholderSrc(src) : defaultImg;

      // 占位低清晰图支持类型
      const newImgType = {
        qiniu: `${curSrc}?imageMogr2/thumbnail/100x`,
        oss: '',
        custom: placeholderSrc, // 用户自定义
      };
      return newImgType[imageLoadType] || '';
    },
    // 过滤缩略图参数
    fillerPlaceholderSrc(url){
      let newUrlStr = url;
      if (/\?(imageView2|imageMogr2)\//.test(newUrlStr)) {
        const reg = newUrlStr.match(/(?<u>.*)\?.*/);
        newUrlStr = reg?.groups?.u || newUrlStr;
      }
      return newUrlStr || '';
    },
   
    
  },
  props: {
    imageLoadType: {type: String,default: 'qiniu'}, // 低清晰图类型，custom自定义, qiniu七牛
    placeholderSrc: {type: String,default: ''}, // 自定义低清晰url
    delayTime:{type:Number}, // 动画持续时间
    src: {type:String,default:""},
    onClick:{type:Function},
    isHttps:{type:Boolean,default:true},
    height: {type: String,default: 'auto'},
    width:{type: String,default:'100%'},
    className:{type: String,default:''},
    quality:{type:Number,default:75},
    alt:{type:String,default:''},
  },
}
</script>

