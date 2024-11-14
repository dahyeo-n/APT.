export interface GameModeButtonsTypes {
  gameMode: 'single_mode' | 'multi_mode';
  setGameMode: (mode: 'single_mode' | 'multi_mode') => void;
}
