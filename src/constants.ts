/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, ArchiveItem } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'lush-skin-carwash',
    title: 'LUSH Skin Carwash',
    shortDescription: '향과 감각을 따라 이동하는 경험형 상업공간',
    longDescription: '단순한 세정을 넘어, 브랜드의 철학인 신선함과 감각의 전이를 공간의 시퀀스로 풀어낸 프로젝트입니다.',
    category: 'Commercial',
    heroImage: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=2000',
    backgroundIssue: '상업 공간의 획일화된 경험과 브랜드 가치의 단절',
    backgroundAnalysis: '사용자는 단순히 제품을 구매하는 것이 아니라, 브랜드가 추구하는 가치를 피부로 느끼길 원함',
    conceptIdea: 'The Flow of Scent: 감각의 침투',
    conceptKeywords: ['감각', '정화', '전이', '경험'],
    scenarios: [
      { title: '선택', description: '자신의 상태에 맞는 향을 선택하며 공간의 시작을 인지함' },
      { title: '진입', description: '향이 극대화된 좁은 통로를 통해 일상을 분리함' },
      { title: '세정', description: '촉각과 후각이 결합된 몰입형 세험' },
      { title: '정화', description: '은은한 조명과 소리가 결합된 휴식' },
      { title: '마무리', description: '잔향과 함께 일상으로 복귀' }
    ],
    programs: [
      { zone: 'Scent Bar', description: '향을 선택하는 스타트 포인트' },
      { zone: 'Tunnel of Transition', description: '전이의 통로' },
      { zone: 'Interactive Wash Basin', description: '반응형 세정 체험존' },
      { zone: 'Memory Lounge', description: '경험을 반추하는 라운지' }
    ],
    strategies: [
      { title: 'Flow (동선)', description: '곡선형 동선을 통해 시야의 변화를 유도' },
      { title: 'Light (빛)', description: '간접 조명을 활용한 명암의 대비' },
      { title: 'Material (재료)', description: '거친 돌과 매끄러운 금속의 대비' },
      { title: 'Sensory (감각)', description: '각 구역별 특화된 디퓨징 시스템' }
    ],
    visuals: [
      'https://images.unsplash.com/photo-1507652313519-d45101a05638?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200'
    ],
    date: '2024.03'
  },
  {
    id: 'urban-monastery',
    title: 'Urban Monastery',
    shortDescription: '도시의 소음 속에서 찾는 침묵의 공간',
    longDescription: '복잡한 도심 한복판, 최소한의 빛과 어둠만으로 구성된 명상 공간입니다.',
    category: 'Cultural',
    heroImage: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=2000',
    backgroundIssue: '현대인의 과도한 스트레스와 뇌 피로',
    backgroundAnalysis: '완전한 비움이 필요한 시기, 시각적 자극을 극도로 제한한 공간의 필요성',
    conceptIdea: 'Void in Noise: 소음 속의 공백',
    conceptKeywords: ['침묵', '비움', '빛', '명상'],
    scenarios: [
      { title: '해방', description: '소지품을 맡기고 모든 전자 기기로부터 멀어짐' },
      { title: '심해', description: '어두운 계단을 내려가며 청각을 예민하게 함' },
      { title: '공백', description: '단 하나의 빛줄기가 있는 중앙 홀에서의 명상' }
    ],
    programs: [
      { zone: 'Threshold', description: '일상과의 경계' },
      { zone: 'Meditation Hall', description: '중심 침묵 공간' },
      { zone: 'Tea Room', description: '다시 일상으로 연결되는 다실' }
    ],
    strategies: [
      { title: 'Acoustic', description: '흡음재를 활용한 완전한 정적 구현' },
      { title: 'Minimalism', description: '장식을 배제하고 재료 본연의 질감 강조' }
    ],
    visuals: [
      'https://images.unsplash.com/photo-1518005020250-675f0f0fd1c2?auto=format&fit=crop&q=80&w=1200'
    ],
    date: '2023.11'
  }
];

export const INITIAL_ARCHIVE: ArchiveItem[] = [
  {
    id: 'a1',
    title: 'Flow Study Scatch',
    description: '공간의 흐름을 선으로 표현한 초기 컨셉 스케치',
    image: 'https://images.unsplash.com/photo-1544648397-72fc8f9d8706?auto=format&fit=crop&q=80&w=800',
    type: 'sketch'
  }
];

export const ADMIN_PASSWORD = '0223';
