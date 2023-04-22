import { useState } from 'react';
import { GridWrapper } from '../../components/Grid';
import Header from '../../components/Header';
import TitleCard from '../../components/TitleCard';
import { api } from '../../services/apis/api';
import s from './index.module.css';
import PlaylistHeader from './PlaylistHeader';
import PlaylistRow from './PlaylistRow';
import { SpotifyPlaylist } from '../../services/redux/modules/playlist/types';

export default function FollowedPlaylists() {
  const [items, setItems] = useState<SpotifyPlaylist[]>([]);
  api.getSpotifyPlaylists(true).then(result => setItems(result.data));

  return (
    <div>
      <Header
        title="Followed Playlists"
        subtitle="These are the playlist that we're currently following & tracking for you!"
        hideInterval
      />
      <div className={s.content}>
        <TitleCard noBorder title="Playlists">
          <GridWrapper>
            <PlaylistHeader />
            {items.map(item => (
              <PlaylistRow
                // eslint-disable-next-line react/no-array-index-key
                key={item.id}
                id={item.id}
                name={item.name}
                description={item.description}
                images={item.images}
                collaborative={item.collaborative}
                followers={item.followers}
                public={item.public}
                owner={item.owner}
              />
            ))}
          </GridWrapper>
        </TitleCard>
      </div>
    </div>
  );
}
