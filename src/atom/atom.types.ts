export type AtomGetSelect<InitialState> = Partial<Record<keyof InitialState, boolean>>
export type AtomGetSelectCheck<InitialState> = InitialState extends object ? AtomGetSelect<InitialState> : void;

export type AtomSetSelect<InitialState> = Partial<Record<keyof InitialState, InitialState[keyof InitialState]>>;
export type AtomSetSelectCheck<InitialState> = InitialState extends object ? AtomSetSelect<InitialState> : InitialState;

export type AtomOnMethod<InitialState, Key> = InitialState extends object ? Key : "data";
export type AtomOnCallback<InitialState, Key extends keyof InitialState> = InitialState extends object ? InitialState[Key] : InitialState

export type AtomListeners<InitialState> = Record<string, Array<{
	name: string;
	callback: (state: AtomOnCallback<InitialState, keyof InitialState>, ctx?: string) => void;
}>>
export type AtomModule<InitialState> = {
	affected: InitialState extends object ? Array<keyof InitialState> | "all" : void;
	action: (state: InitialState) => void;
}

export type Atom<InitialState> = {
	get: (selected?: AtomGetSelectCheck<InitialState>) => Partial<Readonly<InitialState>>
	set: (selected?: AtomSetSelectCheck<InitialState>, modules?: boolean) => any;
	on: <Key extends keyof InitialState>(method: AtomOnMethod<InitialState, Key>, callback: (state: AtomOnCallback<InitialState, Key>, ctx?: string) => any) => any;
	unmount: (key: string) => void;
}

export type CreateAtomParameters<InitialState> = Parameters<(state: InitialState) => Atom<InitialState>>