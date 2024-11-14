export interface ParticipantListTypes {
  participants: string[];
  handleAddParticipant: React.MouseEventHandler<HTMLButtonElement>;
  handleRemoveParticipant: (index: number) => void;
  handleChangeParticipantName: (index: number, name: string) => void;
  MAX_PARTICIPANTS: number;
}
