import {
  DndContext,
  closestCenter,
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import AddCircleIcon from '@mui/icons-material/AddCircleOutline';
import HelpIcon from '@mui/icons-material/HelpOutline';
import { Button, Switch, Tooltip } from '@mui/material';
import { ChangeEvent, memo } from 'react';
import { metaProperties } from '../../../config/basic';
import { MenuCategory, MenuRule, RulesGroup } from '../../../types';
import RuleItem from '../RuleItem';
import './index.scss';

function RuleGroup({
  category,
  options,
  onOptionsChange,
}: {
  category: MenuCategory;
  options: RulesGroup;
  onOptionsChange(category: MenuCategory, options: RulesGroup): void;
}) {
  const updateRules = (rules: MenuRule[]) => {
    onOptionsChange(category, {
      ...options,
      rules,
    });
  };

  const handleSwitchChange = (
    e: ChangeEvent<HTMLInputElement>,
    checked: boolean,
  ) => {
    onOptionsChange(category, {
      ...options,
      enabled: checked,
    });
  };

  const handleGroupTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onOptionsChange(category, {
      ...options,
      title: e.target.value,
    });
  };

  const handleRuleChange = (rule: MenuRule) => {
    updateRules(
      options.rules.map((item) => (item.key === rule.key ? rule : item)),
    );
  };

  const handleRuleDelete = (rule: MenuRule) => {
    updateRules(options.rules.filter((item) => item.key !== rule.key));
  };

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (over && active.id !== over.id) {
      const items = options.rules;
      const findIndexByKey = (key: string | number) =>
        items.findIndex((item) => item.key === key);
      const oldIndex = findIndexByKey(active.id);
      const newIndex = findIndexByKey(over.id);
      const newRules = arrayMove(items, oldIndex, newIndex);

      updateRules(newRules);
    }
  };

  const handleAddNew = () => {
    updateRules([
      ...options.rules,
      {
        name: '',
        url: '',
        key: Math.random().toString(36),
        enabled: true,
      },
    ]);
  };

  const groupMeta = metaProperties[category];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <div>
        <div className="category-title">
          <input
            className="category-title-input"
            value={options.title ?? groupMeta.title}
            placeholder={groupMeta.title}
            onChange={handleGroupTitleChange}
          />
          <Tooltip title={groupMeta.description}>
            <HelpIcon fontSize="small" className="category-title-info" />
          </Tooltip>
          <Switch checked={options.enabled} onChange={handleSwitchChange} />
        </div>
        <ul className="rule-list">
          <SortableContext
            items={options.rules.map((item) => item.key)}
            strategy={verticalListSortingStrategy}
          >
            {options.rules.map((item) => (
              <RuleItem
                key={item.key}
                rule={item}
                onRuleChange={handleRuleChange}
                onRuleDelete={handleRuleDelete}
              />
            ))}
          </SortableContext>
        </ul>
        <div className="rule-list-add">
          <Button startIcon={<AddCircleIcon />} onClick={handleAddNew}>
            {chrome.i18n.getMessage('add')}
          </Button>
        </div>
      </div>
    </DndContext>
  );
}

export default memo(RuleGroup);
