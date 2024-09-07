---
title: ايه هي ال immutability
pubDate: 2024-08-05
intro: مبدأ ال immutability مبدأ مهم و مستخدم بشكل كبير في javascript و react. تعالى نتعرف عليه.
tag: immer
author: eyad
image: "@/assets/blogs/what is immutability.jpeg"
---

ايه هي ال immutability ؟
هي طريقة ف التعامل مع الداتا بشكل اني مبغيرش فيها بل اني بعمل نسخة من الداتا اعمل فيها التغييرات بتاعتي. و عكسها ال mutability و هو اني بعمل التغييرات بتاعتي على الداتا بشكل مباشر.

ابسط مثال نقدر نشرح بيه الفكرة دي هو لو انا عندي array و عاوز اعمله sort، لو استخدمت ال sort function الموجودة عال array هلاقيه غيرت فيه بشكل مباشر ف ده تغيير mutable لكن لو استخدمت toSorted او عملت spread لل array و بعدين عملتله sort هلاحظ اني بقى معايا array جديد معموله sort و ال array القديم زي ماهو متغيرش، ف ده كده تغيير immutable.

ال immutability تطبيقها سهل مع ال scalar types زي ال numbers و ال strings لانهم immutable اصلا بمعنى انك كل مرة بتغير قيمة number او string ف انت حرفيا بتشيل القيمة القديمة و تعمل قيمة جديدة، اما بالنسبة لل reference types الموضوع اصعب شوية لانهم mutable بمعنى انك ممكن تغير فيهم من غير ما تغير ال reference بتاعهم يتغير من خلال حجات زي push و splice لل array او التعامل مع ال objects باستخدام ال dot syntax، ف عشان نتعامل معاهم بشكل immutable محتاجين نعمل deep copy بمعنى اننا نعدي على كل خانة فيهم و نعملها copy جوا object او array جديد، و لو خانة منهم كانت object او array ف محتاجين نعملها deep copy كمان.

ليه ال immutability مهمة؟ لانها بتسهل علينا حجات كتير زي ال change detection او معرفة ان لو الداتا بتاعتي حصل فيها تغيير ولا لا، و بيخليني اقدر احتفظ بالقيم القديمة للداتا بحيث اقدر استخدمهم ف ال debugging مثلا زي ال time travel debugging او اعمل بيهم feature زي ال undo و ال redo.

و ال immutability مهمة كمان في react و بتعتمد عليها بشكل كبير عشان تلاحظ اي تغييرات بتحصل عندها، ف تلاقي react بتفترض ان اي state او props او اي داتا داخلة في dependency array هي immutable، و بالتالي عشان react تحس ان الداتا دي اتغيرت لازم التغيير يحصل بشكل immutable ف ده بالنسبة لل scalar types زي ال numbers و ال strings بيحصل بمجرد ما القيمة تتغير، و بالنسبة لل reference types لازم ال reference يتغير بمعنى ان القيمة تتشال و يجي مكانها قيمة جديدة.

على قد ما ال immutability فكرة قوية و مهمة لكن ليها عيوب و احد هذه العيوب انها بتخلي كتابة الكود صعبة، تخيل معايا كده لو انت عندك array بيتكون من objects و ال objects دي جواها objects و arrays و هكذا و انت محتاج تعدل حاجة deeply nested جواه هتلاقي ان الموضوع صعب و سهل انك تغلط او تنسى تعمل copy لجزء معين من الداتا بتاعتك و عشان كده ظهرت مكتبات كتير بتساعدك انك تكتب تغييرات immutable بس شكل الكود يكون mutable تقدر تشوف بعض الامثلة من اللينك هنا:
[https://shorturl.at/lkaf2]
بس من اشهرهم و اكثرهم استخداما مكتبة اسمها immer و دي هتكون موضوعنا البوستات الجاية

لو حابب تتعرف اكتر على فكرة ال mutability و ال immutability في حلقة بودكاست جميلة من عبدالرحمن عوض تقدر تسمعها من هنا: [https://shorturl.at/dmUFY]

و لو حابب تتعرف على immer بالتفصيل في كورس جميل على موقع egghead.io تقدر تشوفه من هنا: [https://shorturl.at/YwlB5]
