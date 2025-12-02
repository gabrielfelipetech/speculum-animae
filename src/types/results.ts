// src/types/results.ts

export type AccessLevel = 'free' | 'premium';

export type ResultBlock = {
  id: string;
  title?: string;
  body: string;
  access: AccessLevel;
};

export type GraphPoint = {
  label: string;
  value: number; // 1–7 em geral
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

/* ---------- União ---------- */

export type AnyReport = TwelveLayersReport | TemperamentReport;
