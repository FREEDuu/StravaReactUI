import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

function SidebarUI
() {
  return (
    <div>
        <Sidebar>
            <Menu>
                <SubMenu label="Charts">
                <MenuItem> Pie charts </MenuItem>
                <MenuItem> Line charts </MenuItem>
                </SubMenu>
                <MenuItem> Documentation </MenuItem>
                <MenuItem> Calendar </MenuItem>
            </Menu>
        </Sidebar>
    </div>
  )
}

export default SidebarUI
