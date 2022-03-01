// Import libraries
import React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, DatePicker } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import moment from 'moment';


import '../../css/App.css';
import { createTodo } from '../../actions';

// function to render title field
const renderInputTitle = ({input, meta}) => {
  const validateStatus = meta.error && meta.touched ? 'error' : ''
  const help = meta.error && meta.touched ? meta.error : ''
  return (
      <Form.Item 
      label="Title" 
      required tooltip="This is a required field"
      validateStatus={validateStatus}
      help={help}
      >
          <Input id={validateStatus} {...input} showCount maxLength={100} placeholder="input placeholder" />
      </Form.Item>
  );  
};

// function to render description field
const renderInputDescription = ({input, meta}) => {
  const validateStatus = meta.error && meta.touched ? 'error' : ''
  const help = meta.error && meta.touched ? meta.error : ''
  return (
      <Form.Item
      label="Description"
      required tooltip="This is a required field"
      validateStatus={validateStatus}
      help={help}
      >
        <Input.TextArea id={validateStatus} {...input} showCount maxLength={1000} placeholder="input placeholder" />
      </Form.Item>
  );
};

// function to render due date field
const renderInputDueDate = ({input, meta}) => {
  const validateStatus = meta.error && meta.dirty ? 'error' : ''
  const help = meta.error && meta.tdirty ? meta.error : ''

  return (
      <Form.Item
      label="Due Date"
      tooltip={{
          title: 'Tooltip with customize icon',
          icon: <InfoCircleOutlined />,
      }}
      validateStatus={validateStatus}
      help={help}
      >
        <DatePicker 
          id={validateStatus}
          format = "DD-MM-YYYY"  
          onChange={date => date ? input.onChange(moment(date).format("DD-MM-YYYY")) : input.onChange(null)}
          value={input.value ? moment(input.value, "DD-MM-YYYY") : null}
        />
      </Form.Item>
  );
};

// function component
const TodoCreate = (props) => {

  const navigate = useNavigate();
  const [form] = Form.useForm();
  const requiredMark = 'required'

  // helper function to handle form submit
  const onSubmit = (formValues) => {
    // calling action creator
    props.createTodo(formValues, navigate);
  }

  // return jsx
  return (
    <div className='ui clearing segment'>
      <h3>Create To Do</h3>
      <br/>
      <Form
        onFinish={props.handleSubmit(onSubmit)}
        form={form}
        layout="vertical"
        requiredMark={requiredMark}
      >
        <Field name="title" component={renderInputTitle}/>
        <Field name="description" component={renderInputDescription} />
        <Field name="dueDate" component={renderInputDueDate} />
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}

// helper function to validate the form
const validate = (formValues) => {
  const errors = {};
  
  if(!formValues.title) {
    errors.title = 'you must enter a title';
  }

  if(!formValues.description) {
    errors.description = 'you must enter a description';
  }

  return errors;
}

// function to get the state as props
const MapSateToProps = (state) => {
  return ({
    initialValues: {
      createdAt : moment().format("DD-MM-YYYY"),
      status : 'OPEN',
    },
  })
}

// redux form configuration
const form = reduxForm({
  form : 'todoCreate',
  validate: validate
})(TodoCreate);

export default connect(MapSateToProps, {
  createTodo
})(form);