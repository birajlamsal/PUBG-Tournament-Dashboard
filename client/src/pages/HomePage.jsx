import { useEffect, useState } from "react";
import { fetchAnnouncements } from "../api";

const ongoing = [
  {
    name: "NAIZA CUP",
    region: "EU",
    platform: "PC",
    mode: "SQUAD",
    prize: "$5,000",
    status: "ONGOING"
  },
  {
    name: "SUPER LEAGUE SERIES",
    region: "NA",
    platform: "PC",
    mode: "SQUAD",
    prize: "$3,000",
    status: "ONGOING"
  },
  {
    name: "TACO TUESDAY LEAGUE",
    region: "NA",
    platform: "PC",
    mode: "SQUAD",
    prize: "$2,500",
    status: "LIVE"
  }
];

const past = Array.from({ length: 14 }).map((_, i) => ({
  name: `CAXA CUP ${26 - i}`,
  region: i % 2 ? "EU" : "NA",
  platform: "PC",
  mode: i % 3 === 0 ? "DUO" : "SQUAD",
  prize: i % 4 === 0 ? "$1,500" : "$700",
  status: "UPCOMING"
}));

const upcoming = past[0];

const HomePage = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [announcementsLoading, setAnnouncementsLoading] = useState(true);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const data = await fetchAnnouncements();
        setAnnouncements(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error(error);
      } finally {
        setAnnouncementsLoading(false);
      }
    };
    loadAnnouncements();
  }, []);

  return (
    <div className="twire-page">
      <div className="twire-container">
        <div className="twire-layout">
          <div className="twire-content">
            <main className="twire-main">
              <div>
                <SectionTitle title="Ongoing tournaments" />

                <div className="twire-panel">
                  {ongoing.map((t, idx) => (
                    <TournamentRow
                      key={t.name}
                      t={t}
                      isLast={idx === ongoing.length - 1}
                    />
                  ))}
                </div>
              </div>

              <div className="twire-title-row">
                <SectionTitle title="Upcoming tournament" />
              </div>

              {upcoming ? (
                <div className="twire-panel">
                  <TournamentRow t={upcoming} isLast />
                </div>
              ) : (
                <div className="twire-empty">No upcoming tournaments.</div>
              )}

              <div className="twire-title-row">
                <SectionTitle title="Past tournaments" />
                <button className="twire-link">View more</button>
              </div>

              <div className="twire-panel">
                {past.slice(1).map((t, idx) => (
                  <TournamentRow
                    key={`${t.name}-${idx}`}
                    t={t}
                    isLast={idx === past.length - 2}
                  />
                ))}
              </div>
            </main>

            <aside className="twire-aside">
              <div className="twire-panel twire-panel--pad">
                <div className="twire-panel-head">
                  <h3>Notices & announcements</h3>
                </div>

                <div className="twire-stack">
                  {announcementsLoading && (
                    <div className="twire-muted">Loading announcements...</div>
                  )}
                  {!announcementsLoading && announcements.length === 0 && (
                    <div className="twire-muted">No announcements yet.</div>
                  )}
                  {!announcementsLoading &&
                    announcements.slice(0, 6).map((n) => (
                      <NewsCard key={n.announcement_id || n.title} n={n} />
                    ))}
                </div>
              </div>

            </aside>

            <aside className="twire-aside twire-aside--tight">
              <div className="twire-panel twire-panel--pad">
                <div className="twire-panel-head">
                  <h3>Play featured tournament</h3>
                </div>
                <div className="twire-featured">
                  <div className="twire-featured__title">Global Clash Invitational</div>
                  <div className="twire-featured__meta">
                    <span>Prize: $10,000</span>
                    <span>Starts: Feb 18</span>
                  </div>
                  <button className="twire-cta twire-cta--full">Join now</button>
                </div>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

const SectionTitle = ({ title }) => {
  return (
    <div className="twire-title">
      <span className="twire-title__dot" />
      <h2>{title}</h2>
    </div>
  );
};

const StatusPill = ({ status }) => {
  const base = "twire-pill";
  if (status === "LIVE") {
    return <span className={`${base} is-live`}>Live</span>;
  }
  if (status === "ONGOING") {
    return <span className={`${base} is-ongoing`}>Ongoing</span>;
  }
  return <span className={`${base} is-upcoming`}>Upcoming</span>;
};

const TournamentRow = ({ t, isLast }) => {
  return (
    <div className={`twire-row ${isLast ? "" : "twire-row--line"}`}>
      <div className="twire-row__logo">
        <div className="twire-row__logo-mark" />
      </div>

      <div className="twire-row__info">
        <div className="twire-row__title">
          <div className="twire-row__name">{t.name}</div>
          <StatusPill status={t.status} />
        </div>
        <div className="twire-row__meta">
          <span>{t.region}</span>
          <span className="twire-row__dot" />
          <span>{t.platform}</span>
          <span className="twire-row__dot" />
          <span>{t.mode}</span>
          <span className="twire-row__dot" />
          <span>{t.prize}</span>
        </div>
      </div>

      <div className="twire-row__actions">
        <span className="twire-row__hint">
          {t.status === "LIVE" ? "Now" : "Details"}
        </span>
        <button className="twire-cta">Details</button>
      </div>
    </div>
  );
};

const NewsCard = ({ n }) => {
  const createdAt = n?.created_at
    ? new Date(n.created_at).toLocaleDateString()
    : "";
  const tag = n?.type || "Notice";
  const title = n?.title || "Announcement";
  const body = n?.body || "";

  return (
    <div className="twire-news">
      <div className="twire-news__thumb" />
      <div className="twire-news__body">
        <div className="twire-news__title">{title}</div>
        {body && <div className="twire-news__desc">{body}</div>}
        <div className="twire-news__meta">
          <span className="twire-tag">{tag}</span>
          <span>•</span>
          <span>{createdAt || "Just now"}</span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
