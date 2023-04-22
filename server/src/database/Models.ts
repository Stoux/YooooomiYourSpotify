import { model } from 'mongoose';
import { AlbumSchema } from './schemas/album';
import { ArtistSchema } from './schemas/artist';
import { GlobalPreferencesSchema } from './schemas/globalPreference';
import { ImporterStateSchema } from './schemas/import';
import { InfosSchema } from './schemas/info';
import { MigrationSchema } from './schemas/migration';
import { TrackSchema } from './schemas/track';
import { UserSchema } from './schemas/user';
import {
  FollowedPlaylistSchema,
  PlaylistSchema,
  PlaylistTrackSchema,
} from './schemas/playlist';

export const UserModel = model('User', UserSchema);
export const InfosModel = model('Infos', InfosSchema);
export const ArtistModel = model('Artist', ArtistSchema);
export const AlbumModel = model('Album', AlbumSchema);
export const TrackModel = model('Track', TrackSchema);
export const PlaylistModel = model('Playlist', PlaylistSchema);
export const PlaylistTrackModel = model('PlaylistTrack', PlaylistTrackSchema);
export const FollowedPlaylistModel = model(
  'FollowedPlaylist',
  FollowedPlaylistSchema,
);
export const MigrationModel = model('Migration', MigrationSchema);
export const GlobalPreferencesModel = model(
  'GlobalPreference',
  GlobalPreferencesSchema,
);
export const ImporterStateModel = model('ImporterState', ImporterStateSchema);
