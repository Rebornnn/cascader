/* eslint-disable no-console */
import React from 'react';
import '../assets/index.less';
import Cascader from '../src';

const optionLists = [
  {
    value: 'zhejiang',
    label: 'Zhejiang',
    isLeaf: false,
  },
  {
    value: 'jiangsu',
    label: 'Jiangsu',
    isLeaf: false,
  },
];

const Demo = () => {
  const [options, setOptions] = React.useState(optionLists);

  const onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  };

  const loadData = (selectedOptions, loadStatus) => {
    const loadingOptions = optionLists.map(item => {
      // @ts-ignore
      item.children = [
        {
          label: `💽`,
          value: loadStatus,
        },
      ];
      return item;
    });

    setOptions(loadingOptions);

    // load options lazily
    setTimeout(() => {
      const loadedOptions = optionLists.map(item => {
        // @ts-ignore
        item.children = [
          {
            label: `${item?.label}动态加载1`,
            value: 'dynamic1',
          },
          {
            label: `${item?.label}动态加载2`,
            value: 'dynamic2',
          },
        ];
        return item;
      });
      setOptions(loadedOptions);
    }, 1000);
  };

  // 直接选中一级选项，但是此时二级选项没有全部选中
  return (
    <Cascader
      checkable
      options={options}
      loadData={loadData}
      onChange={onChange}
      changeOnSelect
      maxTagCount="responsive"
      style={{ width: 200 }}
    />
  );
};

export default Demo;
