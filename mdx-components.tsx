import type { MDXComponents } from "mdx/types";
import { ModelPill } from "@/components/writeup/model";
import { Table } from "@/components/writeup/table";

// Required by @next/mdx. Maps Markdown output to site styles and exposes the
// write-up components to every MDX file.
const components: MDXComponents = {
  table: (props) => (
    <div className="tbl-wrap">
      <table className="tbl" {...props} />
    </div>
  ),
  ModelPill,
  Table,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
