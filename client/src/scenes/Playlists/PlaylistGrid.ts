import { useMemo } from 'react';
import { commonUnits } from '../../components/Grid/commonUnits';
import { useMobile } from '../../services/hooks/hooks';

export function usePlaylistGrid() {
  const [isMobile] = useMobile();

  return useMemo(
    () =>
      ({
        cover: { unit: commonUnits.cover, key: 'cover' },
        name: { unit: commonUnits.mainTitle, key: 'name' },
        followers: { unit: commonUnits.percentage(isMobile), key: 'followers' },
        public: { unit: commonUnits.percentage(isMobile), key: 'public' },
        collaborative: {
          unit: commonUnits.percentage(isMobile),
          key: 'collaborative',
        },
        owner: { unit: commonUnits.percentage(isMobile), key: 'owner' },
        options: { unit: commonUnits.options, key: 'options' },
      } as const),
    [isMobile],
  );
}
