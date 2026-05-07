/**
 * bookDataLoader.ts
 *
 * Lazy book data resolver. Instead of importing all 12+ book data modules
 * at the top of App.tsx (adding ~180 kB to the main chunk), this module
 * loads them on demand when a user actually opens a specific book.
 *
 * Each book module is imported via dynamic import(), which Vite code-splits
 * into its own chunk automatically.
 */

import type { BookProject } from './portfolio';

type BookDataModule = { default: BookProject } | BookProject;

const resolvers: Record<string, () => Promise<BookProject>> = {
  // NOTE: 'about-caleb' and 'ai-library' are NOT here because they are
  // statically imported by App.tsx and HomeView.tsx (needed for the shelf).
  // Their data is resolved synchronously via staticBookOverrides in App.tsx.
  bonnie: async () => {
    const m = await import('./bonnieBook');
    return m.bonnieBook;
  },
  boonk: async () => {
    const m = await import('./boonkBook');
    return m.boonkBook;
  },
  'brokie-v1': async () => {
    const m = await import('./brokieV1Book');
    return m.brokieV1Book;
  },
  'brokie-v2': async () => {
    const m = await import('./brokieV2Book');
    return m.brokieV2Book;
  },
  byc2w: async () => {
    const m = await import('./byc2wBook');
    return m.byc2wBook;
  },
  cortex: async () => {
    const m = await import('./cortexBook');
    return m.cortexBook;
  },
  'global-intelligence-market': async () => {
    const m = await import('./globalIntelligenceMarketBook');
    return m.globalIntelligenceMarketBook;
  },
  'life-tap-labs': async () => {
    const m = await import('./agenticDashboardsBook');
    return m.agenticDashboardsBook;
  },
  'project-winter-haven': async () => {
    const m = await import('./winterHavenBook');
    return m.winterHavenBook;
  },
  panopticon: async () => {
    const m = await import('./panopticonBook');
    return m.panopticonBook;
  },
};

/** In-memory cache so we don't re-import after first open. */
const cache = new Map<string, BookProject>();

/**
 * Load a custom book's data on demand.
 * Returns null if the ID has no custom data module.
 */
export async function loadBookData(id: string): Promise<BookProject | null> {
  if (cache.has(id)) return cache.get(id)!;

  const resolver = resolvers[id];
  if (!resolver) return null;

  const data = await resolver();
  cache.set(id, data);
  return data;
}

/** Synchronously check if a book ID has custom detail data. */
export function hasCustomBookData(id: string): boolean {
  return id in resolvers;
}

/** Synchronously get cached book data (returns null if not yet loaded). */
export function getCachedBookData(id: string): BookProject | null {
  return cache.get(id) ?? null;
}

/**
 * All IDs that have custom detail modules (including statically-imported ones).
 * Used for routing: books in this set go to CaseStudyDetail instead of ProjectDetailPage.
 */
export const CUSTOM_WORK_DETAIL_IDS = new Set([
  ...Object.keys(resolvers),
  'about-caleb',
  'ai-library',
]);
