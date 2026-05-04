import { PREFERENCE_KEYS } from "@/config/preferences";
import { LayoutSettings } from "@/config/layout-settings";
import { MotionSettings } from "@/config/motion-settings";
import { TemplateId } from "@/themes/templates";
import { ThemeTokens } from "@/themes/theme-tokens";

const LIVE_CONFIG_CHANNEL = "wedding-live-config";

export type LiveDraftConfigPayload = {
  templateId: TemplateId;
  layoutSettings: LayoutSettings;
  motionSettings: MotionSettings;
  themeTokens: ThemeTokens;
};

export function emitLiveConfigUpdatedSignal() {
  const value = String(Date.now());
  try {
    localStorage.setItem(PREFERENCE_KEYS.LIVE_CONFIG_UPDATED_AT, value);
  } catch {
    // Ignore browser storage errors (private mode / blocked storage)
  }

  try {
    const channel = new BroadcastChannel(LIVE_CONFIG_CHANNEL);
    channel.postMessage({ type: "config-updated", at: value });
    channel.close();
  } catch {
    // Ignore unsupported BroadcastChannel environments
  }
}

export function subscribeToLiveConfigUpdates(onUpdate: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key !== PREFERENCE_KEYS.LIVE_CONFIG_UPDATED_AT) return;
    onUpdate();
  };

  window.addEventListener("storage", handleStorage);

  let channel: BroadcastChannel | null = null;
  try {
    channel = new BroadcastChannel(LIVE_CONFIG_CHANNEL);
    channel.onmessage = () => onUpdate();
  } catch {
    channel = null;
  }

  return () => {
    window.removeEventListener("storage", handleStorage);
    if (channel) {
      channel.close();
    }
  };
}

export function emitLiveDraftConfig(payload: LiveDraftConfigPayload) {
  const serialized = JSON.stringify(payload);
  try {
    localStorage.setItem(PREFERENCE_KEYS.LIVE_DRAFT_CONFIG, serialized);
  } catch {
    // Ignore browser storage errors (private mode / blocked storage)
  }

  try {
    const channel = new BroadcastChannel(LIVE_CONFIG_CHANNEL);
    channel.postMessage({ type: "draft-config", payload });
    channel.close();
  } catch {
    // Ignore unsupported BroadcastChannel environments
  }
}

export function subscribeToLiveDraftConfig(onUpdate: (payload: LiveDraftConfigPayload) => void): () => void {
  const parseAndNotify = (raw: string | null) => {
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as LiveDraftConfigPayload;
      onUpdate(parsed);
    } catch {
      // Ignore invalid JSON payloads
    }
  };

  const handleStorage = (event: StorageEvent) => {
    if (event.key !== PREFERENCE_KEYS.LIVE_DRAFT_CONFIG) return;
    parseAndNotify(event.newValue);
  };

  window.addEventListener("storage", handleStorage);

  let channel: BroadcastChannel | null = null;
  try {
    channel = new BroadcastChannel(LIVE_CONFIG_CHANNEL);
    channel.onmessage = (event) => {
      const data = event.data as { type?: string; payload?: LiveDraftConfigPayload } | null;
      if (data?.type !== "draft-config" || !data.payload) return;
      onUpdate(data.payload);
    };
  } catch {
    channel = null;
  }

  return () => {
    window.removeEventListener("storage", handleStorage);
    if (channel) {
      channel.close();
    }
  };
}
