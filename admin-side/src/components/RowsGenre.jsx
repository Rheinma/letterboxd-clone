import { useDispatch } from "react-redux";
import { deleteGenre } from "../stores/actions/genresAction";

export default function RowsGenre(props) {
  const dispatch = useDispatch();
  const handleDelete = async () => {
    dispatch(deleteGenre(id));
  };
  const { no, genre } = props;
  const { name, createdAt, updatedAt, id } = genre;

  return (
    <tr>
      <th className="align-middle">{no + 1}</th>
      <td className="align-middle">{name}</td>
      <td className="align-middle">
        <i className="align-middle">{createdAt}</i>
      </td>
      <td className="align-middle">
        <i className="align-middle">{updatedAt}</i>
      </td>
      <td className="align-middle">
        <button onClick={handleDelete} className="btn btn-dark align-middle">
          Delete
        </button>
      </td>
    </tr>
  );
}
