export const TYPE_COLORS: { [key: number]: string } = {
    1: "#A8A77A",   // normal
    2: "#C22E28",   // fighting
    3: "#A98FF3",   // flying
    4: "#A33EA1",   // poison
    5: "#E2BF65",   // ground
    6: "#B6A136",   // rock
    7: "#A6B91A",   // bug
    8: "#735797",   // ghost
    9: "#B7B7CE",   // steel
    10: "#EE8130",  // fire
    11: "#6390F0",  // water
    12: "#7AC74C",  // grass
    13: "#F7D02C",  // electric
    14: "#F95587",  // psychic
    15: "#96D9D6",  // ice
    16: "#6F35FC",  // dragon
    17: "#705746",  // dark
    18: "#D685AD",  // fairy
} as const;

export const TYPE_KO: { [key: string]: string } = {
    normal: "노말",
    fire: "불꽃",
    water: "물",
    grass: "풀",
    flying: "비행",
    fighting: "격투",
    poison: "독",
    electric: "전기",
    ground: "땅",
    rock: "바위",
    psychic: "에스퍼",
    ice: "얼음",
    bug: "벌레",
    ghost: "고스트",
    steel: "강철",
    dragon: "드래곤",
    dark: "악",
    fairy: "페어리",
} as const;

export const VERSION_KO: { [key: string]: string } = {
    red: "레드",
    blue: "블루",
    yellow: "옐로우",
    gold: "골드",
    silver: "실버",
    crystal: "크리스탈",
    ruby: "루비",
    sapphire: "사파이어",
    emerald: "에메랄드",
    firered: "파이어레드",
    leafgreen: "리프그린",
    diamond: "디아루가",
    pearl: "펄기아",
    platinum: "기라티나",
    heartgold: "하트골드",
    soulsilver: "소울실버",
    black: "블랙",
    white: "화이트",
    "black-2": "블랙 2",
    "white-2": "화이트 2",
    x: "X",
    y: "Y",
    "omega-ruby": "오메가 루비",
    "alpha-sapphire": "알파 사파이어",
    sun: "썬",
    moon: "문",
    "ultra-sun": "울트라 썬",
    "ultra-moon": "울트라 문",
    "lets-go-pikachu": "렛츠고 피카쥬",
    "lets-go-eevee": "렛츠고 이브이",
    sword: "소드",
    shield: "실드",
} as const;

export const REGION_KO: { [key: string]: string } = {
    kanto: "관동",
    johto: "성도",
    hoenn: "호연",
    sinnoh: "신오",
    unova: "하나",
    kalos: "칼로스",
    alola: "알로라",
    galar: "가라르",
    paldea: "팔데아",
} as const;

export const REGION_NUM: { [key: string]: string } = {
    kanto: "1",
    johto: "2",
    hoenn: "3",
    sinnoh: "4",
    unova: "5",
    kalos: "6",
    alola: "7",
    galar: "8",
    paldea: "9",
} as const;