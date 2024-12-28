---
title: ايه هو ال updater function في useState ؟

pubDate: 2024-12-28

intro: تعالو نشوف ميزة قوية جدا في ال useState hook و نشوف ازاي نقدر نستخدمها و بتفيدنا ف ايه.

tags: ["react", "hooks"]

author: eyad

image: "@/assets/blogs/use state.png"

references:
  [
    "https://react.dev/learn/state-as-a-snapshot",
    "https://react.dev/learn/queueing-a-series-of-state-updates",
  ]
---

في المقالة دي هنتكلم عن شوية خصائص في ال use state hook و نفهم ازاي نقدر نستخدمه باحسن شكل ممكن.

## ال updater function.

كلنا عارفين انه بيستخدم عشان يحفظ الداتا جوه ال components بتاعتنا عن طريق انه بيرجعلك variable شايل الداتا و setter function عشان تغير بيها الداتا و تعمل rerender لل component بالشكل التالي:

```ts
const [counter, setCounter] = useState();
```

ال setter function ممكن تستخدمها بطريقتين يا اما انك تديها القيمة الجديدة بشكل مباشر زي كده:

```ts
setCounter(10);
```

و دي هنا بتشيل القيمة القديمة من ال state و تحط القيمة الجديدة.

او انك تديها updater function و دي بتكون function بتاخد parameter واحد عبارة عن قيمة ال state القديمة و ال return بتاعها بيكون هو القيمة الجديدة لل state زي كده:

```ts
setCounter((c) => c + 10);
```

ف المثال ده عندنا function بتاخد parameter اسمه c عبارة عن قيمة counter الحالية الي احنا حطيناها ب 10 ف المثال الي فات و بترجع c + 10 الي هي هتبقى 20 و دي بتكون قيمة counter الجديدة.

طب كده ايه الفرق ما بين الاتنين ؟ خلينا نشوف مثال: -

اوقات كتير بنحتاج نعدل ال state بناء على قيمة ال state نفسها زي مثلا لو عندك counter و عاوز لما تضغط زرار معين تزوده ب 1 ممكن تستخدم الطريقتين:

```ts
setCounter(counter + 1);
setCounter((c) => c + 1);
```

### تغيير ال state اكتر من مرة في نفس المكان.

ف المثال ده الفرق ما بينهم مش كبير بس الفرق هيبان اكتر لو حاولت مثلا انك تنادي setCounter اكتر من مرة في نفس ال function و لنفترض مثلا ان ال counter قيمته 0 و انت عاوز لما يضغط عالزرار تزوده 2 ف هتعمل كده:

```ts
setCounter(counter + 1);
setCounter(counter + 1);
```

هتيجي بعدها تشوف ال counter هتلاقيه قيمته ب 1 مش 2 مع انك عملت setCounter مرتين، بس ليه؟

المشكلة هنا ان السطرين الي فوق كلهم بيعملو setCounter بنفس القيمة و ده بيحصل لان قيمة counter مش بتتغير بعد كل سطر عشان كده وقت ما انت كتبت ال setCounter ف الrender ده كانت قيمة counter ب 0 و بالتالي كلهم شايفينها 0.

ده لان react مش بتغير ف ال state اول اما تشوف الsetter function لا هي بتشوف كل حاجة بتعمل setState و تحطها ف queue و بتنفذها بعدين مرة واحدة بالتالي الكلام الي مكتوب فوق بيتم تنفيذه كده:

```ts
setCounter(counter + 1); // setCounter( 0 + 1 )
setCounter(counter + 1); // setCounter( 0 + 1 )
```

لانهم معتمدين على قيمة counter الي لسه متعملهاش update و لو عاوز تتأكد ممكن تعمل console.log(counter) بعد ال setCounter هتلاقيه كمان ب 0.

الطريقة الصح هنا انك تستخدم updater function جوه ال setCounter لانها بتاخد اخر قيمة لل state وقت ما تيجي تعمل update للقيمة و rerender لل component مش وقت ما انت تستخدمها ف لما تيجي تعملها اكتر من مرة ورا بعض لما تيجي تتنفذ قيمتها هتتحط صح زي كده:

```ts
// c = 0
setCounter((c) => c + 1); // 0 => 0 + 1 = 1
// c = 1
setCounter((c) => c + 1); // 1 => 1 + 1 = 2
```

و ف النهاية قيمة ال counter هتكون 2 بعد ما يحصل rerender.

او ممكن تريح نفسك من كل ده و تعمل

```ts
setCounter(counter + 2);
```

بس ساعتها مش هيبقى عندنا مثال 😉

### تقليل ال dependencies.

فرق تاني بينهم و كمان ميزة لل updater function انها مش بتعتمد على اي حاجة من برا ال updater function، ف لو انت مثلا بتستخدمها من جوه اي حاجة ليها dependency array زي use Effect مش هتحتاج انك تحط ال state القديمة ك dependency ليها.

ف مثلا لو عندنا timer قسمته بتزيد كل ثانية بواحد في العادي هنعمله كده:

```ts showLineNumbers title="Counter.tsx"
import { useState, useEffect } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    
    let timer = setInterval(() => setCount(count + 1), 1000);

    return () => clearInterval(timer);
  }, [count]);

  return <p> {count} </p>;
}
```

هتلاحظ ان ال effect بيعتمد على قيمة ال count و كل ما يتغير هتلاقي ال effect بيشتغل تاني و ممكن يعمل مشاكل ف ال performance, الحل الاحسن اننا نستخدم ال updater function عشان نلغي اعتمادية ال effect على ال count, زي كده:

```ts showLineNumbers title="Counter.tsx" del={7} ins={8}
import { useState, useEffect } from "react";

export function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {

    let timer = setInterval(() => setCount(count + 1), 1000);
    let timer = setInterval(() => setCount((c) => c + 1), 1000);

    return () => clearInterval(timer);
  }, []);

  return <p> {count} </p>;
}
```

لو عجبك المقال متنساش تنشره مع اصحابك و على مواقع التواصل الاجتماعي و اهم حاجة متنساش تبص عالمصادر تحت 👇🏼
