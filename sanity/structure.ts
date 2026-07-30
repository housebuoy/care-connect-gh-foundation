import type { StructureResolver } from "sanity/structure";

const SINGLETONS = ["aboutContent", "siteSettings"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // ── The work: what the client edits most ──
      ...S.documentTypeListItems().filter(
        (item) =>
          !SINGLETONS.includes(item.getId() ?? "") &&
          item.getId() !== "submission"
      ),

      S.divider(),

      // ── Signups inbox ──
      S.listItem()
        .title("Form submissions")
        .schemaType("submission")
        .child(
          S.documentList()
            .title("Form submissions")
            .apiVersion("2024-01-01")
            .filter('_type == "submission"')
            .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
        ),

      S.divider(),

      // ── Settings: rarely touched ──
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
      S.listItem()
        .title("About the foundation")
        .id("aboutContent")
        .child(S.document().schemaType("aboutContent").documentId("aboutContent")),
    ]);