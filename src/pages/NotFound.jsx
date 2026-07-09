import { SearchAlert } from "lucide-react";
import React from "react";

import EmptyState from "../components/EmptyState";

export default function NotFound() {
  return (
    <main className="container page-view">
      <section className="not-found">
        <EmptyState
          icon={SearchAlert}
          linkText="Back to Catalog"
          linkTo="/recipes"
          message="It looks like this recipe got lost in the sauce. The page you are looking for does not exist."
          title="404: Page Not Found"
        ></EmptyState>
      </section>
    </main>
  );
}
