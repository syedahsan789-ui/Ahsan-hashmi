
import React, { useState } from 'react';
import { DragDataType } from '../types'; // Enum import should be fine

// DropTargetProps interface would be defined in types.ts or implicitly through usage
// interface DropTargetProps {
//   target: TargetDefinition;
//   placedItem: DraggableDefinition | null;
//   onDropItem: (draggableId: string, targetId: string) => void;
//   themeColor?: string; 
// }

const DropTarget = ({ target, placedItem, onDropItem, themeColor = "border-gray-400" }) => {
  const [isOver, setIsOver] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!placedItem) { // Only allow drop if target is empty
      e.dataTransfer.dropEffect = 'move';
      setIsOver(true);
    } else {
      e.dataTransfer.dropEffect = 'none';
    }
  };

  const handleDragLeave = () => {
    setIsOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsOver(false);
    if (!placedItem) { // Only process drop if target is empty
      const draggableId = e.dataTransfer.getData(DragDataType.DRAGGABLE_ID);
      if (draggableId) {
        onDropItem(draggableId, target.id);
      }
    }
  };
  
  const baseClasses = "w-32 h-32 md:w-40 md:h-40 m-2 rounded-xl shadow-md flex items-center justify-center p-2 transition-all duration-150 ease-in-out";
  // Ensure themeColor is treated as a string for replacement
  const currentThemeColor = String(themeColor);
  const borderColorBasedOnTheme = currentThemeColor.startsWith('bg-') ? currentThemeColor.replace('bg-','border-') : currentThemeColor;
  
  const borderStyle = placedItem ? `border-4 border-solid ${borderColorBasedOnTheme}` : `border-2 border-dashed ${isOver ? borderColorBasedOnTheme : 'border-gray-300'}`;
  
  let bgColor = 'bg-white/70';
  if (isOver && !placedItem) {
    bgColor = currentThemeColor.startsWith('bg-') ? `${currentThemeColor}/20` : 'bg-gray-200/20'; // Fallback if themeColor is not bg-
  }


  return (
    <div
      id={target.id}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${baseClasses} ${borderStyle} ${bgColor} ${isOver && !placedItem ? 'scale-105 shadow-xl' : ''}`}
      aria-label={`Drop target: ${target.description}${placedItem ? `, currently holding ${placedItem.description}` : ', empty'}`}
    >
      {placedItem ? placedItem.content : target.placeholderContent}
    </div>
  );
};

export default DropTarget;
