declare module woc {
	interface ComponentTypeContext {
		getTemplate(sel: string, elMap?: {[index: string]: HTMLElement}): HTMLElement;
	}

	interface ComponentContext {
		getTemplate(sel: string, elMap?: {[index: string]: HTMLElement}): HTMLElement;
	}
}