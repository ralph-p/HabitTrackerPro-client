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
const TreeNode = ({ node, elements }: TreeNodeProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const childElements = elements.filter(el => el.parent_id === node.id);

  return (
    <Container>

      <ListItem>
        {node.name}
        {childElements.length > 0 && (
          <IconButton onClick={() => setIsExpanded(!isExpanded)} icon={!isExpanded ? <ArrowForwardIcon /> : <ArrowDownIcon />} />
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
