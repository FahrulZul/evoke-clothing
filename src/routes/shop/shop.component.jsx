import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import ProductCard from "../../components/product-card/product-card.component";
import "./shop.styles.scss";

const Shop = () => {
    const { categoriesMap } = useContext(CategoriesContext);

    return (
        <>
            {Object.keys(categoriesMap).map((title) => (
                <Fragment key={title}>
                    <h2>{title.toUpperCase()}</h2>

                    <div className="products-container">
                        {categoriesMap[title]
                            .slice(0, 4)
                            .map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                    </div>
                </Fragment>
            ))}
        </>
    );
};

export default Shop;
