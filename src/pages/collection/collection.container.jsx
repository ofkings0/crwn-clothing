import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import WithSpinner from '../../components/with-spinner/with-spinner.component';
import { selectIsCollectionsLoaded } from '../../redux/shop-data/shop-data.selector';
import CollectionPage from '../../pages/collection/collection.component';

const mapStateToProps = createStructuredSelector ({
    isLoading: state => !selectIsCollectionsLoaded(state)
    //cannot do-
    //isLoading: !selectIsCollectionsLoaded bc not allowed to pass boolean 
})

const CollectionPageContainer = compose (
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage)

//Above code does the same as below, just less messy
//const CollectionsPageContainer = connect(mapStateToProps)(WithSpinner(CollectionsPage))

export default CollectionPageContainer;