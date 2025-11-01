-- 1️⃣ Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-------------------------
-- DROP ALL DEPENDENT FOREIGN KEYS
-------------------------
ALTER TABLE payments DROP CONSTRAINT IF EXISTS payments_user_id_users_id_fk;
ALTER TABLE round_plays DROP CONSTRAINT IF EXISTS round_plays_user_id_users_id_fk;
ALTER TABLE round_plays DROP CONSTRAINT IF EXISTS round_plays_round_id_rounds_id_fk;
ALTER TABLE round_plays DROP CONSTRAINT IF EXISTS round_plays_track_id_round_tracks_id_fk;
ALTER TABLE round_plays DROP CONSTRAINT IF EXISTS round_plays_payment_id_payments_id_fk;
ALTER TABLE rounds_participants DROP CONSTRAINT IF EXISTS rounds_participants_user_id_users_id_fk;
ALTER TABLE rounds_participants DROP CONSTRAINT IF EXISTS rounds_participants_round_id_rounds_id_fk;
ALTER TABLE competition_awards DROP CONSTRAINT IF EXISTS competition_awards_competition_id_competitions_id_fk;
ALTER TABLE rounds DROP CONSTRAINT IF EXISTS rounds_competition_id_competitions_id_fk;
ALTER TABLE round_awards DROP CONSTRAINT IF EXISTS round_awards_winner_id_users_id_fk;
ALTER TABLE round_awards DROP CONSTRAINT IF EXISTS round_awards_round_id_rounds_id_fk;

-------------------------
-- USERS TABLE
-------------------------
ALTER TABLE users ADD COLUMN new_id uuid DEFAULT gen_random_uuid();
UPDATE users SET new_id = gen_random_uuid();
ALTER TABLE users DROP CONSTRAINT users_pkey;
ALTER TABLE users DROP COLUMN id;
ALTER TABLE users RENAME COLUMN new_id TO id;
ALTER TABLE users ADD PRIMARY KEY (id);

-------------------------
-- COMPETITIONS TABLE
-------------------------
ALTER TABLE competitions ADD COLUMN new_id uuid DEFAULT gen_random_uuid();
UPDATE competitions SET new_id = gen_random_uuid();
ALTER TABLE competitions DROP CONSTRAINT competitions_pkey;
ALTER TABLE competitions DROP COLUMN id;
ALTER TABLE competitions RENAME COLUMN new_id TO id;
ALTER TABLE competitions ADD PRIMARY KEY (id);

-------------------------
-- PAYMENTS TABLE
-------------------------
ALTER TABLE payments ADD COLUMN new_id uuid DEFAULT gen_random_uuid();
UPDATE payments SET new_id = gen_random_uuid();
ALTER TABLE payments DROP CONSTRAINT payments_pkey;
ALTER TABLE payments DROP COLUMN id;
ALTER TABLE payments RENAME COLUMN new_id TO id;
ALTER TABLE payments ADD PRIMARY KEY (id);

ALTER TABLE payments ADD COLUMN new_user_id uuid;
UPDATE payments SET new_user_id = gen_random_uuid(); -- dev-safe placeholder
ALTER TABLE payments DROP COLUMN user_id;
ALTER TABLE payments RENAME COLUMN new_user_id TO user_id;

-------------------------
-- ROUND_TRACKS TABLE
-------------------------
ALTER TABLE round_tracks ADD COLUMN new_id uuid DEFAULT gen_random_uuid();
UPDATE round_tracks SET new_id = gen_random_uuid();
ALTER TABLE round_tracks DROP CONSTRAINT round_tracks_pkey;
ALTER TABLE round_tracks DROP COLUMN id;
ALTER TABLE round_tracks RENAME COLUMN new_id TO id;
ALTER TABLE round_tracks ADD PRIMARY KEY (id);

ALTER TABLE round_tracks ADD COLUMN new_round_id uuid;
UPDATE round_tracks SET new_round_id = gen_random_uuid();
ALTER TABLE round_tracks DROP COLUMN round_id;
ALTER TABLE round_tracks RENAME COLUMN new_round_id TO round_id;

-------------------------
-- ROUNDS TABLE
-------------------------
ALTER TABLE rounds ADD COLUMN new_id uuid DEFAULT gen_random_uuid();
UPDATE rounds SET new_id = gen_random_uuid();
ALTER TABLE rounds DROP CONSTRAINT rounds_pkey;
ALTER TABLE rounds DROP COLUMN id;
ALTER TABLE rounds RENAME COLUMN new_id TO id;
ALTER TABLE rounds ADD PRIMARY KEY (id);

ALTER TABLE rounds ADD COLUMN new_competition_id uuid;
UPDATE rounds SET new_competition_id = gen_random_uuid();
ALTER TABLE rounds DROP COLUMN competition_id;
ALTER TABLE rounds RENAME COLUMN new_competition_id TO competition_id;

-------------------------
-- ROUND_PLAYS TABLE
-------------------------
ALTER TABLE round_plays ADD COLUMN new_id uuid DEFAULT gen_random_uuid();
UPDATE round_plays SET new_id = gen_random_uuid();
ALTER TABLE round_plays DROP CONSTRAINT round_plays_pkey;
ALTER TABLE round_plays DROP COLUMN id;
ALTER TABLE round_plays RENAME COLUMN new_id TO id;
ALTER TABLE round_plays ADD PRIMARY KEY (id);

