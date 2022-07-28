import React, { useEffect, useState } from 'react';
import EditUser from './EditUser';
import { getAllUsers, insertUsers } from '../services/UserService';
import downloadCsv from 'download-csv';

function Users() {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState([])

  const edit_status = (data) => {
    getAllUsers()
      .then(users => {
        setUsers(users.data);
      });
  }

  useEffect(() => {
    getAllUsers()
      .then(users => {
        if (users.data.length) {
          setUsers(users.data);
        }
        else {
          insertUsers()
            .then(res => {
              if (res.status) {
                edit_status(true);
              }
            });
        }

      });

  }, []);
  const getSingleUser = (user) => {
    setUser(user)
  };
  const exportCSV = () => {
    const columns = {
      id: 'Id',
      name: 'Name',
      email: 'Email',
      gender: 'Gender',
      status: 'Status',
    };
    const data = users.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      status: user.status
    }));
    let fileName = `all_users_data_${Date.now()}`;
    downloadCsv(data, columns, `${fileName}.csv`);
  };

  return (

    <div>
      <div className="container d-flex flex-row justify-content-between mt-4">
        <h1>All Users</h1>
        {users?.length != 0 && <button className="btn btn-primary" onClick={() => exportCSV()}>
          +Export All Users
        </button>}
      </div>
      <div className="container mt-4">
        {users?.length === 0 && <p className="text-danger text-center">No Users Found!</p>}
        {users?.length > 0 && (
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">S.No</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Gender</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>

                  <td>{user.email}</td>
                  <td>{user.gender.toUpperCase()}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      data-toggle="modal"
                      data-target="#exampleModalCenter"
                      onClick={() => getSingleUser(user)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div
          className="modal fade"
          id="exampleModalCenter"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <EditUser editUserData={user} edit_status={edit_status} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
