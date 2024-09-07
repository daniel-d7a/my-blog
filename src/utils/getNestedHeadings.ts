import type { NestedHeading } from "@/types";

export function getNestedHeadings(heads: NestedHeading[]) {
  let result: NestedHeading[] = [];

  function addToRoot(root: NestedHeading, head: NestedHeading) {
    // console.log("adding to root");

    if (root.nestedHeadings) {
      root.nestedHeadings.push(head);
    } else {
      root.nestedHeadings = [head];
    }
  }

  function recursive(start = 0) {
    let root: NestedHeading | null = null;

    for (let i = start; i < heads.length; i++) {
      const head = heads[i];

      // root && console.log("current root ==> ", root.text || "", root.depth || "");
      // console.log("current head ==> ", head.text, head.depth);

      if (head === root) {
        // console.log("head and node are the same node");
        continue;
      }

      if (head.depth === 1) {
        // console.log("pushing depth 1 node");
        result.push(head);
        root = head;
        continue;
      }

      if (root === null) return;

      if (head.depth > root.depth) {
        addToRoot(root, head);
        root = head;
      } else if (head.depth <= root.depth) {
        const tempRoot = heads
          .slice(0, i)
          .findLast((n) => n.depth < head.depth)!;
        addToRoot(tempRoot, head);
        root = head;
      }
    }
  }

  recursive();

  return result;
}
