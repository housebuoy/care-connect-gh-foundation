import { type SchemaTypeDefinition } from "sanity";
import { outreach } from "./documents/outreach";
import { partner } from "./documents/partner";
import { submission } from "./documents/submission";
import { person } from "./documents/person"; 
import { aboutContent } from "./singletons/about-content";
import {siteSettings} from "./singletons/site-settings";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [outreach, partner, submission, person, aboutContent, siteSettings],
};