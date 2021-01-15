import { animatePath } from "./algorithms.visualizer";
import { animateWalls } from "./walls.visualizer";

export { animatePath, animateWalls };

export const setVisualizationState = (klass) => {
  klass.setState({ isVisualizing: false  });
}