import type { StructureResolver } from "sanity/structure";

const SINGLETONS = ["aboutContent", "siteSettings"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      // 1. Site Settings Singleton
      S.listItem()
        .title("Site settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
        
      // 2. About the Foundation Singleton
      S.listItem()
        .title("About the foundation")
        .id("aboutContent")
        .child(
          S.document().schemaType("aboutContent").documentId("aboutContent")
        ),
        
      S.divider(),
      
      // 3. The rest of your documents (Outreaches, etc.)
      ...S.documentTypeListItems().filter(
        (item) => !SINGLETONS.includes(item.getId() ?? "")
      ),
    ]);