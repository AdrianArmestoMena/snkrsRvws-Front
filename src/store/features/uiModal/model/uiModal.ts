export interface UiModal {
  isLoading: boolean;
  modal: {
    isOpen: boolean;
    text: string;
    type: string;
  };
}
