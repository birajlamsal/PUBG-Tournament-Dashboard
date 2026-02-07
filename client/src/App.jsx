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

const App = () => {
  const location = useLocation();
  const isLand = location.pathname === "/land";

  return (
    <div className={`app ${isLand ? "app--land" : ""}`}>
      {!isLand && <Header />}
      <div className="app-shell">
        {!isLand && <LeftRail />}
        <div className={`app-content ${isLand ? "app-content--land" : ""}`}>
          <ErrorBoundary>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/land" element={<LandPage />} />
              <Route path="/tournaments" element={<TournamentsPage />} />
              <Route path="/tournaments/:id" element={<TournamentDetailPage />} />
              <Route path="/announcements" element={<AnnouncementsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/matchidextract" element={<MatchIdExtractPage />} />
              <Route path="/matchdetails" element={<MatchDetailDownloadPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
          </ErrorBoundary>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;
