export type FeatureVisibility = {
  petCompanion: boolean;
  textbooks: boolean;
  readyfarm: boolean;
};

const FEATURE_VISIBILITY_KEY = 'readyph-feature-visibility';
const DEFAULT_VISIBILITY: FeatureVisibility = {
  petCompanion: false,
  textbooks: false,
  readyfarm: false,
};

export function getFeatureVisibility(): FeatureVisibility {
  try {
    const stored = localStorage.getItem(FEATURE_VISIBILITY_KEY);
    if (!stored) return DEFAULT_VISIBILITY;
    const parsed = JSON.parse(stored) as Partial<FeatureVisibility>;
    return {
      petCompanion: parsed.petCompanion === true,
      textbooks: parsed.textbooks === true,
      readyfarm: parsed.readyfarm === true,
    };
  } catch {
    return DEFAULT_VISIBILITY;
  }
}

export function setFeatureVisibility(next: FeatureVisibility): void {
  localStorage.setItem(FEATURE_VISIBILITY_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent('readyph:feature-visibility-change', { detail: next }));
}
