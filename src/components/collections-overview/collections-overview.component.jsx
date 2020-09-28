import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCollectionsForPreview } from '../../redux/shop-data/shop-data.selector';
import CollectionPreview from '../collection-preview/collection-preview.component';


import './collections-overview.styles.scss';

const CollectionsOverview = ({collections}) => (
    <div className='collections-overview'>
    {collections.map(({id, ...otherSectionProps}) => (
        <CollectionPreview
          key={id}
          {...otherSectionProps}
        />
      ))}
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview //expected array of collections so use this selector
})
  
export default connect(mapStateToProps)(CollectionsOverview);