ALTER TABLE round_plays ADD COLUMN new_round_id uuid;
ALTER TABLE round_plays ADD COLUMN new_user_id uuid;
ALTER TABLE round_plays ADD COLUMN new_track_id uuid;
ALTER TABLE round_plays ADD COLUMN new_payment_id uuid;
UPDATE round_plays SET 
    new_round_id = gen_random_uuid(),
    new_user_id = gen_random_uuid(),
    new_track_id = gen_random_uuid(),
    new_payment_id = gen_random_uuid();
ALTER TABLE round_plays DROP COLUMN round_id;
ALTER TABLE round_plays DROP COLUMN user_id;
ALTER TABLE round_plays DROP COLUMN track_id;
ALTER TABLE round_plays DROP COLUMN payment_id;
ALTER TABLE round_plays RENAME COLUMN new_round_id TO round_id;
ALTER TABLE round_plays RENAME COLUMN new_user_id TO user_id;
ALTER TABLE round_plays RENAME COLUMN new_track_id TO track_id;
ALTER TABLE round_plays RENAME COLUMN new_payment_id TO payment_id;

-------------------------
-- ROUNDS_PARTICIPANTS TABLE
-------------------------
ALTER TABLE rounds_participants ADD COLUMN new_id uuid DEFAULT gen_random_uuid();
UPDATE rounds_participants SET new_id = gen_random_uuid();
ALTER TABLE rounds_participants DROP CONSTRAINT rounds_participants_pkey;
ALTER TABLE rounds_participants DROP COLUMN id;
ALTER TABLE rounds_participants RENAME COLUMN new_id TO id;
ALTER TABLE rounds_participants ADD PRIMARY KEY (id);

ALTER TABLE rounds_participants ADD COLUMN new_round_id uuid;
ALTER TABLE rounds_participants ADD COLUMN new_user_id uuid;
UPDATE rounds_participants SET new_round_id = gen_random_uuid(), new_user_id = gen_random_uuid();
ALTER TABLE rounds_participants DROP COLUMN round_id;
ALTER TABLE rounds_participants DROP COLUMN user_id;
ALTER TABLE rounds_participants RENAME COLUMN new_round_id TO round_id;
ALTER TABLE rounds_participants RENAME COLUMN new_user_id TO user_id;

-------------------------
-- COMPETITION_AWARDS TABLE
-------------------------
ALTER TABLE competition_awards ADD COLUMN new_id uuid DEFAULT gen_random_uuid();
UPDATE competition_awards SET new_id = gen_random_uuid();
ALTER TABLE competition_awards DROP CONSTRAINT competition_awards_pkey;
ALTER TABLE competition_awards DROP COLUMN id;
ALTER TABLE competition_awards RENAME COLUMN new_id TO id;
ALTER TABLE competition_awards ADD PRIMARY KEY (id);

ALTER TABLE competition_awards ADD COLUMN new_competition_id uuid;
UPDATE competition_awards SET new_competition_id = gen_random_uuid();
ALTER TABLE competition_awards DROP COLUMN competition_id;
ALTER TABLE competition_awards RENAME COLUMN new_competition_id TO competition_id;

-------------------------
-- ROUND_AWARDS TABLE
-------------------------
ALTER TABLE round_awards ADD COLUMN new_id uuid DEFAULT gen_random_uuid();
UPDATE round_awards SET new_id = gen_random_uuid();
ALTER TABLE round_awards DROP CONSTRAINT round_awards_pkey;
ALTER TABLE round_awards DROP COLUMN id;
ALTER TABLE round_awards RENAME COLUMN new_id TO id;
ALTER TABLE round_awards ADD PRIMARY KEY (id);

ALTER TABLE round_awards ADD COLUMN new_round_id uuid;
ALTER TABLE round_awards ADD COLUMN new_winner_id uuid;
UPDATE round_awards SET new_round_id = gen_random_uuid(), new_winner_id = gen_random_uuid();
ALTER TABLE round_awards DROP COLUMN round_id;
ALTER TABLE round_awards DROP COLUMN winner_id;
ALTER TABLE round_awards RENAME COLUMN new_round_id TO round_id;
ALTER TABLE round_awards RENAME COLUMN new_winner_id TO winner_id;

-------------------------
-- RECREATE FOREIGN KEYS
-------------------------
ALTER TABLE payments ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE round_plays ADD CONSTRAINT round_plays_round_id_fkey FOREIGN KEY (round_id) REFERENCES rounds(id);
ALTER TABLE round_plays ADD CONSTRAINT round_plays_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE round_plays ADD CONSTRAINT round_plays_track_id_fkey FOREIGN KEY (track_id) REFERENCES round_tracks(id);
ALTER TABLE round_plays ADD CONSTRAINT round_plays_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES payments(id);
ALTER TABLE rounds_participants ADD CONSTRAINT rounds_participants_round_id_fkey FOREIGN KEY (round_id) REFERENCES rounds(id);
ALTER TABLE rounds_participants ADD CONSTRAINT rounds_participants_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(id);
ALTER TABLE competition_awards ADD CONSTRAINT competition_awards_competition_id_fkey FOREIGN KEY (competition_id) REFERENCES competitions(id);
ALTER TABLE rounds ADD CONSTRAINT rounds_competition_id_fkey FOREIGN KEY (competition_id) REFERENCES competitions(id);
ALTER TABLE round_awards ADD CONSTRAINT round_awards_round_id_fkey FOREIGN KEY (round_id) REFERENCES rounds(id);
ALTER TABLE round_awards ADD CONSTRAINT round_awards_winner_id_fkey FOREIGN KEY (winner_id) REFERENCES users(id);
