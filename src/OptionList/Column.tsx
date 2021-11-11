import * as React from 'react';
import classNames from 'classnames';
import type { OptionDataNode } from '../interface';
import { LOAD_STATUS } from '../interface';
import { connectValue, isLeaf } from '../util';
import CascaderContext from '../context';
import Checkbox from './Checkbox';

export interface ColumnProps {
  prefixCls: string;
  index: number;
  multiple?: boolean;
  options: OptionDataNode[];
  /** Current Column opened item key */
  openKey?: React.Key;
  onSelect: (value: React.Key, isLeaf: boolean) => void;
  onOpen: (index: number, value: React.Key) => void;
  onToggleOpen: (open: boolean) => void;
  checkedSet: Set<React.Key>;
  halfCheckedSet: Set<React.Key>;
  openFinalValue: React.Key;
  // loadingKeys: React.Key[];
}

export default function Column({
  prefixCls,
  index,
  multiple,
  options,
  openKey,
  onSelect,
  onOpen,
  onToggleOpen,
  checkedSet,
  halfCheckedSet,
  openFinalValue,
}: // loadingKeys,
ColumnProps) {
  const menuPrefixCls = `${prefixCls}-menu`;
  const menuItemPrefixCls = `${prefixCls}-menu-item`;

  const {
    changeOnSelect,
    expandTrigger,
    expandIcon,
    loadingIcon,
    dropdownMenuColumnStyle,
    requestFailureText,
    refreshText,
  } = React.useContext(CascaderContext);

  const hoverOpen = expandTrigger === 'hover';

  // ============================ Render ============================
  return (
    <ul className={menuPrefixCls} role="menu">
      {options.map(option => {
        const { disabled, value, node } = option;
        const isMergedLeaf = isLeaf(option);

        // const isLoading = loadingKeys.includes(value);
        // 加载中
        const isLoading = value === connectValue([openFinalValue, LOAD_STATUS.LOADING]);
        if (isLoading) {
          return (
            <li
              key={value}
              className={classNames(menuItemPrefixCls, `${menuItemPrefixCls}-loading`)}
              style={dropdownMenuColumnStyle}
            >
              {loadingIcon}
            </li>
          );
        }

        // 加载数据为空
        const isLoadEmpty = value === connectValue([openFinalValue, LOAD_STATUS.LOAD_EMPTY]);
        if (isLoadEmpty) {
          return (
            <li
              key={value}
              className={classNames(menuItemPrefixCls, `${menuItemPrefixCls}-load-empty`)}
              style={dropdownMenuColumnStyle}
            >
              <div className={`${menuItemPrefixCls}-load-empty-content`}>
                {requestFailureText}
                <span
                  className={`${menuItemPrefixCls}-load-empty-content-refresh`}
                  onClick={() => {
                    onOpen(index, openFinalValue);
                  }}
                >
                  {refreshText}
                </span>
              </div>
            </li>
          );
        }

        // >>>>> checked
        const checked = checkedSet.has(value);

        // >>>>> Open
        const triggerOpenPath = () => {
          if (!disabled && (!hoverOpen || !isMergedLeaf)) {
            onOpen(index, value);
          }
        };

        // >>>>> Selection
        const triggerSelect = () => {
          if (!disabled && (isMergedLeaf || changeOnSelect || multiple)) {
            onSelect(value, isMergedLeaf);
          }
        };

        // >>>>> Title
        let title: string;
        if (typeof node?.title === 'string') {
          title = node.title;
        } else if (typeof option.title === 'string') {
          title = option.title;
        }

        // >>>>> Render
        return (
          <li
            key={value}
            className={classNames(menuItemPrefixCls, {
              [`${menuItemPrefixCls}-expand`]: !isMergedLeaf,
              [`${menuItemPrefixCls}-active`]: openKey === value,
              [`${menuItemPrefixCls}-disabled`]: disabled,
              // [`${menuItemPrefixCls}-loading`]: isLoading,
            })}
            style={dropdownMenuColumnStyle}
            role="menuitemcheckbox"
            title={title}
            aria-checked={checked}
            data-value={value}
            onClick={() => {
              triggerOpenPath();
              if (!multiple || isMergedLeaf) {
                triggerSelect();
              }
            }}
            onDoubleClick={() => {
              if (changeOnSelect) {
                onToggleOpen(false);
              }
            }}
            onMouseEnter={() => {
              if (hoverOpen) {
                triggerOpenPath();
              }
            }}
          >
            {multiple && value !== '__EMPTY__' && !isLoading && (
              <Checkbox
                prefixCls={`${prefixCls}-checkbox`}
                checked={checked}
                halfChecked={halfCheckedSet.has(value)}
                disabled={disabled}
                onClick={() => {
                  triggerSelect();
                }}
              />
            )}
            <div className={`${menuItemPrefixCls}-content`}>{option.title}</div>
            {/* {!isLoading && expandIcon && !isMergedLeaf && (
              <div className={`${menuItemPrefixCls}-expand-icon`}>{expandIcon}</div>
            )} */}
            {expandIcon && !isMergedLeaf && (
              <div className={`${menuItemPrefixCls}-expand-icon`}>{expandIcon}</div>
            )}
            {/* {isLoading && loadingIcon && (
              <div className={`${menuItemPrefixCls}-loading-icon`}>{loadingIcon}</div>
            )} */}
          </li>
        );
      })}
    </ul>
  );
}
