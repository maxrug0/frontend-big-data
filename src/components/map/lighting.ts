import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';

const ambientLight = new AmbientLight({
  color: [255, 255, 255],
  intensity: 1.0
});

const pointLight1 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [12.4964, 41.9028, 80000]
});

const pointLight2 = new PointLight({
  color: [255, 255, 255],
  intensity: 0.8,
  position: [12.5964, 41.8028, 8000]
});

export const lightingEffect = new LightingEffect({
  ambientLight,
  pointLight1,
  pointLight2
});