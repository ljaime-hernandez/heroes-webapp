let heroImages = () => ({default: ''});
 
try {
  heroImages = require.context('../assets',true);
} catch (e){};

export const loadImage = (image) => (heroImages(`./${image}`));