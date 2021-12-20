import { render } from 'react-dom';
import { StaticMap } from 'react-map-gl';
import DeckGL from '@deck.gl/react';
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core';
import { ColumnLayer } from '@deck.gl/layers';
import { useState } from 'react';
import Accordion from './Accordion';
import Description from './Description';
import dArrow from './assets/down-arrow.gif';

// const MALE_COLOR = [0, 128, 255];
// const FEMALE_COLOR = [255, 0, 128];

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

// material settings of columns
const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51],
};

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

// function to convert hsl to rgb
function HSLToRGB(h, s, l) {
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
}

// mapbox parameters
const token =
  'pk.eyJ1IjoiZmFyYXphdGEiLCJhIjoiY2tvdHcxaTV4MDB5MTJ6bjdzdGhkMzduOSJ9.bzS9EpU16PCr7gA0ZabGyg';
const style = 'mapbox://styles/farazata/ckotw3907212p18l92zygk52c';

// main
export default function App({ data, coverage = 1 }) {
  // constant to limit the population
  const actLimit = [
    [0, 13400000],
    [0, 8900000],
    [0, 8800000],
    [0, 950000],
  ];
  const [limitPopulation, setLimitPopulation] = useState(actLimit[0]);

  // Source data json
  const dataURLs = [
    'https://raw.githubusercontent.com/farazatarodi/deck.gl-animated-map/main/src/amarJSON/coords_ostan.json',
    'https://raw.githubusercontent.com/farazatarodi/deck.gl-animated-map/main/src/amarJSON/coords_shahrestan.json',
    'https://raw.githubusercontent.com/farazatarodi/deck.gl-animated-map/main/src/amarJSON/coords_shahr.json',
    'https://raw.githubusercontent.com/farazatarodi/deck.gl-animated-map/main/src/amarJSON/coords_capital.json',
  ];
  const [DATA_URL, setDATA] = useState(dataURLs[0]);

  // accordion select
  const [isActive, setIsActive] = useState([true, false, false, false]);

  // change radius for different data
  const rList = [20, 5, 2, 1];
  const [maxRadius, setMaxRadius] = useState(rList[0]);

  // tooltip function
  function getTooltip({ object }) {
    if (!object) {
      return null;
    }
    const pop = object.pop;
    const male = object.m;
    const female = object.f;
    const family = object.fam;

    if (isActive[2] === true) {
      return `\
    شهر ${object.shahr}
    شهرستان ${object.shahrestan}
    استان ${object.ostan}
    ${pop} نفر/People
    ${male} مرد/Male
    ${female} زن/Female
    ${family} خانواده/Family`;
    } else if (isActive[1] === true) {
      return `\
    شهرستان ${object.shahrestan}
    استان ${object.ostan}
    ${pop} نفر/People
    ${male} مرد/Male
    ${female} زن/Female
    ${family} خانواده/Family`;
    } else if (isActive[0] === true) {
      return `\
    استان ${object.ostan}
    ${pop} نفر/People
    ${male} مرد/Male
    ${female} زن/Female
    ${family} خانواده/Family`;
    } else if (isActive[3] === true) {
      return `\
    منطقه ${object.district}
    شهر ${object.shahr}
    شهرستان ${object.shahr}
    استان ${object.shahr}
    ${pop} نفر/People
    ${male} مرد/Male
    ${female} زن/Female
    ${family} خانواده/Family`;
    }
  }

  // deck.dl column layer
  const layers = [
    new ColumnLayer({
      id: 'scatter-plot',
      coverage,
      data: DATA_URL,
      radius: maxRadius * 1000,
      extruded: true,
      elevationScale: 1 / 40,
      getElevation: (d) =>
        d.pop < limitPopulation[1] && d.pop > limitPopulation[0] ? d.pop : -1,
      getPosition: (d) => d.lon !== '#' && [d.lon, d.lat],
      getFillColor: (d) =>
        HSLToRGB(
          120 *
            (1 -
              (d.pop - limitPopulation[0]) /
                (limitPopulation[1] - limitPopulation[0])),
          100,
          40
        ),
      material,
      diskResolution: 6,
      wireframe: true,
      pickable: true,
      updateTriggers: {
        data,
        getElevation: (d) =>
          d.pop < limitPopulation[1] && d.pop > limitPopulation[0] ? d.pop : -1,
        getFillColor: (d) =>
          HSLToRGB(
            120 *
              (1 -
                (d.pop - limitPopulation[0]) /
                  (limitPopulation[1] - limitPopulation[0])),
            100,
            40
          ),
        getRadius: maxRadius,
      },
      controller: true,
    }),
  ];

  // accordion selection function
  const accordionSelect = (e) => {
    let tempState = [false, false, false, false];
    tempState[e.id] = true;
    setIsActive(tempState);
    setDATA(dataURLs[e.id]);
    setLimitPopulation(actLimit[e.id]);
    setMaxRadius(rList[e.id]);
  };

  // description data
  const descriptionData = [
    {
      title: 'Description',
      content1:
        'The height of the columns represents the population of that area.',
      content2:
        'There are four levels of data available below. By selecting the level and changing the slider you can set the limit of the population.',
      content3:
        'If you hover the cursor over a point of data, a tooltip will give you detailed information about that point.',
      content4:
        'Dataset is from 2016 and is retrieved from the Statistical Center of Iran. However, it may be incomplete due to the lack of official coordinates. The estimated validity of data represented is more than 90%.',
      defAct: true,
      id: 'des-en',
    },
    {
      title: 'توضیحات',
      content1: 'ارتفاع ستون ها نشان دهنده جمعیت آن منطقه است.',
      content2:
        'چهار سطح داده در قسمت زیر قرار دارد. با انتخاب کردن سطح و تغییر دادن نوار میتوانید محدوده جمعیت را تایین کنید.',
      content3: 'با رفتن روی هر ستون، اطلاعات دقیق آن منطقه نشان داده می شود.',
      content4:
        'این داده ها مربوط به سال 1395 هستند و از سایت مرکز آمار ایران استخراج شده اند. به دلیل عدم وجود مختصات جغرافیایی دقیق داده ها ممکن است ناقص باشند. تخمین می خورد که اطلاعات بیش از 90% کامل باشند.',
      defAct: false,
      id: 'des-fa',
    },
  ];

  // press check for mobile button
  var pressed = false;

  return (
    <div>
      {/* main deck.gl component */}
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

      {/* mobile control panel button */}
      <button
        className="panel-btn"
        onClick={() => {
          const pnl = document.querySelector('.panel');
          const btn = document.querySelector('.panel-btn');
          const anim = document.querySelector('.panel-btn img');
          pressed = !pressed;
          if (pressed) {
            pnl.style.top = '50%';
            btn.style.top = '50%';
            anim.style.transform = 'rotate(0deg)';
          } else {
            pnl.style.top = '100%';
            btn.style.top = '100%';
            anim.style.transform = 'rotate(180deg)';
          }
        }}
      >
        <img src={dArrow} alt="" />
      </button>

      {/* watermark */}
      <div className="watermark">
        By <a href="https://farazatarodi.com">Faraz Atarodi</a>
      </div>

      {/*control panel */}
      <div className="panel">
        <div className="text-container">
          <h1 className="title-english">Iran</h1>
          <h1 className="title-farsi">ایران</h1>
          <h3 className="subtitle-english">Population</h3>
          <h3 className="subtitle-farsi">جمعیت</h3>

          {/* mapping description data to description component */}
          {descriptionData.map(
            ({ title, content1, content2, content3, content4, defAct, id }) => (
              <Description
                title={title}
                content1={content1}
                content2={content2}
                content3={content3}
                content4={content4}
                defAct={defAct}
                id={id}
              />
            )
          )}
        </div>

        {/* accordion components for different levels of data */}
        <Accordion
          title="Province / استان"
          limSlider={actLimit[0]}
          onSelect={accordionSelect}
          id={0}
          active={isActive[0]}
          setLimPop={setLimitPopulation}
          limPop={limitPopulation}
        />
        <Accordion
          title="County / شهرستان"
          limSlider={actLimit[1]}
          onSelect={accordionSelect}
          id={1}
          active={isActive[1]}
          setLimPop={setLimitPopulation}
          limPop={limitPopulation}
        />
        <Accordion
          title="City / شهر"
          limSlider={actLimit[2]}
          onSelect={accordionSelect}
          id={2}
          active={isActive[2]}
          setLimPop={setLimitPopulation}
          limPop={limitPopulation}
        />
        <Accordion
          title="Capital / مرکز استان"
          limSlider={actLimit[3]}
          onSelect={accordionSelect}
          id={3}
          active={isActive[3]}
          setLimPop={setLimitPopulation}
          limPop={limitPopulation}
        />
      </div>
    </div>
  );
}

export function renderToDOM(container) {
  render(<App />, container);
}
