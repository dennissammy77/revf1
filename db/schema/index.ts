import { users } from "./user.schema";
import { competitions } from "./competitions.schema";
import { rounds, roundAwards, roundTracks, roundPlays, roundsParticipants } from "./rounds.schema";
import { competitionAwards } from "./competitions.schema";
import { payments } from './payments.schema';

export const schema = { 
    users, 
    competitions ,
    competitionAwards,
    rounds,
    roundAwards,
    roundTracks,
    roundPlays,
    roundsParticipants,
    payments
};