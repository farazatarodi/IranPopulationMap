import dArrow from '../../assets/down-arrow.gif';
import './MobileButton.css';

const MobileButton = () => {
  // press check for mobile button
  var pressed = false;

  const handlePress = () => {
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
  };

  return (
    <button className="panel-btn" onClick={handlePress}>
      <img src={dArrow} alt="" />
    </button>
  );
};

export default MobileButton;
