import React from 'react';

const CategoryForm = ({
  handleSubmit,
  nameValue,
  setnameValue,
  photovalue,
  setphotoValue,
}) => {
  return (
    <form onSubmit={handleSubmit}>
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
<<<<<<< HEAD
      <button type="submit" className="button btn btn-primary">
=======
      <button type="submit" className="btn btn-primary">
>>>>>>> c4ee27945a58533f22b283c2b15d2362ccc51457
        Submit
      </button>
    </form>
  );
};

export default CategoryForm;