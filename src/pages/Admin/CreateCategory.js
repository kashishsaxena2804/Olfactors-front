import React, { useEffect, useState } from 'react';
import Layout from '../../components/layout/Layout.js';
import AdminMenu from '../../components/layout/AdminMenu.js';
import axios from 'axios';
import toast from 'react-hot-toast';
import CategoryForm from '../../components/Form/CategoryFrom.js';
import { Modal } from "antd";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(""); 
  const [photo, setPhoto] = useState("");
  const [visible, setVisible] = useState(false); 
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedPhoto, setUpdatedPhoto] = useState("");

  // Function to handle form submission for creating a new category
  const handleSubmit = async () => {
    try {
      const { data } = await axios.post("/api/vl/category/create-category", {
        name,
        photo
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while creating the category");
    }
  };

  // Function to fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/vl/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Function to handle updating a category
  const handleUpdate = async () => {
    try {
      const { data } = await axios.put(
        `/api/vl/category/update-category/${selected._id}`,
        { name: updatedName, photo: updatedPhoto }
      );
      if (data?.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while updating the category");
    }
  };

  // Function to handle deleting a category
  const handleDelete = async (categoryId) => {
    try {
      const { data } = await axios.delete(
        `/api/vl/category/delete-category/${categoryId}`
      );
      if (data.success) {
        toast.success(`Category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting the category");
    }
  };

  return (
    <Layout title={"Dashboard - Create Category"}>
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
                photoValue={photo}
                setphotoValue={setPhoto}
              />
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category._id}>
                      <td>{category.name}</td>
                      <td>
                        <button className='button btn btn-primary ms-2'
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(category.name)
                            setSelected(category);
                          }}
                        >
                          Edit
                        </button>
                        <button className='button btn btn-primary ms-2'
                          onClick={() => {
                            handleDelete(category._id);
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
              handleSubmit={handleUpdate}
              nameValue={updatedName}
              setnameValue={setUpdatedName}
              photoValue={updatedPhoto}
              setphotoValue={setUpdatedPhoto}
            />
          </Modal>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory;
