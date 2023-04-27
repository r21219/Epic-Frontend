import {Category} from "../../models/Category";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

const CategoryRow = (params: { category: Category }) => {

    return (
        <tr>
            <td>{params.category.title}</td>

            {/* <td>
                <Button variant="info" className="me-2" onClick={() => goToDetail(params.band.id)}>Detail</Button>
                <Button variant="danger" onClick={() => params.delete(params.band.id)}>Delete</Button>
            </td>*/}
        </tr>
    );
};

export default CategoryRow;