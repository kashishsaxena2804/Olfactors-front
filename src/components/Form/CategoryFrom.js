import React from 'react';

const CategoryForm = ({
  handleSubmit,
  nameValue,
  setnameValue,
  photovalue,
  setphotoValue,
}) => {
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    handleSubmit(); // Call the handleSubmit function passed from the parent component
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3">
        <label htmlFor="categoryName" className="form-label">
          Category Name
        </label>
        <input
          type="text"
          className="form-control"
          id="categoryName"
          value={nameValue}
          onChange={(e) => setnameValue(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="categoryImage" className="form-label">
          Category Image
        </label>
        <input
          type="file"
          className="form-control"
          id="categoryImage"
          onChange={(e) => setphotoValue(e.target.files[0])}
          accept="image/*"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;
