import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"

const BookmarkDetails = () => {
  const navigate = useNavigate()
  const [bookmark, setBookmark] = useState({});
  const { id } = useParams()
  const API = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios.get(`${API}/bookmarks/${id}` )
    .then((response) => setBookmark(response.data))
    .catch((error) => console.warn(error))
  }, [API, id])
  
  const handleDelete = () => {
    axios.delete(`${API}/bookmarks/${id}`)
    .then(()=> navigate("/bookmarks"))
    .catch((error) => console.warn(error))
  }
  return (
    <article>
      <h2>{bookmark.is_favorite ? '⭐️ ': '&nbsp&nbsp&'} {bookmark.name}</h2>
      <h4>
        <a href={bookmark.url}>{bookmark.name}</a>
        <span>https://www.pursuit.org</span>
      </h4>
      <p>{bookmark.category}</p>
      <div className="showNavigation">
        <div className="">
          <Link to="/bookmarks">
            <button>Back</button>
          </Link>
        </div>
        <div className="">
          <Link to="/bookmarks/2/edit">
            <button>Edit</button>
          </Link>
        </div>
        <div className="">
          <button onClick={handleDelete}>Delete</button>
        </div>
      </div>
    </article>);
}

export default BookmarkDetails;
