import { SemanticICONS, SemanticCOLORS } from "semantic-ui-react";

// types of status that server can have
export enum ServerStatus {
  ACTIVE = "Active",
  INACTIVE = "Inactive",
  PANIC = "Panic",
  NOT_RESPONDING = "Not responding/ Unavailable",
}

// enum destructuring
const { ACTIVE, INACTIVE, PANIC, NOT_RESPONDING } = ServerStatus;

// return props for showcasing button based on server status
export const getButtonAction: Function = (status: ServerStatus) => {
  switch (status) {
    case ACTIVE:
      return {
        iconName: "pause",
        text: "Pause",
      };
    case INACTIVE:
      return {
        iconName: "play",
        text: "Start",
      };
    case PANIC:
      return {
        iconName: "play",
        text: "Force start",
      };
    case NOT_RESPONDING:
      return {
        iconName: "play",
        text: "Restart",
      };
    default:
      return {
        iconName: "play",
        text: "Start",
      };
  }
};

// return props used for showcasing server status in UI
export const getStatusProps: Function = (status: ServerStatus) => {
  let iconValue: SemanticICONS;
  switch (status) {
    case ACTIVE:
      iconValue = "check circle";
      return {
        name: ACTIVE,
        icon: iconValue,
        color: "#21ba45", // from semantic UI library
      };
    case INACTIVE:
      iconValue = "ellipsis horizontal";
      return {
        name: INACTIVE,
        icon: iconValue,
        color: "#545454", // from semantic UI library
      };
    case PANIC:
      iconValue = "exclamation circle";
      return {
        name: PANIC,
        icon: iconValue,
        color: "#db2828", // from semantic UI library
      };
    case NOT_RESPONDING:
      iconValue = "warning sign";
      return {
        name: NOT_RESPONDING,
        icon: iconValue,
        color: "#fbbd08", // from semantic UI library
      };
    default:
      iconValue = "window close";
      return {
        name: "undefined",
        icon: iconValue,
        color: "#545454",
      };
  }
};

// return relevant color for status code coming with server message
export const getStatusCodeColor: Function = (code: number) => {
  let color: SemanticCOLORS;
  switch (code) {
    case 200:
      color = "green";
      return color;
    case 400:
      color = "red";
      return color;
    case 401:
      color = "yellow";
      return color;
    case 404:
      color = "black";
      return color;
    case 500:
      color = "black";
      return color;
  }
};
