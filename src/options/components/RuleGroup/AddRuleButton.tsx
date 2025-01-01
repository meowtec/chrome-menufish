import { useState } from 'react';
import {
  Button,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import { MenuCategory, MenuRule } from '../../../types';
import { presetRulesMap } from '../../../config/default-options';
import { generateId } from '../../../utils/random';

interface AddRuleButtonProps {
  category: MenuCategory;
  onAdd: (rule: MenuRule) => void;
}

export default function AddRuleButton({ category, onAdd }: AddRuleButtonProps) {
  const presetRules = presetRulesMap[category];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddNew = () => {
    onAdd({
      name: '',
      url: '',
      key: generateId(),
      enabled: true,
    });
    handleClose();
  };

  const handleAddPreset = (rule: Omit<MenuRule, 'enabled'>) => {
    onAdd({
      ...rule,
      key: generateId(),
      enabled: true,
    });
    handleClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (presetRules.length) {
      setAnchorEl(event.currentTarget);
    } else {
      handleAddNew();
    }
  };

  const buttonId = `add-button-${category}`;
  const menuId = `add-menu-${category}`;

  return (
    <>
      <Button id={buttonId} startIcon={<AddCircleIcon />} onClick={handleClick}>
        {chrome.i18n.getMessage('add')}
      </Button>
      <Menu
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': buttonId,
        }}
      >
        <MenuItem onClick={handleAddNew}>
          <ListItemIcon>
            <AddCircleIcon />
          </ListItemIcon>
          <ListItemText>{chrome.i18n.getMessage('empty_rule')}</ListItemText>
        </MenuItem>
        <Divider />
        {presetRules.map((rule) => (
          <MenuItem onClick={() => handleAddPreset(rule)} key={rule.key}>
            {rule.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
