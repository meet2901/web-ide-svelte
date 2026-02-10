import { writable } from 'svelte/store';

export interface File {
    id: string;
    name: string;
    type: 'file' | 'folder';
    path: string;
    children?: File[];
    content?: string;
    expanded?: boolean;
}

interface FileState {
    files: File[];
    activeFile: File | null;
    openFiles: File[];
    isLoading: boolean;
    error: string | null;
}

const MOCK_FILES: File[] = [
    {
        id: '1',
        name: 'src',
        type: 'folder',
        path: 'src',
        expanded: false,
        children: [
            { id: '2', name: 'App.svelte', type: 'file', path: 'src/App.svelte', content: '<script>\n  let name = "world";\n</script>\n\n<h1>Hello {name}!</h1>' },
            { id: '3', name: 'main.js', type: 'file', path: 'src/main.js', content: 'import App from "./App.svelte";\n\nconst app = new App({\n  target: document.body\n});\n\nexport default app;' }
        ]
    },
    {
        id: '4',
        name: 'public',
        type: 'folder',
        path: 'public',
        expanded: false,
        children: [
            { id: '5', name: 'index.html', type: 'file', path: 'public/index.html', content: '<!DOCTYPE html>\n<html>\n  <body>\n  </body>\n</html>' },
            { id: '6', name: 'favicon.ico', type: 'file', path: 'public/favicon.ico', content: '' }
        ]
    },
    { id: '7', name: 'package.json', type: 'file', path: 'package.json', content: '{\n  "name": "svelte-app",\n  "version": "1.0.0"\n}' },
    { id: '8', name: 'README.md', type: 'file', path: 'README.md', content: '# Demo Project\n\nThis is a demo project running in the browser.' }
];

const initialState: FileState = {
    files: [], // Tree structure
    activeFile: null,
    openFiles: [],
    isLoading: false,
    error: null
};

function createFileStore() {
    const { subscribe, set, update } = writable<FileState>(initialState);

    return {
        subscribe,

        loadFiles: async (projectId: string) => {
            update(s => ({ ...s, isLoading: true }));

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));

            update(s => ({ ...s, files: JSON.parse(JSON.stringify(MOCK_FILES)), isLoading: false }));
        },

        openFile: async (file: File) => {
            // In local version, we assume content is already loaded or we just use what we have
            update(s => {
                const alreadyOpen = s.openFiles.find(f => f.id === file.id);
                const openFiles = alreadyOpen ? s.openFiles : [...s.openFiles, file];
                
                // Ensure we return a fresh object reference to trigger reactivity
                return { 
                    ...s, 
                    activeFile: { ...file }, 
                    openFiles 
                };
            });
        },

        closeFile: (fileId: string) => {
            update(s => {
                const openFiles = s.openFiles.filter(f => f.id !== fileId);
                // If active file closed, activate last opened
                const activeFile = s.activeFile?.id === fileId
                    ? (openFiles.length ? openFiles[openFiles.length - 1] : null)
                    : s.activeFile;
                return { ...s, openFiles, activeFile };
            });
        },

        updateFileContent: (fileId: string, content: string) => {
            update(s => {
                // Update in files tree
                const updateInTree = (files: File[]): File[] => {
                    return files.map(f => {
                        if (f.id === fileId) {
                            return { ...f, content };
                        }
                        if (f.children) {
                            return { ...f, children: updateInTree(f.children) };
                        }
                        return f;
                    });
                };
                s.files = updateInTree(s.files);

                // Update in openFiles and activeFile
                s.openFiles = s.openFiles.map(f => f.id === fileId ? { ...f, content } : f);
                if (s.activeFile?.id === fileId) {
                    s.activeFile = { ...s.activeFile, content };
                }
                return s;
            });
        },

        saveFile: async () => {
            // Save current active file
            return update(s => {
                if (!s.activeFile) return s;

                // Deep update in the tree
                const updateInTree = (files: File[]): File[] => {
                    return files.map(f => {
                        if (f.id === s.activeFile!.id) {
                            return { ...f, content: s.activeFile!.content };
                        }
                        if (f.children) {
                            return { ...f, children: updateInTree(f.children) };
                        }
                        return f;
                    });
                };
                
                s.files = updateInTree(s.files);
                
                // Update openFiles
                s.openFiles = s.openFiles.map(f => 
                    f.id === s.activeFile!.id ? { ...f, content: s.activeFile!.content } : f
                );
                
                console.log(`✅ Saved file ${s.activeFile.path}`);
                return s;
            });
        },

        createFile: (name: string, parentPath: string = '') => {
            const newFile: File = {
                id: `file-${Date.now()}`,
                name,
                type: 'file',
                path: parentPath ? `${parentPath}/${name}` : name,
                content: ''
            };

            update(s => ({
                ...s,
                files: [...s.files, newFile]
            }));
        },

        createFolder: (name: string, parentPath: string = '') => {
            const newFolder: File = {
                id: `folder-${Date.now()}`,
                name,
                type: 'folder',
                path: parentPath ? `${parentPath}/${name}` : name,
                children: []
            };

            update(s => ({
                ...s,
                files: [...s.files, newFolder]
            }));
        },

        toggleFolder: (folderId: string) => {
            update(s => {
                const toggleInTree = (files: File[]): File[] => {
                    return files.map(f => {
                        if (f.id === folderId) {
                            return { ...f, expanded: !f.expanded };
                        }
                        if (f.children) {
                            return { ...f, children: toggleInTree(f.children) };
                        }
                        return f;
                    });
                };
                s.files = toggleInTree(s.files);
                return s;
            });
        }
    };
}

export const fileStore = createFileStore();
