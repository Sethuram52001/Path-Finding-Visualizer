import { animatePath } from "./algorithms.visualizer";
import { animateWalls } from "./walls.visualizer";

export { animatePath, animateWalls };

// helper function to set visualization state 
// ref for setting state in a normal function outside of a component: https://stackoverflow.com/questions/50090636/react-setting-component-state-using-a-function-outside-of-state-is-it-wrong
export const setVisualizationState = (klass) => {
  klass.setState({ isVisualizing: false  });
}