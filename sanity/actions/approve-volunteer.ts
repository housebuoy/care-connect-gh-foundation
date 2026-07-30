import { useClient } from "sanity";
import type { DocumentActionComponent } from "sanity";

export const approveVolunteer: DocumentActionComponent = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const client = useClient({ apiVersion: "2024-01-01" });
  const doc = props.draft || props.published;

  // show only on volunteer submissions (drop the status check so the button
  // stays available even if status was set manually first)
  if (props.type !== "submission" || doc?.path !== "volunteer") {
    return null;
  }

  return {
    label:
      doc?.status === "approved" ? "Re-add to team" : "Approve & add to team",
    tone: "positive",
    onHandle: async () => {
      try {
        // 1. Explicitly cast Sanity document fields to string
        const name = (doc?.name as string) || "Volunteer";
        const role = (doc?.displayRole as string) || (doc?.role as string) || "Volunteer";

        // 2. Define strict inline types so client.create() recognizes the _type field
        const personPayload: {
          _type: "person";
          name: string;
          role: string;
          isVolunteer: boolean;
          isLeadership: boolean;
          showOnSite: boolean;
          photo?: { _type: "image"; asset: { _type: "reference"; _ref: string } };
        } = {
          _type: "person",
          name: name,
          role: role,
          isVolunteer: true,
          isLeadership: false,
          showOnSite: true,
        };

        const photo = doc?.photo as { asset?: { _ref?: string } } | undefined;
        if (photo?.asset?._ref) {
          personPayload.photo = {
            _type: "image",
            asset: { _type: "reference", _ref: photo.asset._ref },
          };
        }

        // 3. Create the document (TypeScript will no longer complain about missing _type)
        const created = await client.create(personPayload);
        console.log("✅ Created person:", created._id);

        const publishedId = props.id.replace(/^drafts\./, "");
        await client
          .patch(publishedId)
          .set({ status: "approved", showOnSite: true })
          .commit();

        console.log("✅ Submission approved");
        props.onComplete();
      } catch (err) {
        console.error("❌ Approve failed:", err);
        alert(
          `Failed: ${err instanceof Error ? err.message : "unknown error"}`,
        );
      }
    },
  };
};