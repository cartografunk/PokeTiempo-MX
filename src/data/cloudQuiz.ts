export const letters = ['A', 'B', 'C', 'D', 'E'] as const
export type Letter = typeof letters[number]

export const questions = [
  {
    "prompt": "Tienes un día libre inesperado. ¿Qué haces?",
    "answers": [
      "Me quedo en casa, veo algo y disfruto de la tranquilidad",
      "Salgo a explorar aunque no tenga un plan definido",
      "Organizo algo con amigos",
      "Aprovecho para hacer pendientes y sentir que hice algo productivo",
      "Depende del clima. Si está horrible, ni salgo"
    ]
  },
  {
    "prompt": "¿Cómo reaccionas ante un problema?",
    "answers": [
      "Me tomo mi tiempo para procesarlo",
      "Actúo rápido y después veo qué pasa",
      "Busco ayuda y lo hablo con alguien",
      "Analizo todas las posibilidades para resolverlo inmediatamente",
      "Me estreso, pero eventualmente encuentro cómo resolverlo"
    ]
  },
  {
    "prompt": "¿Cuál de estas frases te representa más?",
    "answers": [
      "\"Todo pasa eventualmente.\"",
      "\"¿Y si simplemente lo hacemos?\"",
      "\"Primero hay que hablarlo.\"",
      "\"Necesito entender exactamente qué está pasando.\"",
      "\"Algo me dice que esto va a terminar mal...\""
    ]
  },
  {
    "prompt": "En un grupo de amigos normalmente eres...",
    "answers": [
      "El tranquilo que observa",
      "El que propone las ideas locas",
      "El que mantiene unido al grupo",
      "El que termina organizando todo",
      "El que detecta inmediatamente cuando algo está raro"
    ]
  },
  {
    "prompt": "¿Qué tipo de clima te resulta más atractivo?",
    "answers": [
      "Cielo completamente despejado",
      "Nubes enormes de tormenta eléctrica",
      "Un cielo lleno de nubes suaves y bonitas",
      "Cielo gris, dramático y uniforme",
      "Cielo cambiante: sol, nubes, lluvia, todo en un mismo día"
    ]
  },
  {
    "prompt": "Si alguien te contradice...",
    "answers": [
      "Lo escucho; quizá tenga razón",
      "Le respondo inmediatamente",
      "Intento entender por qué piensa así",
      "Le presento argumentos y datos",
      "Depende de quién sea y de qué esté hablando"
    ]
  },
  {
    "prompt": "¿Qué te atrae más de una persona?",
    "answers": [
      "Su tranquilidad",
      "Su energía y espontaneidad",
      "Que sea cariñosa y empática",
      "Que sea inteligente e interesante",
      "Que tenga algo misterioso por explorar"
    ]
  },
  {
    "prompt": "¿Cuál sería tu mayor defecto?",
    "answers": [
      "Puedo parecer distante",
      "Soy impulsivx",
      "Me tomo demasiado a pecho las cosas",
      "Sobreanalizo absolutamente todo",
      "Mi estado de ánimo puede cambiar bastante"
    ]
  },
  {
    "prompt": "¿Cómo sería tu personalidad en una tormenta?",
    "answers": [
      "Estoy viendo la tormenta desde mi ventana tranquilamente",
      "“¡QUIERO VER EL RAYO!”",
      "Estoy preocupándome por todos",
      "Estoy analizando la estructura de la tormenta",
      "Estoy pensando: \"Esto se ve sospechosamente intenso...\""
    ]
  },
  {
    "prompt": "Elige una estética:",
    "answers": [
      "Minimalista, limpia y luminosa",
      "Dramática, eléctrica y caótica",
      "Suave, romántica y acogedora",
      "Intelectual, elegante y un poco seria",
      "Misteriosa, oscura y cinematográfica"
    ]
  }
]

