"use client"

import useGetSongById from "@/hooks/useGetSongById";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import usePlayer from "@/hooks/usePlayer";
import PlayerContent from "./PlayerContent";

const Player = () => {
  const player = usePlayer();
  const { song } = useGetSongById(player.activeId);

  const songUrl = useLoadSongUrl(song!);

  if (!song || !songUrl || !player.activeId) {
    return null
  }

  return ( 
    <div className="
      fixed
      bottom-0
      bg-black
      w-full
      py-2
      h-[80px]
      px-4
    ">
      {/* En este caso se agrega una key de songUrl aun cuando no sea un arreglo
      porque cuando un coponente tiene una key,
      cada vez que la key cambia, antes de hacer un nuevo render
      del componente destruye el anterior. Esto
      es necesario hacerlo porque el hook que utilizaremos
      para escuchar la canción no permite render dinamicos de URLs */}
      <PlayerContent
        key={songUrl}
        song={song}
        songUrl={songUrl}
      />
    </div>
   );
}
 
export default Player;