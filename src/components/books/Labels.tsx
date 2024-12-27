import dateFormat from "dateformat";

export default function Labels({
  book,
}: {
  book: { data: { inProgress: boolean; updatedAt: Date } };
}) {
  const recentlyUpdated = getDaysDifference(book.data.updatedAt) < 30;
  return (
    <div className="flex flex-wrap flex-col justify-start items-start sm:items-baseline sm:flex-row gap-6">
      <span className="text-pacamara-primary/50 dark:text-white/40 ">
        last updated at {dateFormat(book.data.updatedAt, "yyyy-mm-dd")}
      </span>
      {book.data.inProgress && (
        <span className="text-sm py-2 grid place-items-center -translate-y-1 text-green-600 border-green-600 dark:text-green-600/80 border-2 dark:border-green-600/80 px-4 rounded-full">
          work in progress 👷‍♂️
        </span>
      )}
      {recentlyUpdated && (
        <span className="text-sm py-2 grid place-items-center -translate-y-1 text-cyan-600 border-cyan-600 dark:text-cyan-500/70 border-2 dark:border-cyan-500/70 px-4 rounded-full">
          recently updated ✨
        </span>
      )}
    </div>
  );
}

function getDaysDifference(date: Date) {
  // Convert dates to timestamps
  const time1 = new Date(date).getTime();
  const time2 = new Date().getTime();

  // Calculate the difference in milliseconds
  const diffInMilliseconds = Math.abs(time2 - time1);

  // Convert milliseconds to days
  const diffInDays = diffInMilliseconds / (1000 * 60 * 60 * 24);

  return diffInDays;
}
