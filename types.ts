
import React from 'react';

export interface DraggableDefinition {
  id: string; // Unique ID for this draggable instance, e.g., "d-shape-circle"
  content: React.ReactNode;
  targetMatcherId: string; // ID that the target must accept, e.g., "shape-circle"
  description: string; // For alt text or hints, e.g., "A red circle"
}

export interface TargetDefinition {
  id: string; // Unique ID for this target slot, e.g., "t-shape-circle"
  acceptsMatcherId: string; // ID of the draggable type it accepts, e.g., "shape-circle"
  placeholderContent: React.ReactNode; // What to show when empty, e.g., an outline
  description: string; // For alt text or hints, e.g., "Place the circle here"
}

export interface LevelConfiguration {
  id: string; // e.g., "level-1"
  title: string;
  instructions: string;
  draggables: DraggableDefinition[];
  targets: TargetDefinition[];
  themeColor: string; // A Tailwind color class, e.g., "bg-blue-500"
}

// Enum for drag event data type for clarity
export enum DragDataType {
  DRAGGABLE_ID = 'application/x-draggable-id'
}
    