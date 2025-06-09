---
title: ما هو ال useSyncExternalStore؟

pubDate: 2025-06-08

intro: واحد من ال hooks الجديدة نسبيا والي مش كتير من الناس فاهمه هو بيشتغل ازاي مع انه من ال hooks القوية و المفيدة من ناحية الاداء

tags: ["react", "hooks"]

author: eyad

image: "@/assets/blogs/use sync external store.png"

references:
  [
    "https://react.dev/reference/react/useSyncExternalStore",
    "https://blog.saeloun.com/2021/12/30/react-18-usesyncexternalstore-api/",
  ]
---

هنتكلم النهاردة عن ال useSyncExternalStore hook و ده hook جديد نسبيا ظهر مع react 18 عشان يدعم ال concurrent features الجديدة بتاعتها.

فكرة ال hook جايه من اسمه هو انه بيسمحلنا اننا نعمل sync ما بين react و اي external store و تحديدا عشان اقدر اعمل subscribe على تغييرات خارجية و اخلي ال components بتاعتي تقدر تتعامل معاها و تعمل rerender لما ال external store يتغير.

## بيتكون من ايه؟

لو بصينا عال hook هنلاقي شكله كده

```ts
const state = useSyncExternalStore(
  subscribe, 
  getSnapshot,
  getServerSnapshot?
);
```

تقدر تشوف انه بيتكون من حاجتين اساسيين الي هما ال subscribe function و دي العقد الي ما بينك و بين ال external store الي بتقوله فيه امتى يحصل rerender لل components عندك و ده بيتم على حسب ال subscription الي بتتعامل معاه. و دي شبيهة شوية بال effect function بتاعة useEffect من حيث انك بتعمل ال subscription و بترجع clean up function.

الحاجة التانية هي ال get snapshot function و دي بنستخدمها لما يحصل rerender عشان نجيب اخر قيمة من ال external store.

و عندك كمان ال get server snapshot وده لان ال hook ده يقدر يشتغل عل ال server ف دي بنستخدمها لما يكون في فرق ما بين الطريقة الي اقدر اجيب بيها البيانات من ال external store على ال client و ال server و هي optional و لو مديتهالوش تلقائيا بيستخدم get snapshot على ال client و ال server.

و ده مثال على استخدام ال hook مع ال network events من ال window.

```tsx
import { useSyncExternalStore } from 'react';

function OnlineStatus() {
  const isOnline = useSyncExternalStore(
    (rerender) => {
      window.addEventListener('online', rerender);
      window.addEventListener('offline', rerender);
      return () => {
        window.removeEventListener('online', rerender);
        window.removeEventListener('offline', rerender);
      };
    },
    () => navigator.onLine
  );

  return <div>{isOnline ? '✅ Online' : '❌ Disconnected'}</div>;
}
```

و في package من react اسمها `use-sync-external-store/with-selector` بتديك نفس ال hook بالاضافة ل اضافتين زيادة هما ال selector عشان تقدر تختار اجزاء معينة بس من ال state و equality fn عشان تحدد بنفسك لو ال state القديمة زي الجديدة (و بالتالي ميحصلش rerender ) او لا.

## امتى بستخدمه؟

في امثلة كتير على مصادر بيانات خارجية انا ممكن ابقى حابب اعمل subscribe عليها زي مثلا ال window فيها حجات كتير زي :

- ال online status من ال navigator.
- ال scroll position.
- ال resize event.
- ال local storage.
و عامة اي حاجة ليها event انا احب اعمل subscribe عليها اقدر استخدم معاها ال hook ده عشان نربطها ب react.

### مثال1: استخدام ال local storage بشكل reactive

```ts
import { useSyncExternalStore } from 'react';

function useLocalStorage(key, initialValue) {
  const subscribe = (rerender) => {
    const listener = (e) => {
      if (e.key === key || e.key === null) {
        rerender();
      }
    };
    window.addEventListener('storage', listener);
    return () => window.removeEventListener('storage', listener);
  };

  const getSnapshot = () => {
    const value = localStorage.getItem(key);
    return value !== null ? JSON.parse(value) : initialValue;
  };

  const store = useSyncExternalStore(subscribe, getSnapshot);

  const setStore = (value) => {
    localStorage.setItem(key, JSON.stringify(value));
    // Manually trigger update since storage event won't fire for same tab
    window.dispatchEvent(new Event('storage'));
  };

  return [store, setStore];
}

// Usage
function UserPreferences() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return (
    <div>
      <h2>Current theme: {theme}</h2>
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
    </div>
  );
}

```

