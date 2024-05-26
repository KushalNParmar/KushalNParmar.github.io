import * as THREE from "three";
import { LipsStyle } from "./lips_style"; // Import LipsStyle class

import GlitterAOTexture from "../../assets/Lips_4.png";
import GlitterColorMaskTexture from "../../assets/Lips_Shimmer_2.png";

var vertexShader = [
  "varying vec2 vUv;",
  "void main() {",
  "  vUv = uv;",
  "  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);",
  "}",
].join("\n");

var fragmentShader = [
  "uniform sampler2D makeupTexture;", // The texture you want to render
  "uniform vec3 colorValue;", // Uniform for controlling color
  "uniform float opacityValue;", // Uniform for controlling opacity
  "varying vec2 vUv;",
  "void main() {",
  "  vec4 textureColor = texture2D(makeupTexture, vUv);",
  "  if (textureColor.a < 0.01) {",
  "    discard;",
  "  }",
  "  gl_FragColor = vec4(textureColor.rgb * colorValue, textureColor.a * opacityValue);", // Multiply texture color with the specified color and opacity
  "}",
].join("\n");

export class GlitterFaceMask extends LipsStyle {
  constructor(apiResponseData, scene, width, height) {
    /*
    const material = new THREE.ShaderMaterial({
      vertexShader: vertexShader, // Your vertex shader code
      fragmentShader: fragmentShader, // Your modified fragment shader code
      uniforms: {
        makeupTexture: {
          value: new THREE.TextureLoader().load(
            GlitterAOTexture,
            function (texture) {
              // texture.premultiplyAlpha = true;
              texture.flipY = false;
            }
          ),
        },
        opacityValue: { value: 1 },
        colorValue: { value: new THREE.Vector3(1, 1, 1) },
      },

      transparent: true,
      color: 0xff0000,
    });
    material.uniforms.colorValue.value.set(1, 0, 0); // Example: set color to RGB(0.2, 0.5, 0.8)
    material.uniforms.opacityValue.value = 0.6;

    const material1 = new THREE.ShaderMaterial({
      vertexShader: vertexShader, // Your vertex shader code
      fragmentShader: fragmentShader, // Your modified fragment shader code
      uniforms: {
        makeupTexture: {
          value: new THREE.TextureLoader().load(
            GlitterColorMaskTexture,
            function (texture) {
              texture.flipY = false;
            }
          ),
        },
        opacityValue: { value: 1 },
        colorValue: { value: new THREE.Vector3(1, 1, 1) },
      },

      transparent: true,
      color: 0xff0000,
    });
    material1.uniforms.colorValue.value.set(1, 1, 1); // Example: set color to RGB(0.2, 0.5, 0.8)
    material1.uniforms.opacityValue.value = 0.6;
    material1.needsUpdate = true;
    */

    const material = new THREE.MeshPhysicalMaterial({
      map: new THREE.TextureLoader().load(GlitterAOTexture, function (texture) {
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
      //shadowSide: THREE.BackSide,
    });
    const material1 = new THREE.MeshPhysicalMaterial({
      map: new THREE.TextureLoader().load(
        GlitterColorMaskTexture,
        function (texture) {
          // texture.premultiplyAlpha = true;
          texture.flipY = false;
        }
      ),
      transparent: true,
      side: THREE.DoubleSide,
      roughness: 0.5,
      metalness: 1,
      envMapIntensity: 1,
      toneMapped: false,
      specularIntensity: 1,
      emissiveIntensity: 1,
      emissive: 0x00ff00,
      // envMapIntensity: 1,
      // emissiveMap: new THREE.TextureLoader().load(
      //   GlitterColorMaskTexture,
      //   function (texture) {
      //     // texture.premultiplyAlpha = true;
      //     texture.flipY = false;
      //   }
      // ),

      //shadowSide: THREE.BackSide,
    });

    const materialsArray = [material, material1];
    super(apiResponseData, scene, width, height, materialsArray);
  }
}
