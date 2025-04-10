'use client';
import { useState } from 'react';
import { CheckIcon, TrashIcon } from '@heroicons/react/24/outline';

type JournalEntry = {
  id: string;
  content: string;
  mood: string;
  date: string;
};

export default function JournalTab() {
  const [entry, setEntry] = useState('');
  const [mood, setMood] = useState('😐');
  const [entries, setEntries] = useState<JournalEntry[]>([]);

  const handleSave = () => {
    if (entry.trim()) {
      const newEntry: JournalEntry = {
        id: Date.now().toString(),
        content: entry,
        mood,
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        })
      };
      setEntries([newEntry, ...entries]);
      setEntry('');
    }
  };

  const handleDelete = (id: string) => {
    setEntries(entries.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Entry Form */}
      <div className="space-y-4">
        <h2 className=" Thought-Heading text-xl font-semibold text-gray-800">Thought Journal</h2>
        
        <textarea
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          placeholder="Write down what's on your mind..."
          className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none  Thought-area"
        />

        <div className="flex justify-between items-center  emoji-heading">
          <div className="flex gap-3 emoji ">
            {['😊', '😐', '😞'].map((emoji) => (
              <button 
                key={emoji}
                onClick={() => setMood(emoji)}
                className={`text-2xl transition-transform ${mood === emoji ? 'scale-125' : 'hover:scale-110'}`}
              >
                {emoji}
              </button>
            ))}
          </div>

          <button
            onClick={handleSave}
            disabled={!entry.trim()}
            className="Entr-btn  flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckIcon className="w-4 h-4" />
            Save Entry
          </button>
        </div>
      </div>

      {/* Saved Entries */}
      {entries.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-700">Your Entries</h3>
          <div className="space-y-3">
            {entries.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-lg shadow border border-gray-100">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.mood}</span>
                    <span className="text-sm text-gray-500">{item.date}</span>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-gray-400 hover:text-red-500 transition"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
                <p className="mt-2 text-gray-800 whitespace-pre-wrap">{item.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}