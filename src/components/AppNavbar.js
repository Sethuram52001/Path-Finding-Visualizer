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
  ButtonGroup
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
                    <Button onClick={props.handleDijkstra}>Dijkstra</Button>
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
              </DropdownMenu>
            </UncontrolledDropdown>

          </Nav>
            <NavbarText>
                <ButtonGroup>
                    <Button onClick={props.handleClearPath}>Clear Path</Button>
                    <Button onClick={props.handleClearGrid}>Clear Grid</Button>
                </ButtonGroup>          
            </NavbarText>     
        </Collapse>
      </Navbar>
    </div>
  );
}

export default AppNavbar;