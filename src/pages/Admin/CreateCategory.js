import React, { useEffect, useState } from 'react'
import Layout from '../../components/layout/Layout.js'
import AdminMenu from '../../components/layout/AdminMenu.js'
import axios from 'axios';
import toast from 'react-hot-toast';
import CategoryForm from '../../components/Form/CategoryFrom.js';
import { Modal } from "antd";
import "../../styles/form.css";
const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState(""); 
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false); 
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  //handle Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/vl/category/create-category", {
        name,
        image,
      });
      if (data?.success) {
        toast.success(`${name} is created`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      //toast.error("somthing went wrong in input form");
    }
  };
  //get all cat
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get("/api/vl/category/get-category");
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something wwent wrong in getting catgeory");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `/api/vl/category/update-category/${selected._id}`,
        { name: updatedName }
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
      
    }
  };

  //delete category
  const handleDelete = async (pId) => {
    try {
      const { data } = await axios.delete(
        `/api/vl/category/delete-category/${pId}`
      );
      if (data.success) {
        toast.success(`category is deleted`);

        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };

  return (
    <Layout title={"Dashboard - Create Catergory"}>
        
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text text-center">Manage  Categories</h1>
            <div className="p-3 w-50">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                image={image}
                setImage={setImage}

              />
              <div className="mb-3">
                <label className="button btn btn-outline-secondary col-md-12">
                  {image ? image.name : 'Upload Photo'}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>
              <div className="mb-3">
                {image && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="category_photo"
                      height={'200px'}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
            </div>
            <div className='w-75'>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col"> Name</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  
                  {categories?.map((c) => (
                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>
                          <button className='button btn btn-primary ms-2'
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(c.name)
                            setSelected(c);
                          }}
                        >Edit</button>
                          <button className='button btn btn-primary ms-2'
                          onClick={() => {
                            handleDelete(c._id);
                          }}
                          >Delete</button>
                        </td>
                      </tr>
                    </>
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
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
        </div>
      </div>
    </Layout>
  )
}

export default CreateCategory;