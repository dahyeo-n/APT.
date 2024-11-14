import { FloorNumberAdjustmentButtonsTypes } from '@/types/FloorNumberAdjustmentButtonsTypes';

import { MinusIcon } from '../icons/gamePlayPageIcons/MinusIcon';
import { PlusIcon } from '../icons/gamePlayPageIcons/PlusIcon';

const FloorNumberAdjustmentButtons = ({
  numberOfFloors,
  setNumberOfFloors,
  handleFloorInputChange,
}: FloorNumberAdjustmentButtonsTypes) => {
  return (
    <div
      id='number_of_aparteu_floors'
      className='flex gap-3 px-3 py-2 text-white bg-indigo-500 rounded-lg transition-all duration-300 hover:bg-indigo-600 shadow-lg sm:py-3'
    >
      <button
        onClick={() => setNumberOfFloors((prev) => Math.max(prev - 1, 1))}
        disabled={numberOfFloors < 1}
      >
        <MinusIcon />
      </button>
      <input
        value={numberOfFloors}
        onChange={handleFloorInputChange}
        min={1}
        max={50}
        className='w-6 text-center bg-transparent text-white border-b border-zinc-300 focus:outline-none'
      />
      층
      <button
        onClick={() => setNumberOfFloors((prev) => prev + 1)}
        disabled={numberOfFloors >= 50}
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default FloorNumberAdjustmentButtons;
