export const checkServer = typeof window === 'undefined';



// 判断是否webp
export const checkWebpFeature = () => {
  return new Promise((reslove) => {
    const img = new Image();
    img.onload = function () {
      const result = img.width > 0 && img.height > 0;
      reslove(result);
    };
    img.onerror = function () {
      reslove(false);
    };
    img.src =
      'data:image/webp;base64,' +
      'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA';
  });
};



// 七牛压缩指定宽
export const getImgGzip = ({
  src,
  width,
  quality = 75,
  iswebp,
}) => {

  let newUrl = src;
  if (!/\?(imageView2|imageMogr2)\//.test(newUrl)) {
    newUrl = `${src}?imageMogr2/quality/${quality}`;
    if (width) {
      newUrl += `/thumbnail/${width || ''}x`;
    }

    if (iswebp) {
      newUrl += `/format/webp`;
    }
  }

  return newUrl;
};
