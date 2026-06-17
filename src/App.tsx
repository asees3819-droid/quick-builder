import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Code, 
  Eye, 
  Download, 
  Laptop, 
  Tablet, 
  Smartphone, 
  RefreshCw, 
  Copy, 
  Check, 
  Trash2, 
  Bookmark, 
  BookmarkCheck, 
  History, 
  Layers, 
  SlidersHorizontal,
  ChevronRight, 
  Info, 
  ExternalLink, 
  FileCode,
  Sparkle,
  Undo2,
  FolderDot
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { defaultTemplate } from "./templates";
import { SavedProject } from "./types";

const PRESET_IDEAS = [
  {
    label: "📸 Photographer Portfolio",
    prompt: "A modern photographer portfolio. Minimalist look with a full-screen ambient hero, a responsive photo gallery with interactive lightboxes or tabs (nature, portraits, commercial), an About section, and a styled booking inquiry form."
  },
  {
    label: "☕ Bakery & Coffee Corner",
    prompt: "An artisanal bakery and specialty coffee shop landing page. Cozy warm styling (amber/slate colors), showcasing daily menus with interactive filter tabs, a story section, custom booking for workshops, and custom testimonial cards."
  },
  {
    label: "🚀 SaaS Analytics Venture",
    prompt: "A cutting-edge SaaS platform landing page for cloud analytics. Futuristic slate colors with sky-blue accents, showing a value-proposition hero, static visual metrics grid, feature list with vector-style badges, interactive pricing cards, and a newsletter sign-up."
  },
  {
    label: "🏋️ Personal Fitness Hub",
    prompt: "A personal training and fitness coaching landing page. Bold high-contrast energy style (accent orange), with a dynamic training section, trainer profile bio, a fully responsive calculator for daily calorie needs, and client success logs."
  },
  {
    label: "🍔 Bistro & Gourmet Burger",
    prompt: "A gourmet street burger bistro landing page. Bold dark aesthetic/red details, an elegant online digital menu showing categories with price listings, customer reviews, operational hours, and a mock reservation booking form."
  },
  {
    label: "🏠 Mountainside cabin rental",
    prompt: "An immersive vacation listing web page for a premium mountainside cabin. Cinematic nature hero, interactive lodging rules accordion, photo grid of the cabins, list of amenities, and an interactive pricing total calculator based on standard selected nights."
  }
];

const REFINEMENT_PRESETS = [
  "Convert the entire page to a sophisticated dark slate aesthetic",
  "Add a beautiful 3-tier interactive pricing table",
  "Insert an interactive FAQ accordion section with plus/minus toggles",
  "Add a testimonials grid with customer avatars and star ratings",
  "Make the header stick to the top with a blur background effect",
  "Add a fully styled newsletter subscription modal or footer section"
];

const LOADING_STEPS = [
  "Initializing neural codegen engine...",
  "Structuring clean, semantic HTML5 tags...",
  "Injecting responsive Tailwind CSS design grids...",
  "Creating fluid, responsive CSS layouts...",
  "Assembling operational vanilla scripts for interactive elements...",
  "Selecting professional content layout hierarchies...",
  "Writing descriptive copy and matching Unsplash illustrations...",
  "Performing quality check and rendering final page output..."
];

