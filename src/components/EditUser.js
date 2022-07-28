import React, { useEffect, useRef, useState } from 'react';
import { editUser } from '../services/UserService';
function EditUser({ editUserData, edit_status }) {
  const [user, setUser] = useState([]);
  useEffect(
    () => {
      setUser(editUserData);
    },
    [editUserData],
  );

  const handleChange = async (name, value) => {
    const oldUser = { ...user };
    oldUser[name] = value;
    setUser(oldUser);
  };
  const updateUser = async () => {

    await editUser(user)
      .then(response => {
        
      });
    await edit_status(true);
    await closeRef.current.click();
  };

  const closeRef = useRef();
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">
          Edit User
        </h5>
        <button type="button" ref={closeRef} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button> 
      </div>
      <div className="modal-body">
        <form>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput">Name</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput"
              placeholder="Name"
              value={user.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2">Gender</label>
              {
              user.gender =='male' ? (
                <select className="form-control" onChange={(e) => handleChange('gender', e.target.value)}>
              <option value="male">Male</option>
              <option value="female">Female</option>
              </select>): user.gender =='female' ? (
                <select className="form-control" onChange={(e) => handleChange('gender', e.target.value)}>
              <option value="female">Female</option>
              <option value="male">Male</option>
              </select>):  <select className="form-control" onChange={(e) => handleChange('gender', e.target.value)}>
                <option>Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              </select>
              }
          </div>
          <div className="form-group">
            <label htmlFor="formGroupExampleInput2">Email</label>
            <input
              type="text"
              className="form-control"
              id="formGroupExampleInput3"
              placeholder="Email"
              value={user.email || ''} 
              onChange={(e) => handleChange('email', e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-dismiss="modal">
          Cancel
        </button>
        <button type="button" className="btn btn-primary" onClick={() => updateUser()}>
          Update
        </button>
      </div>
    </div>
  );
}

export default EditUser;
