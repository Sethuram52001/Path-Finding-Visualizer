import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  Button,
  ButtonGroup,
  Progress
} from 'reactstrap';

const AppNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">PathVisualizer</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="https://github.com/Sethuram52001/Path-Finding-Visualizer">GitHub</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Algorithms
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Button onClick={() => { props.handleDijkstra(); props.handleVisualization() }}>Dijkstra</Button>
                </DropdownItem>
                <DropdownItem>
                    <Button onClick={props.handleDFS}>DFS</Button>              
                </DropdownItem>
                <DropdownItem>
                    <Button onClick={props.handleBFS}>BFS</Button>
                </DropdownItem>
                <DropdownItem>
                    <Button onClick={props.handleAstar}>Astar</Button>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Generate Maze
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                    <Button onClick={props.handleMaze}>Recursive Division</Button>
                </DropdownItem>
                <DropdownItem>
                    <Button onClick={props.handleRandomMaze}>Random Maze</Button>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
            <NavbarText>
                <ButtonGroup>
                    <Button id={"Tooltip-" + 0} onClick={props.handleClearPath}>Clear Path</Button>
                    <Button id={"Tooltip-" + 1} onClick={props.handleClearGrid}>Clear Grid</Button>
                </ButtonGroup>          
            </NavbarText>     
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavbar;

/*
      <Button className="mr-1" color="secondary" id={"Tooltip-" + id}>
        {item.text}
      </Button>
*/