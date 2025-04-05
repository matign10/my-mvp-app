'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function ProjectDetail({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pendiente' });
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      
      if (error || !data?.user) {
        router.push('/login');
        return;
      }
      
      setUser(data.user);
      fetchProjectAndTasks(params.id);
    };

    checkUser();
  }, [params.id, router]);

  const fetchProjectAndTasks = async (projectId: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Cargar proyecto
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();
      
      if (projectError) throw projectError;
      
      setProject(projectData);
      
      // Cargar tareas
      const { data: tasksData, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });
      
      if (tasksError) throw tasksError;
      
      setTasks(tasksData || []);
      
    } catch (err: any) {
      console.error('Error al cargar proyecto:', err);
      setError('No se pudo cargar el proyecto. ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTask.title.trim()) {
      return;
    }
    
    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert([
          {
            ...newTask,
            project_id: params.id
          }
        ])
        .select();
      
      if (error) throw error;
      
      // Actualizar lista de tareas
      setTasks([data[0], ...tasks]);
      
      // Limpiar formulario
      setNewTask({ title: '', description: '', status: 'pendiente' });
      
    } catch (err: any) {
      console.error('Error al crear tarea:', err);
      setError('No se pudo crear la tarea. ' + err.message);
    }
  };

  const handleUpdateTaskStatus = async (taskId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .update({ status: newStatus })
        .eq('id', taskId);
      
      if (error) throw error;
      
      // Actualizar el estado local
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
      
    } catch (err: any) {
      console.error('Error al actualizar estado:', err);
      setError('No se pudo actualizar el estado. ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <p className="text-red-700">{error}</p>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl">Proyecto no encontrado</h2>
          <button
            onClick={() => router.push('/dashboard')}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
          >
            Volver al Dashboard
          </button>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === project.owner_id;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {project.description || 'Sin descripción'}
            </p>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded"
            >
              Volver
            </button>
            {isOwner && (
              <button
                onClick={() => router.push(`/projects/${project.id}/edit`)}
                className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
              >
                Editar Proyecto
              </button>
            )}
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          
          {/* Añadir nueva tarea (solo para propietarios) */}
          {isOwner && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden mb-6">
              <div className="px-4 py-5 sm:p-6">
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Añadir nueva tarea
                </h2>
                <form onSubmit={handleAddTask}>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="task_title" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Título *
                      </label>
                      <input
                        type="text"
                        id="task_title"
                        value={newTask.title}
                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    
                    <div className="sm:col-span-2">
                      <label htmlFor="task_status" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Estado
                      </label>
                      <select
                        id="task_status"
                        value={newTask.status}
                        onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      >
                        <option value="pendiente">Pendiente</option>
                        <option value="en_progreso">En progreso</option>
                        <option value="completada">Completada</option>
                      </select>
                    </div>
                    
                    <div className="sm:col-span-6">
                      <label htmlFor="task_description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Descripción
                      </label>
                      <textarea
                        id="task_description"
                        value={newTask.description}
                        onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                        rows={3}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
                    >
                      Añadir tarea
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          
          {/* Lista de tareas */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                Tareas
              </h2>
              
              {tasks.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400 py-6">
                  No hay tareas en este proyecto. {isOwner ? 'Añade una tarea para comenzar.' : ''}
                </p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Título
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Estado
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                          Creado
                        </th>
                        {isOwner && (
                          <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                            Acciones
                          </th>
                        )}
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {tasks.map((task) => (
                        <tr key={task.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 dark:text-white">
                              {task.title}
                            </div>
                            {task.description && (
                              <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                {task.description}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs rounded-full ${
                              task.status === 'completada' 
                                ? 'bg-green-100 text-green-800' 
                                : task.status === 'en_progreso' 
                                ? 'bg-blue-100 text-blue-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {task.status === 'pendiente' 
                                ? 'Pendiente' 
                                : task.status === 'en_progreso' 
                                ? 'En progreso' 
                                : 'Completada'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {new Date(task.created_at).toLocaleDateString()}
                          </td>
                          {isOwner && (
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <select
                                value={task.status}
                                onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value)}
                                className="border border-gray-300 rounded-md text-sm"
                              >
                                <option value="pendiente">Pendiente</option>
                                <option value="en_progreso">En progreso</option>
                                <option value="completada">Completada</option>
                              </select>
                            </td>
                          )}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
