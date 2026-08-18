const GRAMMAR_TENSES = [
    {
        id: "present-simple",
        name: "Present Simple",
        translate: "Теперішній простий час",
        description: "Використовується для вираження регулярних, повторюваних дій, звичок, загальновідомих фактів або розкладів.",
        markers: ["always", "usually", "often", "sometimes", "never", "every day/week", "on Mondays"],
        formula: {
            plus: "I/You/We/They + V1<br>He/She/It + V1(-s/-es)",
            minus: "I/You/We/They + do not (don't) + V1<br>He/She/It + does not (doesn't) + V1",
            question: "Do + I/You/We/They + V1?<br>Does + He/She/It + V1?"
        },
        questions: [
            { text: "She usually ___ coffee in the morning.", options: ["drink", "drinks", "drinking", "drank"], answer: "drinks" },
            { text: "We ___ to the cinema every Sunday.", options: ["go", "goes", "going", "went"], answer: "go" },
            { text: "___ they live in London?", options: ["Do", "Does", "Are", "Is"], answer: "Do" },
            { text: "The sun ___ in the east.", options: ["rise", "rises", "rising", "rose"], answer: "rises" },
            { text: "He ___ not like playing tennis.", options: ["do", "does", "is", "has"], answer: "does" },
            { text: "I always ___ my car on Saturdays.", options: ["wash", "washes", "washing", "washed"], answer: "wash" }
        ]
    },
    {
        id: "present-continuous",
        name: "Present Continuous",
        translate: "Теперішній тривалий час",
        description: "Використовується для дій, які відбуваються прямо зараз, у момент мовлення, або для тимчасових ситуацій і запланованих подій у майбутньому.",
        markers: ["now", "right now", "at the moment", "currently", "Look!", "Listen!", "today"],
        formula: {
            plus: "I + am + V1(-ing)<br>He/She/It + is + V1(-ing)<br>We/You/They + are + V1(-ing)",
            minus: "am/is/are + not + V1(-ing)",
            question: "Am/Is/Are + Subject + V1(-ing)?"
        },
        questions: [
            { text: "Listen! The bird ___ a beautiful song.", options: ["sings", "is singing", "are singing", "sing"], answer: "is singing" },
            { text: "I ___ my homework right now.", options: ["do", "am doing", "is doing", "are doing"], answer: "am doing" },
            { text: "They ___ not watching TV at the moment.", options: ["do", "are", "is", "have"], answer: "are" },
            { text: "___ she working today?", options: ["Is", "Does", "Do", "Has"], answer: "Is" },
            { text: "We ___ meeting our friends tonight.", options: ["are", "do", "will", "is"], answer: "are" },
            { text: "Look! The bus ___.", options: ["comes", "is coming", "are coming", "come"], answer: "is coming" }
        ]
    },
    {
        id: "present-perfect",
        name: "Present Perfect",
        translate: "Теперішній завершений час",
        description: "Використовується для дії, яка відбулася в минулому, але має результат у теперішньому часі або життєвого досвіду (без вказівки точного часу в минулому).",
        markers: ["already", "just", "yet", "ever", "never", "lately", "recently", "since", "for"],
        formula: {
            plus: "I/You/We/They + have + V3(-ed)<br>He/She/It + has + V3(-ed)",
            minus: "have/has + not + V3(-ed)",
            question: "Have/Has + Subject + V3(-ed)?"
        },
        questions: [
            { text: "I ___ already finished my project.", options: ["have", "has", "did", "am"], answer: "have" },
            { text: "She ___ just left the building.", options: ["have", "has", "did", "is"], answer: "has" },
            { text: "___ you ever been to Paris?", options: ["Have", "Has", "Did", "Do"], answer: "Have" },
            { text: "They haven't seen this movie ___.", options: ["already", "just", "yet", "ever"], answer: "yet" },
            { text: "He has lived here ___ 5 years.", options: ["since", "for", "from", "in"], answer: "for" },
            { text: "We have ___ eaten sushi before.", options: ["never", "ever", "yet", "lately"], answer: "never" }
        ]
    },
    {
        id: "present-perfect-continuous",
        name: "Present Perfect Continuous",
        translate: "Теперішній завершено-тривалий час",
        description: "Використовується для дії, яка почалася в минулому і триває дотепер, акцентуючи увагу на тривалості процесу.",
        markers: ["for", "since", "all day", "how long", "lately", "recently"],
        formula: {
            plus: "Subject + have/has + been + V1(-ing)",
            minus: "Subject + have/has + not + been + V1(-ing)",
            question: "Have/Has + Subject + been + V1(-ing)?"
        },
        questions: [
            { text: "I have been ___ for two hours.", options: ["read", "reading", "reads", "readed"], answer: "reading" },
            { text: "She ___ been waiting since 10 AM.", options: ["have", "has", "is", "was"], answer: "has" },
            { text: "How long have you ___ studying English?", options: ["be", "been", "being", "was"], answer: "been" },
            { text: "They haven't been ___ attention all day.", options: ["paying", "pay", "paid", "pays"], answer: "paying" },
            { text: "He has been working here ___ 2015.", options: ["since", "for", "in", "from"], answer: "since" },
            { text: "We have been playing tennis ___ three hours.", options: ["since", "for", "during", "in"], answer: "for" }
        ]
    },
    {
        id: "past-simple",
        name: "Past Simple",
        translate: "Минулий простий час",
        description: "Використовується для дій, які відбулися і завершилися в точно вказаний час у минулому.",
        markers: ["yesterday", "last week/month/year", "ago", "in 1999", "when"],
        formula: {
            plus: "Subject + V2(-ed)",
            minus: "Subject + did not (didn't) + V1",
            question: "Did + Subject + V1?"
        },
        questions: [
            { text: "I ___ my friend yesterday.", options: ["see", "saw", "seen", "seeing"], answer: "saw" },
            { text: "She ___ to London last year.", options: ["go", "went", "gone", "goes"], answer: "went" },
            { text: "Did they ___ the match?", options: ["win", "won", "wins", "winning"], answer: "win" },
            { text: "He ___ not buy a new car two weeks ago.", options: ["do", "does", "did", "have"], answer: "did" },
            { text: "We ___ a great movie last night.", options: ["watch", "watched", "watching", "watches"], answer: "watched" },
            { text: "Where did you ___ that beautiful dress?", options: ["buy", "bought", "buys", "buying"], answer: "buy" }
        ]
    },
    {
        id: "past-continuous",
        name: "Past Continuous",
        translate: "Минулий тривалий час",
        description: "Використовується для опису дії, яка тривала в певний момент у минулому, або для фонової дії, яку перервала інша коротка дія (Past Simple).",
        markers: ["at 5 o'clock yesterday", "when", "while", "all day yesterday"],
        formula: {
            plus: "I/He/She/It + was + V1(-ing)<br>We/You/They + were + V1(-ing)",
            minus: "was/were + not + V1(-ing)",
            question: "Was/Were + Subject + V1(-ing)?"
        },
        questions: [
            { text: "I ___ reading a book when the phone rang.", options: ["was", "were", "am", "have"], answer: "was" },
            { text: "They ___ playing football at 5 PM yesterday.", options: ["was", "were", "are", "have"], answer: "were" },
            { text: "While she was ___, he was sleeping.", options: ["cook", "cooked", "cooking", "cooks"], answer: "cooking" },
            { text: "___ you watching TV when I arrived?", options: ["Was", "Were", "Did", "Are"], answer: "Were" },
            { text: "He wasn't ___ attention to the teacher.", options: ["paying", "pay", "paid", "pays"], answer: "paying" },
            { text: "We were sleeping ___ the earthquake started.", options: ["while", "when", "since", "for"], answer: "when" }
        ]
    },
    {
        id: "past-perfect",
        name: "Past Perfect",
        translate: "Минулий завершений час",
        description: "Використовується для дії, яка відбулася і завершилася ДО іншої дії або моменту в минулому.",
        markers: ["by 5 o'clock", "by the time", "before", "after", "already", "just"],
        formula: {
            plus: "Subject + had + V3(-ed)",
            minus: "Subject + had not (hadn't) + V3(-ed)",
            question: "Had + Subject + V3(-ed)?"
        },
        questions: [
            { text: "When I arrived, the train ___ already left.", options: ["has", "have", "had", "was"], answer: "had" },
            { text: "She had ___ her homework before going out.", options: ["finish", "finished", "finishing", "finishes"], answer: "finished" },
            { text: "___ they eaten before the guests arrived?", options: ["Have", "Has", "Had", "Did"], answer: "Had" },
            { text: "I realized I had ___ my keys at home.", options: ["leave", "left", "leaving", "leaves"], answer: "left" },
            { text: "He was tired because he had ___ hard all day.", options: ["work", "worked", "working", "works"], answer: "worked" },
            { text: "By the time we got there, the movie had ___.", options: ["start", "started", "starting", "starts"], answer: "started" }
        ]
    },
    {
        id: "future-simple",
        name: "Future Simple",
        translate: "Майбутній простий час",
        description: "Використовується для спонтанних рішень, обіцянок, передбачень або дій, які відбудуться в майбутньому.",
        markers: ["tomorrow", "next week/month/year", "in 2 days", "soon", "later", "probably"],
        formula: {
            plus: "Subject + will + V1",
            minus: "Subject + will not (won't) + V1",
            question: "Will + Subject + V1?"
        },
        questions: [
            { text: "I ___ call you tomorrow.", options: ["will", "am", "do", "have"], answer: "will" },
            { text: "She ___ not go to the party next week.", options: ["will", "does", "is", "has"], answer: "will" },
            { text: "___ they help us with the project?", options: ["Do", "Will", "Are", "Have"], answer: "Will" },
            { text: "It will probably ___ tomorrow.", options: ["rain", "rains", "rained", "raining"], answer: "rain" },
            { text: "We won't ___ a new car this year.", options: ["buy", "bought", "buying", "buys"], answer: "buy" },
            { text: "I think he ___ win the race.", options: ["is", "does", "will", "has"], answer: "will" }
        ]
    }
];
