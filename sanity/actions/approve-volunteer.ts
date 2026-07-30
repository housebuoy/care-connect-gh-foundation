import { useClient } from "sanity";
import type { DocumentActionComponent } from "sanity";

const person: {
  _type: "person";
  name: string;
  role: string;
  isVolunteer: boolean;
  isLeadership: boolean;
  showOnSite: boolean;
  photo?: { _type: "image"; asset: { _type: "reference"; _ref: string } };
} = {
  _type: "person",
  name: doc?.name ?? "Volunteer",
  role: doc?.displayRole || doc?.role || "Volunteer",
  isVolunteer: true,
  isLeadership: false,
  showOnSite: true,
};

const photo = doc?.photo as { asset?: { _ref?: string } } | undefined;
if (photo?.asset?._ref) {
  person.photo = {
    _type: "image",
    asset: { _type: "reference", _ref: photo.asset._ref },
  };
}

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
    label: doc?.status === "approved" ? "Re-add to team" : "Approve & add to team",
    tone: "positive",
    onHandle: async () => {
      try {
        // build the person doc, only including photo if it's a valid image ref
        const person: Record<string, unknown> = {
          _type: "person",
          name: doc?.name ?? "Volunteer",
          role: doc?.displayRole || doc?.role || "Volunteer",
          isVolunteer: true,
          isLeadership: false,
          showOnSite: true,
        };

        const photo = doc?.photo as
          | { asset?: { _ref?: string } }
          | undefined;
        if (photo?.asset?._ref) {
          person.photo = {
            _type: "image",
            asset: { _type: "reference", _ref: photo.asset._ref },
          };
        }

        const created = await client.create(person);
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
        alert(`Failed: ${err instanceof Error ? err.message : "unknown error"}`);
      }
    },
  };
};