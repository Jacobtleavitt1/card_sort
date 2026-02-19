import React, { useState } from 'react';

// --- Sample Data ---
const QUOTES_DATA = [
  { id: 1, text: "The unexamined life is not worth living.", author: "Socrates", theme: "Wisdom", subtheme: "Self-Reflection", era: "Ancient", period: "Classical Greece", source: "Humanities", field: "Philosophy" },
  { id: 2, text: "Stay hungry, stay foolish.", author: "Steve Jobs", theme: "Motivation", subtheme: "Ambition", era: "Contemporary", period: "Digital Age", source: "Professional", field: "Tech" },
  { id: 3, text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", theme: "Resilience", subtheme: "Focus", era: "Ancient", period: "Classical Greece", source: "Humanities", field: "Philosophy" },
  { id: 4, text: "The best way to predict the future is to invent it.", author: "Alan Kay", theme: "Motivation", subtheme: "Innovation", era: "Modern", period: "20th Century", source: "Professional", field: "Tech" },
  { id: 5, text: "Do not go gentle into that good night.", author: "Dylan Thomas", theme: "Resilience", subtheme: "Defiance", era: "Modern", period: "20th Century", source: "Humanities", field: "Literature" },
  { id: 6, text: "Happiness depends upon ourselves.", author: "Aristotle", theme: "Wisdom", subtheme: "Autonomy", era: "Ancient", period: "Classical Greece", source: "Humanities", field: "Philosophy" },
];

const QuoteCard = ({ quote }) => (
  <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition-shadow">
    <p className="text-lg italic text-gray-800 mb-4">"{quote.text}"</p>
    <p className="text-sm font-bold text-indigo-600">— {quote.author}</p>
  </div>
);

const QuoteGallery = () => {
  const [activeTab, setActiveTab] = useState('Theme');

  // Logic to organize data based on the active tab
  const getOrganizedData = () => {
    let topLevelKey, subLevelKey;

    if (activeTab === 'Theme') {
      topLevelKey = 'theme';    // Top: Wisdom, Motivation, Resilience
      subLevelKey = 'subtheme'; // Sub: Self-Reflection, Ambition, etc.
    } else if (activeTab === 'History') {
      topLevelKey = 'era';      // Top: Ancient, Modern, Contemporary
      subLevelKey = 'period';   // Sub: Classical Greece, 20th Century, etc.
    } else {
      topLevelKey = 'source';   // Top: Humanities, Professional
      subLevelKey = 'field';    // Sub: Philosophy, Tech, Literature
    }

    // Grouping logic: { TopCategory: { SubCategory: [Quotes] } }
    const grouped = {};
    QUOTES_DATA.forEach(quote => {
      const top = quote[topLevelKey];
      const sub = quote[subLevelKey];
      if (!grouped[top]) grouped[top] = {};
      if (!grouped[top][sub]) grouped[top][sub] = [];
      grouped[top][sub].push(quote);
    });
    return grouped;
  };

  const organizedData = getOrganizedData();

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Quote Explorer</h1>
          <p className="text-gray-500">Organizing insights across three distinct dimensions.</p>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12 bg-gray-200 p-1 rounded-lg w-fit mx-auto">
          {['Theme', 'History', 'Source'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-8 py-2 rounded-md font-medium transition-all ${
                activeTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Organize by {tab}
            </button>
          ))}
        </div>

        {/* Hierarchical Display */}
        <div className="space-y-12">
          {Object.entries(organizedData).map(([topCategory, subCategories]) => (
            <section key={topCategory} className="border-l-4 border-indigo-500 pl-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 uppercase tracking-wider">
                {topCategory}
              </h2>
              
              <div className="space-y-8">
                {Object.entries(subCategories).map(([subCategory, quotes]) => (
                  <div key={subCategory}>
                    <h3 className="text-xl font-semibold text-gray-600 mb-4 border-b border-gray-200 pb-2">
                      {subCategory}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {quotes.map(quote => (
                        <QuoteCard key={quote.id} quote={quote} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuoteGallery;
