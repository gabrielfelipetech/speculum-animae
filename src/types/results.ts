// src/types/results.ts

export type AccessLevel = 'free' | 'premium';
export type ResultBlockUi = {
  variant?: 'text' | 'list' | 'twoColumnCards';
  icon?: 'check' | 'warning' | 'energy' | 'guide' | 'neutral';
  group?: string;
  column?: 1 | 2;
};

export type ResultPoint = {
  label: string;
  description: string;
};

export type ResultSection = {
  title: string;
  bullets: string[];
};
export type ResultBlockContent =
  | { kind: 'bullets'; bullets: string[] } 
  | { kind: 'sections'; sections: ResultSection[] }
  | { kind: 'points'; points: ResultPoint[] };
export type ResultBlock = {
  id: string;
  title?: string;
  body: string;
  access: AccessLevel;
  content?: ResultBlockContent;
  ui?: ResultBlockUi;
};
export type GraphPoint = {
  label: string;
  value: number; 
};

/* ---------- 12 Camadas ---------- */

export interface LayerScore {
  groupId: string;
  name: string;
  average: number;
}

export interface TwelveLayersReport {
  kind: 'twelveLayers';
  sessionId: string;
  overall: {
    title: string;
    subtitle: string;
    blocks: ResultBlock[];
  };
  traits: {
    graph: GraphPoint[];
    blocks: ResultBlock[];
  };
  career: { blocks: ResultBlock[] };
  growth: { blocks: ResultBlock[] };
  relationships: { blocks: ResultBlock[] };
}

/* ---------- Temperamentos ---------- */

export interface TemperamentScore {
  groupId: string;
  name: string;
  average: number;
}

export interface TemperamentReport {
  kind: 'temperaments';
  sessionId: string;
  temperament: {
    primary: TemperamentScore;
    secondary?: TemperamentScore;
  };
  overall: {
    title: string;
    subtitle: string;
    blocks: ResultBlock[];
  };
  traits: { blocks: ResultBlock[] };
  career: { blocks: ResultBlock[] };
  growth: { blocks: ResultBlock[] };
  relationships: { blocks: ResultBlock[] };
}


export type AnyReport = TwelveLayersReport | TemperamentReport;
