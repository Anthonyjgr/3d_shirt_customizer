import { proxy } from "valtio";

const state = proxy({
  intro: true,
  color: "#d56905",
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: "./base_img.webp",
  fullDecal: "./threejs.png",
});

export default state;
