import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    dialogIsOpen: false,
    buyDialogIsOpen: false,
    actionListIsOpen: false,
  },
  reducers: {
    openDialog: (state) => {
      state.dialogIsOpen = true;
    },
    closeDialog: (state) => {
      state.dialogIsOpen = false;
    },
    openBuyDialog: (state, action) => {
      state.buyDialogIsOpen = action.payload;
    },
    closeBuyDialog: (state) => {
      state.buyDialogIsOpen = false;
    },
    // openActionList: (state) => {
    //   state.actionListIsOpen = true;
    // },
    // closeActionList: (state) => {
    //   state.actionListIsOpen = false;
    // },
  },
});

export const {
  openDialog,
  closeDialog,
  openBuyDialog,
  closeBuyDialog,
  openActionList,
  closeActionList,
} = dialogSlice.actions;

export const selectDialog = (state) => state.dialog.dialogIsOpen;
export const selectBuyDialog = (state) => state.dialog.buyDialogIsOpen;
export const selectActionList = (state) => state.dialog.actionListIsOpen;
export default dialogSlice.reducer;
