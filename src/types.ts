/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface SpatialScenario {
  title: string;
  description: string;
  image?: string;
}

export interface DesignStrategy {
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: string;
  heroImage: string;
  backgroundIssue: string;
  backgroundAnalysis: string;
  conceptIdea: string;
  conceptKeywords: string[];
  scenarios: SpatialScenario[];
  programs: { zone: string; description: string }[];
  strategies: DesignStrategy[];
  visuals: string[];
  date: string;
  client?: string;
}

export interface ArchiveItem {
  id: string;
  title: string;
  description: string;
  image: string;
  type: 'sketch' | 'process' | 'idea';
}
