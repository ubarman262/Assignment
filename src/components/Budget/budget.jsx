import React, { Component } from "react";
import { Row, Col, Modal, Button, notification } from "antd";
import { Typography } from "antd";
import { Table } from "./BudgetTable/table";
import { InfoCircleOutlined } from "@ant-design/icons";
import {
  getBudgetData,
  addBudgetData,
  deleteBudgetData,
  getSpecificFormData,
  editBudgetById,
} from "../../services/http.service";
import BudgetForm from "./BudgetForm/form";
import moment from "moment";

import "./budget.css";

const { Title } = Typography;

const openNotificationWithIcon = (type, header, message) => {
  notification[type]({
    message: header,
    description: message,
  });
};

export default class Budget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isModalVisible: false,
      formMode: "new",
      formData: {},
    };
  }

  componentDidMount() {
    getBudgetData().then((data) => this.onDataChange(data));
  }

  onDataChange(data) {
    this.setState({
      data: data,
      formLoader: false,
    });
  }

  getTableHeaders() {
    return [
      { path: "name", name: "Name" },
      { path: "description", name: "Description" },
      { path: "type", name: "Type" },
      { path: "period", name: "Period" },
      { path: "start", name: "Start" },
      { path: "end", name: "End" },
      { path: "scope", name: "Scope" },
      { path: "status", name: "Budget Status" },
      { path: "actions", name: "Actions" },
    ];
  }

  handleFormSubmit = (data, id) => {
    this.setState({
      formLoader: true,
    });
    if (id !== undefined && this.state.formMode === "edit") {
      editBudgetById(id, data);
      setTimeout(() => {
        getBudgetData().then((data) => this.onDataChange(data));
        this.setState({
          formLoader: false,
        });
        openNotificationWithIcon(
          "success",
          "Budget updated!",
          "A Budget has been updated."
        );
      }, 2000);
    } else {
      addBudgetData(data);
      setTimeout(() => {
        getBudgetData().then((data) => this.onDataChange(data));
        this.setState({
          formLoader: false,
        });
        openNotificationWithIcon(
          "success",
          "Budget added!",
          "A new Budget has been added to the table."
        );
      }, 2000);
    }
  };

  deleteBudget(id) {
    deleteBudgetData(id);
    var updatedData = this.state.data.filter((data) => data.id !== id);
    this.setState({
      data: updatedData,
    });
    setTimeout(() => {
      getBudgetData().then((data) => this.onDataChange(data));
    }, 2000);
  }

  async editBudget(id) {
    var formData = await getSpecificFormData(id);
    formData.cost = formData.status.cost;
    formData.budget = formData.status.budget;
    formData.start = moment(formData.start).format("MM/YYYY");
    formData.end = moment(formData.end).format("MM/YYYY");
    this.setState({
      formMode: "edit",
      isModalVisible: true,
      formData: formData,
    });
  }

  render() {
    const showModal = () => {
      this.setState({
        isModalVisible: true,
        formMode: "new",
      });
    };

    const handleCancel = () => {
      this.setState({
        isModalVisible: false,
      });
    };

    return (
      <>
        <Modal
          title="Budget"
          visible={this.state.isModalVisible}
          onCancel={handleCancel}
          footer=""
          destroyOnClose={true}
        >
          <BudgetForm
            handleFormSubmit={this.handleFormSubmit.bind(this)}
            loading={this.state.formLoader}
            mode={this.state.formMode}
            formData={this.state.formData}
          />
        </Modal>
        <div id="page-container">
          <Row>
            <Col span={8} style={{ padding: "10px" }}>
              <Button id="button" onClick={showModal}>
                New Budget
              </Button>
            </Col>
            <Col span={8} offset={8}></Col>
          </Row>
          <Row>
            <Col span={24}>
              <div id="table-container">
                <Row>
                  <Col span={8}>
                    <Title id="title" level={4}>
                      Active
                      <InfoCircleOutlined
                        style={{
                          padding: "5px",
                          fontSize: "18px",
                          cursor: "pointer",
                          color: "black",
                        }}
                      />
                    </Title>
                  </Col>
                  <Col span={8} offset={8}></Col>
                </Row>
                <Table
                  key="table"
                  columns={this.getTableHeaders()}
                  data={this.state.data}
                  deleteBudget={this.deleteBudget.bind(this)}
                  editBudget={this.editBudget.bind(this)}
                />
              </div>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}
