import { Panel } from "../elements/Panel";

const CreditSection = ({ title, items }) => (
  <div className="credit-section">
    <h2>{title}</h2>
    <ul>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

export const EndCredits = ({ credits }) => {
  return (
    <Panel>
      {credits.map((section) => (
        <CreditSection
          key={section.title}
          title={section.title}
          items={section.items}
        />
      ))}
    </Panel>
  );
};
