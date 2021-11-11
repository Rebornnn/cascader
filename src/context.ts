import * as React from 'react';
import type { CascaderProps } from './Cascader';
import type { ShowSearchType } from './interface';

type ContextProps = Required<
  Pick<
    CascaderProps,
    | 'changeOnSelect'
    | 'expandTrigger'
    | 'fieldNames'
    | 'expandIcon'
    | 'loadingIcon'
    | 'loadData'
    | 'dropdownMenuColumnStyle'
  >
> & {
  search: ShowSearchType;
  dropdownPrefixCls?: string;
  requestFailureText?: string;
  refreshText?: string;
};

const CascaderContext = React.createContext<ContextProps>({
  changeOnSelect: false,
  expandTrigger: 'click',
  fieldNames: null,
  expandIcon: null,
  loadingIcon: null,
  loadData: null,
  dropdownMenuColumnStyle: null,
  search: null,
  requestFailureText: '请求失败',
  refreshText: '刷新',
});

export default CascaderContext;
