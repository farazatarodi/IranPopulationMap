import Accordion from '../Accordion/Accordion';
import Description from '../Description/Description';

const Panel = ({
  actLimit,
  setIsActive,
  setData,
  dataSets,
  setLimitPopulation,
  setMaxRadius,
  rList,
  isActive,
  limitPopulation,
}) => {
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

  // accordion selection function
  const accordionSelect = (e) => {
    let tempState = [false, false, false, false];
    tempState[e.id] = true;
    setIsActive(tempState);
    setData(dataSets[e.id]);
    setLimitPopulation(actLimit[e.id]);
    setMaxRadius(rList[e.id]);
  };

  return (
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
  );
};

export default Panel;
