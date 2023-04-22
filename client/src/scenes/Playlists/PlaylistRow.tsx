import { useMemo } from 'react';
import clsx from 'clsx';
import Text from '../../components/Text';
import { useMobile } from '../../services/hooks/hooks';
import s from './index.module.css';
import { ColumnDescription, GridRowWrapper } from '../../components/Grid';
import { usePlaylistGrid } from './PlaylistGrid';
import { SpotifyPlaylist } from '../../services/redux/modules/playlist/types';
import IdealImage from '../../components/IdealImage';

export default function PlaylistRow(playlist: SpotifyPlaylist) {
  const [isMobile] = useMobile();
  const playlistGrid = usePlaylistGrid();

  const columns = useMemo<ColumnDescription[]>(
    () => [
      {
        ...playlistGrid.cover,
        node: (
          <IdealImage
            alt="playlist cover"
            className={s.playlistCover}
            images={playlist.images}
            size={50}
          />
        ),
      },
      {
        ...playlistGrid.name,
        node: (
          <div className={clsx('otext', s.names)}>
            <Text element="div">{playlist.name}</Text>
            <div className="subtitle">{playlist.description}</div>
          </div>
        ),
      },
      {
        ...playlistGrid.followers,
        node: !isMobile && (
          <Text element="div">{playlist.followers?.total ?? '?'}</Text>
        ),
      },
      {
        ...playlistGrid.public,
        node: <Text element="div">{playlist.public ? 'Yes' : 'No'}</Text>,
      },
      {
        ...playlistGrid.collaborative,
        node: (
          <Text element="div">{playlist.collaborative ? 'Yes' : 'No'}</Text>
        ),
      },
      {
        ...playlistGrid.owner,
        node: <Text element="div">{playlist.owner.display_name}</Text>,
      },
      {
        ...playlistGrid.options,
        node: '',
      },
    ],
    [
      playlistGrid.cover,
      playlistGrid.name,
      playlistGrid.followers,
      playlistGrid.public,
      playlistGrid.collaborative,
      playlistGrid.owner,
      playlistGrid.options,
      playlist.images,
      playlist.name,
      playlist.description,
      playlist.followers?.total,
      playlist.public,
      playlist.collaborative,
      playlist.owner.display_name,
      isMobile,
    ],
  );

  return (
    <GridRowWrapper
      columns={columns}
      className={clsx('play-button-holder', s.row)}
    />
  );
}
