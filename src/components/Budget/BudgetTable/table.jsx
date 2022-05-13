import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import ProgressBar from "./progressbar";
import Chips from "./chips";
import "./table.css";

export function Table(props) {
  const columns = getColumnsFromProps(props);
  const data = getDataFromProps(props);
  const tableStyle = {
    border: "0px solid black",
    borderCollapse: "collapse",
    width: "100%",
    textAlign: "left",
  };

  const thStyle = {
    background: "#eaeef4",
    padding: "10px 10px",
  };

  const tdStyle = {
    background: "white",
    padding: "10px 10px",
  };

  return (
    <>
      <table style={tableStyle}>
        <thead>
          <tr>
            {columns.map(({ path, name }) => (
              <th style={thStyle} key={path}>
                {name}
              </th>
            ))}
            <th
              style={{ background: "rgb(234, 238, 244)", padding: "10px" }}
            ></th>
          </tr>
        </thead>
        <tbody>
          {data.map((rowData) => (
            <tr key={rowData.id}>
              {columns.map(({ path }) => (
                <td style={tdStyle} key={path}>
                  {rowData[path]}
                </td>
              ))}
              <td style={{ background: "white", padding: "10px" }}>
                <span className="actionIcons">
                  <EditOutlined
                    onClick={() => {
                      props.editBudget(rowData.id);
                    }}
                  />
                </span>
                <span className="actionIcons">
                  <DeleteOutlined
                    onClick={() => {
                      props.deleteBudget(rowData.id);
                    }}
                  />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

function getColumnsFromProps(props) {
  return props.columns;
}

function getDataFromProps(props) {
  const data = [];
  props.data.forEach((rowData) => {
    const actions = [];
    let rowDataFinal = [];
    rowDataFinal.id = rowData.id;
    rowDataFinal.name = rowData.name;
    rowDataFinal.description = rowData.description;
    rowDataFinal.type = rowData.type;
    rowDataFinal.start = rowData.start;
    rowDataFinal.period = rowData.period;
    rowDataFinal.end = rowData.end;
    rowDataFinal.scope = <p style={{ fontWeight: "700" }}>{rowData.scope}</p>;
    rowDataFinal.status = [];
    rowDataFinal.status.push(createStatus(rowData.status));

    for (let index = 0; index < rowData.actions.length; index++) {
      actions.push(createActions(rowData.actions[index], index));
    }
    rowDataFinal.actions = actions;
    data.push(rowDataFinal);
  });

  return data;
}

const createActions = (action, key) => {
  return <Chips key={key} action={action} />;
};

const createStatus = (data) => {
  const percentage = isNaN(Math.round((data.cost / data.budget) * 100))
    ? 0
    : Math.round((data.cost / data.budget) * 100);
  let bgcolor = "";
  if (percentage <= 50) {
    bgcolor = "#2bc717";
  } else if (percentage > 50 && percentage <= 100) {
    bgcolor = "#ffb902";
  } else if (percentage > 100) {
    bgcolor = "#d54451";
  }
  return (
    <ProgressBar
      key={percentage}
      bgcolor={bgcolor}
      completed={percentage}
      data={data}
    />
  );
};
