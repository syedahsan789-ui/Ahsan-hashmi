
import React, { useState, useEffect, useCallback } from 'react';
// import { LevelConfiguration, DraggableDefinition, TargetDefinition } from '../types';
import DraggableItem from './DraggableItem';
import DropTarget from './DropTarget';
import FeedbackMessage from './FeedbackMessage';
import { SparkleIcon } from './icons';

// interface LevelDisplayProps {
//   levelConfig: LevelConfiguration;
//   onLevelComplete: () => void;
//   onIncorrectDropSound?: () => void;
//   onCorrectDropSound?: () => void;
// }

// Utility to shuffle an array (type annotations removed)
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const LevelDisplay = ({ levelConfig, onLevelComplete, onCorrectDropSound, onIncorrectDropSound }) => {
  const [availableDraggables, setAvailableDraggables] = useState([]);
  const [placedItems, setPlacedItems] = useState({});
  const [feedback, setFeedback] = useState(null);
  const [levelJustCompleted, setLevelJustCompleted] = useState(false);

  const initializeLevel = useCallback(() => {
    setAvailableDraggables(shuffleArray(levelConfig.draggables));
    const initialPlacedItems = {};
    levelConfig.targets.forEach(target => {
      initialPlacedItems[target.id] = null;
    });
    setPlacedItems(initialPlacedItems);
    setFeedback(null);
    setLevelJustCompleted(false);
  }, [levelConfig]);

  useEffect(() => {
    initializeLevel();
  }, [initializeLevel]);

  const handleDropItem = (draggableId, targetId) => {
    const draggable = levelConfig.draggables.find(d => d.id === draggableId);
    const target = levelConfig.targets.find(t => t.id === targetId);

    if (draggable && target) {
      if (draggable.targetMatcherId === target.acceptsMatcherId) {
        setPlacedItems(prev => ({ ...prev, [targetId]: draggable }));
        setAvailableDraggables(prev => prev.filter(d => d.id !== draggableId));
        setFeedback("Great job! 🎉");
        if(onCorrectDropSound) onCorrectDropSound();

        // Check for level completion
        const nextPlacedItems = { ...placedItems, [targetId]: draggable };
        
        const allTargetsFilledCorrectly = levelConfig.targets.every(t => {
          const itemInTarget = nextPlacedItems[t.id];
          return itemInTarget && itemInTarget.targetMatcherId === t.acceptsMatcherId;
        });

        if (allTargetsFilledCorrectly && Object.keys(nextPlacedItems).length === levelConfig.targets.length) {
             // A more robust check: ensure all targets defined in levelConfig have a correct item in nextPlacedItems
            const allTargetsInLevelAreCorrectlyFilled = levelConfig.targets.every(
                configTarget => {
                    const placed = nextPlacedItems[configTarget.id];
                    return placed && placed.targetMatcherId === configTarget.acceptsMatcherId;
                }
            );

            if (allTargetsInLevelAreCorrectlyFilled) {
                setFeedback("Level Complete! ✨🚀");
                setLevelJustCompleted(true);
                setTimeout(() => {
                    onLevelComplete();
                }, 2000); 
            }
        }

      } else {
        setFeedback("Oops! Try a different spot. 🤔");
        if(onIncorrectDropSound) onIncorrectDropSound();
      }
    }
    setTimeout(() => setFeedback(null), 1500);
  };

  return (
    <div className={`p-4 md:p-8 rounded-lg shadow-2xl ${levelConfig.themeColor} min-h-[calc(100vh-200px)] flex flex-col items-center`}>
      <h2 className="text-3xl md:text-4xl font-bold text-white mb-2 text-center">{levelConfig.title}</h2>
      <p className="text-lg text-white/90 mb-6 text-center">{levelConfig.instructions}</p>
      
      {feedback && <FeedbackMessage message={feedback} type={feedback.includes("Oops") ? "error" : "success"} />}

      {levelJustCompleted && (
         <div className="text-center my-10">
            <SparkleIcon className="w-24 h-24 text-yellow-300 inline-block animate-pulse" />
            <p className="text-3xl font-bold text-white mt-4">Amazing!</p>
         </div>
      )}

      {!levelJustCompleted && (
        <>
          <div className="mb-8 md:mb-12 min-h-[100px] md:min-h-[150px] w-full max-w-2xl bg-white/30 backdrop-blur-sm p-4 rounded-xl flex flex-wrap justify-center items-center gap-2 md:gap-4">
            {availableDraggables.length > 0 ? (
              availableDraggables.map(item => (
                <DraggableItem key={item.id} item={item} isPlaced={false} />
              ))
            ) : (
              <p className="text-white/80 text-lg">Drag items from here!</p>
            )}
          </div>

          <div className="flex flex-wrap justify-center items-start gap-2 md:gap-4">
            {levelConfig.targets.map(target => (
              <DropTarget
                key={target.id}
                target={target}
                placedItem={placedItems[target.id] || null}
                onDropItem={handleDropItem}
                themeColor={levelConfig.themeColor}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default LevelDisplay;
