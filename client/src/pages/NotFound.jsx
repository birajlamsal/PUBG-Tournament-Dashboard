import { useEffect, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ArrowLeft } from "lucide-react";
import "../styles/notfound.css";

const NotFound = () => {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const tilesRef = useRef([]);
  tilesRef.current = [];

  const tiles = useMemo(() => ["4", "0", "4"], []);

  const addTileRef = (el) => {
    if (el && !tilesRef.current.includes(el)) {
      tilesRef.current.push(el);
    }
  };

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(".nf__tile", {
        y: 18,
        opacity: 0,
        rotateX: 14,
        transformPerspective: 800
      });
      gsap.set([".nf__title", ".nf__sub", ".nf__btnWrap", ".nf__code"], {
        y: 10,
        opacity: 0
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.to(".nf__tile", {
        y: 0,
        opacity: 1,
        rotateX: 0,
        duration: 0.8,
        stagger: 0.08
      })
        .to(".nf__title", { y: 0, opacity: 1, duration: 0.6 }, "-=0.35")
        .to(".nf__sub", { y: 0, opacity: 1, duration: 0.6 }, "-=0.45")
        .to(".nf__code", { y: 0, opacity: 1, duration: 0.6 }, "-=0.45")
        .to(".nf__btnWrap", { y: 0, opacity: 1, duration: 0.6 }, "-=0.45");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={rootRef} className="nf">
      <div className="nf__backdrop" aria-hidden="true" />
      <div className="nf__grain" aria-hidden="true" />

      <section className="nf__card" role="region" aria-label="404 Page Not Found">
        <div className="nf__tiles" aria-label="Error code 404">
          {tiles.map((tile, idx) => (
            <div key={idx} ref={addTileRef} className="nf__tile">
              {tile}
            </div>
          ))}
        </div>

        <h1 className="nf__title">Page Not Found</h1>

        <p className="nf__sub">
          The page you are looking for was removed, moved, renamed,
          <br />
          or might never existed.
        </p>

        <div className="nf__code">Error code: 404</div>

        <div className="nf__btnWrap">
          <button type="button" className="nf__btn" onClick={() => navigate("/")}>
            <ArrowLeft size={18} />
            Return Home
          </button>
        </div>
      </section>
    </main>
  );
};

export default NotFound;
