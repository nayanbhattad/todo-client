// Import Libraries
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { Table, Space, Button, Row, Col, Input, Popconfirm} from 'antd';
import {Link} from 'react-router-dom';
import moment from 'moment';

import { fetchTodos, deleteTodo, filterTodos } from '../../actions';

// Function component
const TodoList = (props) => {
    let lastIndex = 0
  
    // lifecycle, run one time after inital render
    useEffect(()=>{
    
    // fetching the list of todo 
    // action creator;
    props.fetchTodos(); 
    }, [])

    // helper function to increment value by one with every run
    const updateIndex = () => {
        lastIndex++
        return lastIndex
    }

    // Table configuration
    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: `title${updateIndex()}`,
          sorter: (a, b) => a.title.length - b.title.length,
          
        },
        {
          title: 'Description',
          dataIndex: 'description',
          key: `description${updateIndex()}`,
          sorter: (a, b) => a.description.length - b.description.length,
        },
        {
          title: 'Created At',
          dataIndex: 'createdAt',
          key: `createdAt${updateIndex()}`,
          sorter: (a, b) => moment(a.createdAt, 'DD-MM-YYYY').unix() - moment(b.createdAt, 'DD-MM-YYYY').unix(),
        },
        {
            title: 'Due Date',
            dataIndex: 'dueDate',
            key: `dueDate${updateIndex()}`,
            sorter: (a, b) => moment(a.dueDate, 'DD-MM-YYYY').unix() - moment(b.dueDate, 'DD-MM-YYYY').unix(),
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: `status${updateIndex()}`,
            filters: [
                { text: 'OPEN', value: 'OPEN' },
                { text: 'WORKING', value: 'WORKING' },
                { text: 'DONE', value: 'DONE' },
                { text: 'OVERDUE', value: 'OVERDUE' },
            ],
            onFilter: (value, record) => record.status.indexOf(value) === 0,

        },
        {
          title: 'Action',
          key: `action${updateIndex()}`,
          render: (_, record) =>
            props.todo.length >= 1 ? (
              <Space>
                <Link to={`/todo/edit/${record.id}`}>Edit</Link>
                <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                <a>Delete</a>
                </Popconfirm>
            </Space>
          ) : null
        },
    ]

    
    // helper function to handle delete todo
    const handleDelete = (key) => {
        //action creator
        props.deleteTodo(key);
    };

    // helper function to handle global search
    const onSearch = (e) => {
        const value = e.target.value;
        // action creator
        props.filterTodos(value)
    }

    // return jsx
    return (
        <div className='ui clearing segment'>
            <Row>
                <Col span={12}><Input placeholder="Search" onChange={(e)=>onSearch(e)} /></Col>
                <Col span={12}>
                    <div style={{textAlign: "end"}}>
                        <Button type="primary"><Link to="/todo/new">Create Todo</Link></Button> 
                    </div>
                </Col>
            </Row>  
            <br/>
            <Table columns={columns} dataSource={props.todo} pagination={{pageSize: 5, total: props.todo.length}}/>
        </div>
    )

}

// function to get the state as props  
const mapStateToProps = (state) => {
    // conversion of state form object to array
    let todo = Object.values(state.todo);
    todo = todo.map((obj)=> {
        return obj;
    })
    return {
        todo : todo
    }
}

export default connect(mapStateToProps, {fetchTodos, deleteTodo, filterTodos})(TodoList);

