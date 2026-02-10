import { writable } from 'svelte/store';

interface TerminalLine {
    text: string;
    type: 'stdout' | 'stderr' | 'info' | 'error';
    timestamp: Date;
}

let simulationInterval: any = null;

function createTerminalStore() {
    const { subscribe, update, set } = writable<TerminalLine[]>([]);

    return {
        subscribe,

        append: (text: string, type: 'stdout' | 'stderr' | 'info' | 'error' = 'stdout') => {
            update(lines => [...lines, {
                text,
                type,
                timestamp: new Date()
            }]);
        },

        clear: () => set([]),

        // Start Socket stream for logs - Simulated
        connectStream: (projectId: string) => {
            // No-op for demo
            return () => { };
        },

        // Simulation for demo
        runSimulation: () => {
            set([]);
            update(l => [...l, { text: 'Building project...', type: 'info', timestamp: new Date() }]);

            let step = 0;
            const steps = [
                { text: '> vite build', type: 'stdout' },
                { text: 'vite v5.0.12 building for production...', type: 'stdout' },
                { text: 'transforming...', type: 'stdout' },
                { text: '✓ 34 modules transformed.', type: 'stdout' },
                { text: 'rendering chunks...', type: 'stdout' },
                { text: 'dist/index.html   0.45 kB │ gzip: 0.28 kB', type: 'stdout' },
                { text: 'dist/assets/index-Xc2d.js   145.23 kB │ gzip: 42.12 kB', type: 'stdout' },
                { text: '✓ built in 1.45s', type: 'info' },
                { text: '> vite preview', type: 'stdout' },
                { text: '  ➜  Local:   http://localhost:4173/', type: 'info' },
                { text: '  ➜  Network: use --host to expose', type: 'info' }
            ];

            if (simulationInterval) clearInterval(simulationInterval);

            simulationInterval = setInterval(() => {
                if (step >= steps.length) {
                    clearInterval(simulationInterval);
                    return;
                }
                const s = steps[step];
                update(l => [...l, { text: s.text, type: s.type as any, timestamp: new Date() }]);
                step++;
            }, 800);
        },

        stopSimulation: () => {
            if (simulationInterval) clearInterval(simulationInterval);
            update(l => [...l, { text: 'Process exited with code 0', type: 'info', timestamp: new Date() }]);
        }
    };
}

export const terminalStore = createTerminalStore();
