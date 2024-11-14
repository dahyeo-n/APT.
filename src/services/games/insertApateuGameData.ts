import { supabase } from '@/lib/supabaseClient';

import { ApateuGameDataTypes } from '@/types/ApateuGameDataTypes';

export const insertApateuGameData = async ({
  gameMode,
  participants,
  numberOfFloors,
}: ApateuGameDataTypes) => {
  const { error } = await supabase.from('apateu_games').insert({
    game_mode: gameMode,
    participants_names: participants,
    number_of_participants: participants.length,
    number_of_aparteu_floors: numberOfFloors,
  });

  if (error) throw new Error('데이터 저장에 실패했습니다.');
};
