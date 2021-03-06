import Image from '../models/Image';

export default {
  render(image: Image) {
    return `http://localhost:3333/uploads/${image.path}`;
  },

  renderMany(images: Image[]) {
    return images.map(image => this.render(image));
  },
};
