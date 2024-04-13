import React, { useState, useEffect } from "react";
import { useSearch } from "../../context/search"; // Assuming this provides search context
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {
  const [keyword, setKeyword] = useState(""); // Local state for keyword
  const { setValues, results } = useSearch(); // Access search context
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      const { data } = await axios.get(`/api/vl/product/search/${keyword}`);
      setValues({ keyword, results: data }); // Update context with keyword and results
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  // Optional: Pre-fill keyword from search context (if desired)
  useEffect(() => {
    if (results && results.length > 0) {
      setKeyword(results.keyword || ""); // Set keyword only if results exist
    }
  }, [results]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e); // Trigger search on Enter key press
    }
  };

  return (
    <form className="d-flex search-form" role="search" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress} // Add onKeyPress handler
      />
    </form>
  );
};

export default SearchInput;
