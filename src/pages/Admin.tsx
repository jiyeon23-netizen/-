/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { usePortfolioStore } from '../store/useStore';
import { Trash2, Plus, LogOut, Lock } from 'lucide-react';
import { ADMIN_PASSWORD } from '../constants';
import { Project } from '../types';
import { SiteSettings } from '../store/useStore';

export default function Admin() {
  console.log('Admin component mounting...');
  const { projects, settings, updateProjects, updateSettings, isLoaded, user, login, logout } = usePortfolioStore();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'projects' | 'settings'>('projects');
  
  // Unified authorization check
  const isAuthorized = isAuthenticated || (user && user.email === 'jiyeon040223@gmail.com');

  // Settings Form State
  const [siteSettings, setSiteSettings] = useState(settings);

  useEffect(() => {
    if (isLoaded) {
      setSiteSettings(settings);
    }
  }, [isLoaded, settings]);
  
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const toBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, callback: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await toBase64(file);
        callback(base64);
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingProject) return;
    const files = Array.from(e.target.files || []);
    const base64s = await Promise.all(files.map((file: File) => toBase64(file)));
    setEditingProject({
      ...editingProject,
      visuals: [...(editingProject.visuals || []), ...base64s]
    });
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 올바르지 않습니다.');
    }
  };

  const saveSettings = () => {
    updateSettings(siteSettings);
    alert('설정이 저장되었습니다.');
  };

  const saveProject = () => {
    if (!editingProject) return;
    const newProjects = projects.map(p => p.id === editingProject.id ? editingProject : p);
    updateProjects(newProjects);
    setEditingProject(null);
    alert('프로젝트가 저장되었습니다.');
  };

  const createNewProject = () => {
    const id = `project-${Date.now()}`;
    const newProject: Project = {
      ...projects[0],
      id,
      title: 'New Project Name',
      shortDescription: 'Describe the essence of this space',
      backgroundIssue: 'Context of the problem...',
      backgroundAnalysis: 'Detailed research data...',
      conceptIdea: 'The core spatial metaphor...',
      conceptKeywords: ['Space', 'Human', 'Touch'],
      scenarios: [{ title: 'Intro', description: 'User arrives at...' }],
      programs: [{ zone: 'Entrance', description: 'Transition space' }],
      strategies: [{ title: 'Lighting', description: 'Indirect glow' }],
      category: 'INTERIOR',
      date: '2024',
      heroImage: projects[0].heroImage,
      visuals: []
    };
    updateProjects([newProject, ...projects]);
    setEditingProject(newProject);
  };

  if (!isAuthorized) {
    return (
      <div className="h-screen flex flex-col items-center justify-center px-4 bg-brand-gray space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-16 border border-brand-accent/10 w-full max-w-md text-center shadow-xl space-y-12"
        >
          <Lock size={40} className="mx-auto text-brand-accent" />
          <h1 className="text-3xl font-serif tracking-widest text-brand-accent">STUDIO ACCESS</h1>
          
          <button 
            onClick={async () => {
              try {
                await login();
              } catch (e) {
                alert('로그인 팝업을 열 수 없습니다. 브라우저의 팝업 차단 설정을 확인하거나 Firebase 콘솔에서 도메인이 승인되었는지 확인해주세요.');
              }
            }}
            className="w-full py-5 text-[10px] tracking-[0.5em] bg-black text-white hover:bg-brand-accent transition-all font-bold font-sans rounded-sm"
          >
            GOOGLE AUTHENTICATION
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-brand-accent/10"></div></div>
            <div className="relative flex justify-center text-[8px] uppercase tracking-[0.4em]"><span className="bg-white px-4 text-brand-text/40">OR USE PASSCODE</span></div>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <input 
              type="password"
              placeholder="ENTER PASSCODE"
              className="w-full bg-brand-gray border-b-2 border-brand-accent/20 py-4 text-center focus:border-brand-accent transition-all outline-none tracking-[0.8em] text-brand-accent font-bold"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="submit"
              className="w-full py-4 text-[10px] tracking-[0.5em] border border-brand-accent/20 text-brand-accent hover:bg-brand-accent hover:text-white transition-all font-bold"
            >
              GRANT PERMISSION
            </button>
          </form>
        </motion.div>
        
        <p className="text-[10px] font-bold text-brand-accent/40 tracking-widest uppercase">Authorized Access Only</p>
      </div>
    );
  }

  if (!isLoaded) return <div className="h-screen flex items-center justify-center font-bold text-brand-accent tracking-[0.4em]">01 // LOADING ENGINE</div>;

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-40 pb-20 px-8 min-h-screen max-w-7xl mx-auto"
    >
      <header className="flex justify-between items-end mb-24">
         <div className="space-y-4">
            <h1 className="text-7xl font-serif text-brand-accent">Curatorship</h1>
            <div className="flex flex-col space-y-2">
               <p className="text-[8px] font-bold tracking-widest text-brand-accent/40 uppercase">
                  {user ? `IDENTITY VERIFIED: ${user.email || 'SECURE'}` : 'LOCAL SESSION OVERRIDE'}
               </p>
               <div className="flex space-x-12">
                  <button onClick={() => setActiveTab('projects')} className={`text-[11px] font-bold tracking-[0.3em] transition-all border-b-2 ${activeTab === 'projects' ? 'text-brand-accent border-brand-accent' : 'text-brand-text/50 border-transparent'}`}>01 // PROJECTS</button>
                  <button onClick={() => setActiveTab('settings')} className={`text-[11px] font-bold tracking-[0.3em] transition-all border-b-2 ${activeTab === 'settings' ? 'text-brand-accent border-brand-accent' : 'text-brand-text/50 border-transparent'}`}>02 // SITE ASSETS</button>
               </div>
            </div>
         </div>
         <button 
            onClick={() => {
              setIsAuthenticated(false);
              logout();
            }} 
            className="flex items-center space-x-3 text-[10px] font-bold tracking-widest text-brand-text/50 hover:text-red-600 transition-colors"
         >
            <LogOut size={16} />
            <span>EXIT STUDIO</span>
         </button>
      </header>

      {activeTab === 'projects' ? (
        <div className="space-y-12">
           {!editingProject ? (
             <>
               <button 
                 onClick={createNewProject}
                 className="w-full bg-brand-accent text-white p-10 flex items-center justify-center space-x-6 hover:brightness-105 transition-all shadow-lg"
               >
                 <Plus size={24} />
                 <span className="text-[11px] font-bold tracking-[0.8em]">ARCHIVE NEW PROJECT</span>
               </button>

               <div className="grid grid-cols-1 gap-6">
                  {projects.map((p) => (
                    <div key={p.id} className="bg-white border border-brand-accent/5 p-10 flex justify-between items-center group hover:border-brand-accent/30 transition-all shadow-sm">
                       <div className="flex items-center space-x-12">
                          <img src={p.heroImage} className="w-24 h-24 object-cover rounded-sm grayscale group-hover:grayscale-0 transition-all" alt="" />
                          <div>
                            <h3 className="text-3xl font-serif mb-2 text-brand-text">{p.title}</h3>
                            <p className="text-[10px] text-brand-accent font-bold tracking-widest uppercase">{p.category} | {p.date}</p>
                          </div>
                       </div>
                       <div className="flex items-center space-x-8">
                          <button 
                            onClick={() => setEditingProject(p)}
                            className="px-6 py-2 border border-brand-accent/20 text-[10px] font-bold tracking-widest hover:bg-brand-accent hover:text-white transition-all uppercase"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => { if(confirm('Permanently delete?')) updateProjects(projects.filter(proj => proj.id !== p.id)); }}
                            className="text-brand-text/20 hover:text-red-500 transition-colors"
                          >
                             <Trash2 size={20} />
                          </button>
                       </div>
                    </div>
                  ))}
               </div>
             </>
           ) : (
             <div className="bg-white border border-brand-accent/10 p-16 space-y-12 shadow-2xl">
                <div className="flex justify-between items-center border-b border-brand-accent/10 pb-8 text-brand-text">
                   <h2 className="text-4xl font-serif">Editing Workspace</h2>
                   <div className="space-x-4">
                      <button onClick={() => setEditingProject(null)} className="text-[10px] tracking-widest font-bold text-brand-text/40 uppercase">Discard</button>
                      <button onClick={saveProject} className="bg-brand-accent text-white px-10 py-3 text-[10px] tracking-widest font-bold uppercase">Commit Changes</button>
                   </div>
                </div>
                
                <div className="grid md:grid-cols-2 gap-12">
                   <div className="space-y-6">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest">PROJECT TITLE</label>
                      <input 
                        className="w-full bg-brand-gray p-4 font-serif text-2xl outline-none border-b-2 border-brand-accent/10 focus:border-brand-accent transition-colors"
                        value={editingProject.title}
                        onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                      />
                   </div>
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <label className="text-[10px] font-bold text-brand-accent tracking-widest">CATEGORY</label>
                        <input 
                          className="w-full bg-brand-gray p-4 text-xs font-bold outline-none border-b-2 border-brand-accent/10 focus:border-brand-accent"
                          value={editingProject.category}
                          onChange={e => setEditingProject({...editingProject, category: e.target.value})}
                        />
                      </div>
                      <div className="space-y-6">
                        <label className="text-[10px] font-bold text-brand-accent tracking-widest">DATE (YEAR)</label>
                        <input 
                          className="w-full bg-brand-gray p-4 text-xs font-bold outline-none border-b-2 border-brand-accent/10 focus:border-brand-accent"
                          value={editingProject.date}
                          onChange={e => setEditingProject({...editingProject, date: e.target.value})}
                        />
                      </div>
                   </div>

                   <div className="space-y-6">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Hero Image</label>
                      <div className="space-y-4">
                        <input 
                          type="file"
                          accept="image/*"
                          className="w-full bg-brand-gray p-4 text-[10px] font-bold tracking-widest uppercase cursor-pointer"
                          onChange={e => handleFileUpload(e, (url) => setEditingProject({...editingProject, heroImage: url}))}
                        />
                        {editingProject.heroImage && (
                          <img src={editingProject.heroImage} alt="Hero" className="w-full h-32 object-cover border border-brand-accent/10" />
                        )}
                      </div>
                   </div>

                   <div className="space-y-6">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Short Description</label>
                      <textarea 
                        className="w-full bg-brand-gray p-4 text-sm font-light outline-none border-b-2 border-brand-accent/10 focus:border-brand-accent h-32"
                        value={editingProject.shortDescription}
                        onChange={e => setEditingProject({...editingProject, shortDescription: e.target.value})}
                      />
                   </div>

                   <div className="space-y-6">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Background Issue</label>
                      <textarea 
                        className="w-full bg-brand-gray p-4 text-sm font-light outline-none border-b-2 border-brand-accent/10 focus:border-brand-accent h-32"
                        value={editingProject.backgroundIssue}
                        onChange={e => setEditingProject({...editingProject, backgroundIssue: e.target.value})}
                      />
                   </div>

                   <div className="space-y-6">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Deep Analysis</label>
                      <textarea 
                        className="w-full bg-brand-gray p-4 text-sm font-light outline-none border-b-2 border-brand-accent/10 focus:border-brand-accent h-32"
                        value={editingProject.backgroundAnalysis}
                        onChange={e => setEditingProject({...editingProject, backgroundAnalysis: e.target.value})}
                      />
                   </div>

                   <div className="space-y-6">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Concept Idea</label>
                      <input 
                        className="w-full bg-brand-gray p-4 font-serif text-xl outline-none border-b-2 border-brand-accent/10 focus:border-brand-accent"
                        value={editingProject.conceptIdea}
                        onChange={e => setEditingProject({...editingProject, conceptIdea: e.target.value})}
                      />
                   </div>

                   <div className="space-y-6">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Concept Keywords (Comma Separated)</label>
                      <input 
                        className="w-full bg-brand-gray p-4 text-xs font-bold outline-none border-b-2 border-brand-accent/10 focus:border-brand-accent"
                        value={editingProject.conceptKeywords.join(', ')}
                        onChange={e => setEditingProject({...editingProject, conceptKeywords: e.target.value.split(',').map(s => s.trim())})}
                      />
                   </div>

                   <div className="md:col-span-2 space-y-8 border-t border-brand-accent/5 pt-12">
                      <h3 className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Scenarios (The Story Flow)</h3>
                      <div className="space-y-8">
                         {editingProject.scenarios.map((scenario, sIdx) => (
                           <div key={sIdx} className="bg-brand-gray/50 p-6 space-y-4">
                              <div className="flex justify-between items-center">
                                 <input 
                                   className="bg-transparent font-serif text-lg outline-none border-b border-brand-accent/20"
                                   value={scenario.title}
                                   onChange={e => {
                                     const newScenarios = [...editingProject.scenarios];
                                     newScenarios[sIdx].title = e.target.value;
                                     setEditingProject({...editingProject, scenarios: newScenarios});
                                   }}
                                 />
                                 <button onClick={() => {
                                   const newScenarios = editingProject.scenarios.filter((_, i) => i !== sIdx);
                                   setEditingProject({...editingProject, scenarios: newScenarios});
                                 }}><Trash2 size={16} /></button>
                              </div>
                              <textarea 
                                className="w-full bg-white p-3 text-xs font-light outline-none border border-brand-accent/5 h-24"
                                value={scenario.description}
                                onChange={e => {
                                  const newScenarios = [...editingProject.scenarios];
                                  newScenarios[sIdx].description = e.target.value;
                                  setEditingProject({...editingProject, scenarios: newScenarios});
                                }}
                              />
                           </div>
                         ))}
                         <button onClick={() => {
                           setEditingProject({
                             ...editingProject,
                             scenarios: [...editingProject.scenarios, { title: 'New Step', description: 'Step description...' }]
                           });
                         }} className="text-[10px] font-bold text-brand-accent">+ ADD SCENARIO STEP</button>
                      </div>
                   </div>

                   <div className="md:col-span-2 space-y-8 border-t border-brand-accent/5 pt-12">
                      <h3 className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Space Programs (Zones)</h3>
                      <div className="grid md:grid-cols-2 gap-8">
                         {editingProject.programs.map((prog, pIdx) => (
                           <div key={pIdx} className="bg-brand-gray/50 p-6 space-y-4">
                              <div className="flex justify-between items-center">
                                 <input 
                                   className="bg-transparent font-bold text-xs outline-none border-b border-brand-accent/20"
                                   value={prog.zone}
                                   onChange={e => {
                                     const newProgs = [...editingProject.programs];
                                     newProgs[pIdx].zone = e.target.value;
                                     setEditingProject({...editingProject, programs: newProgs});
                                   }}
                                 />
                                 <button onClick={() => {
                                   const newProgs = editingProject.programs.filter((_, i) => i !== pIdx);
                                   setEditingProject({...editingProject, programs: newProgs});
                                 }}><Trash2 size={16} /></button>
                              </div>
                              <textarea 
                                className="w-full bg-white p-3 text-[11px] font-light outline-none border border-brand-accent/5 h-16"
                                value={prog.description}
                                onChange={e => {
                                  const newProgs = [...editingProject.programs];
                                  newProgs[pIdx].description = e.target.value;
                                  setEditingProject({...editingProject, programs: newProgs});
                                }}
                              />
                           </div>
                         ))}
                         <button onClick={() => {
                           setEditingProject({
                             ...editingProject,
                             programs: [...editingProject.programs, { zone: 'NEW ZONE', description: 'Zone layout...' }]
                           });
                         }} className="text-[10px] font-bold text-brand-accent">+ ADD PROGRAM ZONE</button>
                      </div>
                   </div>

                   <div className="md:col-span-2 space-y-8 border-t border-brand-accent/5 pt-12">
                      <div className="flex justify-between items-center">
                         <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Project Gallery (Visuals)</label>
                         <label className="bg-brand-accent text-white px-6 py-2 text-[10px] font-bold tracking-widest cursor-pointer hover:brightness-110 transition-colors">
                            <span>ADD IMAGES</span>
                            <input type="file" multiple accept="image/*" className="hidden" onChange={handleGalleryUpload} />
                         </label>
                      </div>
                      
                      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                         {(editingProject.visuals || []).map((img, idx) => (
                           <div key={idx} className="relative aspect-square group bg-brand-gray">
                              <img src={img} className="w-full h-full object-cover grayscale" />
                              <button 
                                onClick={() => setEditingProject({
                                  ...editingProject,
                                  visuals: editingProject.visuals?.filter((_, i) => i !== idx)
                                })}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                {<Trash2 size={12} />}
                              </button>
                           </div>
                         ))}
                      </div>
                   </div>
                </div>
                <div className="p-8 bg-brand-accent/5 italic text-sm text-brand-accent/60">
                   * 다이어그램, 공간 시나리오, 배경 분석 등 상세 정리는 추후 고도화된 에디터에서 지원될 예정입니다.
                </div>
             </div>
           )}
        </div>
      ) : (
        <div className="space-y-20">
          <div className="mb-12">
             <h2 className="text-5xl font-serif text-brand-accent border-b border-brand-accent/10 pb-6 uppercase tracking-tighter">02 // SITE ASSETS</h2>
             <p className="text-xs text-brand-text/40 mt-4 leading-relaxed max-w-2xl">관리자 페이지에서 사이트의 모든 브랜드 아이덴티티, 텍스트 레이블, 그리고 핵심 비주얼 자산(이미지)을 한눈에 관리할 수 있습니다.</p>
          </div>

          {/* Global Site Assets */}
          <div className="bg-white border border-brand-accent/10 p-16 space-y-12 shadow-2xl">
             <h2 className="text-4xl font-serif text-brand-accent italic mb-12">사이트 기본 정부 (Global Identity)</h2>
             <div className="grid md:grid-cols-2 gap-12">
                <div className="space-y-4">
                   <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">사이트 메인 타이틀</label>
                   <input 
                     className="w-full bg-brand-gray p-4 font-serif text-2xl outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                     value={siteSettings.siteTitle}
                     onChange={e => setSiteSettings({...siteSettings, siteTitle: e.target.value})}
                   />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">사이트 서브타이틀 / 서브 브랜딩</label>
                   <input 
                     className="w-full bg-brand-gray p-4 font-light outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                     value={siteSettings.siteSubtitle}
                     onChange={e => setSiteSettings({...siteSettings, siteSubtitle: e.target.value})}
                   />
                </div>
                <div className="space-y-4">
                   <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">푸터 위치 정보</label>
                   <input 
                     className="w-full bg-brand-gray p-4 text-xs font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                     value={siteSettings.footerLocation}
                     onChange={e => setSiteSettings({...siteSettings, footerLocation: e.target.value})}
                   />
                </div>
                <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 border-t border-brand-accent/5">
                   {[
                     { label: '네비게이션: 홈', key: 'navHome' },
                     { label: '네비게이션: 정보', key: 'navAbout' },
                     { label: '네비게이션: 프로젝트', key: 'navProjects' },
                     { label: '네비게이션: 연락처', key: 'navContact' }
                   ].map(item => (
                     <div key={item.key} className="space-y-2">
                        <label className="text-[8px] font-bold text-brand-accent/60 tracking-widest uppercase">{item.label}</label>
                        <input 
                          className="w-full bg-brand-gray p-2 text-[10px] tracking-widest font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                          value={siteSettings[item.key as keyof SiteSettings] as string}
                          onChange={e => setSiteSettings({...siteSettings, [item.key]: e.target.value})}
                        />
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Page Headings */}
          <div className="bg-white border border-brand-accent/10 p-16 space-y-12 shadow-2xl">
             <h2 className="text-4xl font-serif text-brand-accent italic mb-12">페이지 헤딩 & 라벨</h2>
             <div className="grid md:grid-cols-2 gap-12">
                {[
                  { label: '소개 페이지 타이틀', key: 'aboutTitle' },
                  { label: '작품 리스트 페이지 타이틀', key: 'projectsTitle' },
                  { label: '작품 리스트 페이지 서브타이틀', key: 'projectsSubtitle' },
                  { label: '상세 보기 버튼 라벨', key: 'projectsLabelView' },
                  { label: '프로젝트 번호 접두사', key: 'projectsLabelNumber' },
                  { label: '연락처 페이지 타이틀', key: 'contactTitle' }
                ].map((item) => (
                  <div key={item.key} className="space-y-4">
                     <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">{item.label}</label>
                     <input 
                       className="w-full bg-brand-gray p-4 font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                       value={siteSettings[item.key as keyof SiteSettings] as string}
                       onChange={e => setSiteSettings({...siteSettings, [item.key]: e.target.value})}
                     />
                  </div>
                ))}
             </div>
          </div>

          {/* Visual Assets */}
          <div className="bg-white border border-brand-accent/10 p-16 space-y-16 shadow-2xl">
             <h2 className="text-4xl font-serif text-brand-accent italic mb-12">비주얼 자산 (이미지)</h2>
             <div className="grid md:grid-cols-2 gap-16">
                {[
                  { label: '홈 히어로 이미지', key: 'homeHeroImage' },
                  { label: '홈 철학 섹션 이미지', key: 'homePhilosophyImage' },
                  { label: '소개 프로필 이미지', key: 'aboutProfileImage' },
                  { label: '연락처 히어로 이미지', key: 'contactHeroImage' }
                ].map((item) => (
                  <div key={item.key} className="space-y-6">
                     <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">{item.label}</label>
                     <input 
                       type="file"
                       accept="image/*"
                       className="w-full bg-brand-gray p-4 text-[10px] font-bold tracking-widest uppercase cursor-pointer"
                       onChange={e => handleFileUpload(e, (url) => setSiteSettings({...siteSettings, [item.key]: url}))}
                     />
                     <div className="aspect-video bg-brand-gray border border-brand-accent/5 overflow-hidden grayscale">
                        <img src={siteSettings[item.key as keyof SiteSettings] as string} alt="Preview" className="w-full h-full object-cover" />
                     </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Contact Narrative */}
          <div className="bg-white border border-brand-accent/10 p-16 space-y-12 shadow-2xl">
             <h2 className="text-4xl font-serif text-brand-accent italic mb-12">연락처 및 인게이지먼트 (Contact Engagement)</h2>
             <div className="grid gap-12">
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Contact Intro (Multiline)</label>
                  <textarea 
                    className="w-full bg-brand-gray p-4 text-lg font-light outline-none border-b border-brand-accent/10 h-32 focus:border-brand-accent"
                    value={siteSettings.contactIntro}
                    onChange={e => setSiteSettings({...siteSettings, contactIntro: e.target.value})}
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-12 pt-8 border-t border-brand-accent/5">
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">연락처 이메일</label>
                      <input 
                        className="w-full bg-brand-gray p-4 text-xs font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                        value={siteSettings.contactEmail}
                        onChange={e => setSiteSettings({...siteSettings, contactEmail: e.target.value})}
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">인스타그램 핸들</label>
                      <input 
                        className="w-full bg-brand-gray p-4 text-xs font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                        value={siteSettings.contactInstagram}
                        onChange={e => setSiteSettings({...siteSettings, contactInstagram: e.target.value})}
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">포트폴리오 PDF 링크 / URL</label>
                      <input 
                        className="w-full bg-brand-gray p-4 text-xs font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                        value={siteSettings.contactPortfolioUrl}
                        onChange={e => setSiteSettings({...siteSettings, contactPortfolioUrl: e.target.value})}
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">포트폴리오 PDF 다운로드 라벨</label>
                      <input 
                        className="w-full bg-brand-gray p-4 text-xs font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                        value={siteSettings.contactLabelPortfolio}
                        onChange={e => setSiteSettings({...siteSettings, contactLabelPortfolio: e.target.value})}
                      />
                   </div>
                </div>
             </div>
          </div>

          {/* Project Detail Labels */}
          <div className="bg-white border border-brand-accent/10 p-16 space-y-12 shadow-2xl">
             <h2 className="text-4xl font-serif text-brand-accent italic mb-12">프로젝트 상세 페이지 라벨</h2>
             <div className="grid md:grid-cols-2 gap-12">
                {[
                  { label: '뒤로가기 버튼 텍스트', key: 'projectLabelBack' },
                  { label: '배경 문맥 라벨', key: 'projectLabelContext' },
                  { label: '심층 분석 라벨', key: 'projectLabelAnalysis' },
                  { label: '핵심 컨셉 라벨', key: 'projectLabelConcept' },
                  { label: '공간 시나리오 라벨', key: 'projectLabelScenario' },
                  { label: '공간 프로그램 라벨', key: 'projectLabelPrograms' },
                  { label: '디자인 전략 라벨', key: 'projectLabelStrategies' },
                  { label: '날짜 라벨', key: 'projectLabelDate' },
                  { label: '찾을 수 없음 라벨', key: 'projectLabelNotFound' },
                  { label: '단계/플로우 라벨', key: 'projectLabelStep' },
                  { label: '구역 라벨', key: 'projectLabelZone' }
                ].map((item) => (
                  <div key={item.key} className="space-y-4">
                     <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">{item.label}</label>
                     <input 
                       className="w-full bg-brand-gray p-4 font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                       value={siteSettings[item.key as keyof SiteSettings] as string}
                       onChange={e => setSiteSettings({...siteSettings, [item.key]: e.target.value})}
                     />
                  </div>
                ))}
             </div>
          </div>

          {/* Home Content */}
          <div className="bg-white border border-brand-accent/10 p-16 space-y-12 shadow-2xl">
             <h2 className="text-4xl font-serif text-brand-accent italic mb-12">홈페이지 내러티브 (Home Page Narrative)</h2>
             <div className="grid gap-12">
                <div className="grid md:grid-cols-2 gap-12 pb-12 border-b border-brand-accent/5">
                   <div className="space-y-4">
                     <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Scroll Hint Text</label>
                     <input 
                       className="w-full bg-brand-gray p-4 font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                       value={siteSettings.homeLabelScroll}
                       onChange={e => setSiteSettings({...siteSettings, homeLabelScroll: e.target.value})}
                     />
                   </div>
                   <div className="space-y-4">
                     <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">Works Section Title (Multiline \n)</label>
                     <textarea 
                       className="w-full bg-brand-gray p-4 font-bold outline-none border-b border-brand-accent/10 h-20 focus:border-brand-accent"
                       value={siteSettings.homeLabelWorks}
                       onChange={e => setSiteSettings({...siteSettings, homeLabelWorks: e.target.value})}
                     />
                   </div>
                   <div className="space-y-4">
                     <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">모든 프로젝트 탐색 라벨</label>
                     <input 
                       className="w-full bg-brand-gray p-4 font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                       value={siteSettings.homeLabelExplore}
                       onChange={e => setSiteSettings({...siteSettings, homeLabelExplore: e.target.value})}
                     />
                   </div>
                   <div className="space-y-4">
                     <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">상세 발견 라벨</label>
                     <input 
                       className="w-full bg-brand-gray p-4 font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                       value={siteSettings.homeLabelDiscover}
                       onChange={e => setSiteSettings({...siteSettings, homeLabelDiscover: e.target.value})}
                     />
                   </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">히어로 서브타이틀</label>
                  <input 
                    className="w-full bg-brand-gray p-4 font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                    value={siteSettings.homeHeroSubtitle}
                    onChange={e => setSiteSettings({...siteSettings, homeHeroSubtitle: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">히어로 메인 타이틀 (여러 줄 가능)</label>
                  <textarea 
                    className="w-full bg-brand-gray p-4 text-3xl font-bold outline-none border-b border-brand-accent/10 h-32 focus:border-brand-accent"
                    value={siteSettings.homeHeroTitle}
                    onChange={e => setSiteSettings({...siteSettings, homeHeroTitle: e.target.value})}
                  />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">인트로 본문 텍스트</label>
                  <textarea 
                    className="w-full bg-brand-gray p-4 text-lg font-light outline-none border-b border-brand-accent/10 h-32 focus:border-brand-accent"
                    value={siteSettings.homeIntroText}
                    onChange={e => setSiteSettings({...siteSettings, homeIntroText: e.target.value})}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-12 pt-8 border-t border-brand-accent/5">
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">철학 섹션 타이틀</label>
                      <input 
                        className="w-full bg-brand-gray p-4 font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                        value={siteSettings.homePhilosophyTitle}
                        onChange={e => setSiteSettings({...siteSettings, homePhilosophyTitle: e.target.value})}
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">철학 본문 텍스트</label>
                      <textarea 
                        className="w-full bg-brand-gray p-4 text-lg font-light outline-none border-b border-brand-accent/10 h-32 focus:border-brand-accent"
                        value={siteSettings.homePhilosophyText}
                        onChange={e => setSiteSettings({...siteSettings, homePhilosophyText: e.target.value})}
                      />
                   </div>
                </div>
             </div>
          </div>

          {/* About Content */}
          <div className="bg-white border border-brand-accent/10 p-16 space-y-12 shadow-2xl">
             <h2 className="text-4xl font-serif text-brand-accent italic mb-12">프로필 내러티브 및 정보 (Profile Narrative & Info)</h2>
             <div className="grid gap-12">
                <div className="grid md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">성명 (Full Name)</label>
                      <input 
                        className="w-full bg-brand-gray p-4 font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                        value={siteSettings.aboutName}
                        onChange={e => setSiteSettings({...siteSettings, aboutName: e.target.value})}
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">생년월일 (Birthdate)</label>
                      <input 
                        className="w-full bg-brand-gray p-4 font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                        value={siteSettings.aboutBirthdate}
                        onChange={e => setSiteSettings({...siteSettings, aboutBirthdate: e.target.value})}
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">전화번호 (Phone)</label>
                      <input 
                        className="w-full bg-brand-gray p-4 font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                        value={siteSettings.aboutPhone}
                        onChange={e => setSiteSettings({...siteSettings, aboutPhone: e.target.value})}
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">이메일 (Email)</label>
                      <input 
                        className="w-full bg-brand-gray p-4 font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                        value={siteSettings.aboutEmail}
                        onChange={e => setSiteSettings({...siteSettings, aboutEmail: e.target.value})}
                      />
                   </div>
                   <div className="space-y-4 md:col-span-2">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">핵심 키워드 (쉼표로 구분)</label>
                      <input 
                        className="w-full bg-brand-gray p-4 font-light outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                        value={siteSettings.aboutKeywords.join(', ')}
                        onChange={e => setSiteSettings({...siteSettings, aboutKeywords: e.target.value.split(',').map(s => s.trim())})}
                      />
                   </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">프로필 인트로 단락</label>
                  <textarea 
                    className="w-full bg-brand-gray p-4 text-lg font-light outline-none border-b border-brand-accent/10 h-32 focus:border-brand-accent"
                    value={siteSettings.aboutIntro}
                    onChange={e => setSiteSettings({...siteSettings, aboutIntro: e.target.value})}
                  />
                </div>

                <div className="pt-12 border-t border-brand-accent/5">
                   <h3 className="text-[10px] font-bold text-brand-accent tracking-widest uppercase mb-8">데이터 섹션 (학력, 수상내역 등)</h3>
                   <div className="space-y-16">
                      {siteSettings.aboutSections.map((section, sIdx) => (
                        <div key={sIdx} className="bg-brand-gray/50 p-8 border border-brand-accent/5 space-y-6">
                           <div className="flex justify-between items-center">
                              <input 
                                className="bg-transparent text-lg font-bold text-brand-accent outline-none border-b border-brand-accent/20 focus:border-brand-accent"
                                value={section.title}
                                onChange={e => {
                                  const newSections = [...siteSettings.aboutSections];
                                  newSections[sIdx].title = e.target.value;
                                  setSiteSettings({...siteSettings, aboutSections: newSections});
                                }}
                              />
                              <button onClick={() => {
                                const newSections = siteSettings.aboutSections.filter((_, i) => i !== sIdx);
                                setSiteSettings({...siteSettings, aboutSections: newSections});
                              }} className="text-red-500 hover:brightness-125">
                                <Trash2 size={16} />
                              </button>
                           </div>
                           <div className="space-y-4">
                              {section.items.map((item, iIdx) => (
                                <div key={iIdx} className="flex gap-4 items-center">
                                   <input 
                                     placeholder="Label"
                                     className="flex-1 bg-white p-3 text-xs outline-none border border-brand-accent/5"
                                     value={item.label}
                                     onChange={e => {
                                       const newSections = [...siteSettings.aboutSections];
                                       newSections[sIdx].items[iIdx].label = e.target.value;
                                       setSiteSettings({...siteSettings, aboutSections: newSections});
                                     }}
                                   />
                                   <input 
                                     placeholder="Value"
                                     className="flex-[2] bg-white p-3 text-xs outline-none border border-brand-accent/5"
                                     value={item.value}
                                     onChange={e => {
                                       const newSections = [...siteSettings.aboutSections];
                                       newSections[sIdx].items[iIdx].value = e.target.value;
                                       setSiteSettings({...siteSettings, aboutSections: newSections});
                                     }}
                                   />
                                   <button onClick={() => {
                                      const newSections = [...siteSettings.aboutSections];
                                      newSections[sIdx].items = newSections[sIdx].items.filter((_, i) => i !== iIdx);
                                      setSiteSettings({...siteSettings, aboutSections: newSections});
                                   }} className="text-red-300 hover:text-red-500">
                                      <Trash2 size={14} />
                                   </button>
                                </div>
                              ))}
                              <button onClick={() => {
                                 const newSections = [...siteSettings.aboutSections];
                                 newSections[sIdx].items.push({ label: '', value: '' });
                                 setSiteSettings({...siteSettings, aboutSections: newSections});
                              }} className="text-[10px] font-bold text-brand-accent/60 hover:text-brand-accent">+ ADD ITEM</button>
                           </div>
                        </div>
                      ))}
                      <button onClick={() => {
                        setSiteSettings({
                          ...siteSettings, 
                          aboutSections: [...siteSettings.aboutSections, { title: 'NEW SECTION', items: [{ label: '', value: '' }] }]
                        });
                      }} className="w-full py-4 border border-dashed border-brand-accent/20 text-[10px] font-bold tracking-widest text-brand-accent hover:bg-brand-accent/5">+ ADD DATA SECTION</button>
                   </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 pt-12 border-t border-brand-accent/5">
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">대표 성명 타이틀 (Statement Title)</label>
                      <input 
                        className="w-full bg-brand-gray p-4 font-bold outline-none border-b border-brand-accent/10 focus:border-brand-accent"
                        value={siteSettings.aboutStatementTitle}
                        onChange={e => setSiteSettings({...siteSettings, aboutStatementTitle: e.target.value})}
                      />
                   </div>
                   <div className="space-y-4">
                      <label className="text-[10px] font-bold text-brand-accent tracking-widest uppercase">대표 성명 본문 (Statement Text)</label>
                      <textarea 
                        className="w-full bg-brand-gray p-4 text-lg font-light outline-none border-b border-brand-accent/10 h-32 focus:border-brand-accent"
                        value={siteSettings.aboutStatementText}
                        onChange={e => setSiteSettings({...siteSettings, aboutStatementText: e.target.value})}
                      />
                   </div>
                </div>
             </div>
          </div>

          <div className="flex justify-end p-8">
            <button 
              onClick={saveSettings}
              className="bg-brand-accent text-white px-20 py-6 text-sm font-bold tracking-[0.6em] hover:scale-105 transition-all shadow-2xl"
            >
              사이트 업데이트 배포 (DEPLOY SITE UPDATES)
            </button>
          </div>
        </div>
      )}
    </motion.main>
  );
}
