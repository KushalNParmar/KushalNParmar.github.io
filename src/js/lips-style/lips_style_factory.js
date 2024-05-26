import { StyleFactory } from "../style_factory";
import { GlossyFaceMask } from "./glossy_face_mask";
import { ShimmerFaceMask } from "./shimmer_face_mask";
import { MatteFaceMask } from "./matte_face_mask";
import { GlitterFaceMask } from "./glitter_face_mask";
import { hideSnackbar, showSnackbar } from "../utils/snackbar";
import { emitModuleClosed } from "../utils/event";
import { LipsSingleTone } from "./lips_single_tone";
import { LipsTwoTone } from "./lips_two_tone";

export class LipsStyleFactory extends StyleFactory {
  constructor() {
    super();
    this.lipStyles = {
      single: LipsSingleTone,
      dual: LipsTwoTone,
    };
  }

  createStyle(apiResponseData, scene, width, height) {
    const styleType = apiResponseData.sku.styleVariant;
    const LipStyleClass = this.lipStyles[styleType.toLowerCase()];
    if (!LipStyleClass) {
      showSnackbar().then(() => {
        setTimeout(() => {
          emitModuleClosed();
          hideSnackbar();
        }, 2000);
      });
      throw new Error(`Unsupported lips style`);
    }
    return new LipStyleClass(apiResponseData.sku, scene, width, height);
  }
}
