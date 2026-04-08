type ArchiveMode = "gallery" | "clients";

type WorksControlsProps = {
  mode: ArchiveMode;
  setMode: (mode: ArchiveMode) => void;
};

export default function WorksControls({ mode, setMode }: WorksControlsProps) {
  return (
    <div className="works__controls" data-archive-enter="controls">
      <div className="works__tag">
        <div className="paragraph">LATEST</div>
        <div className="paragraph">WORKS</div>
      </div>

      <div className="wc__wrap" role="tablist" aria-label="Archive display mode">
        <button
          type="button"
          data-control="gallery"
          className={mode === "gallery" ? "controls__left active" : "controls__left"}
          aria-pressed={mode === "gallery"}
          onClick={() => setMode("gallery")}
        >
          <p className="paragraph">GALLERY</p>
        </button>
        <button
          type="button"
          data-control="clients"
          className={mode === "clients" ? "controls__right active" : "controls__right"}
          aria-pressed={mode === "clients"}
          onClick={() => setMode("clients")}
        >
          <p className="paragraph">LIST</p>
        </button>
      </div>

      <div className="works__tag">
        <div className="paragraph">ARCHIVE</div>
        <div className="paragraph">2025©</div>
      </div>
    </div>
  );
}
