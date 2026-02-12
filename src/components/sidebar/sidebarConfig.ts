const sidebarConfig = [
  /* ================= CORE ================= */

  {
    id: "dashboard",
    label: "Dashboard",
    icon: "fa-solid fa-chart-line",
    path: "/dashboard",
    feature: "dashboard",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    badgesByTier: {
      demo: "LIMITED",
      live: "BASIC",
      pro: null,
      enterprise: null
    }
  },

  {
    id: "studio",
    label: "Idea Studio",
    icon: "fa-solid fa-pen-nib",
    path: "/studio",
    feature: "studio",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    badgesByTier: {
      demo: "LIMITED",
      live: "BASIC",
      pro: null,
      enterprise: null
    }
  },

  {
    id: "workspace",
    label: "Workspace",
    icon: "fa-solid fa-briefcase",
    path: "/workspace",
    feature: "workspace",
    visibleFor: ["pro", "enterprise"],
    badgesByTier: {
      demo: null,
      live: null,
      pro: null,
      enterprise: null
    },
    lockedBelow: "enterprise"
  },

  {
    id: "community",
    label: "Community",
    icon: "fa-solid fa-users",
    path: "/community",
    feature: "community",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    badgesByTier: {
      demo: null,
      live: "BASIC",
      pro: null,
      enterprise: null
    },
    lockedBelow: "live"
  },

  {
    id: "collaborations",
    label: "Collaborations",
    icon: "fa-solid fa-user-group",
    path: "/collab",
    feature: "collaborations",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    badgesByTier: {
      demo: null,
      live: "LIMITED",
      pro: "BASIC",
      enterprise: null
    },
    lockedBelow: "live"
  },

  {
    id: "profile",
    label: "Profile",
    icon: "fa-solid fa-id-badge",
    path: "/profile",
    feature: "profile",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    badgesByTier: {
      demo: null,
      live: "LIMITED",
      pro: "BASIC",
      enterprise: null
    },
    lockedBelow: "live"
  },

  {
    id: "app-builder",
    label: "App Builder",
    icon: "fa-solid fa-cubes",
    path: "/app-builder",
    feature: "app-builder",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    badgesByTier: {
      demo: null,
      live: "LIMITED",
      pro: "BASIC",
      enterprise: null
    },
    lockedBelow: "live"
  },

  {
    id: "settings",
    label: "Settings",
    icon: "fa-solid fa-gear",
    path: "/settings",
    feature: "settings",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    lockedBelow: "live"
  },

  {
    id: "support",
    label: "Support",
    icon: "fa-solid fa-headset",
    path: "/support",
    feature: "support",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    badgesByTier: {
      demo: null,
      live: "LIMITED",
      pro: "BASIC",
      enterprise: null
    },
    lockedBelow: "live"
  },

  /* ================= MARKETPLACE ================= */

  {
    section: "marketplace",
    title: "Marketplace",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    dropdown: true,
    children: [
      {
        id: "market-gallery",
        label: "Gallery",
        icon: "fa-solid fa-store",
        path: "/market/gallery",
        feature: "marketplace.gallery",
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          demo: "LIMITED",
          live: "BASIC",
          pro: null,
          enterprise: null
        },
        lockedBelow: null
      },
      {
        id: "market-for-you",
        label: "For You",
        icon: "fa-solid fa-wand-magic-sparkles",
        path: "/market/recommended",
        feature: "marketplace.forYou",
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          demo: null,
          live: "BASIC",
          pro: null,
          enterprise: null
        },
        lockedBelow: "live"
      },
      {
        id: "market-trending",
        label: "Trending",
        icon: "fa-solid fa-fire",
        path: "/market/trending",
        feature: "marketplace.trending",
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          demo: null,
          live: "BASIC",
          pro: null,
          enterprise: null
        },
        lockedBelow: "live"
      }
    ]
  },

  /* ================= TOOLS HUB ================= */

  {
    section: "tools",
    title: "Tools Hub",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    dropdown: true,
    children: [
      {
        id: "tools-templates",
        label: "Templates",
        icon: "fa-solid fa-layer-group",
        path: "/tools/templates",
        feature: "tools.templates",
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          demo: null,
          live: "BASIC",
          pro: null,
          enterprise: null
        },
        lockedBelow: "live"
      },
      {
        id: "tools-extensions",
        label: "Extensions",
        icon: "fa-solid fa-puzzle-piece",
        path: "/tools/extensions",
        feature: "tools.extensions",
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          demo: null,
          live: "BASIC",
          pro: null,
          enterprise: null
        },
        lockedBelow: "live"
      },
      {
        id: "tools-ai",
        label: "AI Tools",
        icon: "fa-solid fa-robot",
        path: "/tools/ai_tools",
        feature: "tools.ai",
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          demo: null,
          live: "BASIC",
          pro: null,
          enterprise: null
        },
        lockedBelow: "live"
      }
    ]
  },

  /* ================= MENTORS ================= */

  {
    section: "mentors",
    title: "Mentors",
    visibleFor: ["demo", "live", "pro", "enterprise"],
    dropdown: true,
    children: [
      {
        id: "mentor-ai",
        label: "AI",
        icon: "fa-solid fa-brain",
        path: "/mentors/ai",
        feature: "mentors.ai",
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          demo: null,
          live: "LIMITED",
          pro: "BASIC",
          enterprise: null
        },
        lockedBelow: "live"
      },
      {
        id: "mentor-human",
        label: "Human",
        icon: "fa-solid fa-chalkboard-user",
        path: "/mentors/human",
        feature: "mentors.human",
        visibleFor: ["demo", "live", "pro", "enterprise"],
        badgesByTier: {
          demo: null,
          live: "LIMITED",
          pro: "BASIC",
          enterprise: null
        },
        lockedBelow: "live"
      }
    ]
  }
];

export default sidebarConfig;
