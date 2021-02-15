# Hello there!
Welcome to my path-finding visualizer! Obiviously it's inspired from the Clement's original path-finding visualizer.
For those who're new to this project, it's visualization tool to visualize classic graph algorithms like Dijsktra, A* and etc. I was fascinated to build my own visualization tool after going through Professor Robert Sedgewick Algorithms course from Princeton University in coursera. 
I have been working so hard for this project for the last few months, so take you're time to explore the repo .(I came across this feature recently - "1s" project which opens a github repo as it would have in VS Code - by just typing 1s next to the github in the url (https://github1s.com/repo), so you could try it out for better understanding of the structuring of this project)

## Here is the preview images for my project
### Before visualization:

![Screenshot 2021-02-11 224917](https://user-images.githubusercontent.com/58566745/107673174-bff32800-6cbb-11eb-81a7-8e240660369f.jpg)

### After visualization(ofcourse I just changed the theme from dark mode to light mode for this image):
This is the result after executing a maze generation algorithm and path-finding algorithm.

![Screenshot 2021-02-11 225049](https://user-images.githubusercontent.com/58566745/107673376-f3ce4d80-6cbb-11eb-907c-a8255ef9555e.jpg)

## Features in the application
### Algorithms
1) Dijsktra - Dijkstra's algorithm (or Dijkstra's Shortest Path First algorithm, SPF algorithm) is an algorithm for finding the shortest paths between nodes in a graph, which may represent, for example, road networks. It was conceived by computer scientist Edsger W. Dijkstra in 1956 and published three years later.

2) DFS - Depth-first search (DFS) is an algorithm for traversing or searching tree or graph data structures. The algorithm starts at the root node (selecting some arbitrary node as the root node in the case of a graph) and explores as far as possible along each branch before backtracking.

3) BFS - Breadth-first search (BFS) is an algorithm for traversing or searching tree or graph data structures. It starts at the tree root (or some arbitrary node of a graph, sometimes referred to as a 'search key'), and explores all of the neighbor nodes at the present depth prior to moving on to the nodes at the next depth level. It uses the opposite strategy of depth-first search, which instead explores the node branch as far as possible before being forced to backtrack and expand other nodes.

4) A* - A* is a graph traversal and path search algorithm, which is often used in many fields of computer science due to its completeness, optimality, and optimal efficiency. One major practical drawback is its O(b^d) space complexity, as it stores all generated nodes in memory. Thus, in practical travel-routing systems, it is generally outperformed by algorithms which can pre-process the graph to attain better performance, as well as memory-bounded approaches; however, A* is still the best solution in many cases.

### Maze generation algorithms
1) Random Maze - It's just a simple algorithm which creates walls based on the output of a random function.

2) Recursive Division - Mazes can be created with recursive division, an algorithm which works as follows: Begin with the maze's space with no walls. Call this a chamber. Divide the chamber with a randomly positioned wall (or multiple walls) where each wall contains a randomly positioned passage opening within it. Then recursively repeat the process on the subchambers until all chambers are minimum sized. This method results in mazes with long straight walls crossing their space, making it easier to see which areas to avoid.

# Getting Started/Installation
Pretty much the same as the standard react application, so all the usual react-scripts are available to your disposal. So, over here I restricted myself to the instructions to only the essentials.
## 1. Clone the repository or download the zip
```
git clone https://github.com/Sethuram52001/Path-Finding-Visualizer.git
```

## 2. Install the dependencies
```
npm install
```

## 3. Start the application
```
npm start
```
Runs the app in the development mode.
Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.
