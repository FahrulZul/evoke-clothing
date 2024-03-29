import "./directory-item.styles.scss";
import { useNavigate } from "react-router-dom";

const DirectoryItem = ({ category }) => {
    const { id, title, imageUrl } = category;
    const navigate = useNavigate();

    const handleNavigate = () => navigate(`shop/${title}`);

    return (
        <div
            onClick={handleNavigate}
            key={id}
            className="directory-item-container"
        >
            <div
                className="background-image"
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}
            />
            <div className="body">
                <h2>{title}</h2>
                <p>Shop Now</p>
            </div>
        </div>
    );
};

export default DirectoryItem;
