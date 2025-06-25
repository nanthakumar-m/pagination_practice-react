import { useEffect, useState } from "react";
import "./App.css";
import { FaAngleDoubleRight, FaAngleDoubleLeft } from "react-icons/fa";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerpage] = useState(10);

  // fetching data from Api

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const result = await response.json();
        console.log(result);
        setData(result);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(data.length / postPerPage);

  // paginate function
  const paginate = (page) => {
    setCurrentPage(page);
  };
  if (loading) return <p>loading</p>;
  return (
    <div className="container">
      <h2>simple pagination</h2>
      <ul>
        {currentPosts.map((post) => (
          <li key={post.id}>
            {post.id}-{post.title}
          </li>
        ))}
      </ul>
      <div className="pagination">
        <button onClick={() => paginate(1)}>First</button>
        <button
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}>
          <FaAngleDoubleLeft />
        </button>

        {/* creating an array for the count of the total pages so that we can map and put buttons */}
        {new Array(totalPages).fill(0).map((page, index) => (
          <button
            className={currentPage === index + 1 ? "active" : ""}
            onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}>
          <FaAngleDoubleRight />
        </button>
        <button onClick={() => paginate(totalPages)}>Last</button>

        {/* Icon displayed next to text */}
      </div>
    </div>
  );
}

export default App;
