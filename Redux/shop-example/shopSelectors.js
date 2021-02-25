import { createSelector } from "reselect";

const selectShop = (state) => state.shop;

export const selectShopCollections = createSelector(
    [selectShop],
    (shop) => shop.collections
);

export const selectShopCollectionsForPreview = createSelector(
    [selectShopCollections],
    (collections) =>
        collections
            ? Object.keys(collections).map((key) => collections[key])
            : []
);

export const selectShopCollection = (collectionUrlParam) =>
    createSelector([selectShopCollections], (collections) =>
        collections ? collections[collectionUrlParam] : null
    );

export const selectIsCollectionsFetching = createSelector(
    [selectShop],
    (shop) => shop.isFetching
);

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    (shop) => !!shop.collections
);

//use in classComponent
const mapStateToProps = (state) => ({
    shopCollection: selectShopCollection(state),
});
//or khỏi pải truyền state vào từng function
const mapStateToProps = createStructuredSelector({
    shopCollection: selectShopCollection,
    hidden: selectCartHidden,
});
