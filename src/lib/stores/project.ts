import { writable } from 'svelte/store';

export interface Project {
    id: string;
    name: string;
    updatedAt: string;
}

interface ProjectState {
    projects: Project[];
    activeProject: Project | null;
    isLoading: boolean;
    error: string | null;
}

const DEMO_PROJECTS: Project[] = [
    { id: 'proj-1', name: 'Svelte Demo App', updatedAt: new Date().toISOString() },
    { id: 'proj-2', name: 'React Dashboard', updatedAt: new Date(Date.now() - 86400000).toISOString() },
    { id: 'proj-3', name: 'Vue Portfolio', updatedAt: new Date(Date.now() - 172800000).toISOString() }
];

const initialState: ProjectState = {
    projects: [],
    activeProject: null,
    isLoading: false,
    error: null
};

function createProjectStore() {
    const { subscribe, set, update } = writable<ProjectState>(initialState);

    return {
        subscribe,

        loadProjects: async () => {
            update(s => ({ ...s, isLoading: true }));

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 600));

            update(s => ({
                ...s,
                projects: DEMO_PROJECTS,
                isLoading: false,
                // Auto-select first project if none selected
                activeProject: s.activeProject || (DEMO_PROJECTS.length > 0 ? DEMO_PROJECTS[0] : null)
            }));
        },

        createProject: async (name: string) => {
            const newProject = {
                id: `proj-${Date.now()}`,
                name,
                updatedAt: new Date().toISOString()
            };

            update(s => ({
                ...s,
                projects: [newProject, ...s.projects],
                activeProject: newProject
            }));
            return { success: true };
        },

        setActiveProject: (project: Project) => {
            update(s => ({ ...s, activeProject: project }));
        }
    };
}

export const projectStore = createProjectStore();
