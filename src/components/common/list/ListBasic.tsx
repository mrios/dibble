import React from 'react';
import { Table } from 'antd';
import { ColumnsType } from 'antd/lib/table';

export interface ListProps {
  data: any;
  columns: ColumnsType<{}>;
  extraClass?: string;
}

const ListBasic: React.FC<ListProps> = ({ data, columns, extraClass }) => {
  const addIndex = (item: any, i: number) => {
    return Object.assign({}, item, { key: i });
  };

  return (
    <Table
      dataSource={data.map(addIndex)}
      columns={columns}
      size="middle"
      className={extraClass}
    />
  );
};

ListBasic.propTypes = {};
export default ListBasic;
