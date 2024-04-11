import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout.js';
import AdminMenu from '../../components/layout/AdminMenu.js';
import axios from 'axios';
import toast from 'react-hot-toast';
import CategoryForm from '../../components/Form/CategoryFrom.js';
import { Modal } from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [photo, setPhoto] = useState('');
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPhoto, setUpdatedPhoto] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('photo', photo);
      
      const { data } = await axios.post('/api/vl/category/create-category', formData);
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in input form');
    }
  };

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get('/api/vl/category/get-category');
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong in getting categories');
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', updatedName);
      formData.append('photo', updatedPhoto);
      
      const { data } = await axios.put(
        `/api/vl/category/update-category/${selected._id}`,
        formData
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName('');
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Something went wrong');
    }
  };

  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/vl/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success('Category is deleted');
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <Layout title={'Dashboard - Create Category'}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text text-center">Manage Categories</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                nameValue={name}
                setnameValue={setName}
                photovalue={photo}
                setphotoValue={setPhoto}
              />
            </div>
            <div className="w-75">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories?.map((c) => (
                    <tr key={c._id}>
                      <td>{c.name}</td>
                      <td>
                        <img src={c.photo} alt={c.name} width="100" />
                      </td>
                      <td>
                        <button
                          className="button btn btn-primary ms-2"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name);
                            setSelected(c);
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="button btn btn-primary ms-2"
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            visible={visible}
          >
            <CategoryForm
              nameValue={updatedName}
              setnameValue={setUpdatedName}
              photovalue={updatedPhoto}
              setphotoValue={setUpdatedPhoto}
              handleSubmit={handleUpdate}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;