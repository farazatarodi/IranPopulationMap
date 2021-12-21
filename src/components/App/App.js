import { useState } from 'react';
import coordsCapital from '../../amarJSON/coords_capital.json';
import coordsOstan from '../../amarJSON/coords_ostan.json';
import coordsShahr from '../../amarJSON/coords_shahr.json';
import coordsShahrestan from '../../amarJSON/coords_shahrestan.json';
import Map from '../Map/Map';
import Panel from '../Panel/Panel';
import MobileButton from '../MobileButton/MobileButton';

// const MALE_COLOR = [0, 128, 255];
// const FEMALE_COLOR = [255, 0, 128];

// main
export default function App() {
  // constant to limit the population
  const actLimit = [
    [0, 13400000],
    [0, 8900000],
    [0, 8800000],
    [0, 950000],
  ];
  const [limitPopulation, setLimitPopulation] = useState(actLimit[0]);

  // Source data json
  const dataSets = [coordsOstan, coordsShahrestan, coordsShahr, coordsCapital];
  const [data, setData] = useState(dataSets[0]);

  // accordion select
  const [isActive, setIsActive] = useState([true, false, false, false]);

  // change radius for different data
  const rList = [20, 5, 2, 1];
  const [maxRadius, setMaxRadius] = useState(rList[0]);

  return (
    <div>
      {/* main deck.gl component */}
      <Map
        data={data}
        maxRadius={maxRadius}
        limitPopulation={limitPopulation}
        isActive={isActive}
      />

      {/* mobile control panel button */}
      <MobileButton />

      {/* watermark */}
      <div className="watermark">
        By <a href="https://farazatarodi.com">Faraz Atarodi</a>
      </div>

      {/*control panel */}
      <Panel
        actLimit={actLimit}
        setIsActive={setIsActive}
        setData={setData}
        dataSets={dataSets}
        setLimitPopulation={setLimitPopulation}
        setMaxRadius={setMaxRadius}
        rList={rList}
        isActive={isActive}
        limitPopulation={limitPopulation}
      />
    </div>
  );
}
