import Slider from '@material-ui/core/Slider';

const Accordion = ({
  title,
  limSlider,
  onSelect,
  id,
  active,
  setLimPop,
  limPop,
}) => {
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
              value={limPop}
              onChange={(e, v) => {
                setLimPop(v);
              }}
              aria-labelledby="range-slider"
            />
            <div className="min-text bot-text">{limPop[0]}</div>
            <div className="bot-text">People / نفر</div>
            <div className="max-text bot-text">{limPop[1]}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Accordion;
