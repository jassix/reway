export type AtomGetSelect<InitialState> = Partial<Record<keyof InitialState, boolean>>;
export type AtomGetSelectCheck<InitialState> = InitialState extends object ? AtomGetSelect<InitialState> : void;
export type AtomSetSelect<InitialState> = Partial<Record<keyof InitialState, InitialState[keyof InitialState]>>;
export type AtomSetSelectCheck<InitialState> = InitialState extends object ? AtomSetSelect<InitialState> : InitialState;
export type AtomOnMethod<InitialState, Key> = InitialState extends object ? Key : "data";
export type AtomOnCallback<InitialState, Key extends keyof InitialState> = InitialState extends object ? InitialState[Key] : InitialState;
export type AtomListeners<InitialState> = Record<string, Array<(<Key extends keyof InitialState>(state: AtomOnCallback<InitialState, Key>) => any)>>;
export type Atom<InitialState> = {
    get: (selected?: AtomGetSelectCheck<InitialState>) => Partial<Readonly<InitialState>>;
    set: (selected?: AtomSetSelectCheck<InitialState>) => any;
    on: <Key extends keyof InitialState>(method: AtomOnMethod<InitialState, Key>, callback: (state: AtomOnCallback<InitialState, Key>) => any) => any;
};
export type CreateAtomParameters<InitialState> = Parameters<(state: InitialState) => Atom<InitialState>>;
//# sourceMappingURL=atom.types.d.ts.map