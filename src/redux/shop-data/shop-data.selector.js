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
    collections ? //if statement is needed bc collections can be null (as seen in shop-data.reducer.js). 
      collections[collectionUrlParam] //if collections is null, cannot run this func bc nothing exists in collections
    : []
)

export const selectCollectionsForPreview = createSelector( //changes object of SHOP_DATA into array for collecions-overview
  [selectCollections],
  collections => 
    collections ? 
      Object.keys(collections).map(key => collections[key]) 
    : []
)