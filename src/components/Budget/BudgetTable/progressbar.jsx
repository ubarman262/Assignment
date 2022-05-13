import { Row, Col } from "antd";

const ProgressBar = (props) => {
  const { bgcolor, completed, data } = props;

  const containerStyles = {
    backgroundColor: "#e0e0de",
    borderRadius: "2px",
  };

  const fillerStyles = {
    height: "100%",
    width: `${completed > 100 ? 100 : completed}%`,
    backgroundColor: bgcolor,
    borderRadius: "inherit",
    textAlign: "center",
  };

  const labelStyles = {
    padding: 5,
    color: "white",
    fontWeight: "bold",
  };

  const readableStatusStyle = {
    margin: "-5px 5px",
    // maxWidth: "50%",
  };

  const readableStatus = () => {
    if (completed <= 50) {
      return (
        <div style={readableStatusStyle}>
          <h4 style={{ fontWeight: "700", marginBottom: "0px" }}>Ok</h4>
          <p style={{ lineHeight: "15px" }}>
            Cost is projected to be within the budget.
          </p>
        </div>
      );
    } else if (completed > 50 && completed <= 100) {
      return (
        <div style={readableStatusStyle}>
          <h4 style={{ fontWeight: "700", marginBottom: "0px" }}>Exceeded</h4>
          <p style={{ lineHeight: "15px" }}>
            Cost has already exceeded the budget.
          </p>
        </div>
      );
    } else if (completed > 100) {
      return (
        <div style={readableStatusStyle}>
          <h4 style={{ fontWeight: "700", marginBottom: "0px" }}>At Risk</h4>
          <p style={{ lineHeight: "15px" }}>
            Cost is projected to exceed the budget.
          </p>
        </div>
      );
    }
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <div style={containerStyles}>
            <div style={fillerStyles}>
              <span style={labelStyles}>{`${completed}%`}</span>
            </div>
          </div>
          <div>
            Cost: {data.cost} {data.unit}
          </div>
          <div>
            Budget: {data.budget} {data.unit}
          </div>
        </Col>
        <Col span={12}>{readableStatus()}</Col>
      </Row>
    </div>
  );
};

export default ProgressBar;
