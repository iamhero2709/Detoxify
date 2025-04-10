'use client';
import { useState } from 'react';
import { CheckIcon, SparklesIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

export default function HabitsTab() {
  const [habits, setHabits] = useState([
    { id: 1, name: "Drink 5 glasses of water", completed: false },
    { id: 2, name: "5 minutes of deep breathing", completed: false },
    { id: 3, name: "30-minute digital detox", completed: false },
    { id: 4, name: "Express gratitude", completed: false }
  ]);
  const [newHabit, setNewHabit] = useState('');

  const toggleHabit = (id: number) => {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      setHabits([
        ...habits,
        {
          id: Date.now(),
          name: newHabit.trim(),
          completed: false
        }
      ]);
      setNewHabit('');
    }
  };

  const deleteHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const completedCount = habits.filter(h => h.completed).length;
  const progressPercentage = habits.length > 0 ? Math.round((completedCount / habits.length) * 100) : 0;

  return (
    <div className=" progress-Tracker space-y-6">
      <div className=" flex items-center gap-2">
        
        <h1 className="Habit-heading ">Daily Habits</h1>
      </div>

      {/* Progress Tracker */}
      <div className="bg-indigo-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="progress-bar text-sm font-medium text-indigo-700">Daily Progress</span>
          <span className=" progress-bar text-sm font-semibold text-indigo-700">
            {completedCount}/{habits.length} ({progressPercentage}%)
          </span>
        </div>
        <div className="w-full bg-indigo-100 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Add New Habit */}
      <div className=" habit  gap-2">
        <input
          type="text"
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
          placeholder="Add a new habit..."
          className="habit-add flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          onKeyDown={(e) => e.key === 'Enter' && addHabit()}
        />
        <button
          onClick={addHabit}
          disabled={!newHabit.trim()}
          className="btn-hbt px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
         ADD
        </button>
      </div>

      {/* Habits List */}
      <ul className="space-y-3 Habit-list">
        {habits.map((habit) => (
          <li key={habit.id} className="Habit-text group flex items-center gap-1 p-2 hover:bg-gray-50 rounded-lg transition">
            <button
              onClick={() => toggleHabit(habit.id)}
              className={`checkbox-habit flex-shrink-0 w-6 h-6 rounded-md flex items-center justify-center transition-colors ${
                habit.completed 
                  ? 'bg-indigo-600 text-white' 
                  : 'border-2 border-gray-300 hover:border-indigo-400'
              }`}
            >
              {habit.completed && <CheckIcon className="check-icon w-4 h-4" />}
            </button>
            <span className={`flex-1 ${
              habit.completed ? 'text-gray-500 line-through' : 'text-gray-800'
            }`}>
              {habit.name}
            </span>
            <button
              onClick={() => deleteHabit(habit.id)}
              className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 transition p-1"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          </li>
        ))}
      </ul>

      {habits.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No habits added yet. Create your first habit above!</p>
        </div>
      )}
    </div>
  );
}