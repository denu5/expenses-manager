import React, { FC } from 'react';
import { Avatar } from 'antd';
import { getCategoryColor } from 'shared/constants';

interface Props {
  category: string;
}

const CategoryIcon: FC<Props> = ({ category }) => {
  return (
    <Avatar
      size="large"
      shape="square"
      style={{
        backgroundColor: getCategoryColor(category)
      }}
    >
      {category[0]}
    </Avatar>
  );
};

export default CategoryIcon;
