import type { NestedHeading } from "@/types";
import { Fragment, useCallback, useState } from "react";
interface Props {
  nestedHeadings: NestedHeading[];
}

function RecursiveHeaders({ nestedHeadings }: Props) {
  return (
    <div>
      {nestedHeadings.map((nh) => (
        <Fragment key={nh.slug}>
          <div className="flex item-base">
            <a href={`#${nh.slug}`}>
              {/* for large screens */}
              <p
                className="hidden md:block leading-5 my-0"
                style={{
                  fontSize: `${(7 - nh.depth) * 4.5}px`,
                  lineHeight: `${(7 - nh.depth) * 4.5}px`,
                  marginBlockEnd: `6px`,
                }}
              >
                {nh.text}
              </p>
              {/* for mobile phones */}
              <p
                className="md:hidden block leading-5 my-1"
                style={{
                  fontSize: `${(7 - nh.depth) * 3}px`,
                }}
              >
                {nh.text}
              </p>
            </a>
          </div>
          <div className="ml-8">
            {nh?.nestedHeadings && Array.isArray(nh.nestedHeadings) && (
              <RecursiveHeaders nestedHeadings={nh.nestedHeadings} />
            )}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default function ListOfContent({ nestedHeadings }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = useCallback(() => setIsOpen((x) => !x), []);
  return (
    <>
      <div className="flex justify-between">
        <p>List of contents</p>
        <p className="cursor-pointer" onClick={toggle}>
          {isOpen ? "hide" : "show"}
        </p>
      </div>
      <div
        style={{
          maxHeight: isOpen ? "100000px" : "0px",
          overflowY: isOpen ? "auto" : "hidden",
          transition: "max-height 0.5s ease",
        }}
      >
        <RecursiveHeaders nestedHeadings={nestedHeadings} />
      </div>
    </>
  );
}
