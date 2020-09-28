import {createSelector} from 'reselect';
const selectShopData = state => state.shopData

export const selectCollections = createSelector(
  [selectShopData],
  shopData => shopData.collections
)

export const selectCollection = collectionUrlParam => 
  createSelector(
  [selectCollections],
  collections => 
    collections[collectionUrlParam]
)

export const selectCollectionsForPreview = createSelector( //changes object of SHOP_DATA into array for collecions-overview
  [selectCollections],
  collections => Object.keys(collections).map(key => collections[key])
)