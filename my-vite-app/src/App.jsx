import { useState, useEffect } from 'react';
import { ThemeContext } from './context/ThemeContext';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TaskManager } from './components/TaskManager';
import { APIExplorer } from './components/APIExplorer';
import { Button } from './components/Button';

export default function App() {
  const [darkMode, setDarkMode] = useLocalStorage('darkMode', false);
  const [currentView, setCurrentView] = useState('tasks');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <div className="mb-6 flex justify-center gap-4 md:hidden">
            <Button
              variant={currentView === 'tasks' ? 'primary' : 'secondary'}
              onClick={() => setCurrentView('tasks')}
            >
              Tasks
            </Button>
            <Button
              variant={currentView === 'api' ? 'primary' : 'secondary'}
              onClick={() => setCurrentView('api')}
            >
              API Explorer
            </Button>
          </div>
          
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            <TaskManager />
            <APIExplorer />
          </div>

          <div className="md:hidden">
            {currentView === 'tasks' ? <TaskManager /> : <APIExplorer />}
          </div>
        </main>
        <Footer />
      </div>
    </ThemeContext.Provider>
  );
}