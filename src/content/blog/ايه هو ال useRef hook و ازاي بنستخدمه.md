---
title: ايه هو ال useRef hook و ازاي بنستخدمه ؟

pubDate: 2024-12-29

intro: تعالى نتعرف على ال useRef hook و نشوف طرق استخدام ليه عمرك ما فكرت فيها قبل كده.

tags: ["react", "hooks"]

author: eyad

image: "@/assets/blogs/useref.png"

references:
  [
    "https://react.dev/reference/react/useRef",
    "https://react.dev/learn/manipulating-the-dom-with-refs",
  ]
---

السلام عليكم ازيكو عاملين ايه ؟ في مقالة النهاردة جايين نتعرف على ال use ref hook بشوية تفصيل

ال use ref hook هو react hook بيرجع قيمة بتتحفظ ما بين ال renders بس لا اكثر ولا اقل.

زيه بالظبط زي ال use state بل كمان ممكن نقول انه هو اصلا عبارة عن use state مع شوية فروقات صغيرة و زي ما احنا عارفين ال use state بيرجعلي قيمة بتتحفظ ما بين ال renders و setter function عشان اقدر اغير بيها القيمة دي و اعمل rerender لل ui.

انت ممكن تتخيل ال use ref من جوه كأنه بينادي ال use state و بياخد القيمة الي انت بتديهاله يحطها قيمة default عبارة عن object جواه property واحدة فقط اسمها current قيمتها بالقيمة الي انت اديتها لل use ref hook و بعد كده يرجعلك ال value الي رجعت من ال use state من غير ما يديك ال setter function, حاجة زي كده:

```ts
function useRef(initialValue) {
  const [ref] = useState({ current: initialValue });
  return ref;
}

// ...

const ref = useRef("eyad"); // ref = {current: "eyad"}
```

هنا ممكن يجي ف بالك اكتر من سؤال زي مثلا: -

- ليه مش بيديني setter function ؟
- لما ميدينيش setter function هغير القيمة ازاي ؟

ده فرق من فروقات ال ref عن ال state ان ال state بتتغير ب ال setter function عشان تعمل rerender لل UI انما ال ref نقدر نغيره من ال variable عادي و بالتالي مش هيعمل rerender لل component و مش هحتاج setter function.

ال refs معمولة عشان احط فيها بيانات انا محتاج احافظ عليها ما بين ال rerenders بس مش محتاجها ف ال ui و بالتالي مش بحتاج اعمل rerender لما اغيرها.

طب لما هو بيحفظ data زي ال use state ليه عملوله hook لوحده طب ما انا استخدم use state بنفسي و خلاص ؟

ده لان حفظ الداتا هو واحد من استخدامات ال refs و ليهم استخدام تاني مهم جدا هو انهم بيخلوك تقدر تتعامل مع ال dom زي ما هنشرح تحت.

## الاستخدمات

### حفظ ال data بين ال rerenders

ليها استخدامين اساسيين اولهم حفظ ال data بين ال renders بس مش اي data و خلاص كده  
لو ال data دي ليها علاقة بال UI زي مثلا اسم المستخدم او ال todos او اي حاجة متعلقة بال UI لازم تتحفظ ف state ده لانها reactive data يعني تفاعليه بتتغير و لما تتغير لازم التغير ينعكس على ال UI انما ال ref بيستخدم عشان نحفظ فيه اي data غير متعلقة بال UI زي مثلا ال interval id او ال timeout id: -

```ts showLineNumbers {11-14}
import { useState, useRef } from "react";

export default function App() {
  const [isRunning, setlsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const intervalRef = useRef(null);

  function startStopwatch() {
    if (!isRunning) {
      setlsRunning(true);
      intervalRef.current = setInterval(
        () => setTime((prevTime) => prevTime + 1),
        1000
      );
    }
  }

  function stopStopwatch() {
    if (isRunning) {
      setlsRunning(false);
      clearInterval(intervalRef.current);
    }
  }

  return (
    <div>
      <div>{time}</div>
      <button onClick={startStopwatch}>Start</button>
      <button onClick={stopStopwatch}>Stop</button>
    </div>
  );
}
```

### التحكم في ال Dom nodes بشكل مباشر

و حاجة كمان مهمة جدا ف ال refs انه بيساعدك تتحكم في ال DOM nodes عن طريق ال DOM methods زي query selector او add event listener او غيرهم.  
ده عن طريق انك تعمل ref و تديه لاي DOM node ف ال ref property بتاعتها و react تلقائيا هتخلي ال current بتاع ال ref عبارة عن ال DOM node دي: -

```ts showLineNumbers {18}
import { useRef } from "react";

export default function App() {
  const buttonRef = useRef(null);

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => {
          console.log("button clicked");
        }}
      >
        click me!
      </button>
      <button
        onClick={() => {
          buttonRef.current?.click();
        }}
      >
        trigger button click
      </button>
    </>
  );
}
```

