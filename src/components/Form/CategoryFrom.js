import React from "react";
import "../../styles/form.css";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter new category"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>

        <button type="submit" className="button btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default CategoryForm;
