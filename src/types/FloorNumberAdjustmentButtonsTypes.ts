export interface FloorNumberAdjustmentButtonsTypes {
  numberOfFloors: number;
  setNumberOfFloors: React.Dispatch<React.SetStateAction<number>>;
  handleFloorInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
