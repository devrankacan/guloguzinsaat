const SYNC_INTERVAL_MS = 60 * 60 * 1000; // 1 hour
const REFRESH_THRESHOLD_MS = 7 * 24 * 60 * 60 * 1000; // refresh when <7 days left

export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const { getInstagramSettings, refreshLongLivedToken, syncInstagramMedia } = await import(
    "@/lib/server/instagram"
  );

  const tick = async () => {
    try {
      const settings = await getInstagramSettings();
      if (!settings.accessToken) return;

      const expiresAt = settings.tokenExpiresAt ?? 0;
      if (expiresAt - Date.now() < REFRESH_THRESHOLD_MS) {
        await refreshLongLivedToken();
      }

      await syncInstagramMedia();
    } catch (err) {
      console.error("[instagram-sync] periodic sync failed:", err);
    }
  };

  setInterval(tick, SYNC_INTERVAL_MS);
  void tick();
}
