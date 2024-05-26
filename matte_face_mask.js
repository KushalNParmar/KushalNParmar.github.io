import * as THREE from "three";
import { ColorUtils } from "../utils/color_utils";

export class MatteFaceMask {
  constructor(_pattern, _texture) {
    // console.log(_pattern);
    const color = _pattern.colors[0];
    let newColor = ColorUtils.getColorWithIntensity(color, 100);
    let threeColor = new THREE.Color(newColor);

    const material = new THREE.MeshBasicMaterial({
      map: new THREE.TextureLoader().load(_texture, function (texture) {
        // texture.premultiplyAlpha = true;
        texture.flipY = false;
      }),
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 1,
      metalness: 0,
      envMapIntensity: 0,
      toneMapped: false,
      color: threeColor,
    });

    this.MaterialArray = [material];
  }

  getMaterials() {
    return this.MaterialArray;
  }
}

// export function getMatteFaceMask(_texture, _color) {
//   const material = new THREE.MeshBasicMaterial({
//     map: new THREE.TextureLoader().load(_texture, function (texture) {
//       // texture.premultiplyAlpha = true;
//       texture.flipY = false;
//     }),
//     transparent: true,
//     side: THREE.DoubleSide,
//     roughness: 1,
//     metalness: 0,
//     envMapIntensity: 0,
//     toneMapped: false,
//     color: _color,
//   });

//   return material;
// }
