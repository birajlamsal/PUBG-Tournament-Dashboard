import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import LeftRail from "./components/LeftRail";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/HomePage";
import TournamentsPage from "./pages/TournamentsPage";
import TournamentDetailPage from "./pages/TournamentDetailPage";
import AdminPage from "./pages/AdminPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import ContactPage from "./pages/ContactPage";
import MatchIdExtractPage from "./pages/MatchIdExtractPage";
import MatchDetailDownloadPage from "./pages/MatchDetailDownloadPage";
import LandPage from "./pages/LandPage";
import NotFound from "./pages/NotFound";
import ScrimsPage from "./pages/ScrimsPage";
import ScrimDetailPage from "./pages/ScrimDetailPage";

const App = () => {
  const location = useLocation();
  const isLand = location.pathname === "/" || location.pathname === "/land";
  const showShell = location.pathname.startsWith("/pubg") || location.pathname === "/admin";

  return (
    <div className={`app ${!showShell ? "app--land" : ""}`}>
      {showShell && <Header />}
      <div className="app-shell">
        {showShell && <LeftRail />}
        <div className={`app-content ${!showShell ? "app-content--land" : ""}`}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<LandPage />} />
              <Route path="/land" element={<LandPage />} />
              <Route path="/pubg" element={<HomePage />} />
              <Route path="/pubg/tournaments" element={<TournamentsPage />} />
              <Route path="/pubg/tournaments/:id" element={<TournamentDetailPage />} />
              <Route path="/pubg/scrims" element={<ScrimsPage />} />
              <Route path="/pubg/scrims/:id" element={<ScrimDetailPage />} />
              <Route path="/pubg/announcements" element={<AnnouncementsPage />} />
              <Route path="/pubg/contact" element={<ContactPage />} />
              <Route path="/pubg/matchidextract" element={<MatchIdExtractPage />} />
              <Route path="/pubg/matchdetails" element={<MatchDetailDownloadPage />} />
              <Route path="/pubg/admin" element={<AdminPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </ErrorBoundary>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
