import { SemanticICONS } from "semantic-ui-react";

// types of status that server can have
export enum ServerStatus {
    ACTIVE = "Active",
    INACTIVE = "Inactive",
    PANIC = "Panic",
    NOT_RESPONDING = "Not responding/ Unavailable",
}

// enum destructuring
const { ACTIVE, INACTIVE, PANIC, NOT_RESPONDING } = ServerStatus;

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