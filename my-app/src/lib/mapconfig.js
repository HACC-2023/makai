import { AmbientLight, PointLight, LightingEffect } from "@deck.gl/core";

// Configurations for the rendering on top of the map
export const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0,
});

export const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-0.144528, 49.739968, 80000],
});

export const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [-3.807751, 54.104682, 8000],
});

export const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2,
});

export const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51],
};

export const INITIAL_VIEW_STATE = {
  longitude: -157,
  latitude: 21,
  zoom: 5.6,
  // minZoom: 5, temporarily commenting this out for testing
  maxZoom: 15,
  pitch: 40.5,
  bearing: 0
};

export const INITIAL_VIEW_STATE_CLICK_MAP = {
  zoom: 5.6,
  maxZoom: 15,
}

export const colorRange = [
  [1, 152, 189],
  [73, 227, 206],
  [216, 254, 181],
  [254, 237, 177],
  [254, 173, 84],
  [209, 55, 78],
];