بس لازم تخلي بالك ان عمليه ربط ال DOM node بال ref بتحصل بعد ال rendering ف يفضل تستخدم ال DOM node جوه event handler زي ال on click مثلا او جوه use effect عشان تضمن ان ال node مش undefined او تستعمل ال safe chaining operator (.?) زي المثال الي فوق.

### التحكم في عدد متغير من ال Dom nodes

في بعض الاحيان بنبقى محتاجين ref لاكتر من عنصر ف لو انت معاك عنصر او اتنين او عدد قليل و ثابت ف انت ممكن تعمل refs بعددهم و ده عادي جدا بس لو عددهم كبير او عددهم ممكن يكون بيتغير ف هيبقى صعب انك تعمل refs بعددهم و تعملهم assign صح.

ممكن تتصرف انك تعمل ref عال parent و تستخدم dom methods زي ال query selector مثلا عشان تجيب العناصر الي جواه بس حاجة زي كده مش كويسة لاكتر من سبب
ابسطهم ان شكل و ترتيب العناصر ممكن يتغير مع الوقت و بالتالي هتحتاج تعدل ف ال query بتاعتك

في طريقة تخليك تتعامل مع عدد كبير و متغير من العناصر ب ref واحد بس و كتير من الناس متعرفهاش مع انها طريقة قوية جدا.

طريقة استخدام ال ref مع ال dom elements ف العادي انك بتعرف ref و بتديه لل ref property بتاعه ال element عشان react تحط ال dom node ف ال current بتاع ال ref زي كده: -

```ts {6}
import { useRef } from "react";

export default function App() {
  const buttonRef = useRef(null);

  return <button ref={buttonRef}> click me! </button>;
}
```

احنا بقى مش هنعمل كده, احنا بكل بساطة هنعمل ref و هنديله قيمة مبدئية ب حاجة تقدر تشيل اكتر من عنصر ممكن array و ممكن set او map و الامثلة الي تحت مرة استخدمنا array و مرة map.

بعدين بدل ما نديه لل ref property بتاعه العناصر الي انا عاوز اتحكم فيها هديلها callback function بتاخد parameter واحد عبارة عن ال dom node الي انا واقف عليها و دي ممكن تكون قيمتها ب ال dom node فعلا او ب null لو العنصر اتشال او الجزء ده من ال dom اتغير.

هنعمل check بسيط على ال node انها لو موجودة ناخدها معانا او لو قيمتها ب null نشيلها و كده بكل بساطة بقى معاك ref ال current بتاعه شايل اي عدد من الdom nodes انت تحتاجه حتى لو العدد ده زاد او نقص خلال ال run time.

```ts
import { useRef } from "react";

export function App() {
  const elementSetRef = useRef(new Set());

  return (
    <div
      ref={(element) => {
        if (element) {
          elementSetRef.current.add(element);
        } else {
          elementSetRef.current.delete(element);
        }
      }}
    >
      Element 1
    </div>
  );
}
```

طب ايه تطبيقات على حاجة زي كده ؟

ممكن يكون معاك اكتر من عنصر محتاج تغير ف ال style بتاعهم او تستخدم عليهم dom methods زي focus او click من خلال عناصر تانية و كمان العناصر دي ممكن عددها يكون متغير و حاجة زي دي ممكن تشوفها ف [المثال ده](https://codesandbox.io/p/sandbox/use-ref-callback-example-shmvxh?file=%2Fsrc%2Findex.js)

هنا عندنا state عبارة عن array من الارقام و قصادهم array من الزراير كل زرار بيأثر على رقم معين و الزراير و الارقام بعيد عن بعض و كمان الارقام ممكن تقل او تزيد خلال ال run time, و عشان نقدر نغير الارقام استعملنا ref و عملنا callback function على كل p element شايل رقم.

ممكن كمان تعمل بيها image gallery فيه زراير او thumbnails صغيرة بتخليك ت scroll ف الصور لما تدوس عليها زي [المثال ده](https://codesandbox.io/p/sandbox/use-ref-callback-example-2-8kqsng)

ف المثال ده مستخدمين map عشان تشيل ال dom nodes الي فيها الصور بحيث لما ادوس على ال thumbnail بتاعتهم اعمل scroll عليها. ف المثال ده عدد الصور ثابت بس ده برضو هيشتغل لو كان عدد الصور متغير زي انه يكون راجع من api او ال user هو الي بيدخله

## الخاتمة

اخر معلومة نختم بيها ال post ده هي ان ال use ref يعتبر escape hatch يعني موجود عشان نطلع برا سيستم react زي انك تتحكم بال DOM بشكل مباشر او تتعامل مع library مش مكتوبة ل react فلازم قبل ما تستخدم ref تتأكد انك محتاجه الاول و بعدها تستخدمه بحذر مش عمال على بطال لانه غالبا هيؤدي لنتايج عكس ما انت متوقع.

لو عجبك المقال متنساش تنشره مع اصحابك و على مواقع التواصل الاجتماعي و اهم حاجة متنساش تبص عالمصادر تحت 👇🏼
