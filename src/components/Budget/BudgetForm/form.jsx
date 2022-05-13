import React, { useState } from "react";
import { Form, Input, Select, DatePicker, Button } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

const BudgetForm = (props) => {
  const [name, setName] = useState(
    (props.mode === "edit" ? props.formData.name : "") || ""
  );
  const [description, setDescription] = useState(
    (props.mode === "edit" ? props.formData.description : "") || ""
  );
  const [type, setType] = useState(
    (props.mode === "edit" ? props.formData.type : "") || ""
  );
  const [period, setPeriod] = useState(
    (props.mode === "edit" ? props.formData.period : "") || ""
  );
  const [start, setStart] = useState(
    (props.mode === "edit" ? props.formData.start : "01/2022") || "01/2022"
  );
  const [end, setEnd] = useState(
    (props.mode === "edit" ? props.formData.end : "01/2022") || "01/2022"
  );
  const [scope, setScope] = useState(
    (props.mode === "edit" ? props.formData.scope : "") || ""
  );
  const [cost, setCost] = useState(
    (props.mode === "edit" ? props.formData.cost : 0) || 0
  );
  const [budget, setBudget] = useState(
    (props.mode === "edit" ? props.formData.budget : 0) || 0
  );
  const [actions, setActions] = useState(
    (props.mode === "edit" ? props.formData.actions : []) || []
  );

  const actionsList = ["Trends", "Changeback", "Optimize"];

  const children = [];
  for (let i = 0; i < actionsList.length; i++) {
    children.push(<Option key={actionsList[i]}>{actionsList[i]}</Option>);
  }

  function handleChange(value) {
    setActions(value);
  }

  function handleSubmit() {
    const formData = {
      name: name,
      description: description,
      type: type,
      period: period,
      scope: scope,
      start: start,
      end: end,
      status: {
        cost: cost,
        budget: budget,
        unit: "DBUs",
      },
      actions: actions,
    };
    props.handleFormSubmit(formData, props.formData.id);
  }

  return (
    <Form
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: "small",
      }}
      size="small"
    >
      <Form.Item label="Name">
        <Input
          value={name}
          onChange={(value) => {
            setName(value.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="Description">
        <Input
          value={description}
          onChange={(value) => {
            setDescription(value.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="Type">
        <Select
          value={type}
          onChange={(value) => {
            setType(value);
          }}
        >
          <Select.Option value="DBU">DBU</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Period">
        <Select
          value={period}
          onChange={(value) => {
            setPeriod(value);
          }}
        >
          <Select.Option value="MONTHLY">MONTHLY</Select.Option>
          <Select.Option value="YEARLY">YEARLY</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="DatePicker">
        <RangePicker
          defaultValue={[moment(start, "MM / YYYY"), moment(end, "MM / YYYY")]}
          picker="month"
          onChange={(date, dateString) => {
            const d1 = new Date(dateString[0]).toString();
            const d2 = new Date(dateString[1]).toString();
            let startMonth = d1.substring(4, 7);
            let startYear = d1.substring(11, 15);
            let endMonth = d2.substring(4, 7);
            let endYear = d2.substring(11, 15);
            setStart(`${startMonth} ${startYear}`);
            setEnd(`${endMonth} ${endYear}`);
          }}
        />
      </Form.Item>
      <Form.Item label="Scope">
        <Select
          value={scope}
          onChange={(value) => {
            setScope(value);
          }}
        >
          <Select.Option value="Global">Global</Select.Option>
          <Select.Option value="Workspace">Workspace</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Budget">
        <Input
          value={budget}
          onChange={(value) => {
            setBudget(value.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="Cost">
        <Input
          value={cost}
          onChange={(value) => {
            setCost(value.target.value);
          }}
        />
      </Form.Item>
      <Form.Item label="Actions">
        <Select
          value={actions}
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select"
          onChange={handleChange}
        >
          {children}
        </Select>
      </Form.Item>
      <Button
        key="submit"
        type="primary"
        loading={props.loading ? true : false}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Form>
  );
};

export default BudgetForm;
