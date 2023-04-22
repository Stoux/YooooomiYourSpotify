import {FollowedPlaylistModel} from "../Models";


export const getFollowedPlaylists = (user: string) =>
  FollowedPlaylistModel.find({user_id: {$where: user}});
