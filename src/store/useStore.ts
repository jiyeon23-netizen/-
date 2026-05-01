/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Project, ArchiveItem } from '../types';
import { INITIAL_PROJECTS, INITIAL_ARCHIVE } from '../constants';
import { db, auth } from '../lib/firebase';
import { doc, getDoc, setDoc, collection, getDocs, writeBatch } from 'firebase/firestore';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, signOut, User } from 'firebase/auth';

const PROJECTS_KEY = 'portfolio_projects';
const ARCHIVE_KEY = 'portfolio_archive';
const SETTINGS_KEY = 'portfolio_settings';

export interface SiteSettings {
  siteTitle: string;
  siteSubtitle: string;
  
  homeHeroImage: string;
  homePhilosophyImage: string;
  aboutProfileImage: string;
  contactHeroImage: string;
  
  // Home Page Content
  homeHeroSubtitle: string;
  homeHeroTitle: string;
  homeIntroText: string;
  homePhilosophyTitle: string;
  homePhilosophyText: string;
  
  // About Page Content
  aboutName: string;
  aboutBirthdate: string;
  aboutPhone: string;
  aboutEmail: string;
  aboutIntro: string;
  aboutKeywords: string[];
  aboutSections: {
    title: string;
    items: { label: string; value: string }[];
  }[];
  aboutStatementTitle: string;
  aboutStatementText: string;

  // Contact Page Content
  contactIntro: string;
  contactEmail: string;
  contactInstagram: string;
  contactPortfolioUrl: string;

  // Footer Content
  footerLocation: string;

  // Project Detail Labels
  projectLabelBack: string;
  projectLabelContext: string;
  projectLabelAnalysis: string;
  projectLabelConcept: string;
  projectLabelScenario: string;
  projectLabelPrograms: string;
  projectLabelStrategies: string;
  projectLabelDate: string;

  // Page Labels
  aboutTitle: string;
  projectsTitle: string;
  projectsSubtitle: string;
  projectsLabelView: string;
  contactTitle: string;
  
  // Navigation Labels
  navHome: string;
  navAbout: string;
  navProjects: string;
  navContact: string;

  // Additional Labels
  homeLabelScroll: string;
  homeLabelWorks: string;
  homeLabelExplore: string;
  homeLabelDiscover: string;
  projectsLabelNumber: string;
  contactLabelPortfolio: string;
  projectLabelNotFound: string;
  projectLabelStep: string;
  projectLabelZone: string;
}

