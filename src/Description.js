import { useState } from 'react';

const Description = ({
  title,
  content1,
  content2,
  content3,
  content4,
  defAct,
  id,
}) => {
  // default active state
  const [isActive, setIsActive] = useState(defAct);

  return (
    <div className="description-item" id={id}>
      {/* change active state on click */}
      <div className="description-title" onClick={() => setIsActive(!isActive)}>
        <div className="title">{title}</div>
        <div>{isActive ? '-' : '+'}</div>
      </div>

      {/* show content based on active state */}
      {isActive && (
        <div className="description-content">
          <ul>
            <li key={content1.length}>{content1}</li>
            <li key={content2.length}>{content2}</li>
            <li key={content3.length}>{content3}</li>
            <li key={content4.length}>{content4}</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Description;
