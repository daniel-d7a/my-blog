import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { NestedHeading } from "@/types";
import { nestHeadings } from "@/utils/getNestedHeadings";
import { Fragment } from "react/jsx-runtime";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function ChaptersSheet({
  book,
  currentChapter,
}: {
  book: any;
  currentChapter: string;
}) {
  const { headings } = book;
  const chapterHeaders = headings.filter((h: any) => h.depth === 1);
  const contentHeadings = nestHeadings(headings);

  const currentContent = contentHeadings.find(
    (h) => h.slug === currentChapter
  )!;

  return (
    <Sheet>
      <SheetTrigger className="text-white bg-gray-800/60 p-2 rounded-full fixed bottom-4 right-4 md:bottom-8 md:right-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1.4em"
          height="1.4em"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M2 8a1 1 0 0 1 1-1h10.308a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m0-4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m0 8a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1m0 4a1 1 0 0 1 1-1h10.308a1 1 0 1 1 0 2H3a1 1 0 0 1-1-1"
            clip-rule="evenodd"
          />
        </svg>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-[85%] border-none bg-black/80 px-4"
      >
        <ChapterSideBar book={book} currentChapter={currentChapter} />
      </SheetContent>
    </Sheet>
  );
}

export function ChapterSideBar({
  book,
  currentChapter,
}: {
  book: any;
  currentChapter: string;
}) {
  const { headings } = book;
  const chapterHeaders = headings.filter((h: any) => h.depth === 1);
  const contentHeadings = nestHeadings(headings);

  const currentContent = contentHeadings.find(
    (h) => h.slug === currentChapter
  )!;

  return (
    <Tabs defaultValue="Content" className="w-full sticky top-8">
      <TabsList className="w-full flex  rounded-lg p-1">
        <div className="flex w-full mt-2">
          <TabsTrigger
            className="w-full rounded-lg text-lg font-bold"
            value="Content"
          >
            Content
          </TabsTrigger>
          <TabsTrigger
            className="w-full rounded-lg text-lg font-bold"
            value="Chapters"
          >
            Chapters
          </TabsTrigger>
        </div>
      </TabsList>
      <div className=" text-white/80 h-[80vh] pb-10 px-0 md:px-4 mt-8 overflow-y-scroll ">
        <TabsContent value="Content">
          <NestedSidebarHeaders nestedHeadings={[currentContent]} />
        </TabsContent>
        <TabsContent value="Chapters">
          <ul className="flex flex-col gap-2 md:gap-4">
            {chapterHeaders.map((h: any) => (
              <li
                key={h.slug}
                className="text-lg flex gap-2 hover:bg-gray-800/60 p-2 cursor-pointer"
              >
                <div className="translate-y-1 inline-block">*</div>
                <a href={`/books/${"asd"}/chapters/${h.slug}`}>{h.text}</a>
              </li>
            ))}
          </ul>
        </TabsContent>
      </div>
    </Tabs>
  );
}

// h-[99.5%]
function NestedSidebarHeaders({
  nestedHeadings,
}: {
  nestedHeadings: NestedHeading[];
}) {
  return (
    <>
      <div>
        {nestedHeadings.map(
          (nh) =>
            nh.depth <= 3 && (
              <Fragment key={nh.slug}>
                <div className="flex item-base">
                  <a href={`#${nh.slug}`}>
                    <p
                      className="leading-5 my-0 flex gap-2"
                      style={{
                        fontSize: `${(7 - nh.depth) * 3.5}px`,
                        lineHeight: `${(7 - nh.depth) * 4.5}px`,
                        marginBlockEnd: `14px`,
                      }}
                    >
                      <span className="translate-y-1 inline-block">*</span>
                      {nh.text}
                    </p>
                  </a>
                </div>
                <div className="ml-4 md:ml-8">
                  {nh?.nestedHeadings && Array.isArray(nh.nestedHeadings) && (
                    <NestedSidebarHeaders nestedHeadings={nh.nestedHeadings} />
                  )}
                </div>
              </Fragment>
            )
        )}
      </div>
    </>
  );
}
