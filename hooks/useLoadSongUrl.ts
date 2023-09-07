import { Song } from "@/types";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const useLoadSong = (song: Song) => {
  // Why useSupabaseClient or useSessionContext()?
  // Use useSessionContext() when you need the authentication
  // state of the user in the requests sent to supabase
  const supabaseClient = useSupabaseClient();

  if (!song) {
    return '';
  }

  const { data: songData } = supabaseClient
    .storage
    .from("songs")
    .getPublicUrl(song.song_path)
  
  return songData.publicUrl
}

export default useLoadSong;