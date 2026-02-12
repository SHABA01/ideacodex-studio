// Centralized sidebar rule engine

export const TIER_ORDER = ["demo", "live", "pro", "enterprise"];

/**
 * Determines if an item should be rendered at all
 * (visible but possibly locked)
 */
export const isVisible = (item, tier) => {
  if (!item.visibleFor) return true;
  return item.visibleFor.includes(tier);
};

/**
 * Determines if an item is visible but locked
 */
export const isLocked = (item, tier) => {
  if (!item.lockedBelow) return false;
  return (
    TIER_ORDER.indexOf(tier) <
    TIER_ORDER.indexOf(item.lockedBelow)
  );
};

export const resolveBadge = (item, tier) => {
  if (!item.badgesByTier) return null;
  return item.badgesByTier[tier] ?? null;
};

/**
 * Unified sidebar rule resolver
 * Returns visibility + lock state
 */
export const resolveSidebarItemState = (item, tier) => {
  const visible = isVisible(item, tier);
  const locked = isLocked(item, tier);
  const badge = resolveBadge(item, tier);

  return {
    visible,
    locked,
    badge
  };
};
