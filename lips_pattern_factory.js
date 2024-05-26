import { StyleFactory } from "../style_factory";
import { GlossyFaceMask } from "./glossy_face_mask";
import { ShimmerFaceMask } from "./shimmer_face_mask";
import { MatteFaceMask } from "./matte_face_mask";
import { GlitterFaceMask } from "./glitter_face_mask";
import { hideSnackbar, showSnackbar } from "../utils/snackbar";
import { emitModuleClosed } from "../utils/event";
import { PatternFactory } from "../pattern_factory";

export class LipsPatternFactory extends PatternFactory {
  constructor() {
    super();
    this.pattern = {
      matte: MatteFaceMask,
      glossy: GlossyFaceMask,
      shimmer: ShimmerFaceMask,
    };

    this.patternClass = null;
  }

  createPattern(_pattern, _texture) {
    // console.log(_pattern.type);
    let patternType = _pattern.name;
    this.patternClass = this.pattern[patternType.toLowerCase()];
    if (!this.patternClass) {
      showSnackbar().then(() => {
        setTimeout(() => {
          emitModuleClosed();
          hideSnackbar();
        }, 2000);
      });
      throw new Error(`Unsupported pattern` + patternType);
    }
    return new this.patternClass(_pattern, _texture);
  }

  getPatternMaterials() {
    //console.log(this.patternClass.MaterialArray);
    return this.patternClass.this.getMaterials();
  }
}