export default function App() {
  // Main Code and Prompt State
  const [htmlCode, setHtmlCode] = useState<string>(defaultTemplate);
  const [prompt, setPrompt] = useState<string>("");
  const [refinementInput, setRefinementInput] = useState<string>("");
  const [refinements, setRefinements] = useState<string[]>([]);
  const [activeTab, setActiveTab3Column] = useState<"generate" | "saved">("generate");

  // UX State
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [loadingStepIdx, setLoadingStepIdx] = useState<number>(0);
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [viewportMode, setViewportMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [copied, setCopied] = useState<boolean>(false);
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Projects State
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
  const [projectNameInput, setProjectNameInput] = useState<string>("");
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);

  // Blob URL for Iframe
  const [blobUrl, setBlobUrl] = useState<string>("");

  // Load Saved Projects on start
  useEffect(() => {
    const localData = localStorage.getItem("ais_website_builder_projects");
    if (localData) {
      try {
        setSavedProjects(JSON.parse(localData));
      } catch (err) {
        console.error("Failed to parse saved projects:", err);
      }
    }
  }, []);

  // Update blob URL whenever HTML code changes
  useEffect(() => {
    if (!htmlCode) return;
    const blob = new Blob([htmlCode], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    setBlobUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [htmlCode]);

  // Loading animation step simulator
  useEffect(() => {
    let interval: any;
    if (isGenerating) {
      setLoadingStepIdx(0);
      interval = setInterval(() => {
        setLoadingStepIdx((prev) => {
          if (prev >= LOADING_STEPS.length - 1) {
            return prev; // Hold on last step until complete
          }
          return prev + 1;
        });
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Submit First Generation
  const handleGenerate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGenerationError(null);
    setRefinements([]); // Reset refinement list for new prompt

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to generate website code.");
      }

      const data = await res.json();
      setHtmlCode(data.html);
      setViewMode("preview");
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || "An unexpected error occurred during generation.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Submit Refinement Step
  const handleRefine = async (refinementText: string) => {
    const trimmed = refinementText.trim();
    if (!trimmed) return;

    setIsGenerating(true);
    setGenerationError(null);
    const updatedRefinements = [...refinements, trimmed];
    setRefinementInput("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: prompt || "Prepopulated digital studio sample", 
          refinements: updatedRefinements 
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to apply refinement instructions.");
      }

      const data = await res.json();
      setHtmlCode(data.html);
      setRefinements(updatedRefinements);
      setViewMode("preview");
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || "Failed to apply changes. Try a different request.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Delete last refinement step
  const handleUndoRefinement = async () => {
    if (refinements.length === 0) return;
    
    setIsGenerating(true);
    setGenerationError(null);
    const updatedRefinements = refinements.slice(0, refinements.length - 1);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          prompt: prompt || "Prepopulated digital studio sample", 
          refinements: updatedRefinements 
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to undo refinement.");
      }

      const data = await res.json();
      setHtmlCode(data.html);
      setRefinements(updatedRefinements);
      setViewMode("preview");
    } catch (err: any) {
      console.error(err);
      setGenerationError(err.message || "Failed to revert. Please try editing manually.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Copy HTML script code to clipboard
  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(htmlCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  // Download index.html directly
  const handleDownloadFile = () => {
    const blob = new Blob([htmlCode], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    
    // Choose a nice file name based on first prompt or project name
    let filename = "index.html";
    if (currentProjectId) {
      const proj = savedProjects.find(p => p.id === currentProjectId);
      if (proj) {
        filename = `${proj.name.toLowerCase().replace(/[^a-z0-9]/g, "_")}.html`;
      }
    } else if (prompt) {
      filename = `${prompt.substring(0, 15).toLowerCase().replace(/[^a-z0-9]/g, "_")}.html`;
    }
    
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Open Save Modal
  const requestSaveProject = () => {
    if (currentProjectId) {
      // Auto save existing project
      const updated = savedProjects.map(p => {
        if (p.id === currentProjectId) {
          return {
            ...p,
            html: htmlCode,
            refinements: refinements,
          };
        }
        return p;
      });
      setSavedProjects(updated);
      localStorage.setItem("ais_website_builder_projects", JSON.stringify(updated));
      alert("Project saved successfully!");
    } else {
      // Request name for new save
      let suggestName = prompt ? prompt.substring(0, 25) + " Site" : "Aura Craft Demo Site";
      setProjectNameInput(suggestName);
      setShowSaveModal(true);
    }
  };

  // Save Project Action
  const handleSaveProjectCommit = () => {
    const name = projectNameInput.trim() || "Untitled Modern Site";
    const newProject: SavedProject = {
      id: "proj_" + Date.now(),
      name,
      prompt: prompt || "Prepopulated default digital agency page",
      refinements,
      html: htmlCode,
      createdAt: new Date().toLocaleDateString(undefined, { 
        month: "short", 
        day: "numeric", 
        hour: "2-digit", 
        minute: "2-digit" 
      })
    };

    const updated = [newProject, ...savedProjects];
    setSavedProjects(updated);
    localStorage.setItem("ais_website_builder_projects", JSON.stringify(updated));
    setCurrentProjectId(newProject.id);
    setShowSaveModal(false);
  };

  // Load project from gallery list
  const handleLoadProject = (proj: SavedProject) => {
    setPrompt(proj.prompt);
    setRefinements(proj.refinements);
    setHtmlCode(proj.html);
    setCurrentProjectId(proj.id);
    setViewMode("preview");
  };

  // Delete project from list
  const handleDeleteProject = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this saved website creation?")) return;
    
    const updated = savedProjects.filter(p => p.id !== id);
    setSavedProjects(updated);
    localStorage.setItem("ais_website_builder_projects", JSON.stringify(updated));
    if (currentProjectId === id) {
      setCurrentProjectId(null);
    }
  };

  return (
    <div id="app-container" className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-white overflow-hidden">
      
      {/* Top Main Navigation Bar */}
      <header id="app-navbar" className="h-16 border-b border-slate-800 bg-slate-950 px-6 flex items-center justify-between shrink-0 relative z-10">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-md shadow-sky-500/10">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <span className="font-bold text-base tracking-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              AI Instant Website Builder
            </span>
            <span className="hidden md:inline px-2 py-0.5 ml-2.5 rounded text-[10px] bg-sky-500/10 border border-sky-500/20 text-sky-400 font-semibold uppercase tracking-wider">
              Codegen v3.5
            </span>
          </div>
        </div>

        {/* Top middle preset indicators */}
        <div className="hidden xl:flex items-center space-x-6 text-xs text-slate-400">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-medium text-slate-300">GPU Renderer Pipeline: Active</span>
          </div>
          <div className="border-l border-slate-800 h-4"></div>
          <p>Models: <strong className="text-slate-300">gemini-3.5-flash</strong></p>
        </div>

        {/* Action icons bar */}
        <div className="flex items-center space-x-3">
          <button 
            id="btn-bookmark-site"
            onClick={requestSaveProject}
            className="px-3 py-1.5 rounded-lg border border-slate-800 hover:border-slate-700 bg-slate-900/60 hover:bg-slate-900 text-xs font-semibold text-slate-200 transition-all flex items-center space-x-2 cursor-pointer"
          >
            {currentProjectId && savedProjects.some(p => p.id === currentProjectId) ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Saved to Library</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-slate-400" />
                <span>Save Project</span>
              </>
            )}
          </button>

          <button 
            id="btn-header-install"
            onClick={handleDownloadFile}
            className="px-4 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 font-bold text-xs text-slate-950 transition-all flex items-center space-x-1.5 shadow-md shadow-sky-500/15 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .HTML</span>
          </button>
        </div>
      </header>

      {/* Main split work dashboard container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* LEFT COLUMN: Controls & Input Console */}
        <aside id="builder-sidebar" className="w-full lg:w-[420px] bg-slate-950 border-r border-slate-800/80 flex flex-col shrink-0 overflow-y-auto">
          
          {/* Internal Sidebar Tab Swapping */}
          <div className="flex border-b border-slate-800">
            <button 
              onClick={() => setActiveTab3Column("generate")}
              className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase transition-colors relative flex items-center justify-center space-x-2 cursor-pointer ${activeTab === 'generate' ? 'text-sky-400 bg-slate-900/40' : 'text-slate-400 hover:text-white'}`}
            >
              <Sparkle className="w-3.5 h-3.5" />
              <span>Prompt Console</span>
              {activeTab === 'generate' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"></span>
              )}
            </button>
            <button 
              onClick={() => setActiveTab3Column("saved")}
              className={`flex-1 py-3 text-xs font-bold tracking-wider uppercase transition-colors relative flex items-center justify-center space-x-2 cursor-pointer ${activeTab === 'saved' ? 'text-sky-400 bg-slate-900/40' : 'text-slate-400 hover:text-white'}`}
            >
              <FolderDot className="w-3.5 h-3.5" />
              <span>Saved Sites ({savedProjects.length})</span>
              {activeTab === 'saved' && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-400"></span>
              )}
            </button>
          </div>

          <div className="flex-1 flex flex-col p-6 space-y-6 overflow-y-auto">

            {/* TAB 1: Prompt Generation Controls */}
            {activeTab === "generate" && (
              <>
                {/* Prompt entry zone */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                      <span>1. What are we building today?</span>
                    </label>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wide">Instant Code</span>
                  </div>
                  
                  <form onSubmit={handleGenerate} className="space-y-3">
                    <textarea 
                      id="prompt-textarea"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="Describe the website you want to build (e.g., 'A gorgeous rustic coffee shop landing page with pricing, contact coordinates, responsive menu grid and amber warm palette...')"
                      rows={5}
                      className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-3.5 text-sm font-sans focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500/20 text-slate-100 placeholder-slate-550 resize-none leading-relaxed transition-all"
                    />
                    
                    <button 
                      id="btn-generate-main"
                      type="submit"
                      disabled={isGenerating || !prompt.trim()}
                      className="w-full py-3.5 bg-gradient-to-tr from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 disabled:opacity-40 font-bold rounded-xl text-xs tracking-wider uppercase text-slate-950 transition-all flex items-center justify-center space-x-2 shadow-lg shadow-sky-500/10 cursor-pointer"
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Generating Project Site...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Build Instant Website</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Pre-installed preset suggestions section */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center space-x-1.5">
                      <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Select Inspiration Preset</span>
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 gap-2.5 max-h-[170px] overflow-y-auto pr-1">
                    {PRESET_IDEAS.map((preset, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setPrompt(preset.prompt);
                        }}
                        className="text-left px-3.5 py-2.5 rounded-xl border border-slate-900 bg-slate-900/40 hover:bg-[#0d1425] hover:border-slate-800 transition-all text-xs text-slate-350 hover:text-white flex items-center justify-between group cursor-pointer"
                      >
                        <span className="font-medium truncate mr-1">{preset.label}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-sky-400 group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Refinements System (Visible once a code has been loaded / defaults are active) */}
                <div className="border-t border-slate-800/80 pt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold tracking-wider text-slate-400 uppercase flex items-center space-x-1.5">
                      <Layers className="w-3.5 h-3.5 text-teal-400" />
                      <span>2. Instruct Refinement</span>
                    </label>
                    <span className="text-[10px] text-slate-500">Apply iterative updates</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <input 
                        id="refinement-input"
                        type="text"
                        value={refinementInput}
                        onChange={(e) => setRefinementInput(e.target.value)}
                        placeholder="e.g., 'Change primary button color to violet'"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && refinementInput.trim() && !isGenerating) {
                            handleRefine(refinementInput);
                          }
                        }}
                        className="flex-1 bg-[#0d1425] border border-slate-850 rounded-xl px-4 py-3 text-xs focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500/20 text-slate-100 placeholder-slate-500 transition-all"
                      />
                      <button
                        id="btn-apply-refinement"
                        onClick={() => handleRefine(refinementInput)}
                        disabled={isGenerating || !refinementInput.trim()}
                        className="px-4 bg-teal-500 hover:bg-teal-400 disabled:opacity-40 text-slate-950 font-bold text-xs rounded-xl transition-all flex items-center justify-center cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>

                    {/* Quick refinement modifiers */}
                    <div className="flex flex-wrap gap-1.5 max-h-[110px] overflow-y-auto pr-1">
                      {REFINEMENT_PRESETS.map((preset, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setRefinementInput(preset);
                          }}
                          className="bg-slate-900 border border-slate-850/80 hover:border-slate-800 text-[10px] text-slate-400 hover:text-teal-400 px-2 py-1 rounded transition-all truncate max-w-full text-left cursor-pointer"
                        >
                          + {preset}
                        </button>
                      ))}
                    </div>

                    {/* Chronological Refinements Log */}
                    {refinements.length > 0 && (
                      <div className="bg-slate-900/60 rounded-xl border border-slate-800 p-3.5 space-y-2.5">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                          <span className="flex items-center space-x-1.5">
                            <History className="w-3.5 h-3.5 text-slate-500" />
                            <span>Refinement History ({refinements.length})</span>
                          </span>
                          <button 
                            onClick={handleUndoRefinement}
                            disabled={isGenerating}
                            className="text-amber-500 hover:text-amber-400 transition-colors flex items-center space-x-1 text-[10px] cursor-pointer"
                          >
                            <Undo2 className="w-3 h-3" />
                            <span>Undo Step</span>
                          </button>
                        </div>
                        <div className="space-y-1.5 max-h-[105px] overflow-y-auto text-[11px] pr-1 font-mono">
                          {refinements.map((ref, idx) => (
                            <div key={idx} className="flex items-start space-x-1.5 text-slate-350">
                              <span className="text-sky-500 font-bold select-none">{idx + 1}.</span>
                              <span className="break-words flex-1">{ref}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* TAB 2: Saved Projects View */}
            {activeTab === "saved" && (
              <div className="space-y-4 flex-1 flex flex-col min-h-0">
                <div className="flex items-center justify-between text-xs text-slate-400 bg-slate-900/30 p-3 rounded-lg border border-slate-800/40">
                  <span className="flex items-center space-x-1.5">
                    <Info className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>Sites are saved in your local browser storage.</span>
                  </span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[500px]">
                  {savedProjects.length === 0 ? (
                    <div className="py-12 text-center space-y-3">
                      <Bookmark className="w-8 h-8 text-slate-700 mx-auto" />
                      <p className="text-slate-400 text-xs font-semibold">No sites bookmarked yet.</p>
                      <p class="text-slate-600 text-[11px] px-6 max-w-xs mx-auto">
                        Compose a design using the prompt console, click "Save Project" above to library it here.
                      </p>
                    </div>
                  ) : (
                    savedProjects.map((proj) => (
                      <div
                        key={proj.id}
                        onClick={() => handleLoadProject(proj)}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer relative group flex justify-between items-center ${currentProjectId === proj.id ? 'border-sky-500/80 bg-sky-950/20' : 'border-slate-850 bg-slate-900/40 hover:bg-[#0d1425] hover:border-slate-700'}`}
                      >
                        <div className="space-y-1 pr-4 truncate">
                          <h4 className="font-bold text-xs text-slate-200 truncate">{proj.name}</h4>
                          <p className="text-[10px] text-slate-400 truncate font-mono">{proj.prompt}</p>
                          <div className="flex items-center space-x-2 text-[9px] text-slate-500">
                            <span>{proj.createdAt}</span>
                            {proj.refinements.length > 0 && (
                              <>
                                <span>•</span>
                                <span className="text-teal-400 font-bold">{proj.refinements.length} changes applied</span>
                              </>
                            )}
                          </div>
                        </div>

                        <button 
                          onClick={(e) => handleDeleteProject(e, proj.id)}
                          className="w-10 h-10 rounded-lg bg-slate-950 hover:bg-rose-950 border border-slate-850 hover:border-rose-900 text-slate-500 hover:text-rose-400 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
            
          </div>
          
          {/* Quick legal credit */}
          <div className="p-6 border-t border-slate-800 bg-slate-950/40 text-[10px] text-slate-500 flex justify-between">
            <span>Instant HTML5 Sandbox</span>
            <span>&copy; Code Builder Engine</span>
          </div>

        </aside>

        {/* RIGHT COLUMN: Design Workspace, Sandbox & Tabbed Viewer */}
        <main id="builder-viewport" className="flex-1 bg-slate-950 flex flex-col relative overflow-hidden">
          
          {/* Viewport Control Bar */}
          <div className="h-14 border-b border-slate-850/80 px-6 flex items-center justify-between bg-[#0a0f1d] shrink-0">
            
            {/* Action view toggle cards */}
            <div className="flex items-center space-x-2 bg-slate-900/80 border border-slate-800 rounded-xl p-1 shrink-0">
              <button 
                id="btn-tab-preview"
                onClick={() => setViewMode("preview")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold font-sans flex items-center space-x-1.5 transition-all cursor-pointer ${viewMode === 'preview' ? 'bg-slate-850 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Live View</span>
              </button>
              <button 
                id="btn-tab-code"
                onClick={() => setViewMode("code")}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold font-sans flex items-center space-x-1.5 transition-all cursor-pointer ${viewMode === 'code' ? 'bg-slate-850 text-white shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>Standard HTML Code</span>
              </button>
            </div>

            {/* Middle Viewport responsive triggers (Only visible in Preview tab) */}
            {viewMode === "preview" && (
              <div className="hidden sm:flex items-center space-x-1.5 bg-slate-900/60 rounded-xl p-1 border border-slate-800/80">
                <button 
                  title="Desktop View (100% width)"
                  onClick={() => setViewportMode("desktop")}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${viewportMode === 'desktop' ? 'bg-slate-800 text-sky-400 shadow-sm' : 'text-slate-450 hover:text-slate-200'}`}
                >
                  <Laptop className="w-4 h-4" />
                  <span className="sr-only">Desktop</span>
                </button>
                <button 
                  title="Tablet View (768px width)"
                  onClick={() => setViewportMode("tablet")}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${viewportMode === 'tablet' ? 'bg-slate-800 text-sky-400 shadow-sm' : 'text-slate-450 hover:text-slate-200'}`}
                >
                  <Tablet className="w-4 h-4" />
                  <span className="sr-only">Tablet</span>
                </button>
                <button 
                  title="Mobile View (375px width)"
                  onClick={() => setViewportMode("mobile")}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-all cursor-pointer ${viewportMode === 'mobile' ? 'bg-slate-800 text-sky-400 shadow-sm' : 'text-slate-450 hover:text-slate-200'}`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span className="sr-only">Mobile</span>
                </button>
              </div>
            )}

            {/* Quick Actions (Copy, Export) */}
            <div class="flex items-center space-x-2">
              <button 
                id="btn-copy-code-right"
                onClick={handleCopyCode}
                className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                title="Copy code to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
              {viewMode === "preview" && (
                <button 
                  onClick={() => {
                    const w = window.open();
                    if (w) {
                      w.document.open();
                      w.document.write(htmlCode);
                      w.document.close();
                    } else {
                      alert("Popup blocked! Open in new page requires popups enabled or code view download.");
                    }
                  }}
                  className="p-2 bg-slate-900 hover:bg-slate-850 text-slate-400 hover:text-white rounded-lg border border-slate-800 transition-all flex items-center justify-center shrink-0 cursor-pointer"
                  title="Open live sandbox in new raw tab"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Main workspace displays */}
          <div className="flex-1 p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-0 bg-[#070b14]">
            
            <AnimatePresence mode="wait">
              {/* If isGenerating code, render full screen neural matrix loader */}
              {isGenerating ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-slate-950/90 z-40 flex flex-col items-center justify-center p-8 text-center"
                >
                  <div className="max-w-md space-y-6">
                    {/* Animated custom matrix loader */}
                    <div className="relative w-20 h-20 mx-auto">
                      <div class="absolute inset-0 rounded-2xl border-2 border-dashed border-sky-500/25 animate-spin duration-10000"></div>
                      <div class="absolute inset-2 rounded-xl border border-dotted border-indigo-500/45 animate-spin duration-5000"></div>
                      <div className="absolute inset-4 rounded-lg bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20 animate-pulse">
                        <Sparkles className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-base text-slate-100 uppercase tracking-wider">
                        Running AI Codegen Node
                      </h4>
                      <p className="text-xs text-sky-400 font-mono tracking-tight h-5 animate-pulse">
                        {LOADING_STEPS[loadingStepIdx]}
                      </p>
                    </div>

                    {/* Progress bars indicator */}
                    <div className="w-60 bg-slate-900 h-1 rounded-full overflow-hidden mx-auto border border-slate-805">
                      <motion.div 
                        className="h-full bg-gradient-to-r from-sky-500 to-indigo-600 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((loadingStepIdx + 1) / LOADING_STEPS.length) * 100}%` }}
                        transition={{ duration: 1 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            {/* Error banner overlay */}
            {generationError && (
              <div className="w-full max-w-xl p-5 mb-5 rounded-2xl bg-rose-950/40 border border-rose-900/60 text-slate-100 relative z-30 flex items-start space-x-3.5 shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-400 shrink-0">
                  <Info className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-rose-300">Codegen Failed</h4>
                  <p className="text-[12px] text-slate-300 leading-relaxed">{generationError}</p>
                </div>
              </div>
            )}

            {/* Content view tabs */}
            <div className="w-full h-full flex items-center justify-center min-h-0">
              
              {/* TAB CONTENT A: Sandboxed Viewport Preview */}
              {viewMode === "preview" && (
                <div 
                  className="h-full flex items-center justify-center transition-all duration-300 relative w-full"
                >
                  <div 
                    className={`h-full bg-slate-900 rounded-2xl border border-slate-850 shadow-2xl relative overflow-hidden transition-all duration-300 flex flex-col ${
                      viewportMode === 'mobile' ? 'w-[375px]' : viewportMode === 'tablet' ? 'w-[768px]' : 'w-full'
                    }`}
                  >
                    {/* Sandbox address bar mockup */}
                    <div className="h-9 bg-slate-950 border-b border-slate-850 px-4 flex items-center justify-between text-[11px] font-mono shrink-0 select-none">
                      <div className="flex items-center space-x-1.5 shrink-0">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                      </div>
                      <div className="w-1/2 bg-slate-900/60 text-slate-500 px-3 py-1 rounded-md text-center border border-slate-800 truncate select-none">
                        sandbox://instant-render.local
                      </div>
                      <div className="text-[10px] text-slate-400 shrink-0 font-sans font-bold">
                        {viewportMode === 'mobile' ? '375 × 667 (Mobile)' : viewportMode === 'tablet' ? '768 × 1024 (Tablet)' : 'Responsive Desktop'}
                      </div>
                    </div>

                    {/* Active iframe displaying compiled html */}
                    <div className="flex-grow bg-slate-950 relative">
                      {blobUrl ? (
                        <iframe 
                          id="preview-sandbox-iframe"
                          src={blobUrl}
                          title="Instant Site Preview Sandbox"
                          className="w-full h-full border-none bg-[#0f172a]"
                          sandbox="allow-scripts allow-popups-to-escape-sandbox allow-forms allow-modals"
                        />
                      ) : (
                        <div className="h-full w-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                          <Eye className="w-12 h-12 text-slate-700 animate-pulse" />
                          <p className="text-xs text-slate-500">Iframe sandbox is initializing...</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB CONTENT B: Raw HTML Monospace Viewer */}
              {viewMode === "code" && (
                <div className="w-full h-full bg-slate-950 rounded-2xl border border-slate-850 flex flex-col relative overflow-hidden">
                  
                  {/* Code header panel */}
                  <div className="h-10 bg-slate-900 px-4 border-b border-slate-850 flex items-center justify-between shrink-0 font-mono text-xs text-slate-450">
                    <span className="flex items-center space-x-1.5 font-sans font-semibold">
                      <FileCode className="w-4 h-4 text-sky-400" />
                      <span>compiled_bundle_index.html</span>
                    </span>
                    <button 
                      onClick={handleCopyCode}
                      className="text-[10px] bg-slate-955 hover:bg-slate-850 text-sky-400 hover:text-white px-2.5 py-1 rounded border border-slate-800 transition-all font-sans font-bold flex items-center space-x-1 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Copied Code</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy HTML Code</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Multiline scroll code visualization container */}
                  <div className="flex-1 overflow-auto p-5 font-mono text-xs text-slate-350 leading-relaxed bg-slate-950/90 whitespace-pre scrollbar-thin">
                    <code className="block font-mono text-cyan-400">
                      {htmlCode}
                    </code>
                  </div>
                </div>
              )}

            </div>
          </div>
        </main>
      </div>

      {/* Save Project modal interface */}
      <AnimatePresence>
        {showSaveModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5"
            >
              <div className="space-y-1">
                <h4 className="font-bold text-base text-white flex items-center space-x-2">
                  <Bookmark className="w-5 h-5 text-sky-400" />
                  <span>Save Site to Library</span>
                </h4>
                <p className="text-xs text-slate-400">
                  Bookmark this generated website version locally so you can reload or download it anytime.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">Project Name</label>
                  <input 
                    required 
                    type="text" 
                    value={projectNameInput}
                    onChange={(e) => setProjectNameInput(e.target.value)}
                    placeholder="e.g. My Craft Boba Shop"
                    className="w-full bg-[#0d1425] border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-sky-500 text-white"
                  />
                </div>

                <div className="flex justify-end space-x-3.5 pt-2">
                  <button 
                    onClick={() => setShowSaveModal(false)}
                    className="px-4 py-2 border border-slate-800 hover:bg-slate-850 hover:text-white rounded-xl text-xs font-bold text-slate-300 transition-all cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={handleSaveProjectCommit}
                    className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl text-xs transition-all cursor-pointer shadow-md shadow-sky-500/10"
                  >
                    Confirm Save
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
