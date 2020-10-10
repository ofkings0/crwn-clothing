import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { firestore , convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop-data/shops.actions';

import CollectionPage from '../collection/collection.component';
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import './shop.styles.scss';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
  state = {
    loading: true
  }

  unsubcribeFromSnapShot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections')

    // collectionRef.get().then(async snapshot => { //promise
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   //console.log(collectionsMap);
    //   updateCollections(collectionsMap)
    //   this.setState({ loading: false })
    // })

    //below code works same as above, but uses observer-viewer than promises 
    // this.unsubcribeFromSnapShot = collectionRef.onSnapshot(async snapshot => {
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
    //   //console.log(collectionsMap);
    //   updateCollections(collectionsMap)
    //   this.setState({ loading: false })
    // })
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    
    return(
      <div className='shop-page'>
      <Route 
        exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} 
      />
      <Route 
        path={`${match.path}/:categoryId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} 
      />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);