import { Container, IconButton, ListItem, UnorderedList } from '@chakra-ui/react';
import React, { useState } from 'react';
import { ArrowDownIcon, ArrowUpIcon, ArrowForwardIcon } from '@chakra-ui/icons'

export interface TaskNode {
  id: string;
  parent_id: string | null;
  name: string;
}
type TreeNodeProps = {
  node: TaskNode;
  elements: TaskNode[];
}
type TaskTreeProps = {
  elements: TaskNode[];
}
const elements: TaskNode[] = [
  { id: 'da2c5ba5-407e-4065-a5d5-8a9c9b3a3b11', parent_id: null, name: 'Root 1' },
  { id: 'bbd60a16-9c9d-4f02-9075-5a5d5bbf6215', parent_id: 'da2c5ba5-407e-4065-a5d5-8a9c9b3a3b11', name: 'Child 1 of Root 1' },
  { id: 'aed8891f-57e4-4d8d-8ec3-812a7c3b9039', parent_id: 'da2c5ba5-407e-4065-a5d5-8a9c9b3a3b11', name: 'Child 2 of Root 1' },
  { id: '868f7dcb-6a69-4c39-a4e4-c8a3564b1185', parent_id: 'bbd60a16-9c9d-4f02-9075-5a5d5bbf6215', name: 'Grandchild 1 of Child 1 of Root 1' },
  { id: '1f90186e-34b5-4b9f-af96-bc8d0a0b1283', parent_id: 'aed8891f-57e4-4d8d-8ec3-812a7c3b9039', name: 'Grandchild 2 of Child 2 of Root 1' },
  { id: 'e2710ab3-82d3-48f2-94b2-2e5a0f369b99', parent_id: null, name: 'Root 2' },
  { id: '5fcbbca5-5d50-4a5d-90e4-1204f61ab7d4', parent_id: 'e2710ab3-82d3-48f2-94b2-2e5a0f369b99', name: 'Child 1 of Root 2' },
  { id: 'd2ed7ca9-2f75-43f1-a1c3-1e36e3ec3e8c', parent_id: 'e2710ab3-82d3-48f2-94b2-2e5a0f369b99', name: 'Child 2 of Root 2' },
  { id: '0a274f0d-f3b3-4c99-ae6b-e9983075d5e5', parent_id: '5fcbbca5-5d50-4a5d-90e4-1204f61ab7d4', name: 'Grandchild 1 of Child 1 of Root 2' },
  { id: '53c9e3e3-3c89-4150-8f0e-af1a7e77c86f', parent_id: 'd2ed7ca9-2f75-43f1-a1c3-1e36e3ec3e8c', name: 'Grandchild 2 of Child 2 of Root 2' },
]
const TreeNode = ({ node, elements }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const childElements = elements.filter(el => el.parent_id === node.id);

  return (
    <Container>

      <ListItem>
        {node.name}
        {childElements.length > 0 && (
          <IconButton onClick={() => setIsExpanded(!isExpanded)} icon={!isExpanded ? <ArrowForwardIcon /> : <ArrowDownIcon />} aria-label={'expand-icon'} />
        )}
        {isExpanded && (
          <UnorderedList>
            {childElements.map(child => (
              <TreeNode key={child.id} node={child} elements={elements} />
            ))}
          </UnorderedList>
        )}
      </ListItem>
    </Container>
  );
}

export const TaskTree = ({ elements }: TaskTreeProps) => {
  const rootElements = elements.filter(el => el.parent_id === null);

  return (
    <Container>
      <UnorderedList>
        {rootElements.map(root => (
          <TreeNode key={root.id} node={root} elements={elements} />
        ))}
      </UnorderedList>
    </Container>
  );
}
