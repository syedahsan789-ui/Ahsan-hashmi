
import React from 'react';
import { DragDataType } from '../types'; // Enum import should be fine

// DraggableItemProps interface would be defined in types.ts or implicitly through usage
// interface DraggableItemProps {
//   item: DraggableDefinition;
//   isPlaced: boolean;
// }

const DraggableItem = ({ item, isPlaced }) => {
  const handleDragStart = (e) => {
    e.dataTransfer.setData(DragDataType.DRAGGABLE_ID, item.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  if (isPlaced) {
    return null; // Don't render if it's already placed in a target
  }

  return (
    <div
      id={item.id}
      draggable={true}
      onDragStart={handleDragStart}
      className="draggable-item p-2 m-2 bg-white rounded-xl shadow-lg cursor-grab active:cursor-grabbing flex items-center justify-center transition-all duration-150 ease-in-out hover:shadow-xl hover:scale-105"
      aria-label={`Draggable item: ${item.description}`}
    >
      {item.content}
    </div>
  );
};

export default DraggableItem;