export const results = [
  {
    "key": "A",
    "name": "CIRRUS",
    "tag": "La persona independiente",
    "description": "Eres observador/a, tranquilo/a y probablemente disfrutas bastante de tu propio espacio. No necesitas estar constantemente rodeado de gente.",
    "strength": "independencia y perspectiva",
    "challenge": "puedes aislarte demasiado",
    "quote": "\"Estoy bien, pero necesito mi espacio.\""
  },
  {
    "key": "B",
    "name": "CUMULONIMBUS",
    "tag": "La persona intensa",
    "description": "Tienes energía, iniciativa y una personalidad difícil de ignorar. Puedes pasar de estar tranquilísimo/a a estar haciendo algo completamente inesperado.\r\nComo un cumulonimbus: mucha energía concentrada que puede convertirse en algo enorme.",
    "strength": "determinación y capacidad de acción",
    "challenge": "impulsividad",
    "quote": "\"No sé qué va a pasar, pero va a pasar algo.\""
  },
  {
    "key": "C",
    "name": "CUMULUS",
    "tag": "La persona cálida",
    "description": "Probablemente eres alguien sociable, accesible y que hace sentir cómodos a los demás. Te gusta disfrutar de las cosas sencillas y crear buenos momentos",
    "strength": "empatía y facilidad para conectar",
    "challenge": "puedes preocuparte demasiado por los demás",
    "quote": "\"¿Y si hacemos algo juntos?\""
  },
  {
    "key": "D",
    "name": "STRATUS",
    "tag": "La persona analítica",
    "description": "Observas antes de actuar. Te gusta entender cómo funcionan las cosas y probablemente tienes una tendencia importante a sobreanalizar\r\nNo eres necesariamente frío/a: simplemente procesas mucho antes de reaccionar",
    "strength": "análisis y estabilidad",
    "challenge": "pensar demasiado",
    "quote": "\"Espera, necesito analizar esto.\""
  },
  {
    "key": "E",
    "name": "ALTOCUMULUS",
    "tag": "La persona impredecible",
    "description": "Tienes una personalidad cambiante, curiosa y difícil de encasillar. Puedes ser extremadamente tranquila/o un día y completamente intensa/o al siguiente\r\nTe aburren las personalidades demasiado predecibles",
    "strength": "adaptabilidad y curiosidad",
    "challenge": "cambios de ánimo o indecisión",
    "quote": "\"Depende.\""
  }
]

export const combinations = [
  {
    "keys": [
      "A",
      "B"
    ],
    "description": "intensidad por dentro, tranquilidad por fuera"
  },
  {
    "keys": [
      "C",
      "D"
    ],
    "description": "sociable pero muy analítico/a"
  },
  {
    "keys": [
      "A",
      "E"
    ],
    "description": "independiente, pero impredecible"
  },
  {
    "keys": [
      "B",
      "E"
    ],
    "description": "caos meteorológico al extremo"
  },
  {
    "keys": [
      "B",
      "C"
    ],
    "description": "la persona que organiza la fiesta y después provoca la tormenta"
  },
  {
    "keys": [
      "A",
      "C"
    ],
    "description": "Debes reponer tu batería social después de un evento social que organizaste o te invitaron"
  },
  {
    "keys": [
      "A",
      "D"
    ],
    "description": "Analítico y solitario"
  },
  {
    "keys": [
      "B",
      "D"
    ],
    "description": "El alma de la fiesta pero con gran sentido de responsabilidad en los momentos necesarios"
  },
  {
    "keys": [
      "C",
      "E"
    ],
    "description": "Malacopeas en la fiesta y luego te vas sin que nadie sepa tu paradero"
  },
  {
    "keys": [
      "D",
      "E"
    ],
    "description": "Impredecible, sólo tú te entiendes y te funciona"
  }
]

export function scoreQuiz(answers: Letter[]) {
  if (answers.length !== questions.length) throw new Error('Responde las diez preguntas.')
  const tally = Object.fromEntries(letters.map(letter => [letter, 0])) as Record<Letter, number>
  for (const answer of answers) {
    if (!letters.includes(answer)) throw new Error('Respuesta no válida.')
    tally[answer] += 1
  }
  const highest = Math.max(...Object.values(tally))
  const winners = letters.filter(letter => tally[letter] === highest)
  const bonus = combinations.filter(pair => pair.keys.every(key => winners.includes(key as Letter)))
  return { tally, winners, bonus }
}
