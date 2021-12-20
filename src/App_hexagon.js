// // this is a legacy version of the project kept as a reference for some settings
// // plays no role in the final result

// import React from 'react';
// import { render } from 'react-dom';
// import { StaticMap } from 'react-map-gl';
// import DeckGL from '@deck.gl/react';
// import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
// import { HexagonLayer } from '@deck.gl/aggregation-layers';

// const MALE_COLOR = [0, 128, 255];
// const FEMALE_COLOR = [255, 0, 128];

// // Source data CSV
// const DATA_URL =
//   'https://raw.githubusercontent.com/farazatarodi/deck.gl-animated-map/main/src/amarJSON/coords_shahr.json'; // eslint-disable-line

// const ambientLight = new AmbientLight({
//   color: [255, 255, 255],
//   intensity: 1.0,
// });

// const pointLight1 = new PointLight({
//   color: [255, 255, 255],
//   intensity: 0.8,
//   position: [-0.144528, 49.739968, 80000],
// });

// const pointLight2 = new PointLight({
//   color: [255, 255, 255],
//   intensity: 0.8,
//   position: [-3.807751, 54.104682, 8000],
// });

// const lightingEffect = new LightingEffect({
//   ambientLight,
//   pointLight1,
//   pointLight2,
// });

// const material = {
//   ambient: 0.64,
//   diffuse: 0.6,
//   shininess: 32,
//   specularColor: [51, 51, 51],
// };

// const INITIAL_VIEW_STATE = {
//   longitude: 53.688046,
//   latitude: 32.427908,
//   zoom: 5,
//   maxZoom: 15,
//   // minZoom: 5,
//   pitch: 0,
//   bearing: 0,
// };

// export const colorRange = [
//   [1, 152, 189],
//   [73, 227, 206],
//   [216, 254, 181],
//   [254, 237, 177],
//   [254, 173, 84],
//   [209, 55, 78],
// ];

// function getTooltip({ object }) {
//   if (!object) {
//     return null;
//   }
//   const lat = object.lat;
//   const lon = object.lon;
//   const count = object.pop;

//   return `\
//     latitude: ${Number.isFinite(lat) ? lat.toFixed(6) : ''}
//     longitude: ${Number.isFinite(lon) ? lon.toFixed(6) : ''}
//     name: ${object.shahr}
//     district: ${object.district}
//     ${count} People`;
// }

// export default function App({
//   data = DATA_URL,
//   radius = 10000,
//   maleColor = MALE_COLOR,
//   femaleColor = FEMALE_COLOR,
//   mapStyle = 'mapbox://styles/farazata/ckotw3907212p18l92zygk52c',
//   upperPercentile = 100,
//   coverage = 1,
// }) {
//   const layers = [
//     new HexagonLayer({
//       id: 'scatter-plot',
//       colorRange,
//       coverage,
//       data,
//       radius,
//       radiusMinPixels: 5,
//       elevationRange: [0, 3000],
//       elevationScale: 25,
//       extruded: true,
//       upperPercentile,
//       getElevation: (d) => d.pop / 10000,
//       material,
//       getPosition: (d) => d.lon !== '#' && [d.lon, d.lat],
//       // getFillColor: (d) => (d.m > d.f ? maleColor : femaleColor),
//       getRadius: 10,
//       updateTriggers: {
//         getFillColor: [maleColor, femaleColor],
//       },
//       pickable: true,
//     }),
//   ];

//   return (
//     <DeckGL
//       layers={layers}
//       effects={[lightingEffect]}
//       initialViewState={INITIAL_VIEW_STATE}
//       controller={true}
//       getTooltip={getTooltip}
//     >
//       <StaticMap
//         reuseMaps
//         mapStyle={mapStyle}
//         preventStyleDiffing={true}
//         mapboxApiAccessToken="pk.eyJ1IjoiZmFyYXphdGEiLCJhIjoiY2tvdHcxaTV4MDB5MTJ6bjdzdGhkMzduOSJ9.bzS9EpU16PCr7gA0ZabGyg"
//       />
//     </DeckGL>
//   );
// }

// export function renderToDOM(container) {
//   render(<App />, container);
// }
