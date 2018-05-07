import { Type, Color } from './enums';

export default {
  getColor: ({ props }) => {
    if (props.color) {
      return props.color;
    }

    if (props.type === Type.Panel) {
      return Color.White;
    }
    
    return Color.Green;
  }
};