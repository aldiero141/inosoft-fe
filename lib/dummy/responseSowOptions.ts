export interface SowOptionsInterface {
  id_sow: string;
  sow_name: string;
  sow_description: string;
  scope: {
    id_scope: string;
    scope_name: string;
    scope_description: string;
  }[];
}

export const SowOptions: SowOptionsInterface[] = [
  {
    id_sow: "SOW-001",
    sow_name: "engine",
    sow_description: "engine",
    scope: [
      {
        id_scope: "SCOPE-001",
        scope_name: "engine inspection",
        scope_description: "engine inspection",
      },
      {
        id_scope: "SCOPE-002",
        scope_name: "engine repair",
        scope_description: "engine repair",
      },
    ],
  },
  {
    id_sow: "SOW-002",
    sow_name: "hull",
    sow_description: "hull",
    scope: [
      {
        id_scope: "SCOPE-001",
        scope_name: "hull cleaning",
        scope_description: "hull cleaning",
      },
      {
        id_scope: "SCOPE-002",
        scope_name: "hull repair",
        scope_description: "hull repair",
      },
    ],
  },
  {
    id_sow: "SOW-003",
    sow_name: "aft",
    sow_description: "aft",
    scope: [
      {
        id_scope: "SCOPE-001",
        scope_name: "hull inspection",
        scope_description: "hull inspection",
      },
      {
        id_scope: "SCOPE-002",
        scope_name: "hull repair",
        scope_description: "hull repair",
      },
    ],
  },
];