const DEFAULT_SETTINGS: SiteSettings = {
  siteTitle: '경험을 설계하다.',
  siteSubtitle: "Jiyeon's Portfolio",

  homeHeroImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000',
  homePhilosophyImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200',
  aboutProfileImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200',
  contactHeroImage: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200',
  
  homeHeroSubtitle: 'SPATIAL EXPERIENCE DESIGNER',
  homeHeroTitle: '공간에 경험을\n설계하다.',
  homeIntroText: '우리는 보이지 않는 사용자의 감정을 공간의 질서로 번안합니다.\n기능을 넘어서는 정서적 고도화, 그것이 우리는 지향점입니다.',
  homePhilosophyTitle: 'Spatial Philosophy',
  homePhilosophyText: '공간은 정지된 오브제가 아닌,\n사람의 시선이 흐르는 시간의 무대입니다.',
  
  aboutName: '김지연',
  aboutBirthdate: '1995.04.02',
  aboutPhone: '010-0000-0000',
  aboutEmail: 'jiyeon040223@gmail.com',
  aboutIntro: '공간과 인간 사이의 ‘정서적 교감’을 시퀀스로 설계하며,\n브랜드의 이야기를 물성으로 번안하는 작업을 합니다.',
  aboutKeywords: ['Experience', 'Flow', 'Sensation', 'Immersion', 'Narrative'],
  aboutSections: [
    {
      title: 'EDUCATION',
      items: [
        { label: 'Central Saint Martins', value: 'MA Spatial Design (Distinction), 2021' },
        { label: 'Hongik University', value: 'BA Interior Architecture & Design, 2018' },
      ]
    },
    {
      title: 'AWARDS',
      items: [
        { label: 'IF Design Award', value: 'Interior Architecture Winner, 2023' },
        { label: 'K-Design Award', value: 'Best of Category - Spatial Design, 2022' },
        { label: 'Spatial Narrative Prize', value: 'Innovation Award, 2021' }
      ]
    },
    {
      title: 'ACTIVITIES',
      items: [
        { label: 'Exhibition Design', value: 'SEOUL DESIGN WEEK Curator, 2023' },
        { label: 'Collaborative Lab', value: 'Nature & Human Interface Research, 2022' },
        { label: 'Guest Lecturer', value: 'Experience Architecture Seminar, 2024' }
      ]
    },
    {
      title: 'SKILLS',
      items: [
        { label: 'Architecture', value: 'Rhino v8, AutoCAD, Revit' },
        { label: 'Visualization', value: 'Enscape, V-Ray, Unreal Engine 5' },
        { label: 'Strategic', value: 'Space Strategy, Narrative Flow, Material Research' }
      ]
    }
  ],
  aboutStatementTitle: '"공간은 정지된 배경이 아니라, 흐르는 시간의 무대입니다."',
  aboutStatementText: '저는 매 프로젝트마다 새로운 시나리오를 작성합니다. 첫 발을 내딛는 순간부터 마지막 기억이 남는 지점까지, 감각의 레이어를 촘촘히 설계하여 잊지 못할 여정을 선물하고자 합니다.',

  contactIntro: '당신의 공간에 특별한 경험의 레이어를 입히고 싶다면, 언제든 메시지를 남겨주세요.',
  contactEmail: 'jiyeon040223@gmail.com',
  contactInstagram: '@spatial_experience_lab',
  contactPortfolioUrl: '#',
  footerLocation: 'TOKYO · SEOUL',

  projectLabelBack: 'BACK TO WORKS',
  projectLabelContext: 'The Context',
  projectLabelAnalysis: 'Deep Analysis',
  projectLabelConcept: 'Concept',
  projectLabelScenario: 'Spatial Scenario',
  projectLabelPrograms: 'Programmatic Layout',
  projectLabelStrategies: 'Design Strategies',
  projectLabelDate: 'PROJECT DATE',

  aboutTitle: 'Profile',
  projectsTitle: 'Works',
  projectsSubtitle: 'Experiences within sequences',
  projectsLabelView: 'VIEW DETAIL',
  contactTitle: 'Connect',

  navHome: 'HOME',
  navAbout: 'ABOUT',
  navProjects: 'PROJECTS',
  navContact: 'CONTACT',

  homeLabelScroll: 'Scroll to Explore',
  homeLabelWorks: 'Selected\nWorks',
  homeLabelExplore: 'EXPLORE ALL',
  homeLabelDiscover: 'DISCOVER MORE',
  projectsLabelNumber: 'PROJECT NO.',
  contactLabelPortfolio: 'DOWNLOAD PORTFOLIO (PDF)',
  projectLabelNotFound: 'Project not found',
  projectLabelStep: 'STEP',
  projectLabelZone: 'ZONE'
};

enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export function usePortfolioStore() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [archive, setArchive] = useState<ArchiveItem[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Re-load data when auth state changes to catch protected documents if any
      loadData();
    });
    return () => unsubscribe();
  }, []);

  const loadData = async () => {
    try {
      console.log('Fetching portfolio data from Firestore...');
      // 1. Try Firestore First
      const settingsDocRef = doc(db, 'settings', 'global');
      const settingsDoc = await getDoc(settingsDocRef).catch(e => {
        handleFirestoreError(e, OperationType.GET, 'settings/global');
        return null; // unreachable if handleFirestoreError throws
      });

      let firestoreSettings = null;
      if (settingsDoc && settingsDoc.exists()) {
        firestoreSettings = settingsDoc.data() as SiteSettings;
      }

      const projectsCollRef = collection(db, 'projects');
      const projectsSnap = await getDocs(projectsCollRef).catch(e => {
        handleFirestoreError(e, OperationType.LIST, 'projects');
        return null;
      });
      let firestoreProjects = projectsSnap ? projectsSnap.docs.map(d => d.data() as Project) : [];
      
      const archiveCollRef = collection(db, 'archive');
      const archiveSnap = await getDocs(archiveCollRef).catch(e => {
        handleFirestoreError(e, OperationType.LIST, 'archive');
        return null;
      });
      let firestoreArchive = archiveSnap ? archiveSnap.docs.map(d => d.data() as ArchiveItem) : [];

      // 2. Fallback to LocalStorage
      const storedProjects = localStorage.getItem(PROJECTS_KEY);
      const storedArchive = localStorage.getItem(ARCHIVE_KEY);
      const storedSettings = localStorage.getItem(SETTINGS_KEY);

      if (firestoreSettings) {
        setSettings({ ...DEFAULT_SETTINGS, ...firestoreSettings });
        console.log('Loaded settings from Firestore');
      } else if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
        console.log('Loaded settings from LocalStorage');
      } else {
        setSettings(DEFAULT_SETTINGS);
      }

      if (firestoreProjects.length > 0) {
        setProjects(firestoreProjects.sort((a, b) => b.id.localeCompare(a.id)));
        console.log('Loaded projects from Firestore');
      } else if (storedProjects) {
        setProjects(JSON.parse(storedProjects));
        console.log('Loaded projects from LocalStorage');
      } else {
        setProjects(INITIAL_PROJECTS);
      }

      if (firestoreArchive.length > 0) {
        setArchive(firestoreArchive);
        console.log('Loaded archive from Firestore');
      } else if (storedArchive) {
        setArchive(JSON.parse(storedArchive));
        console.log('Loaded archive from LocalStorage');
      } else {
        setArchive(INITIAL_ARCHIVE);
      }

    } catch (error) {
      console.error('Failed to load portfolio data:', error);
      // Final fallback to defaults
      if (projects.length === 0) setProjects(INITIAL_PROJECTS);
      if (archive.length === 0) setArchive(INITIAL_ARCHIVE);
      // settings is initialized to DEFAULT_SETTINGS
    } finally {
      setIsLoaded(true);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateProjects = async (newProjects: Project[]) => {
    setProjects(newProjects);
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(newProjects));
    
    if (auth.currentUser) {
      try {
        const batch = writeBatch(db);
        newProjects.forEach(p => {
          batch.set(doc(db, 'projects', p.id), p);
        });
        await batch.commit();
      } catch (error) {
        console.error('Firestore project update failed:', error);
      }
    }
  };

  const updateArchive = async (newArchive: ArchiveItem[]) => {
    setArchive(newArchive);
    localStorage.setItem(ARCHIVE_KEY, JSON.stringify(newArchive));

    if (auth.currentUser) {
      try {
        const batch = writeBatch(db);
        newArchive.forEach(a => {
          batch.set(doc(db, 'archive', a.id), a);
        });
        await batch.commit();
      } catch (error) {
        console.error('Firestore archive update failed:', error);
      }
    }
  };

  const updateSettings = async (newSettings: SiteSettings) => {
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    
    if (auth.currentUser) {
      try {
        await setDoc(doc(db, 'settings', 'global'), newSettings);
      } catch (error) {
        console.error('Firestore settings update failed:', error);
      }
    }
  };

  const login = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return { 
    projects, 
    archive, 
    settings, 
    updateProjects, 
    updateArchive, 
    updateSettings, 
    isLoaded,
    user,
    login,
    logout
  };
}
