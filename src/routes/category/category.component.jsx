import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ProductCard from "../../components/product-card/product-card.component";
import "./category.styles.scss";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../store/categories/categories.selector";

const Category = () => {
    const { category } = useParams();
    console.log("render/re-rendering category component");

    const categoriesMap = useSelector(selectCategoriesMap);

    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        console.log("Effect fired, pulling setProducts");
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);

    return (
        <>
            <h2 className="category-title">{category.toUpperCase()}</h2>

            <div className="category-container">
                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
            </div>
        </>
    );
};

export default Category;
