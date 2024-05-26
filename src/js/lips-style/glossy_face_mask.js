import * as THREE from "three";
import { ColorUtils } from "../utils/color_utils";

export class GlossyFaceMask {
  constructor(_pattern, _texture) {
    const color = _pattern.colors[0];
    let newColor = ColorUtils.getColorWithIntensity(color, 100);
    let threeColor = new THREE.Color(newColor);

    const material = new THREE.MeshPhysicalMaterial({
      map: new THREE.TextureLoader().load(_texture, function (texture) {
        // texture.premultiplyAlpha = true;
        texture.flipY = false;
      }),
      transparent: true,
      side: THREE.FrontSide,
      roughness: 0.25,
      metalness: 0,
      envMapIntensity: 0,
      toneMapped: false,
      //specularColor: 0x00ff00,
      //specularIntensity: 1,

      //shadowSide: THREE.BackSide,
      color: threeColor,
    });

    this.MaterialArray = [material];
  }
  getMaterials() {
    return this.MaterialArray;
  }
}
