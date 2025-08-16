import React from 'react';
import { LevelConfiguration } from './types'; // Type import for GAME_LEVELS
import { CircleIcon, SquareIcon, TriangleIcon } from './components/icons';

const createColoredSquare = (colorName: string, tailwindBgClass: string, tailwindTextClass: string = 'text-white'): React.ReactElement => (
  React.createElement('div', { className: `w-16 h-16 ${tailwindBgClass} flex items-center justify-center rounded-lg shadow-md` },
    React.createElement('span', { className: `font-bold text-sm ${tailwindTextClass}` }, colorName)
  )
);

const createPlaceholderBox = (text: string, borderColor: string = 'border-gray-400'): React.ReactElement => (
  React.createElement('div', { className: `w-20 h-20 border-2 border-dashed ${borderColor} rounded-lg flex items-center justify-center text-gray-500 text-center p-2` },
    text
  )
);

export const GAME_LEVELS: LevelConfiguration[] = [
  // Level 1: Shapes
  {
    id: "level-1",
    title: "Level 1: Match Shapes",
    instructions: "Drag the colorful shapes to their matching gray outlines.",
    themeColor: "bg-sky-500",
    draggables: [
      { id: "d1-circle", content: React.createElement(CircleIcon, { fillColor: "fill-red-500", strokeColor: "stroke-red-700" }), targetMatcherId: "shape-circle", description: "Red Circle" },
      { id: "d1-square", content: React.createElement(SquareIcon, { fillColor: "fill-blue-500", strokeColor: "stroke-blue-700" }), targetMatcherId: "shape-square", description: "Blue Square" },
      { id: "d1-triangle", content: React.createElement(TriangleIcon, { fillColor: "fill-green-500", strokeColor: "stroke-green-700" }), targetMatcherId: "shape-triangle", description: "Green Triangle" },
    ],
    targets: [
      { id: "t1-circle", acceptsMatcherId: "shape-circle", placeholderContent: React.createElement(CircleIcon, { outline: true, strokeColor: "stroke-gray-400" }), description: "Outline of a circle" },
      { id: "t1-square", acceptsMatcherId: "shape-square", placeholderContent: React.createElement(SquareIcon, { outline: true, strokeColor: "stroke-gray-400" }), description: "Outline of a square" },
      { id: "t1-triangle", acceptsMatcherId: "shape-triangle", placeholderContent: React.createElement(TriangleIcon, { outline: true, strokeColor: "stroke-gray-400" }), description: "Outline of a triangle" },
    ],
  },
  // Level 2: Colors
  {
    id: "level-2",
    title: "Level 2: Match Colors",
    instructions: "Drag the colored squares to the boxes with the same color name.",
    themeColor: "bg-rose-500",
    draggables: [
      { id: "d2-red", content: createColoredSquare("Red", "bg-red-500"), targetMatcherId: "color-red", description: "Red color block" },
      { id: "d2-blue", content: createColoredSquare("Blue", "bg-blue-500"), targetMatcherId: "color-blue", description: "Blue color block" },
      { id: "d2-green", content: createColoredSquare("Green", "bg-green-500"), targetMatcherId: "color-green", description: "Green color block" },
    ],
    targets: [
      { id: "t2-red", acceptsMatcherId: "color-red", placeholderContent: createPlaceholderBox("Red", "border-red-500"), description: "Target for red color" },
      { id: "t2-blue", acceptsMatcherId: "color-blue", placeholderContent: createPlaceholderBox("Blue", "border-blue-500"), description: "Target for blue color" },
      { id: "t2-green", acceptsMatcherId: "color-green", placeholderContent: createPlaceholderBox("Green", "border-green-500"), description: "Target for green color" },
    ],
  },
  // Level 3: Numbers
  {
    id: "level-3",
    title: "Level 3: Count and Match",
    instructions: "Drag the number to the group with the same quantity of items.",
    themeColor: "bg-amber-500",
    draggables: [
      { id: "d3-1", content: React.createElement('div', { className: "text-4xl font-bold text-purple-600" }, "1"), targetMatcherId: "number-1", description: "Number 1" },
      { id: "d3-2", content: React.createElement('div', { className: "text-4xl font-bold text-pink-600" }, "2"), targetMatcherId: "number-2", description: "Number 2" },
      { id: "d3-3", content: React.createElement('div', { className: "text-4xl font-bold text-teal-600" }, "3"), targetMatcherId: "number-3", description: "Number 3" },
    ],
    targets: [
      { id: "t3-1", acceptsMatcherId: "number-1", placeholderContent: React.createElement('div', { className: "text-4xl" }, "🍎"), description: "One apple" },
      { id: "t3-2", acceptsMatcherId: "number-2", placeholderContent: React.createElement('div', { className: "text-4xl" }, "🍌🍌"), description: "Two bananas" },
      { id: "t3-3", acceptsMatcherId: "number-3", placeholderContent: React.createElement('div', { className: "text-4xl" }, "🍓🍓🍓"), description: "Three strawberries" },
    ],
  },
  // Level 4: Animals
  {
    id: "level-4",
    title: "Level 4: Animal Friends",
    instructions: "Drag the animal to its name.",
    themeColor: "bg-lime-500",
    draggables: [
      { id: "d4-cat", content: React.createElement('div', { className: "text-5xl" }, "🐱"), targetMatcherId: "animal-cat", description: "Cat" },
      { id: "d4-dog", content: React.createElement('div', { className: "text-5xl" }, "🐶"), targetMatcherId: "animal-dog", description: "Dog" },
      { id: "d4-bird", content: React.createElement('div', { className: "text-5xl" }, "🐦"), targetMatcherId: "animal-bird", description: "Bird" },
    ],
    targets: [
      { id: "t4-cat", acceptsMatcherId: "animal-cat", placeholderContent: createPlaceholderBox("Cat", "border-orange-500"), description: "Target for cat" },
      { id: "t4-dog", acceptsMatcherId: "animal-dog", placeholderContent: createPlaceholderBox("Dog", "border-yellow-500"), description: "Target for dog" },
      { id: "t4-bird", acceptsMatcherId: "animal-bird", placeholderContent: createPlaceholderBox("Bird", "border-cyan-500"), description: "Target for bird" },
    ],
  },
  // Level 5: Letters
  {
    id: "level-5",
    title: "Level 5: ABC Fun",
    instructions: "Drag the letter to the object that starts with it.",
    themeColor: "bg-fuchsia-500",
    draggables: [
      { id: "d5-a", content: React.createElement('div', { className: "text-4xl font-bold text-red-600" }, "A"), targetMatcherId: "letter-a", description: "Letter A" },
      { id: "d5-b", content: React.createElement('div', { className: "text-4xl font-bold text-green-600" }, "B"), targetMatcherId: "letter-b", description: "Letter B" },
      { id: "d5-c", content: React.createElement('div', { className: "text-4xl font-bold text-blue-600" }, "C"), targetMatcherId: "letter-c", description: "Letter C" },
    ],
    targets: [
      { id: "t5-a", acceptsMatcherId: "letter-a", placeholderContent: React.createElement('div', { className: "text-3xl p-2 text-center" }, "🍎", React.createElement('br'), "Apple"), description: "Apple for A" },
      { id: "t5-b", acceptsMatcherId: "letter-b", placeholderContent: React.createElement('div', { className: "text-3xl p-2 text-center" }, "⚽", React.createElement('br'), "Ball"), description: "Ball for B" },
      { id: "t5-c", acceptsMatcherId: "letter-c", placeholderContent: React.createElement('div', { className: "text-3xl p-2 text-center" }, "🚗", React.createElement('br'), "Car"), description: "Car for C" },
    ],
  },
];
