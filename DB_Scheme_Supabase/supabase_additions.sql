-- Supabase additions for ApexGrid (keep routes same, no JSON storage)

-- 1) Extend tournaments table for admin fields + multi-event support
ALTER TABLE IF EXISTS tournaments
  ADD COLUMN IF NOT EXISTS event_type TEXT NOT NULL DEFAULT 'tournament',
  ADD COLUMN IF NOT EXISTS description TEXT,
  ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'upcoming',
  ADD COLUMN IF NOT EXISTS registration_status TEXT DEFAULT 'closed',
  ADD COLUMN IF NOT EXISTS registration_charge NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS max_slots INTEGER,
  ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS tier TEXT,
  ADD COLUMN IF NOT EXISTS mode TEXT,
  ADD COLUMN IF NOT EXISTS region TEXT,
  ADD COLUMN IF NOT EXISTS banner_url TEXT,
  ADD COLUMN IF NOT EXISTS rules TEXT,
  ADD COLUMN IF NOT EXISTS contact_discord TEXT,
  ADD COLUMN IF NOT EXISTS api_key_required BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS api_provider TEXT DEFAULT 'PUBG',
  ADD COLUMN IF NOT EXISTS pubg_tournament_id TEXT,
  ADD COLUMN IF NOT EXISTS custom_match_mode BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS allow_non_custom BOOLEAN DEFAULT FALSE,
  ADD COLUMN IF NOT EXISTS custom_match_ids JSONB;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'tournaments_event_type_check'
  ) THEN
    ALTER TABLE tournaments
      ADD CONSTRAINT tournaments_event_type_check
      CHECK (event_type IN ('tournament', 'scrim'));
  END IF;
END $$;

-- 2) Announcements (admin-managed)
CREATE TABLE IF NOT EXISTS announcements (
  announcement_id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  type TEXT DEFAULT 'notice',
  importance TEXT DEFAULT 'medium',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3) Participants (registrations)
CREATE TABLE IF NOT EXISTS participants (
  participant_id TEXT PRIMARY KEY,
  tournament_id TEXT NOT NULL REFERENCES tournaments(tournament_id) ON DELETE CASCADE,
  type TEXT NOT NULL DEFAULT 'team',
  linked_team_id TEXT,
  linked_player_id TEXT,
  status TEXT DEFAULT 'pending',
  payment_status TEXT DEFAULT 'unpaid',
  slot_number INTEGER,
  notes TEXT
);

-- 4) Winners (optional summary table)
CREATE TABLE IF NOT EXISTS winners (
  winner_id TEXT PRIMARY KEY,
  tournament_id TEXT NOT NULL REFERENCES tournaments(tournament_id) ON DELETE CASCADE,
  place INTEGER,
  team_id TEXT,
  team_name TEXT,
  points INTEGER,
  kills INTEGER
);

-- 5) Match winner pointer (optional)
ALTER TABLE IF EXISTS match_information
  ADD COLUMN IF NOT EXISTS winner_team_id TEXT;
