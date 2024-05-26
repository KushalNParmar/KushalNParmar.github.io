import * as THREE from "three";
import textureMapping from "../three_components/texture_mapping";
import { makeGeometry } from "../facemesh/landmarks_helpers";
import { ColorUtils } from "../utils/color_utils";
import { hideSnackbar, showSnackbar } from "../utils/snackbar";
import { emitModuleClosed } from "../utils/event";
import {
  getOpacitySliderValue,
  setDefaultOpacitySliderValue,
  setOpacitySliderValue,
} from "../utils/sliderHandler";
import { setDefaultOpacitySlider } from "../../htmlService/configSlider";
import { FlickerSmoother } from "../three_components/FlickerSmoother";

export class LipsStyle {
  constructor(sku, scene, width, height, materials) {
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.materialArray = materials;
    this.needsUpdate = false;
    this.landmarks = null;
    this.faces = [];
    this.flickerSmoother = new FlickerSmoother();
    this.Prevlandmark;
    this.PrevlandmarkBase;

    this.colorIntensity = 1;
    //const pattern = apiResponseData.config.st[0];
    //if (pattern) {
    // const patternName = pattern.name;
    // const colorKey = `${patternName}Color`;
    // const colorIntensityKey = `${patternName}ColorIntensity`;

    // const color = pattern[colorKey];
    this.colorIntensity = sku.meta.colorIntensity / 100;
    //this.colorIntensity = pattern[colorIntensityKey] / 100;
    setDefaultOpacitySlider(this.colorIntensity);
    setDefaultOpacitySliderValue(this.colorIntensity);
    setOpacitySliderValue(this.colorIntensity);
    this.setOpacity(this.colorIntensity);

    // const newColor = ColorUtils.getColorWithIntensity(
    //   color,
    //   this.colorIntensity
    // );
    // this.changeTextureColor(newColor, this.colorIntensity);

    //console.log(`${patternName}Color:`, color);
    //console.log(`${patternName}ColorIntensity:`, colorIntensity);
    // } else {
    //   showSnackbar().then(() => {
    //     setTimeout(() => {
    //       emitModuleClosed();
    //       hideSnackbar();
    //     }, 2000);
    //   });
    //   console.log("Pattern not found");
    // }
  }

  updateDimensions(width, height) {
    this.width = width;
    this.height = height;
    this.needsUpdate = true;
  }

  updateLandmarks(landmarks) {
    //
    this.landmarks = landmarks;

    this.needsUpdate = true;
  }

  addFaces() {
    // let difference = Number.MAX_VALUE;
    // let tempPrevlandmark = new THREE.Vector3(
    //   this.landmarks[0].x,
    //   this.landmarks[0].x,
    //   this.landmarks[0].x
    // );
    // if (this.PrevlandmarkBase) {
    //   difference = this.PrevlandmarkBase.distanceTo(tempPrevlandmark);
    // }
    // this.PrevlandmarkBase = tempPrevlandmark;

    // if (difference > this.flickerSmoother.currentvector.x) {
    for (let i = 0; i < this.materialArray.length; i++) {
      let landmarks;

      // if (this.Prevlandmark) {
      //   landmarks = this.flickerSmoother.smoothAndFilterLandmarksAll(
      //     this.Prevlandmark,
      //     this.landmarks
      //   );
      // } else

      landmarks = this.landmarks;
      this.Prevlandmark = this.landmarks;
      let geometry = makeGeometry(landmarks);
      if (!this.faces || this.faces.length <= i) {
        let tempface = new THREE.Mesh(geometry, this.materialArray[i]);
        this.faces.push(tempface);
        this.scene.add(tempface);
        this.faces[i].receiveShadow = false; // Disable receiving shadows
        this.faces[i].castShadow = false; // Disable casting shadows
        this.faces[i].position.set(0, 0, 0);
        this.faces[i].name = "makeup";
      } else {
        this.faces[i].geometry = geometry;
        this.faces[i].material = this.materialArray[i];
      }
      this.faces[i].scale.set(this.width, this.height, this.width);
      // this.facesAlt = new THREE.Mesh(geometry, this.materialArray[i]);
    }

    // if (this.materialArray.length > 1) {
    //   this.faces1 = new THREE.Mesh(geometry, this.materialArray[1]);
    //   this.faces1.receiveShadow = false; // Disable receiving shadows
    //   this.faces1.castShadow = false; // Disable casting shadows
    //   this.faces1.position.set(0, 0, 0);
    //   this.faces1.scale.set(this.width, this.height, this.width);
    //   this.scene.add(this.faces1);
    // }
    // }
  }

  setVisibility(state) {
    this.materialArray.forEach((material) => {
      if (material.visible !== state) {
        material.visible = state;
      }
    });
  }

  removeFaces() {
    this.scene.remove(this.faces);
    // if (this.materialArray.length > 1) {
    //   this.scene.remove(this.faces1);
    // }
    while (!!this.scene.getObjectByName("makeup")) {
      this.scene.remove(this.scene.getObjectByName("makeup"));
    }

    this.faces = [];
  }

  update() {
    if (this.needsUpdate) {
      if (this.faces != null) {
        // this.removeFaces();
      }
      if (this.landmarks != null) {
        this.addFaces();
      }
      this.needsUpdate = false;
    }
    if (this.faces != null && this.landmarks != null) {
      this.updateOpacity();
    }
  }

  updateOpacity() {
    this.materialArray.forEach((material) => {
      //material.uniforms.opacityValue.value = getOpacitySliderValue();
      material.opacity = getOpacitySliderValue();
    });
  }

  changeTexture(textureName) {
    var textureLoader = new THREE.TextureLoader();
    var newTexture = textureLoader.load(
      textureMapping[textureName],
      function (newTexture) {
        newTexture.flipY = false;
        this.material.map = newTexture;
        this.material.needsUpdate = true;
        this.material.opacity = 1.0;
      }.bind(this) // Added bind(this) to retain the context
    );
  }

  // changeTextureColor(color, intensity) {
  //   var newColorValue = new THREE.Color(color);
  //   if (this.materialArray[0].uniforms.colorValue === undefined) {
  //     this.materialArray[0].uniforms.colorValue = { value: newColorValue };
  //     this.materialArray.forEach((material) => {
  //       material.uniforms.opacityValue.value = intensity;
  //     });
  //   } else {
  //     this.materialArray[0].uniforms.colorValue.value = newColorValue;
  //     this.materialArray.forEach((material) => {
  //       material.uniforms.opacityValue.value = intensity;
  //     });
  //   }
  //   this.materialArray[0].needsUpdate = true;
  //   console.log("changeTextureColor");
  // }

  setOpacity(intensity) {
    this.materialArray.forEach((material) => {
      material.opacity = intensity;
      material.needsUpdate = true;
      //if (material.emissive) material.emissive.setHex(newColorValue);
    });

    // if (this.materialArray[0].color === undefined) {
    //   this.materialArray[0].uniforms.colorValue = { value: newColorValue };
    //   this.materialArray.forEach((material) => {
    //     material.uniforms.opacityValue.value = intensity;
    //   });
    // } else {
    //   this.materialArray[0].uniforms.colorValue.value = newColorValue;
    //   this.materialArray.forEach((material) => {
    //     material.uniforms.opacityValue.value = intensity;
    //   });
    // }
    //this.materialArray[0].needsUpdate = true;
    // console.log("changeTextureColor");
  }
}
