import type { Heading, NestedHeading } from "@/types";

export function getNestedHeadings(heads: NestedHeading[]) {
  let result: NestedHeading[] = [];

  function addToRoot(root: NestedHeading, head: NestedHeading) {
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

      if (head === root) {
        continue;
      }

      if (head.depth === 1) {
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

// export function getNestedHeadings__new(heads: NestedHeading[]) {
//   return heads.reduce((acc, curr) => {
//     // if acc empty push to acc
//     if (acc.length === 0) {
//       acc.push(curr);
//     }

//     //else
//     const lastItem = acc.at(-1);
//     if (!lastItem) return;

//     // if current element has less depth than last element, push to acc
//     if (curr.depth < lastItem.depth) {
//       acc.push(curr);
//     }

//     // here we add parents to headings

//     // if current element has more depth than last element, push to last element
//     if (curr.depth > lastItem.depth) {
//       if (lastItem.nestedHeadings) {
//         lastItem.nestedHeadings.push(curr);
//       } else {
//         lastItem.nestedHeadings = [curr];
//       }
//     }

//     // if current element has equal depth as last element, push to last elemnet's parent
//     if (curr.depth === lastItem.depth) {
//       const parent = acc.findLast((n) => n.depth < curr.depth);
//       parent!.nestedHeadings!.push(curr);
//     }
//     return acc;
//   }, [] as NestedHeading[]);
// }

export function nestHeadings(headings: Heading[]): NestedHeading[] {
  const nestedHeadings: NestedHeading[] = [];
  const stack: NestedHeading[] = [];

  for (const heading of headings) {
    const newHeading: NestedHeading = { ...heading, nestedHeadings: [] };

    // If the stack is empty, add the first heading as a top-level item
    if (stack.length === 0) {
      nestedHeadings.push(newHeading);
      stack.push(newHeading);
      continue;
    }

    // Remove headings from the stack until we find the correct parent
    while (
      stack.length > 0 &&
      stack[stack.length - 1].depth >= newHeading.depth
    ) {
      stack.pop();
    }

    // If the stack is empty, this is a top-level heading
    if (stack.length === 0) {
      nestedHeadings.push(newHeading);
    } else {
      // Otherwise, it's a child of the current stack's last item
      stack[stack.length - 1].nestedHeadings!.push(newHeading);
    }

    // Push the new heading to the stack
    stack.push(newHeading);
  }

  return nestedHeadings;
}
