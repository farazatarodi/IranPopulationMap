import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectData } from '../../redux/actions/data';
import Accordion from '../Accordion/Accordion';
import Description from '../Description/Description';
import descriptionData from '../../assets/descriptionData.json';

const Panel = ({ dataSets }) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.dataReducer.id);

  // accordion selection function
  const accordionSelect = (e) => {
    const [selectedData] = dataSets.filter((data) => data.id === e.id);
    dispatch(selectData(selectedData));
  };

  return (
    <div className="panel">
      <div className="text-container">
        <h1 className="title-english">Iran</h1>
        <h1 className="title-farsi">ایران</h1>
        <h3 className="subtitle-english">Population:</h3>
        <h3>79,926,270</h3>
        <h3 className="subtitle-farsi">:جمعیت</h3>

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
              key={id}
            />
          )
        )}
      </div>

      {
        /* accordion components for different levels of data */
        dataSets.map((data) => (
          <Accordion
            title={data.title}
            limSlider={data.population}
            onSelect={accordionSelect}
            id={data.id}
            key={data.id}
            active={data.id === id}
          />
        ))
      }
    </div>
  );
};

export default Panel;
