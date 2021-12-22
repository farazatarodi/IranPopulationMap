import coordsCapital from '../../amarJSON/coords_capital.json';
import coordsOstan from '../../amarJSON/coords_ostan.json';
import coordsShahr from '../../amarJSON/coords_shahr.json';
import coordsShahrestan from '../../amarJSON/coords_shahrestan.json';
import Map from '../Map/Map';
import Panel from '../Panel/Panel';
import MobileButton from '../MobileButton/MobileButton';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectData } from '../../redux/actions/data';

// main
export default function App() {
  const dispatch = useDispatch();

  const dataSets = [
    {
      id: 0,
      title: 'Province / استان',
      coords: coordsOstan,
      population: [0, 13400000],
      limit: [0, 13400000],
      radius: 20,
    },
    {
      id: 1,
      title: 'County / شهرستان',
      coords: coordsShahrestan,
      population: [0, 8900000],
      limit: [0, 8900000],
      radius: 5,
    },
    {
      id: 2,
      title: 'City / شهر',
      coords: coordsShahr,
      population: [0, 8800000],
      limit: [0, 8800000],
      radius: 2,
    },
    {
      id: 3,
      title: 'Capital / مرکز استان',
      coords: coordsCapital,
      population: [0, 950000],
      limit: [0, 950000],
      radius: 1,
    },
  ];

  useEffect(() => {
    dispatch(selectData(dataSets[0]));
  }, []);

  return (
    <div>
      {/* main deck.gl component */}
      <Map />

      {/* mobile control panel button */}
      <MobileButton />

      {/*control panel */}
      <Panel dataSets={dataSets} />

      {/* watermark */}
      <div className="watermark">
        By <a href="https://farazatarodi.com">Faraz Atarodi</a>
      </div>
    </div>
  );
}
