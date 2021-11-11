/* eslint-disable no-console */
import React from 'react';
import '../assets/index.less';
import Cascader from '../src';

const addressOptions = [
  {
    label: '福建',
    value: 'fj',
    // isLeaf: false,
    children: [
      {
        label: '厦门',
        value: 'xm',
        isLeaf: false,
      },
      {
        label: '福州',
        value: 'fz',
        isLeaf: false,
      },
    ],
  },
  {
    label: '浙江',
    value: 'zj',
    // isLeaf: false,
    children: [
      {
        label: '杭州',
        value: 'hz',
        isLeaf: false,
      },
      {
        label: '宁波',
        value: 'nb',
        isLeaf: false,
      },
    ],
  },
];
class Demo extends React.Component {
  state = {
    inputValue: '',
    options: addressOptions,
  };

  onChange = (value, selectedOptions) => {
    // console.log('OnChange:', value, selectedOptions);
    this.setState({
      inputValue: selectedOptions.map(o => o.label).join(', '),
    });
  };

  loadData = (selectedOptions, loadStatus) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    const loadingOptions = addressOptions.map(item => {
      item.children = item.children.map(elem => {
        if (elem.value === targetOption.value) {
          elem.children = [
            {
              label: `💽`,
              value: loadStatus.loading,
            },
          ];
        }
        return elem;
      });
      return item;
    });
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      options: loadingOptions,
    });
    // 动态加载下级数据
    setTimeout(() => {
      const loadedOptions = addressOptions.map(item => {
        item.children = item.children.map(elem => ({
          ...elem,
          // children: [
          //   {
          //     label: `${elem?.label}动态加载1`,
          //     value: 'dynamic1',
          //   },
          //   {
          //     label: `${elem?.label}动态加载2`,
          //     value: 'dynamic2',
          //   },
          // ],
          children: [
            {
              label: null,
              value: loadStatus.loadEmpty,
            },
          ],
          // children: [
          //   {
          //     label: (
          //       <div>
          //         无数据
          //         <span
          //           onClick={(e) => {
          //             e.preventDefault()
          //             e.stopPropagation()
          //             this.setState({
          //               // eslint-disable-next-line react/no-access-state-in-setstate
          //               options: loadingOptions,
          //             });
          //           }}
          //         >
          //           刷新
          //         </span>
          //       </div>
          //     ),
          //     value: loadStatus.loadEmpty,
          //   },
          // ],
        }));

        return item;
      });

      this.setState({
        // eslint-disable-next-line react/no-access-state-in-setstate
        // options: [...this.state.options],
        options: loadedOptions,
      });
    }, 2000);
  };

  render() {
    return (
      <Cascader
        checkable
        maxTagCount="responsive"
        options={this.state.options}
        loadData={this.loadData}
        onChange={this.onChange}
        loadingIcon="💽"
        changeOnSelect
        style={{ width: 233 }}
      />
      //   {/* <input value={this.state.inputValue} readOnly /> */}
      // </Cascader>
    );
  }
}

export default Demo;
