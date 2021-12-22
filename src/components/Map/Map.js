import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import { ColumnLayer } from '@deck.gl/layers';
import { useSelector } from 'react-redux';
import dotenv from 'dotenv';

const Map = () => {
  const { id, coords, limit, radius } = useSelector(
    (state) => state.dataReducer
  );

  // mapbox parameters
  dotenv.config();
  const token = process.env.REACT_APP_TOKEN;
  const style = process.env.REACT_APP_STYLE;

  // initial view settings
  const wHeight = window.innerHeight;

  const INITIAL_VIEW_STATE = {
    longitude: 53.688046,
    latitude: 32.427908,
    zoom: 5.5 * (wHeight / 1000),
    maxZoom: 15,
    minZoom: 5.5 * (wHeight / 1000),
    pitch: 40.5,
    bearing: 0,
  };

  // material settings of columns
  const material = {
    ambient: 0.64,
    diffuse: 0.6,
    shininess: 32,
    specularColor: [51, 51, 51],
  };

  // light sources for deck.gl
  const ambientLight = new AmbientLight({
    color: [255, 255, 255],
    intensity: 1.0,
  });

  const pointLight1 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [57.625017, 24.35797, 80000],
  });

  const pointLight2 = new PointLight({
    color: [255, 255, 255],
    intensity: 0.8,
    position: [43.421851, 41.508357, 8000],
  });

  const lightingEffect = new LightingEffect({
    ambientLight,
    pointLight1,
    pointLight2,
  });

  // function to convert hsl to rgb
  const HSLToRGB = (h, s, l) => {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
      m = l - c / 2,
      r = 0,
      g = 0,
      b = 0;

    if (0 <= h && h < 60) {
      r = c;
      g = x;
      b = 0;
    } else if (60 <= h && h < 120) {
      r = x;
      g = c;
      b = 0;
    } else if (120 <= h && h < 180) {
      r = 0;
      g = c;
      b = x;
    } else if (180 <= h && h < 240) {
      r = 0;
      g = x;
      b = c;
    } else if (240 <= h && h < 300) {
      r = x;
      g = 0;
      b = c;
    } else if (300 <= h && h < 360) {
      r = c;
      g = 0;
      b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    var output = [r, g, b];
    return output;
  };

  // deck.dl column layer
  const layers = [
    new ColumnLayer({
      id: 'scatter-plot',
      coverage: 1,
      data: coords,
      radius: radius * 1000,
      extruded: true,
      elevationScale: 1 / 40,
      getElevation: (d) => (d.pop < limit[1] && d.pop > limit[0] ? d.pop : -1),
      getPosition: (d) => d.lon !== '#' && [d.lon, d.lat],
      getFillColor: (d) =>
        HSLToRGB(
          120 * (1 - (d.pop - limit[0]) / (limit[1] - limit[0])),
          100,
          40
        ),
      material,
      diskResolution: 6,
      wireframe: true,
      pickable: true,
      updateTriggers: {
        data: coords,
        getElevation: (d) =>
          d.pop < limit[1] && d.pop > limit[0] ? d.pop : -1,
        getFillColor: (d) =>
          HSLToRGB(
            120 * (1 - (d.pop - limit[0]) / (limit[1] - limit[0])),
            100,
            40
          ),
        getRadius: radius,
      },
      controller: true,
    }),
  ];

  // tooltip function
  const getTooltip = ({ object }) => {
    if (!object) {
      return null;
    }
    const pop = object.pop.toLocaleString();
    const male = object.m.toLocaleString();
    const female = object.f.toLocaleString();
    const family = object.fam.toLocaleString();

    switch (id) {
      case 0:
        return `\
    استان ${object.ostan}
    ${pop} نفر/People
    ${male} مرد/Male
    ${female} زن/Female
    ${family} خانواده/Family`;
      case 1:
        return `\
    شهرستان ${object.shahrestan}
    استان ${object.ostan}
    ${pop} نفر/People
    ${male} مرد/Male
    ${female} زن/Female
    ${family} خانواده/Family`;

      case 2:
        return `\
    شهر ${object.shahr}
    شهرستان ${object.shahrestan}
    استان ${object.ostan}
    ${pop} نفر/People
    ${male} مرد/Male
    ${female} زن/Female
    ${family} خانواده/Family`;
      case 3:
        return `\
    منطقه ${object.district}
    شهر ${object.shahr}
    شهرستان ${object.shahr}
    استان ${object.shahr}
    ${pop} نفر/People
    ${male} مرد/Male
    ${female} زن/Female
    ${family} خانواده/Family`;
      default:
        return null;
    }
  };

  return (
    <DeckGL
      layers={layers}
      effects={[lightingEffect]}
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      getTooltip={getTooltip}
    >
      {/* map.gl component */}
      <StaticMap
        reuseMaps
        mapStyle={style}
        preventStyleDiffing={true}
        mapboxApiAccessToken={token}
      />
    </DeckGL>
  );
};

export default Map;
