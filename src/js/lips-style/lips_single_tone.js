import * as THREE from "three";
import { LipsStyle } from "./lips_style"; // Import LipsStyle class
import MatteAOTexture from "../../assets/Lips_4.png";

import ShimmerAOTexture from "../../assets/Lips_Shimmer_2.png";

import { getMatteFaceMask } from "./matte_face_mask";
import { ColorUtils } from "../utils/color_utils";
import { LipsPatternFactory } from "./lips_pattern_factory";

export class LipsSingleTone extends LipsStyle {
  constructor(sku, scene, width, height) {
    let patternDefaultTextures = {
      matte: MatteAOTexture,
      glossy: MatteAOTexture,
      shimmer: [MatteAOTexture, ShimmerAOTexture],
    };
    let materialsArray = [];
    for (let i = 0; i < sku.attributes.length; i++) {
      const lipsPatternFactory = new LipsPatternFactory();
      const pattern = lipsPatternFactory.createPattern(
        sku.attributes[i],
        patternDefaultTextures[sku.attributes[i].name.toLowerCase()] //need to change with link data
      );
      materialsArray.push(...pattern.getMaterials());
    }

    super(sku, scene, width, height, materialsArray);
  }
  // getDefaultTexture(type) {
  //   if (type === "matte") {
  //     return MatteAOTexture;
  //   } else if (type === "glossy") {
  //     return GlossyAOTexture;
  //   } else if (type === "shimmer") {
  //     return ShimmerAOTexture;
  //   }
  // }
}
