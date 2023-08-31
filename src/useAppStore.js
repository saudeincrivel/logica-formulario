import { create } from "zustand";

const useAppStore = create((set, get) => ({
  ids: ["id-marcas", "id-modelo", "id-ano", "id-versao"],
  options: [[], [], [], []],
  selectedOption: [null, null, null, null],

  getSelectedOption: (id) => {
    const ids = get().ids;
    const selected = get().selectedOption;
    const index = ids.findIndex((item) => item === id);
    return selected[index];
  },
  setSelectedOption: (id, newOption) => {
    console.log(" setting SELCTION", id);
    set((state) => ({
      ...state,
      selectedOption: state.selectedOption.map((selected, index) =>
        id === state.ids[index] ? newOption : selected
      ),
    }));
  },
  getOptions: (id) => {
    const ids = get().ids;
    const options = get().options;
    const index = ids.findIndex((item) => item === id);
    return options[index];
  },

  getNext: (id) => {
    const ids = get().ids;
    const index = ids.findIndex((item) => item === id);
    if (index + 1 === ids.length) {
      return -1;
    }
    return ids[index + 1];
  },
  setOptions: (id, newOptions) => {
    console.log(" setting new OPtions");
    set((state) => ({
      ...state,
      options: state.options.map((options, index) =>
        id === state.ids[index] ? newOptions : options
      ),
    }));
  },

  clearAllAhead: (id) => {
    set((state) => ({
      ...state,
      options: state.options.map((options, index) =>
        index > state.ids.findIndex((item) => item === id) ? [] : options
      ),
    }));
  },
  isVisible: (id) => {
    const ids = get().ids;
    const options = get().options;
    const index = ids.findIndex((item) => item === id);
    return options[index].length > 0;
  },
}));

export default useAppStore;
