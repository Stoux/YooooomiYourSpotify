import { Router } from 'express';
import { logger } from '../tools/logger';
import { logged, withHttpClient } from '../tools/middleware';
import { LoggedRequest } from '../tools/types';
import { getFollowedPlaylists } from '../database/queries/playlist';

const router = Router();
export default router;

router.get('/followed', logged, withHttpClient, async (req, res) => {
  try {
    const { user } = req as LoggedRequest;

    const playlists = await getFollowedPlaylists(user._id.toString());
    return res.status(200).send(playlists);
  } catch (e) {
    logger.error(e);
    return res.status(500).end();
  }
});
