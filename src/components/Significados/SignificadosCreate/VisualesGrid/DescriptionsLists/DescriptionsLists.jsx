import React from 'react';
import DescriptionList from './DescriptionList';
import classes from './DescriptionList.module.scss';

const DescriptionsLists = ({ descriptions, onDelete }) => (
  <>
    <ul className={classes.DescriptionsLists}>
      {descriptions &&
        descriptions.map((item, index) => (
          <DescriptionList
            key={index}
            {...item}
            description={item}
            onDelete={() => onDelete(index)}
          />
        ))}
    </ul>
  </>
);

export default DescriptionsLists;
