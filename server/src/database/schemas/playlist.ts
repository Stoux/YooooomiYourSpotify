import { Schema } from 'mongoose';
import { SpotifyTrack } from './track';

export interface Playlist {
  id: string;
  /** Describes the version it's currently at */
  snapshot_id: string;
  name: string;
  description?: string;
  public: boolean;
  collaborative: boolean;
  followers: number;
  href: string;
  uri: string;
  /** User ID of the owner */
  owner: string;
  created_at?: string;
  // Timestamp of the last check we did for this playlist
  last_checked_at?: string;
}

export type SpotifyPlaylist = Omit<
  Playlist,
  'owner' | 'followers' | 'created_at' | 'last_checked_at'
> & {
  owner: {
    id: string;
    name: string;
  };
  tracks?: {
    next?: string;
    total: number;
    items?: SpotifyTrack[];
  };
};

/**
 * A single track in a Playlist.
 * Note that a track can be in a playlist multiple, that's why the ID is a combination of track ID + date added.
 */
export interface PlaylistTrack {
  /** This is a combination of playlist ID + track ID + date */
  id: string;
  track_id: string;
  playlist_id: string;
  added_at: string;
  /** User ID of the user */
  added_by: string;
  deleted_at?: string;
  is_local: boolean;
}

export interface SpotifyPlaylistTrack {
  added_at: string | null;
  added_by: null | {
    id: string;
    name: string;
  };
  is_local: boolean;
  track: SpotifyTrack;
}

/**
 * Specifies that a given user has the given playlist in their library
 */
export interface FollowedPlaylist {
  playlist_id: string;
  user_id: string;
  created_at: string;
  // Date of the last check
  last_check: string;
  // Playlist was checked using a different user
  last_check_by_other: boolean;
  // Whether the last (attempted) access using this user's token was successful
  has_access: Boolean;
}

export const PlaylistSchema = new Schema<Playlist>(
  {
    id: { type: String, unique: true },
    snapshot_id: String,
    name: String,
    description: String,
    public: Boolean,
    collaborative: Boolean,
    followers: Boolean,
    href: String,
    uri: String,
    owner: String,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

PlaylistSchema.virtual('user', {
  ref: 'User',
  localField: 'owner',
  foreignField: 'id',
  justOne: true,
});

PlaylistSchema.virtual('tracks', {
  ref: 'PlaylistTrack',
  localField: 'id',
  foreignField: 'playlist_id',
  justOne: false,
});

PlaylistSchema.virtual('followed_by', {
  ref: 'FollowedPlaylist',
  localField: 'id',
  foreignField: 'playlist_id',
  justOne: false,
});

export const PlaylistTrackSchema = new Schema<PlaylistTrack>(
  {
    id: { type: String, unique: true },
    track_id: { type: String, index: true },
    playlist_id: { type: String, index: true },
    added_at: String,
    added_by: String,
    deleted_at: String,
    is_local: Boolean,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

PlaylistTrackSchema.virtual('track', {
  ref: 'Track',
  localField: 'track_id',
  foreignField: 'id',
  justOne: true,
});

PlaylistTrackSchema.virtual('playlist', {
  ref: 'Playlist',
  localField: 'playlist_id',
  foreignField: 'id',
  justOne: true,
});

export const FollowedPlaylistSchema = new Schema<FollowedPlaylist>(
  {
    playlist_id: { type: String, index: true },
    user_id: { type: String, index: true },
    created_at: String,
    last_check: String,
    last_check_by_other: Boolean,
    has_access: Boolean,
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

FollowedPlaylistSchema.virtual('playlist', {
  ref: 'Playlist',
  localField: 'playlist_id',
  foreignField: 'id',
  justOne: true,
});

FollowedPlaylistSchema.virtual('user', {
  ref: 'User',
  localField: 'user_id',
  foreignField: 'id',
  justOne: true,
});
