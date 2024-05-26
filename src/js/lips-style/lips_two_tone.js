import * as THREE from "three";
import { LipsStyle } from "./lips_style"; // Import LipsStyle class
import MatteAOTextureUpper from "../../assets/Lips_Matte_Top.png";
import MatteAOTextureLower from "../../assets/Lips_Matte_Lower.png";
import ShimmerAOTextureLower from "../../assets/lips_bottom_shimmer.png";
import ShimmerAOTextureUpper from "../../assets/lips_top_shimmer.png";

import { getMatteFaceMask } from "./matte_face_mask";
import { ColorUtils } from "../utils/color_utils";
import { LipsPatternFactory } from "./lips_pattern_factory";

export class LipsTwoTone extends LipsStyle {
  constructor(sku, scene, width, height) {
    let patternDefaultTexturesU = {
      matte: MatteAOTextureUpper,
      glossy: MatteAOTextureUpper,
      shimmer: [MatteAOTextureUpper, ShimmerAOTextureUpper],
    };
    let patternDefaultTexturesL = {
      matte: MatteAOTextureLower,
      glossy: MatteAOTextureLower,
      shimmer: [MatteAOTextureLower, ShimmerAOTextureLower],
    };
    let materialsArray = [];
    // console.log(sku.attributes.patterns);
    for (let i = 0; i < sku.attributes.length; i++) {
      const lipsPatternFactory = new LipsPatternFactory();
      if (i === 0) {
        const pattern = lipsPatternFactory.createPattern(
          sku.attributes[i],
          patternDefaultTexturesU[sku.attributes[i].name.toLowerCase()] //need to change with link data
        );
        materialsArray.push(...pattern.getMaterials());
      } else if (i === 1) {
        const pattern = lipsPatternFactory.createPattern(
          sku.attributes[i],
          patternDefaultTexturesL[sku.attributes[i].name.toLowerCase()] //need to change with link data
        );
        materialsArray.push(...pattern.getMaterials());
      }
      //materialsArray.push(...pattern.getMaterials());
    }
    //console.log("asfasf" + materialsArray.length);

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
