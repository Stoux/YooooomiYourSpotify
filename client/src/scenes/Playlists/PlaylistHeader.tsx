import React, { useMemo } from 'react';
import Text from '../../components/Text';
import { useMobile } from '../../services/hooks/hooks';
import s from './index.module.css';
import { ColumnDescription, GridRowWrapper } from '../../components/Grid';
import { usePlaylistGrid } from './PlaylistGrid';

export default function PlaylistHeader() {
  const [isMobile] = useMobile();
  const playlistGrid = usePlaylistGrid();

  const columns = useMemo<ColumnDescription[]>(
    () => [
      {
        ...playlistGrid.cover,
        node: <div aria-label="cover" />,
      },
      {
        ...playlistGrid.name,
        node: <Text element="div">Title</Text>,
      },
      {
        ...playlistGrid.public,
        node: (
          <Text element="div" className="center">
            Public
          </Text>
        ),
      },
      {
        ...playlistGrid.collaborative,
        node: (
          <Text element="div" className="center">
            Collab.
          </Text>
        ),
      },
      {
        ...playlistGrid.followers,
        node: (
          <Text element="div" className="center">
            Followers
          </Text>
        ),
      },
      {
        ...playlistGrid.owner,
        node: <Text element="div">Owner</Text>,
      },
      {
        ...playlistGrid.options,
        node: !isMobile && <div aria-label="option-menu" />,
      },
    ],
    [
      playlistGrid.cover,
      playlistGrid.name,
      playlistGrid.public,
      playlistGrid.collaborative,
      playlistGrid.followers,
      playlistGrid.owner,
      playlistGrid.options,
      isMobile,
    ],
  );

  return <GridRowWrapper columns={columns} className={s.header} />;
}
