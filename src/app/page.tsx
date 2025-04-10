'use client';
import { useState } from 'react';
import { ClockIcon, BookOpenIcon, SparklesIcon } from '@heroicons/react/24/outline';

import TimerTab from '@/components/TimerTab';
import JournalTab from '@/components/JournalTab';
import HabitsTab from '@/components/HabitsTab';

export default function BrainDetox() {
  const [activeTab, setActiveTab] = useState('journal');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="max-w-md mx-auto p-4">
        <header className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-indigo-800">Mind Detox</h1>
          <h3 className="subheading text-indigo-400 mt-1 text-sm">Clear your mind, focus better</h3>
        </header>

        <div className="p-1 Icon-box bg-white rounded-lg shadow-md overflow-hidden">
          {/* Tab Navigation */}
          <div className=" flex border-b">
            {[
              { id: 'timer', icon: ClockIcon, label: 'Timer' },
              { id: 'journal', icon: BookOpenIcon, label: 'Journal' },
              { id: 'habits', icon: SparklesIcon, label: 'Habits' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 text-xs font-medium ${
                  activeTab === tab.id 
                    ? 'text-indigo-600 border-b-2 border-indigo-600' 
                    : 'text-gray-500 hover:text-indigo-500'
                }`}
              >
                <tab.icon className="icon" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-4">
            {activeTab === 'timer' && <TimerTab />}
            {activeTab === 'journal' && <JournalTab />}
            {activeTab === 'habits' && <HabitsTab />}
          </div>
        </div>
      </div>
    </div>
  );
}