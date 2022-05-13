import "./chips.css";

function Chips(props) {
  const { action } = props;

  return (
    <>
      <div>
        <div className="chip">
          <div className="chip-content">{action}</div>
        </div>
      </div>
    </>
  );
}

export default Chips;
