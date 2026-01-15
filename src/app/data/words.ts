export interface Word {
  syllables: string[];
  full: string;
  imageQuery: string;
}

export const LEARNING_WORDS: Word[] = [
  // Очень простые слова (1-2 слога)
  { syllables: ["ма", "ма"], full: "мама", imageQuery: "mother child" },
  { syllables: ["па", "па"], full: "папа", imageQuery: "father child" },
  { syllables: ["кот"], full: "кот", imageQuery: "cute cat" },
  { syllables: ["со", "ба", "ка"], full: "собака", imageQuery: "happy dog" },
  { syllables: ["ры", "ба"], full: "рыба", imageQuery: "colorful fish" },
  { syllables: ["дом"], full: "дом", imageQuery: "house home" },
  { syllables: ["де", "ре", "во"], full: "дерево", imageQuery: "tree nature" },
  { syllables: ["цве", "ток"], full: "цветок", imageQuery: "flower bloom" },
  { syllables: ["солн", "це"], full: "солнце", imageQuery: "sun sunny" },
  { syllables: ["ма", "ши", "на"], full: "машина", imageQuery: "toy car" },
  { syllables: ["кни", "га"], full: "книга", imageQuery: "children book" },
  { syllables: ["яб", "ло", "ко"], full: "яблоко", imageQuery: "red apple" },
  { syllables: ["мяч"], full: "мяч", imageQuery: "ball play" },
  { syllables: ["ли", "са"], full: "лиса", imageQuery: "fox animal" },
  { syllables: ["за", "яц"], full: "заяц", imageQuery: "rabbit bunny" },
  
  // Простые слова (2 слога)
  { syllables: ["пти", "ца"], full: "птица", imageQuery: "bird" },
  { syllables: ["ве", "тер"], full: "ветер", imageQuery: "wind" },
  { syllables: ["зи", "ма"], full: "зима", imageQuery: "winter snow" },
  { syllables: ["ле", "то"], full: "лето", imageQuery: "summer sun" },
  { syllables: ["о", "сень"], full: "осень", imageQuery: "autumn leaves" },
  { syllables: ["вес", "на"], full: "весна", imageQuery: "spring flowers" },
  { syllables: ["ут", "ро"], full: "утро", imageQuery: "morning sunrise" },
  { syllables: ["ве", "чер"], full: "вечер", imageQuery: "evening sunset" },
  { syllables: ["ночь"], full: "ночь", imageQuery: "night stars" },
  { syllables: ["хлеб"], full: "хлеб", imageQuery: "bread" },
  { syllables: ["суп"], full: "суп", imageQuery: "soup" },
  { syllables: ["сок"], full: "сок", imageQuery: "juice glass" },
  { syllables: ["чай"], full: "чай", imageQuery: "tea cup" },
  { syllables: ["торт"], full: "торт", imageQuery: "cake birthday" },
  { syllables: ["мёд"], full: "мёд", imageQuery: "honey" },

  // Средней сложности (3 слога)
  { syllables: ["ко", "ро", "ва"], full: "корова", imageQuery: "cow" },
  { syllables: ["ло", "шадь"], full: "лошадь", imageQuery: "horse" },
  { syllables: ["ба", "боч", "ка"], full: "бабочка", imageQuery: "butterfly" },
  { syllables: ["ба", "нан"], full: "банан", imageQuery: "banana" },
  { syllables: ["а", "пель", "син"], full: "апельсин", imageQuery: "orange fruit" },
  { syllables: ["ли", "мон"], full: "лимон", imageQuery: "lemon" },
  { syllables: ["мор", "ковь"], full: "морковь", imageQuery: "carrot" },
  { syllables: ["мед", "ведь"], full: "медведь", imageQuery: "bear" },
  { syllables: ["бел", "ка"], full: "белка", imageQuery: "squirrel" },
  { syllables: ["ё", "жик"], full: "ёжик", imageQuery: "hedgehog" },

  // Сложные слова
  { syllables: ["те", "ле", "фон"], full: "телефон", imageQuery: "phone" },
  { syllables: ["ве", "ло", "си", "пед"], full: "велосипед", imageQuery: "bicycle" },
  { syllables: ["са", "мо", "лёт"], full: "самолёт", imageQuery: "airplane" },
  { syllables: ["вер", "то", "лёт"], full: "вертолёт", imageQuery: "helicopter" },
  { syllables: ["па", "ро", "ход"], full: "пароход", imageQuery: "ship" },
  { syllables: ["врач"], full: "врач", imageQuery: "doctor" },
  { syllables: ["у", "чи", "тель"], full: "учитель", imageQuery: "teacher" },
  { syllables: ["ра", "ду", "га"], full: "радуга", imageQuery: "rainbow" },
  { syllables: ["звез", "да"], full: "звезда", imageQuery: "star night" },
  { syllables: ["шко", "ла"], full: "школа", imageQuery: "school" },
];