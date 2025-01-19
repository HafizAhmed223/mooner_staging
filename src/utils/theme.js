export const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#20253b",
      light: "#20253b",
      dark: "#20253b",
    },
    secondary: {
      main: "#FEDB29",
    },
    background: {
      default: "#F0F3F8",
    },
    text: {
      primary: "#20253b",
      secondary: "#20253b",
      disabled: "rgba(32,37,59,0.7)",
      hint: "#ff0000",
    },
    error: {
      main: "#ff0000",
    },
    success: {
      main: "#219653",
    },
  },
  typography: {
    fontSize: 16,
    h1: {
      fontSize: 24,
    },
    h2: {
      fontSize: 16,
    },
    h3: {
      fontSize: 16,
    },
    button: {
      fontSize: 24,
    },
  },
  overrides: {
    MuiSwitch: {
      switchBase: {
        // Controls default (unchecked) color for the thumb
        color: "red"
      },
      colorSecondary: {
        "&$checked": {
          // Controls checked color for the thumb
          color: "green"
        }
      },
      track: {
        // Controls default (unchecked) color for the track
        opacity: 0.2,
        backgroundColor: "red",
        "$checked$checked + &": {
          // Controls checked color for the track
          opacity: 0.7,
          backgroundColor: "green"
        }
      }
    }
  }
};
