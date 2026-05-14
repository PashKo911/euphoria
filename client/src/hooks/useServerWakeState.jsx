import { useSyncExternalStore } from 'react'

const SHOW_DELAY_MS = 700

const state = {
	isServerWakeVisible: false,
	hasBackendResponded: false,
	hasStartedFirstRequest: false,
	pendingWakeTimeout: null,
}

const listeners = new Set()

function emitChange() {
	for (const listener of listeners) {
		listener()
	}
}

function subscribe(listener) {
	listeners.add(listener)

	return () => {
		listeners.delete(listener)
	}
}
function getSnapshot() {
	return state.isServerWakeVisible
}

export function clearPendingWakeTimeout() {
	if (state.pendingWakeTimeout) {
		clearTimeout(state.pendingWakeTimeout)
		state.pendingWakeTimeout = null
	}
}

export function beginBackendWakeCheck() {
	if (state.hasBackendResponded || state.hasStartedFirstRequest) {
		return
	}

	state.hasStartedFirstRequest = true
	clearPendingWakeTimeout()

	emitChange()

	state.pendingWakeTimeout = setTimeout(() => {
		if (!state.hasBackendResponded) {
			state.isServerWakeVisible = true
			emitChange()
		}

		state.pendingWakeTimeout = null
	}, SHOW_DELAY_MS)
}
export function markBackendAwake() {
	if (state.hasBackendResponded) return

	state.hasBackendResponded = true
	state.isServerWakeVisible = false

	clearPendingWakeTimeout()
	emitChange()
}

export function useServerWakeState() {
	const isServerWakeVisible = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

	return {
		isServerWakeVisible,
		beginBackendWakeCheck,
		markBackendAwake,
	}
}
