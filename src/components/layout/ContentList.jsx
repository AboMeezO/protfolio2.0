import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageWrapper from "./PageWrapper";
import Seo from "../Seo";
import { styles } from "../../styles";
import { fadeIn, textVariant } from "../../utils/motion";

const ContentList = ({
  items,
  CardComponent,
  title,
  subTitle,
  description,
  seoTitle,
  seoDescription,
  itemType, // "project" or "blog"
  categories = [], // Static categories list
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");
  const [isOpenSourceOnly, setIsOpenSourceOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const allTech = useMemo(() => {
    const techSet = new Set();
    items.forEach((item) => {
      if (item.techStack) {
        item.techStack.forEach((t) => techSet.add(t));
      }
    });
    return ["All", ...Array.from(techSet).sort()];
  }, [items]);

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const titleText = item.title || item.name || "";
      const matchesSearch =
        titleText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;

      const matchesTech =
        selectedTech === "All" ||
        (item.techStack && item.techStack.includes(selectedTech));

      const matchesOpenSource = !isOpenSourceOnly || item.openSource === true;

      return (
        matchesSearch && matchesCategory && matchesTech && matchesOpenSource
      );
    });
  }, [items, searchTerm, selectedCategory, selectedTech, isOpenSourceOnly]);

  return (
    <PageWrapper>
      <Seo title={seoTitle} description={seoDescription} />

      <div className="w-full px-4 sm:px-10 lg:px-16">
        {/* Header Section */}
        <div className="flex flex-col items-center mb-16">
          <motion.div variants={textVariant()} className="text-center">
            <p className={`${styles.sectionSubText} font-bold`}>{subTitle}</p>
            <h1 className={`${styles.sectionHeadText} font-extrabold`}>
              {title}
            </h1>
          </motion.div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden w-full flex gap-3 mb-6">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex-1 bg-tertiary py-3 px-8 rounded-xl outline-none text-white font-bold shadow-md shadow-primary flex items-center justify-center gap-2 uppercase tracking-widest text-xs transition-all active:scale-95"
            >
              {/* <span className="text-purple-500">⚡</span> */}
              {showFilters ? "Close Filters" : "Filter Results"}
            </button>
            {(selectedCategory !== "All" ||
              selectedTech !== "All" ||
              isOpenSourceOnly ||
              searchTerm) && (
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTech("All");
                  setIsOpenSourceOnly(false);
                  setSearchTerm("");
                }}
                className="bg-tertiary py-3 px-6 rounded-xl outline-none text-white font-bold shadow-md shadow-primary text-[10px] uppercase tracking-tighter active:scale-95 transition-all border border-red-500/20"
              >
                Reset
              </button>
            )}
          </div>

          <aside className="lg:w-80 w-full flex-shrink-0 lg:sticky lg:top-32 z-10">
            {/* Desktop Filters (Always Visible) */}
            <div className="hidden lg:block bg-black-100 p-8 rounded-2xl shadow-xl border border-white/5">
              <h2 className="text-white font-black text-2xl mb-8 tracking-tighter uppercase">
                Filters
              </h2>

              {/* Categories */}
              <div className="mb-10">
                <h3 className="text-white font-medium mb-4 border-b border-white/10 pb-2">
                  Category
                </h3>
                <div className="flex flex-col gap-2">
                  {["All", ...categories].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left px-6 py-3 rounded-lg font-medium transition-all ${
                        selectedCategory === cat
                          ? "bg-tertiary text-white shadow-md shadow-primary scale-[1.02]"
                          : "text-secondary hover:text-white hover:bg-tertiary/50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="mb-10">
                <h3 className="text-white font-medium mb-4 border-b border-white/10 pb-2">
                  Tech Stack
                </h3>
                <div className="relative">
                  <select
                    value={selectedTech}
                    onChange={(e) => setSelectedTech(e.target.value)}
                    className="w-full bg-tertiary py-4 px-6 text-white rounded-lg outline-none border-none font-medium appearance-none cursor-pointer"
                  >
                    {allTech.map((tech) => (
                      <option key={tech} value={tech} className="bg-primary">
                        {tech.toUpperCase()}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                    ▼
                  </div>
                </div>
              </div>

              {/* Open Source */}
              {itemType === "project" && (
                <div className="mb-10 px-2">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <span className="text-white font-medium">
                      Open Source Only
                    </span>
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={isOpenSourceOnly}
                        onChange={() => setIsOpenSourceOnly(!isOpenSourceOnly)}
                      />
                      <div
                        className={`block w-12 h-7 rounded-full transition-colors ${isOpenSourceOnly ? "bg-[#915eff]" : "bg-tertiary"}`}
                      ></div>
                      <div
                        className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${isOpenSourceOnly ? "translate-x-5" : ""}`}
                      ></div>
                    </div>
                  </label>
                </div>
              )}

              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSelectedTech("All");
                  setIsOpenSourceOnly(false);
                  setSearchTerm("");
                }}
                className="bg-tertiary py-3 px-8 rounded-xl outline-none w-full text-white font-bold shadow-md shadow-primary hover:scale-[1.02] transition-transform"
              >
                Reset All
              </button>
            </div>

            {/* Mobile Filters (Toggleable) */}
            <div className="lg:hidden">
              <AnimatePresence>
                {showFilters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="bg-black-100 p-8 rounded-2xl shadow-xl border border-white/5 mb-6">
                      {/* Categories (Horizontal scroll on mobile) */}
                      <div className="mb-8">
                        <h3 className="text-white font-medium mb-4 border-b border-white/10 pb-2">
                          Category
                        </h3>
                        <div className="flex flex-row gap-2 overflow-x-auto pb-2 scrollbar-hide">
                          {["All", ...categories].map((cat) => (
                            <button
                              key={cat}
                              onClick={() => setSelectedCategory(cat)}
                              className={`whitespace-nowrap px-6 py-3 rounded-lg font-medium transition-all ${
                                selectedCategory === cat
                                  ? "bg-tertiary text-white shadow-md shadow-primary"
                                  : "text-secondary hover:text-white bg-tertiary/30"
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {/* Tech Stack */}
                        <div className="flex flex-col">
                          <h3 className="text-white font-medium mb-4 border-b border-white/10 pb-2">
                            Tech Stack
                          </h3>
                          <div className="relative">
                            <select
                              value={selectedTech}
                              onChange={(e) => setSelectedTech(e.target.value)}
                              className="w-full bg-tertiary py-4 px-6 text-white rounded-lg outline-none border-none font-medium appearance-none cursor-pointer"
                            >
                              {allTech.map((tech) => (
                                <option
                                  key={tech}
                                  value={tech}
                                  className="bg-primary"
                                >
                                  {tech.toUpperCase()}
                                </option>
                              ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary">
                              ▼
                            </div>
                          </div>
                        </div>

                        {/* Open Source */}
                        {itemType === "project" && (
                          <div className="flex flex-col">
                            <h3 className="text-white font-medium mb-4 border-b border-white/10 pb-2">
                              Availability
                            </h3>
                            <label className="flex items-center justify-between cursor-pointer group py-3 px-2">
                              <span className="text-white font-medium">
                                Open Source
                              </span>
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={isOpenSourceOnly}
                                  onChange={() =>
                                    setIsOpenSourceOnly(!isOpenSourceOnly)
                                  }
                                />
                                <div
                                  className={`block w-12 h-7 rounded-full transition-colors ${isOpenSourceOnly ? "bg-[#915eff]" : "bg-tertiary"}`}
                                ></div>
                                <div
                                  className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${isOpenSourceOnly ? "translate-x-5" : ""}`}
                                ></div>
                              </div>
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </aside>

          <main className="flex-1 w-full">
            <div className="relative w-full max-w-5xl mb-12">
              <input
                type="text"
                placeholder={`Search ${itemType}s...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium w-full shadow-md shadow-primary focus:ring-1 focus:ring-purple-500 transition-all text-sm sm:text-base"
              />
            </div>

            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    {itemType === "project" ? (
                      <CardComponent project={item} />
                    ) : (
                      <CardComponent blog={item} />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {filteredItems.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-40 bg-tertiary/20 rounded-3xl border-2 border-dashed border-white/5"
              >
                <p className="text-white text-3xl font-black uppercase tracking-tighter mb-4">
                  No Results
                </p>
                <p className="text-secondary font-bold mb-10">
                  NO ITEMS MATCHED YOUR CURRENT FILTERS.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("All");
                    setSelectedTech("All");
                    setIsOpenSourceOnly(false);
                  }}
                  className="bg-violet-gradient px-12 py-4 rounded-xl text-white font-black uppercase tracking-widest shadow-2xl hover:scale-105 transition-transform"
                >
                  Reset All
                </button>
              </motion.div>
            )}
          </main>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ContentList;
