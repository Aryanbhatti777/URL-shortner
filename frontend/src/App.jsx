
import { useEffect, useState } from "react";
import api from "../config/axiosInstance";

function App() {
  const [link, setLink] = useState("");
  const [currLink, setCurrLink] = useState(null);
  const [allLinks, setAllLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const getAllLinks = async () => {
    try {
      const res = await api.get("api/url/allLinks");
      setAllLinks(res.data.links || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLinks();
  }, []);

  const handleSubmit = async () => {
    if (!link.trim()) return;

    try {
      setLoading(true);

      const res = await api.post("api/url/create", {
        link: link.trim(),
      });

      setCurrLink(res.data.newLink);
      setLink("");
      await getAllLinks();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const copyLink = async (code) => {
    try {
      await navigator.clipboard.writeText(`${ backendURL }/${code}`);

setCopiedCode(code);

setTimeout(() => {
  setCopiedCode(null);
}, 1800);
    } catch (error) {
  console.log(error);
}
  };

const handleDelete = async (id) => {
  try {
    setDeletingId(id);

    await api.delete(`api/url/delete/${id}`);

    if (currLink?._id === id) {
      setCurrLink(null);
    }

    await getAllLinks();
  } catch (error) {
    console.log(error);
  } finally {
    setDeletingId(null);
  }
};

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    handleSubmit();
  }
};

return (
  <div className="min-h-screen bg-slate-950 text-white">
    {/* Background */}
    <div className="fixed inset-0 -z-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/20 blur-[120px]" />
      <div className="absolute top-[40%] -left-40 h-[400px] w-[400px] rounded-full bg-purple-600/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-[120px]" />
    </div>

    {/* Navbar */}
    <nav className="relative z-10 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/20">
            <svg
              className="h-5 w-5 text-white"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.5-1.5m11.25-7.125l1.5-1.5a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </div>

          <div>
            <h1 className="text-lg font-bold tracking-tight">Shortly</h1>
            <p className="text-[11px] text-slate-500">URL Shortener</p>
          </div>
        </div>

        <div className="hidden items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-400 sm:flex">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
          All systems operational
        </div>
      </div>
    </nav>

    {/* Main */}
    <main className="relative z-10 mx-auto max-w-6xl px-5 pb-16 pt-14">
      {/* Hero */}
      <section className="mx-auto max-w-3xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-4 py-2 text-xs font-medium text-blue-300">
          <span>✦</span>
          Simple. Fast. Shareable.
        </div>

        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Make your links
          <span className="block bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
            short & powerful.
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-slate-400 sm:text-base">
          Turn long URLs into clean, memorable links in seconds. Manage all
          your shortened links from one place.
        </p>
      </section>

      {/* URL Input */}
      <section className="mx-auto mt-10 max-w-3xl">
        <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-2 shadow-2xl shadow-black/20 backdrop-blur-xl">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <svg
                className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.5-1.5m11.25-7.125l1.5-1.5a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>

              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Paste your long URL here..."
                className="h-14 w-full rounded-xl border border-white/10 bg-slate-900/80 pl-12 pr-4 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-blue-500/60 focus:ring-4 focus:ring-blue-500/10"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !link.trim()}
              className="h-14 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-7 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-400 hover:to-indigo-500 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Shortening...
                </span>
              ) : (
                "Shorten URL"
              )}
            </button>
          </div>
        </div>

        <p className="mt-3 text-center text-xs text-slate-600">
          Press Enter to shorten your URL
        </p>
      </section>

      {/* Newly Created Link */}
      {currLink && (
        <section className="mx-auto mt-8 max-w-3xl">
          <div className="overflow-hidden rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.06]">
            <div className="flex items-center gap-2 border-b border-emerald-400/10 px-5 py-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-400/15 text-xs text-emerald-400">
                ✓
              </span>
              <span className="text-sm font-medium text-emerald-300">
                Your link is ready
              </span>
            </div>

            <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <p className="break-all text-base font-semibold text-white">
                  {backendURL}/{currLink.shortCode}
                </p>

                <p
                  className="mt-1 truncate text-xs text-slate-500"
                  title={currLink.originalURL}
                >
                  {currLink.originalURL}
                </p>
              </div>

              <button
                onClick={() => copyLink(currLink.shortCode)}
                className="shrink-0 rounded-xl border border-white/10 bg-white/10 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/15"
              >
                {copiedCode === currLink.shortCode ? "✓ Copied" : "Copy link"}
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Links Section */}
      <section className="mx-auto mt-14 max-w-4xl">
        <div className="mb-5 flex items-end justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-blue-400">
              Dashboard
            </p>

            <h3 className="mt-1 text-2xl font-bold tracking-tight">
              Your links
            </h3>
          </div>

          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-400">
            {allLinks.length}{" "}
            {allLinks.length === 1 ? "link" : "links"}
          </div>
        </div>

        {allLinks.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.025] px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5">
              <svg
                className="h-6 w-6 text-slate-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.5-1.5m11.25-7.125l1.5-1.5a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
            </div>

            <h4 className="mt-4 font-semibold text-slate-300">
              No shortened links yet
            </h4>

            <p className="mt-2 text-sm text-slate-600">
              Your shortened URLs will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {allLinks.map((url) => (
              <div
                key={url._id}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-4 transition hover:border-white/15 hover:bg-white/[0.06]"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
                  {/* Link info */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                        🔗
                      </div>

                      <div className="min-w-0">
                        <a
                          href={`${backendURL}/${url.shortCode}`}
                          target="_blank"
                          rel="noreferrer"
                          className="block truncate text-sm font-semibold text-blue-400 transition hover:text-blue-300"
                        >
                          {backendURL}/{url.shortCode}
                        </a>

                        <p
                          className="mt-1 truncate text-xs text-slate-500"
                          title={url.originalURL}
                        >
                          {url.originalURL}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-3 border-t border-white/5 pt-3 lg:border-0 lg:pt-0">
                    <div className="rounded-xl border border-white/5 bg-slate-950/50 px-4 py-2 text-center">
                      <p className="text-sm font-semibold text-white">
                        {url.clicks}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-slate-600">
                        Clicks
                      </p>
                    </div>

                    <button
                      onClick={() => copyLink(url.shortCode)}
                      className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white"
                    >
                      {copiedCode === url.shortCode ? "✓ Copied" : "Copy"}
                    </button>

                    <button
                      onClick={() => handleDelete(url._id)}
                      disabled={deletingId === url._id}
                      className="rounded-xl border border-red-500/10 bg-red-500/5 px-4 py-2 text-xs font-medium text-red-400 transition hover:border-red-500/20 hover:bg-red-500/10 disabled:opacity-50"
                    >
                      {deletingId === url._id ? "..." : "Delete"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Feature Cards */}
      <section className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
            ⚡
          </div>
          <h4 className="font-semibold">Lightning Fast</h4>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Create short links instantly with a simple and fast workflow.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
            📊
          </div>
          <h4 className="font-semibold">Track Clicks</h4>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Keep an eye on how many times each shortened link is opened.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
            🔒
          </div>
          <h4 className="font-semibold">Simple Management</h4>
          <p className="mt-2 text-xs leading-5 text-slate-500">
            Keep your shortened URLs organized in one clean dashboard.
          </p>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-slate-600 sm:flex-row">
        <p>© {new Date().getFullYear()} Shortly. All rights reserved.</p>
        <p>Made by Aryan with &#x2764;.</p>
        <p>Built with MERN.</p>
      </div>
    </footer>
  </div>
);
}

export default App;