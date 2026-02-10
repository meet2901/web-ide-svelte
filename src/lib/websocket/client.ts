import { writable } from 'svelte/store';

// Store for socket connection state - always 'connected' in demo
export const socketStore = writable({
    connected: true,
    error: null
});

// Mock socket object
const mockSocket = {
    on: (event: string, callback: Function) => { },
    off: (event: string, callback: Function) => { },
    emit: (event: string, payload: any) => { },
    id: 'demo-socket-id'
};

export function connectSocket() {
    console.log('Demo: Virtual socket connected');
    return mockSocket;
}

export function getSocket() {
    return mockSocket;
}

export function joinProject(projectId: string, user: { id: string; name: string }) {
    console.log(`Demo: Joined project ${projectId} as ${user.name}`);
}

export function listenToExecution(projectId: string, callback: (data: any) => void) {
    // No-op for real socket, simulated in terminal store
}
