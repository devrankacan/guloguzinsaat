const SYNC_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { getInstagramSettings, syncInstagramMedia } = await import("@/lib/server/instagram");

  const tick = async () => {
    try {
      const settings = await getInstagramSettings();
      if (!settings.feedId) return;
      await syncInstagramMedia();
    } catch (err) {
      console.error("[instagram-sync] periodic sync failed:", err);
    }
  };

  setInterval(tick, SYNC_INTERVAL_MS);
  void tick();
}
