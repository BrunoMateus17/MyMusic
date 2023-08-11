import { addMilliseconds, format } from "date-fns";

export function SpotifyUser(user: SpotifyApi.CurrentUsersProfileResponse){
    return {
      id: user.id,
      nome: user.display_name,
      imagemUrl: user.images?.pop()?.url
    }
 }

