import React, { useState } from 'react';
import Tree from 'react-d3-tree';
import { TreeProps } from 'react-d3-tree/lib/Tree/types';

import GraphCard from '../components/GraphCard';
import PartnerModal from './PartnerModal';

export default React.memo(
  function (props: TreeProps) {
    const [isVisible, setVisible] = useState(false);
    const [partnerId, setPartnerId] = useState<number>();

    const handleOpenModal = (id: number) => {
      setVisible(true);
      setPartnerId(id);
    };

    return (
      <>
        <Tree
          pathFunc="elbow"
          data={props.data}
          depthFactor={250}
          initialDepth={2}
          orientation="vertical"
          enableLegacyTransitions
          svgClassName="partner-tree"
          nodeSize={{ x: 400, y: 200 }}
          translate={{ x: 700, y: 100 }}
          renderCustomNodeElement={({ nodeDatum, toggleNode }) => (
            <GraphCard nodeData={nodeDatum} toggleNode={toggleNode} openModal={handleOpenModal} />
          )}
        />

        {partnerId && <PartnerModal userId={partnerId} isVisible={isVisible} setVisible={setVisible} />}
      </>
    );
  },
  (prev, next) => prev.data === next.data,
);