## مثال2: متابعة التغيرات في حجم ال window بشكل reactive

```ts
import { useSyncExternalStore } from 'react';

// Shared subscription logic
function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

export function useWindowSize() {
  const width = useSyncExternalStore(
    subscribe,
    () => window.innerWidth,
    () => 0 // Fallback for SSR
  );

  const height = useSyncExternalStore(
    subscribe,
    () => window.innerHeight,
    () => 0 // Fallback for SSR
  );

  return { width, height };
}
```

و في مصادر تانية غير ال window كذلك زي اني اكون بتعامل مع global state management solution مش مخصص ل react زي redux (مش react redux) او اني حتى اكون بعمل ال state management solution بتاعي و لو رحت بصيت على كتير من ال state management solutions المعروفين ل react زي zustand و react redux هتلاقيهم بيستخدمو ال hook ده.

```ts
function useReduxStore(store, selector) {
  return useSyncExternalStore(
    (callback) => store.subscribe(callback),
    () => selector(store.getState())
  );
}

// Usage
const user = useReduxStore(reduxStore, state => state.user);
```

## مقارنة بال useEffect

لو بصيت كده هتلاحظ ان حجات كتير من دي ممكن ال use effect يعملها و كنا بالفعل بنعملها بيه لكن ال hook ده افضل من ال use effect في جزئية ال subscriptions لاكتر من سبب.

اولا انه بيشتغل اثناء ال render مش بعده زي ال useEffect ف ده بيخليه يضمن ان كل ال components الي بتستخدمه عندها نفس الداتا في حين لو استخدمنا ال use effect مع مصدر بيانات بيتغير بسرعة ممكن يحصل ما يعرف ب ال tearing الي معناه اني عندي اكتر من نسخة من نفس ال component لكن في ما بينهم اختلاف ف البيانات.

المشكلة دي ظهرت مع react 18 مع ال concurrent apis الجديدة زي start transition عشان دي بتسمح ل react انها توقف ال render و تكمله بعدين ف ممكن تؤدي لحدوث ال tearing.

في المثال [ده](https://codepen.io/Eyad-Abdou/pen/EajwWQJ) معانا counter بيتغير بسرعة و اكتر من component بيعتمد عليه ف ممكن يحصل ان في component يكون بيعرض قيمة قديمة و component تاني بيعرض قيمة جديدة لل counter و ده بسبب ان مفيش sync ما بين ال components.

و [هنا](https://codepen.io/Eyad-Abdou/pen/ZYGXeaM) بنحل المشكلة دي عن طريق استخدام useSyncExternalStore عشان تعمل sync ما بين ال components و ال counter الخارجي.

كمان use sync external store بيدعم ال SSR و ال hydration لانه من ال hooks القليلة الي ممكن تشتغل على السيرفر على عكس ال use effect الي مش بيشتغل غير على ال client.

و كمان هو ف الاخر معمول عشان يتعامل مع ال subscriptions ف بيديك api سهل لو حاولت تقلده باستخدام use effect هتكتب كود اكتر و هتاخد اداء اقل.

هل ده معناه اننا نلغي ال useEffect؟ لا بس نستخدمه في الحجات الي هو مخصص ليها و الي هي ال side effects و خصوصا لو كانت بتحصل جوا component واحد فقط زي:

- التعامل مع ال DOM بشكل مباشر.
- استخدام ال timers او ال intervals.
- التعامل مع components او plugins خارجية.

## الخلاصة

الخلاصة ان ال useSyncExternalStore من ال hooks القوية و المهمة في react و له استخدامات كتير متعلقة بال performance و تقدر تقرا عنهم اكتر من المصادر الي تحت و متنساش تشير المقال مع اصحابك.
