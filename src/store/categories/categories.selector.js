// reselect is use to avoid fire useSelector if the state is not chaged

import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
    return state.categories;
};

export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        return categoriesSlice.categories;
    }
);

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        return categories.reduce((acc, category) => {
            const { title, items } = category;
            acc[title.toLowerCase()] = items;

            return acc;
        }, {});
    }
);
