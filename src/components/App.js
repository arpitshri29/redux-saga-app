import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUsersRequest, createUserRequest, deleteUserRequest, usersError} from "../actions/users";
import UsersList from './UsersList';
import NewUserForm from "./NewUserForm";
import {Alert} from 'reactstrap';

class App extends Component{
  constructor(props){
    super(props);

    this.props.getUsersRequest();
  }

  handleSubmit = ({firstName, lastName}) => {
    this.props.createUserRequest({
        firstName,
        lastName
    })
  };

  handleDeleteUser = (userId) => {
      this.props.deleteUserRequest(userId);
  };

    handleCloseAlert = () => {
        this.props.usersError({
            error:''
        });
    };

  render() {
      const users = this.props.users;

    return (
        <div style={{margin: '0 auto', padding:'20px', maxWidth:'600px'}}>
            <Alert color='danger' isOpen={!!this.props.users.error} toggle={this.handleCloseAlert}>
                {this.props.users.error}
            </Alert>
            <NewUserForm onSubmit={this.handleSubmit}/>
            {!!users.items && !!users.items.length &&
            <UsersList onDeleteUser={this.handleDeleteUser} users={users.items}/>
            }
        </div>
    );
  }
}

export default connect(({users}) => ({users}), {
    getUsersRequest,
    createUserRequest,
    deleteUserRequest,
    usersError
})(App);
