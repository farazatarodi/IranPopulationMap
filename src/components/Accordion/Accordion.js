import Slider from '@material-ui/core/Slider';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setLimit } from '../../redux/actions/data';
import './Accordion.css';

const Accordion = ({ title, limSlider, onSelect, id, active }) => {
  const dispatch = useDispatch();

  const limit = useSelector((state) => state.dataReducer.limit);

  return (
    <div className="accordion-item">
      <div
        className="accordion-title"
        onClick={() => {
          !active && onSelect({ id });
        }}
      >
        <div className="title">{title}</div>
        <div>{active ? '-' : '+'}</div>
      </div>

      {/* show or hide content based on active state */}
      {active && (
        <div className="accordion-content">
          <div className="slider-container">
            <div className="content-text top-text">Population Limit:</div>
            <div className="content-text-fa top-text">:محدوده جمعیت</div>

            {/* range slider component to limit visible population data */}
            <Slider
              min={limSlider[0]}
              max={limSlider[1]}
              value={limit}
              onChange={(e, v) => {
                dispatch(setLimit(v));
              }}
              aria-labelledby="range-slider"
            />
            <div className="min-text bot-text">{limit[0]}</div>
            <div className="bot-text">People / نفر</div>
            <div className="max-text bot-text">{limit[1]}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
