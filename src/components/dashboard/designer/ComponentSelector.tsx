import React, { FC } from 'react';
import { useComponentFacade } from '../components/state/component.hooks';
import DirectoryTree from 'antd/lib/tree/DirectoryTree';

// type ComponentDashboardType = {
//   title: string;
//   key: string;
//   children: Array<ComponentDashboardType>;
// };

// type ComponentSelectorProps = {
//   components: Array<ComponentDashboardType>;
// };

interface DataNode {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: DataNode[];
}

const ComponentSelector: FC<{ onSelect: Function }> = (props) => {
  const [stateComponent] = useComponentFacade();

  return (
    <DirectoryTree
      multiple
      defaultExpandParent
      onSelect={(keys, ev) => props.onSelect(keys, ev)}
      treeData={stateComponent.groups as DataNode[]}
    />
  );
};

export default ComponentSelector;
