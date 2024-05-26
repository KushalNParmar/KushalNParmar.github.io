import * as THREE from "three";
import ShimmerAOTexture from "../../assets/Lips_Shimmer_2.png";
import { ColorUtils } from "../utils/color_utils";

export class ShimmerFaceMask {
  constructor(_pattern, _texture) {
    const color = _pattern.colors[0];
    let newColor = ColorUtils.getColorWithIntensity(color, 100);
    let threeColor1 = null;
    let threeColor = new THREE.Color(newColor);
    if (_pattern.colors.length > 1) {
      const color1 = _pattern.colors[1];
      let newColor1 = ColorUtils.getColorWithIntensity(color1, 100);
      threeColor1 = new THREE.Color(newColor1);
    } else {
      threeColor1 = new THREE.Color("0xffffff");
    }

    const material = new THREE.MeshPhysicalMaterial({
      map: new THREE.TextureLoader().load(_texture[0], function (texture) {
        // texture.premultiplyAlpha = true;
        texture.flipY = false;
      }),
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.25,
      metalness: 0,
      specularIntensity: 1,
      envMapIntensity: 0,
      toneMapped: false,
      color: threeColor,
    });
    const material1 = new THREE.MeshPhysicalMaterial({
      map: new THREE.TextureLoader().load(_texture[1], function (texture) {
        // texture.premultiplyAlpha = true;
        texture.flipY = false;
      }),
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 1,
      envMapIntensity: 1,
      toneMapped: false,
      specularIntensity: 1,
      emissiveIntensity: 1,
      emissive: threeColor1,
      color: threeColor1,
    });

    this.MaterialArray = [material, material1];
  }
  getMaterials() {
    return this.MaterialArray;
  }
}
