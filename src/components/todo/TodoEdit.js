import React, { useEffect } from 'react';
import { connect,useSelector } from 'react-redux';
import { useParams, useNavigate  } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { Form, Input, Button, DatePicker, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import moment from 'moment';

import { fetchTodo, editTodo } from '../../actions';
import { split } from 'lodash';

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

  const renderInputDueDate = ({input, meta}) => {
    const validateStatus = meta.error && meta.touched ? 'error' : ''
    const help = meta.error && meta.touched ? meta.error : ''

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

  

const TodoEdit = (props) => {
 
    let { id } = useParams();
    const todo = useSelector((state)=>state.todo[id]);

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { Option } = Select;
    const requiredMark = 'required'
    
  
    // lifecycle, run one time after inital render
    useEffect(()=>{
        // fetching particular todo 
        // action creator
        props.fetchTodo(id)
    }, [])

    // helper function to render status field
    const renderInputStatus = ({input}) => {
        return (
            <Form.Item label="Status" hasFeedback >
                <Select defaultValue={input.value}  {...input} style={{ width: 240 }}>
                    <Option value="OPEN">OPEN</Option>
                    <Option value="WORKING">WORKING</Option>
                    <Option value="DONE">DONE</Option>
                    <Option value="OVERDUE">OVERDUE</Option>
                </Select>
            </Form.Item>
        )
    }
    
    // helper function to handle form submit
    const onSubmit = (formValues) => {
        // Action creator
        props.editTodo(id, formValues, navigate);
    }

    
    // return jsx if not todo
    if(!todo) {
        return <div>loading...</div>
    }
  
    // return jsx
    return (
      <>
      <div className='ui clearing segment'>
      <h3>Edit To Do</h3>
      <br/>
      <Form
        onFinish={props.handleSubmit(onSubmit)}
        form={form}
        layout="vertical"
        requiredMark={requiredMark}
      >
        <Field name="title" component={renderInputTitle}/>
        <Field name="description" component={renderInputDescription} />
        <Field name="status" component={renderInputStatus} />
        <Field name="dueDate" component={renderInputDueDate} />
        <Form.Item>
          <Button type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
      </div>
      </>
    );
  }
  
  // helper function to validate form
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
const mapSateToProps = (state) => {
    if(Object.keys(state.todo).length === 0) {
        return {}
    }
    // logic to get the last slug of the url
    let id = window.location.pathname;
    id = split(id, '/').slice(-1)[0]

    // passing initail values to the form field
    return ({
        initialValues: {
          createdAt : state.todo[id].createdAt,
          title : state.todo[id].title,
          description : state.todo[id].description,
          dueDate : state.todo[id].dueDate,
          status : state.todo[id].status
        },
    })
};

// // redux form configuration
const form = reduxForm({
    form : 'todoEdit',
    validate: validate,
    enableReinitialize : true
  })(TodoEdit)

export default connect(mapSateToProps, {fetchTodo, editTodo})(form);