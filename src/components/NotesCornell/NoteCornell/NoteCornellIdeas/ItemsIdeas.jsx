import React from 'react';
import classes from './NoteCornellIdeas.module.scss';

const ItemsTags = ({
  onDelete,
  onActive,
  iconType,
  titleTag,
  tags,
  colorIcon,
  colorTag,
  bgTag,
}) => {
  const classIcon = {
    color: colorIcon,
  };
  const classTag = {
    color: colorTag,
    backgroundColor: bgTag,
  };
  return (
    <>
      {onActive ? (
        <div className={classes.ItemsTags}>
          <div className={classes.Heading}>
            <i className={['bx', iconType].join(' ')} style={classIcon} />
            <h6>{titleTag}</h6>
          </div>
          <ul>
            {tags &&
              tags.map((item, index) => (
                <li key={item} style={classTag}>
                  <div
                    onClick={() => onDelete(item, index)}
                    role="button"
                    tabIndex="0">
                    {item}
                  </div>
                </li>
              ))}
          </ul>
        </div>
      ) : null}
    </>
  );
};

export default ItemsTags;
