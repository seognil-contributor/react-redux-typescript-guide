<div align="center">

# 用 TypeScript 写 React & Redux - 完全指南

_"这个指南是一个**最新的摘要**，记录了关于如何用 **TypeScript** 以**函数式风格**使用 **React**（以及相关生态）最重要的模式和示例。它会使你的代码在**从具体实现中进行类型推导**时绝对是**类型安全**的，这样就能减少来自过度类型声明的信息噪音，并更容易写出易于长期维护的正确类型声明。"_

[![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/react-redux-ts)
[![Join the chat at https://gitter.im/react-redux-typescript-guide/Lobby](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/react-redux-typescript-guide/Lobby)

_觉得有帮助？想要更多更新？_

[**点个 :star: 支持一下吧**](https://github.com/piotrwitek/react-redux-typescript-guide/stargazers)

<a href="https://www.buymeacoffee.com/piotrekwitek">
  <img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me a Coffee">
</a>
<a href="https://www.patreon.com/piotrekwitek">
  <img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" alt="Become a Patron" width="160">
</a>

<br/><hr/>

### **更新了什么？**

:tada: _现在更新支持到 **TypeScript v3.7**_ :tada:
:rocket: _升级到 `typesafe-actions@5.x.x` :rocket:

<hr/><br/>

</div>

### **目标**

- 完全的类型安全（支持 [`--strict`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) 模式），并且在向应用的下游代码传递时，不会丢失类型信息（比如：缺少类型断言或用 `any` 来强行使用）
- 使用高级 TypeScript 语言特性（诸如**类型推论**和**控制流分析**）来消除类型冗余、使类型声明简明扼要
- 使用专门的 TypeScript [补充库](#complementary-libraries) 来减少类型代码的重复性和复杂度

### **React、Redux、Typescript 生态系统**

- [typesafe-actions](https://github.com/piotrwitek/typesafe-actions) - 为 Redux / Flux 架构中 "action-creators" 创造的类型安全实用工具集  
- [utility-types](https://github.com/piotrwitek/utility-types) - TypeScript 常用泛型集合，能够补充 TS 自带的映射类型和别名 - 把它当成类型复用的 lodash。  
- [react-redux-typescript-scripts](https://github.com/piotrwitek/react-redux-typescript-scripts) - 开发者工具配置文件，可用于遵循本指南的项目

### **示例**

- Todo-App playground: [Codesandbox](https://codesandbox.io/s/github/piotrwitek/typesafe-actions/tree/master/codesandbox)
- React, Redux, TypeScript - RealWorld App: [Github](https://github.com/piotrwitek/react-redux-typescript-realworld-app) | [Demo](https://react-redux-typescript-realworld-app.netlify.com/)

### **Playground 项目**

[![Build Status](https://semaphoreci.com/api/v1/piotrekwitek/react-redux-typescript-guide/branches/master/shields_badge.svg)](https://semaphoreci.com/piotrekwitek/react-redux-typescript-guide)

查看位于 `/playground` 文件夹中的 Playground 项目。它包含本指南所有的代码示例的源文件。它们都已使用最新版本的 TypeScript 和第三方类型定义包（诸如 `@types/react` 和 `@types/react-redux`）进行了测试，以确保示例是最新的，且没有随着类型定义升级而失效（基于 `create-react-app --typescript`）。
> 我们创建了该 Playground 项目以便你可以简单地克隆到本地，并立即尝试本指南中所有的组件模式。它可以使你无需自己创建复杂的环境配置，直接在真实的项目环境中学习本指南的所有示例。

## 贡献指南

你能贡献并帮助改进本项目，如果你计划做出贡献，请查看我们的贡献指南：[CONTRIBUTING.md](/CONTRIBUTING.md)

## 赞助

你也能通过赞助 issues 提供帮助。
通过 IssueHunt 平台进行赞助，bug 修复或功能请求之类的 issues 可以更快得到解决。

我强烈建议你赞助自己期待解决的 issue，以便增加它的优先级并吸引贡献者解决。

[![Let's fund issues in this repository](https://issuehunt.io/static/embed/issuehunt-button-v1.svg)](https://issuehunt.io/repos/76996763)

---

🌟 - _新内容及更新板块_

## 目录

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [React - 类型定义速查表](#react---%E7%B1%BB%E5%9E%8B%E5%AE%9A%E4%B9%89%E9%80%9F%E6%9F%A5%E8%A1%A8)
    - [`React.FC<Props>` | `React.FunctionComponent<Props>`](#reactfcprops--reactfunctioncomponentprops)
    - [`React.Component<Props, State>`](#reactcomponentprops-state)
    - [`React.ComponentType<Props>`](#reactcomponenttypeprops)
    - [`React.ComponentProps<typeof XXX>`](#reactcomponentpropstypeof-xxx)
    - [`React.ReactElement` | `JSX.Element`](#reactreactelement--jsxelement)
    - [`React.ReactNode`](#reactreactnode)
    - [`React.CSSProperties`](#reactcssproperties)
    - [`React.HTMLProps<HTMLXXXElement>`](#reacthtmlpropshtmlxxxelement)
    - [`React.ReactEventHandler<HTMLXXXElement>`](#reactreacteventhandlerhtmlxxxelement)
    - [`React.XXXEvent<HTMLXXXElement>`](#reactxxxeventhtmlxxxelement)
- [React - 类型模式](#react---%E7%B1%BB%E5%9E%8B%E6%A8%A1%E5%BC%8F)
  - [Function Components - FC](#function-components---fc)
    - [- 计数器组件](#--%E8%AE%A1%E6%95%B0%E5%99%A8%E7%BB%84%E4%BB%B6)
    - [- 组件的 属性展开](#--%E7%BB%84%E4%BB%B6%E7%9A%84-%E5%B1%9E%E6%80%A7%E5%B1%95%E5%BC%80)
  - [Class Components](#class-components)
    - [- 计数器组件 Class 版](#--%E8%AE%A1%E6%95%B0%E5%99%A8%E7%BB%84%E4%BB%B6-class-%E7%89%88)
    - [- Class 组件和 default props](#--class-%E7%BB%84%E4%BB%B6%E5%92%8C-default-props)
  - [泛型组件](#%E6%B3%9B%E5%9E%8B%E7%BB%84%E4%BB%B6)
    - [- 泛型列表组件](#--%E6%B3%9B%E5%9E%8B%E5%88%97%E8%A1%A8%E7%BB%84%E4%BB%B6)
  - [Render Props](#render-props)
    - [- Name Provider 组件](#--name-provider-%E7%BB%84%E4%BB%B6)
    - [- Mouse Provider 组件](#--mouse-provider-%E7%BB%84%E4%BB%B6)
  - [高阶组件](#%E9%AB%98%E9%98%B6%E7%BB%84%E4%BB%B6)
    - [- 用 HOC 封装一个组件](#--%E7%94%A8-hoc-%E5%B0%81%E8%A3%85%E4%B8%80%E4%B8%AA%E7%BB%84%E4%BB%B6)
    - [- 用 HOC 封装组件并注入 props](#--%E7%94%A8-hoc-%E5%B0%81%E8%A3%85%E7%BB%84%E4%BB%B6%E5%B9%B6%E6%B3%A8%E5%85%A5-props)
    - [- 嵌套 HOC - 封装组件，props 注入，连接到 redux 🌟](#--%E5%B5%8C%E5%A5%97-hoc---%E5%B0%81%E8%A3%85%E7%BB%84%E4%BB%B6props-%E6%B3%A8%E5%85%A5%E8%BF%9E%E6%8E%A5%E5%88%B0-redux-)
  - [Redux 连接组件](#redux-%E8%BF%9E%E6%8E%A5%E7%BB%84%E4%BB%B6)
    - [- Redux 版计数器](#--redux-%E7%89%88%E8%AE%A1%E6%95%B0%E5%99%A8)
    - [- Redux 版计数器，带自定义 props](#--redux-%E7%89%88%E8%AE%A1%E6%95%B0%E5%99%A8%E5%B8%A6%E8%87%AA%E5%AE%9A%E4%B9%89-props)
    - [- Redux 版计数器，集成 `redux-thunk`](#--redux-%E7%89%88%E8%AE%A1%E6%95%B0%E5%99%A8%E9%9B%86%E6%88%90-redux-thunk)
  - [Context](#context)
    - [ThemeContext](#themecontext)
    - [ThemeProvider](#themeprovider)
    - [ThemeConsumer](#themeconsumer)
    - [ThemeConsumer Class 版](#themeconsumer-class-%E7%89%88)
  - [Hooks](#hooks)
    - [- useState](#--usestate)
    - [- useReducer](#--usereducer)
    - [- useContext](#--usecontext)
- [Redux - 类型模式](#redux---%E7%B1%BB%E5%9E%8B%E6%A8%A1%E5%BC%8F)
  - [Store 配置](#store-%E9%85%8D%E7%BD%AE)
    - [创建全局 Store 类型](#%E5%88%9B%E5%BB%BA%E5%85%A8%E5%B1%80-store-%E7%B1%BB%E5%9E%8B)
    - [创建 Store](#%E5%88%9B%E5%BB%BA-store)
  - [Action Creators 🌟](#action-creators-)
  - [Reducers](#reducers)
    - [拥有 Type 层面不可变性的 State](#%E6%8B%A5%E6%9C%89-type-%E5%B1%82%E9%9D%A2%E4%B8%8D%E5%8F%AF%E5%8F%98%E6%80%A7%E7%9A%84-state)
    - [reducer 类型声明](#reducer-%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E)
    - [使用 `typesafe-actions` 进行 reducer 类型声明](#%E4%BD%BF%E7%94%A8-typesafe-actions-%E8%BF%9B%E8%A1%8C-reducer-%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E)
    - [测试 reducer](#%E6%B5%8B%E8%AF%95-reducer)
  - [使用 `redux-observable` 编写异步流](#%E4%BD%BF%E7%94%A8-redux-observable-%E7%BC%96%E5%86%99%E5%BC%82%E6%AD%A5%E6%B5%81)
    - [epics 类型声明](#epics-%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E)
    - [测试 epics](#%E6%B5%8B%E8%AF%95-epics)
  - [使用 `reselect` 生成 Selectors](#%E4%BD%BF%E7%94%A8-reselect-%E7%94%9F%E6%88%90-selectors)
  - [使用 `react-redux` 的 connect 方法](#%E4%BD%BF%E7%94%A8-react-redux-%E7%9A%84-connect-%E6%96%B9%E6%B3%95)
    - [连接组件类型声明](#%E8%BF%9E%E6%8E%A5%E7%BB%84%E4%BB%B6%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E)
    - [连接组件类型声明，并集成 `redux-thunk`](#%E8%BF%9E%E6%8E%A5%E7%BB%84%E4%BB%B6%E7%B1%BB%E5%9E%8B%E5%A3%B0%E6%98%8E%E5%B9%B6%E9%9B%86%E6%88%90-redux-thunk)
- [配置和开发者工具](#%E9%85%8D%E7%BD%AE%E5%92%8C%E5%BC%80%E5%8F%91%E8%80%85%E5%B7%A5%E5%85%B7)
  - [通用 Npm Scripts](#%E9%80%9A%E7%94%A8-npm-scripts)
  - [tsconfig.json](#tsconfigjson)
  - [TSLib](#tslib)
  - [TSLint](#tslint)
  - [ESLint](#eslint)
  - [Jest](#jest)
  - [风格指南](#%E9%A3%8E%E6%A0%BC%E6%8C%87%E5%8D%97)
    - ["react-styleguidist"](#react-styleguidist)
- [食谱](#%E9%A3%9F%E8%B0%B1)
    - [通用小贴士](#%E9%80%9A%E7%94%A8%E5%B0%8F%E8%B4%B4%E5%A3%AB)
    - [module 环境声明小贴士](#module-%E7%8E%AF%E5%A2%83%E5%A3%B0%E6%98%8E%E5%B0%8F%E8%B4%B4%E5%A3%AB)
    - [类型定义小贴士](#%E7%B1%BB%E5%9E%8B%E5%AE%9A%E4%B9%89%E5%B0%8F%E8%B4%B4%E5%A3%AB)
    - [类型扩展小贴士](#%E7%B1%BB%E5%9E%8B%E6%89%A9%E5%B1%95%E5%B0%8F%E8%B4%B4%E5%A3%AB)
  - [教程和文章](#%E6%95%99%E7%A8%8B%E5%92%8C%E6%96%87%E7%AB%A0)
  - [贡献者](#%E8%B4%A1%E7%8C%AE%E8%80%85)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

---

# 安装

### React & Redux 的类型定义
```
npm i -D @types/react @types/react-dom @types/react-redux
```

"react" - `@types/react`  
"react-dom" - `@types/react-dom`  
"redux" - (types included with npm package)*  
"react-redux" - `@types/react-redux`  

> *提示: 本指南的类型系统适用于 Redux >= v4.x.x。如果想用于 Redux v3.x.x 请查看 [这个配置](https://github.com/piotrwitek/react-redux-typescript-guide/blob/master/playground/tsconfig.json#L5))  

[⇧ 返回顶部](#目录)

---

# React - 类型定义速查表

### `React.FC<Props>` | `React.FunctionComponent<Props>`
表示函数组件的类型
```tsx
const MyComponent: React.FC<Props> = ...
```

### `React.Component<Props, State>`
表示 class 组件的类型
```tsx
class MyComponent extends React.Component<Props, State> { ...
```

### `React.ComponentType<Props>`
表示 (React.FC<Props> | React.Component<Props>) 集合的类型 - 用于 HOC
```tsx
const withState = <P extends WrappedComponentProps>(
  WrappedComponent: React.ComponentType<P>,
) => { ...
```

### `React.ComponentProps<typeof XXX>`
取得组件 XXX 的 Props 类型（警告：无法用于静态声明的 default props 以及泛型 props）
```tsx
type MyComponentProps = React.ComponentProps<typeof MyComponent>;
```

### `React.ReactElement` | `JSX.Element`
表示 React 中 Element 概念的类型 - 表示一个原生 DOM 组件（比如 `<div />`）或用户自定义的复合组件 （比如 `<MyComponent />`）
```tsx
const elementOnly: React.ReactElement = <div /> || <MyComponent />;
```

### `React.ReactNode`
表示任意类型的 React 节点（相当于 ReactElement (包括 Fragments 和 Portals) + 原始 JS 类型）
```tsx
const elementOrPrimitive: React.ReactNode = 'string' || 0 || false || null || undefined || <div /> || <MyComponent />;
const Component = ({ children: React.ReactNode }) => ...
```

### `React.CSSProperties`
表示 JSX 中样式对象的类型 - 实现 css-in-js 风格
```tsx
const styles: React.CSSProperties = { flexDirection: 'row', ...
const element = <div style={styles} ...
```

### `React.HTMLProps<HTMLXXXElement>`
表示指定 HTML 元素的类型 - 用于扩展 HTML 元素
```tsx
const Input: React.FC<Props & React.HTMLProps<HTMLInputElement>> = props => { ... }

<Input about={...} accept={...} alt={...} ... />
```

### `React.ReactEventHandler<HTMLXXXElement>`
表示 event handler 的泛型类型 - 用于声明 event handlers
```tsx
const handleChange: React.ReactEventHandler<HTMLInputElement> = (ev) => { ... } 

<input onChange={handleChange} ... />
```

### `React.XXXEvent<HTMLXXXElement>`
表示更多特殊 event。一些常见的 event 例如：`ChangeEvent, FormEvent, FocusEvent, KeyboardEvent, MouseEvent, DragEvent, PointerEvent, WheelEvent, TouchEvent`。
```tsx
const handleChange = (ev: React.MouseEvent<HTMLDivElement>) => { ... }

<div onMouseMove={handleChange} ... />
```

上一段代码中的 `React.MouseEvent<HTMLDivElement>` 表示鼠标事件的类型，这个事件挂载在 `HTMLDivElement` 上。

[⇧ 返回顶部](#目录)

---

# React - 类型模式

## Function Components - FC

### - 计数器组件

```tsx
import * as React from 'react';

type Props = {
  label: string;
  count: number;
  onIncrement: () => void;
};

export const FCCounter: React.FC<Props> = props => {
  const { label, count, onIncrement } = props;

  const handleIncrement = () => {
    onIncrement();
  };

  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button type="button" onClick={handleIncrement}>
        {`Increment`}
      </button>
    </div>
  );
};

```

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#fccounter)

[⇧ 返回顶部](#目录)

### - 组件的 [属性展开](https://zh-hans.reactjs.org/docs/jsx-in-depth.html#spread-attributes)

```tsx
import * as React from 'react';

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export const FCSpreadAttributes: React.FC<Props> = props => {
  const { children, ...restProps } = props;

  return <div {...restProps}>{children}</div>;
};

```

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#fcspreadattributes)

[⇧ 返回顶部](#目录)

---

## Class Components

### - 计数器组件 Class 版

```tsx
import * as React from 'react';

type Props = {
  label: string;
};

type State = {
  count: number;
};

export class ClassCounter extends React.Component<Props, State> {
  readonly state: State = {
    count: 0,
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    const { handleIncrement } = this;
    const { label } = this.props;
    const { count } = this.state;

    return (
      <div>
        <span>
          {label}: {count}
        </span>
        <button type="button" onClick={handleIncrement}>
          {`Increment`}
        </button>
      </div>
    );
  }
}

```

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#classcounter)

[⇧ 返回顶部](#目录)

### - Class 组件和 default props

```tsx
import * as React from 'react';

type Props = {
  label: string;
  initialCount: number;
};

type State = {
  count: number;
};

export class ClassCounterWithDefaultProps extends React.Component<
  Props,
  State
> {
  static defaultProps = {
    initialCount: 0,
  };

  readonly state: State = {
    count: this.props.initialCount,
  };

  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    const { handleIncrement } = this;
    const { label } = this.props;
    const { count } = this.state;

    return (
      <div>
        <span>
          {label}: {count}
        </span>
        <button type="button" onClick={handleIncrement}>
          {`Increment`}
        </button>
      </div>
    );
  }
}

```

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#classcounterwithdefaultprops)

[⇧ 返回顶部](#目录)

---

## 泛型组件
- 易于生成不同类型的变种组件，同时复用公共逻辑
- 常见的用例是泛型列表组件

### - 泛型列表组件

```tsx
import * as React from 'react';

export interface GenericListProps<T> {
  items: T[];
  itemRenderer: (item: T) => JSX.Element;
}

export class GenericList<T> extends React.Component<GenericListProps<T>, {}> {
  render() {
    const { items, itemRenderer } = this.props;

    return (
      <div>
        {items.map(itemRenderer)}
      </div>
    );
  }
}

```

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#genericlist)

[⇧ 返回顶部](#目录)

---

## Render Props
> https://zh-hans.reactjs.org/docs/render-props.html

### - Name Provider 组件
> 将 children 用作 render prop 的简单组件

```tsx
import * as React from 'react';

interface NameProviderProps {
  children: (state: NameProviderState) => React.ReactNode;
}

interface NameProviderState {
  readonly name: string;
}

export class NameProvider extends React.Component<NameProviderProps, NameProviderState> {
  readonly state: NameProviderState = { name: 'Piotr' };

  render() {
    return this.props.children(this.state);
  }
}

```

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#nameprovider)

[⇧ 返回顶部](#目录)

### - Mouse Provider 组件
> `Mouse` 组件的例子来源于 [Render Props - React 文档](https://zh-hans.reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns)

```tsx
import * as React from 'react';

export interface MouseProviderProps {
  render: (state: MouseProviderState) => React.ReactNode;
}

interface MouseProviderState {
  readonly x: number;
  readonly y: number;
}

export class MouseProvider extends React.Component<MouseProviderProps, MouseProviderState> {
  readonly state: MouseProviderState = { x: 0, y: 0 };

  handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      x: event.clientX,
      y: event.clientY,
    });
  };

  render() {
    return (
      <div style={{ height: '100%' }} onMouseMove={this.handleMouseMove}>
        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {this.props.render(this.state)}
      </div>
    );
  }
}

```

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/#mouseprovider)

[⇧ 返回顶部](#目录)

---

## 高阶组件
> https://zh-hans.reactjs.org/docs/higher-order-components.html

### - 用 HOC 封装一个组件
给无状态的计数器加上状态

```tsx
import React from 'react';
import { Diff } from 'utility-types';

// These props will be injected into the base component
interface InjectedProps {
  count: number;
  onIncrement: () => void;
}

export const withState = <BaseProps extends InjectedProps>(
  BaseComponent: React.ComponentType<BaseProps>
) => {
  type HocProps = Diff<BaseProps, InjectedProps> & {
    // here you can extend hoc with new props
    initialCount?: number;
  };
  type HocState = {
    readonly count: number;
  };

  return class Hoc extends React.Component<HocProps, HocState> {
    // Enhance component name for debugging and React-Dev-Tools
    static displayName = `withState(${BaseComponent.name})`;
    // reference to original wrapped component
    static readonly WrappedComponent = BaseComponent;

    readonly state: HocState = {
      count: Number(this.props.initialCount) || 0,
    };

    handleIncrement = () => {
      this.setState({ count: this.state.count + 1 });
    };

    render() {
      const { ...restProps } = this.props;
      const { count } = this.state;

      return (
        <BaseComponent
          count={count} // injected
          onIncrement={this.handleIncrement} // injected
          {...(restProps as BaseProps)}
        />
      );
    }
  };
};

```
<details><summary><i>Click to expand</i></summary><p>

```tsx
import * as React from 'react';

import { withState } from '../hoc';
import { FCCounter } from '../components';

const FCCounterWithState = withState(FCCounter);

export default () => <FCCounterWithState label={'FCCounterWithState'} />;

```
</p></details>

[⇧ 返回顶部](#目录)

### - 用 HOC 封装组件并注入 props
用 componentDidCatch 给任意组件加上错误处理功能

```tsx
import React from 'react';

const MISSING_ERROR = 'Error was swallowed during propagation.';

export const withErrorBoundary = <BaseProps extends {}>(
  BaseComponent: React.ComponentType<BaseProps>
) => {
  type HocProps = {
    // here you can extend hoc with new props
  };
  type HocState = {
    readonly error: Error | null | undefined;
  };

  return class Hoc extends React.Component<HocProps, HocState> {
    // Enhance component name for debugging and React-Dev-Tools
    static displayName = `withErrorBoundary(${BaseComponent.name})`;
    // reference to original wrapped component
    static readonly WrappedComponent = BaseComponent;

    readonly state: HocState = {
      error: undefined,
    };

    componentDidCatch(error: Error | null, info: object) {
      this.setState({ error: error || new Error(MISSING_ERROR) });
      this.logErrorToCloud(error, info);
    }

    logErrorToCloud = (error: Error | null, info: object) => {
      // TODO: send error report to service provider
    };

    render() {
      const { children, ...restProps } = this.props;
      const { error } = this.state;

      if (error) {
        return <BaseComponent {...(restProps as BaseProps)} />;
      }

      return children;
    }
  };
};

```
<details><summary><i>Click to expand</i></summary><p>

```tsx
import React, {useState} from 'react';

import { withErrorBoundary } from '../hoc';
import { ErrorMessage } from '../components';

const ErrorMessageWithErrorBoundary =
  withErrorBoundary(ErrorMessage);

const BrokenComponent = () => {
  throw new Error('I\'m broken! Don\'t render me.');
};

const BrokenButton = () => {
  const [shouldRenderBrokenComponent, setShouldRenderBrokenComponent] =
    useState(false);

  if (shouldRenderBrokenComponent) {
    return <BrokenComponent />;
  }

  return (
    <button
      type="button"
      onClick={() => {
        setShouldRenderBrokenComponent(true);
      }}
    >
      {`Throw nasty error`}
    </button>
  );
};

export default () => (
  <ErrorMessageWithErrorBoundary>
    <BrokenButton />
  </ErrorMessageWithErrorBoundary>
);

```
</p></details>

[⇧ 返回顶部](#目录)

### - 嵌套 HOC - 封装组件，props 注入，连接到 redux 🌟
用 componentDidCatch 给任意组件加上错误处理功能

```tsx
import { RootState } from 'MyTypes';
import React from 'react';
import { connect } from 'react-redux';
import { Diff } from 'utility-types';
import { countersActions, countersSelectors } from '../features/counters';

// These props will be injected into the base component
interface InjectedProps {
  count: number;
  onIncrement: () => void;
}

export const withConnectedCount = <BaseProps extends InjectedProps>(
  BaseComponent: React.ComponentType<BaseProps>
) => {
  type HocProps = Diff<BaseProps, InjectedProps> & {
    // here you can extend hoc with new props
    initialCount?: number;
  };

  const mapStateToProps = (state: RootState) => ({
    count: countersSelectors.getReduxCounter(state.counters),
  });

  const dispatchProps = {
    onIncrement: countersActions.increment,
  };

  class Hoc extends React.Component<InjectedProps> {
    // Enhance component name for debugging and React-Dev-Tools
    static displayName = `withConnectedCount(${BaseComponent.name})`;
    // reference to original wrapped component
    static readonly WrappedComponent = BaseComponent;

    render() {
      const { count, onIncrement, ...restProps } = this.props;

      return (
        <BaseComponent
          count={count} // injected
          onIncrement={onIncrement} // injected
          {...(restProps as BaseProps)}
        />
      );
    }
  }

  const ConnectedHoc = connect<
    ReturnType<typeof mapStateToProps>,
    typeof dispatchProps,
    HocProps,
    RootState
  >(
    mapStateToProps,
    dispatchProps
  )(Hoc);

  return ConnectedHoc;
};

```
<details><summary><i>Click to expand</i></summary><p>

```tsx
import * as React from 'react';

import { withConnectedCount } from '../hoc';
import { FCCounter } from '../components';

const FCCounterWithConnectedCount = withConnectedCount(FCCounter);

export default () => (
  <FCCounterWithConnectedCount initialCount={5} label={'FCCounterWithState'} />
);

```
</p></details>

[⇧ 返回顶部](#目录)

---

## Redux 连接组件

### - Redux 版计数器

```tsx
import Types from 'MyTypes';
import { connect } from 'react-redux';

import { countersActions, countersSelectors } from '../features/counters';
import { FCCounter } from '../components';

const mapStateToProps = (state: Types.RootState) => ({
  count: countersSelectors.getReduxCounter(state.counters),
});

const dispatchProps = {
  onIncrement: countersActions.increment,
};

export const FCCounterConnected = connect(
  mapStateToProps,
  dispatchProps
)(FCCounter);

```
<details><summary><i>Click to expand</i></summary><p>

```tsx
import * as React from 'react';

import { FCCounterConnected } from '.';

export default () => <FCCounterConnected label={'FCCounterConnected'} />;

```
</p></details>

[⇧ 返回顶部](#目录)

### - Redux 版计数器，带自定义 props

```tsx
import Types from 'MyTypes';
import { connect } from 'react-redux';

import { countersActions, countersSelectors } from '../features/counters';
import { FCCounter } from '../components';

type OwnProps = {
  initialCount?: number;
};

const mapStateToProps = (state: Types.RootState, ownProps: OwnProps) => ({
  count:
    countersSelectors.getReduxCounter(state.counters) +
    (ownProps.initialCount || 0),
});

const dispatchProps = {
  onIncrement: countersActions.increment,
};

export const FCCounterConnectedOwnProps = connect(
  mapStateToProps,
  dispatchProps
)(FCCounter);

```
<details><summary><i>Click to expand</i></summary><p>

```tsx
import * as React from 'react';

import { FCCounterConnectedOwnProps } from '.';

export default () => (
  <FCCounterConnectedOwnProps
    label={'FCCounterConnectedOwnProps'}
    initialCount={10}
  />
);

```
</p></details>

[⇧ 返回顶部](#目录)

### - Redux 版计数器，集成 `redux-thunk`

```tsx
import Types from 'MyTypes';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as React from 'react';

import { countersActions } from '../features/counters';

// Thunk Action
const incrementWithDelay = () => async (dispatch: Dispatch): Promise<void> => {
  setTimeout(() => dispatch(countersActions.increment()), 1000);
};

const mapStateToProps = (state: Types.RootState) => ({
  count: state.counters.reduxCounter,
});

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) =>
  bindActionCreators(
    {
      onIncrement: incrementWithDelay,
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> & {
    label: string;
  };

export const FCCounter: React.FC<Props> = props => {
  const { label, count, onIncrement } = props;

  const handleIncrement = () => {
    // Thunk action is correctly typed as promise
    onIncrement().then(() => {
      // ...
    });
  };

  return (
    <div>
      <span>
        {label}: {count}
      </span>
      <button type="button" onClick={handleIncrement}>
        {`Increment`}
      </button>
    </div>
  );
};

export const FCCounterConnectedBindActionCreators = connect(
  mapStateToProps,
  mapDispatchToProps
)(FCCounter);

```
<details><summary><i>Click to expand</i></summary><p>

```tsx
import * as React from 'react';

import { FCCounterConnectedBindActionCreators } from '.';

export default () => (
  <FCCounterConnectedBindActionCreators
    label={'FCCounterConnectedBindActionCreators'}
  />
);

```
</p></details>

[⇧ 返回顶部](#目录)

## Context

> https://zh-hans.reactjs.org/docs/context.html

### ThemeContext

```tsx
import * as React from 'react';

export type Theme = React.CSSProperties;

type Themes = {
  dark: Theme;
  light: Theme;
};

export const themes: Themes = {
  dark: {
    color: 'black',
    backgroundColor: 'white',
  },
  light: {
    color: 'white',
    backgroundColor: 'black',
  },
};

export type ThemeContextProps = { theme: Theme; toggleTheme?: () => void };
const ThemeContext = React.createContext<ThemeContextProps>({ theme: themes.light });

export default ThemeContext;

```

[⇧ 返回顶部](#目录)

### ThemeProvider

```tsx
import React from 'react';
import ThemeContext, { themes, Theme } from './theme-context';
import ToggleThemeButton from './theme-consumer';

interface State {
  theme: Theme;
}
export class ThemeProvider extends React.Component<{}, State> {
  readonly state: State = { theme: themes.light };

  toggleTheme = () => {
    this.setState(state => ({
      theme: state.theme === themes.light ? themes.dark : themes.light,
    }));
  }

  render() {
    const { theme } = this.state;
    const { toggleTheme } = this;
    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <ToggleThemeButton />
      </ThemeContext.Provider>
    );
  }
}

```

[⇧ 返回顶部](#目录)

### ThemeConsumer

```tsx
import * as React from 'react';
import ThemeContext from './theme-context';

type Props = {};

export default function ToggleThemeButton(props: Props) {
  return (
    <ThemeContext.Consumer>
      {({ theme, toggleTheme }) => <button style={theme} onClick={toggleTheme} {...props} />}
    </ThemeContext.Consumer>
  );
}

```

### ThemeConsumer Class 版

```tsx
import * as React from 'react';
import ThemeContext from './theme-context';

type Props = {};

export class ToggleThemeButtonClass extends React.Component<Props> {
  static contextType = ThemeContext;
  context!: React.ContextType<typeof ThemeContext>;

  render() {
    const { theme, toggleTheme } = this.context;
    return (
      <button style={theme} onClick={toggleTheme}>
        Toggle Theme
      </button>
    );
  }
}

```

[Implementation with Hooks](#--usecontext)

[⇧ 返回顶部](#目录)

## Hooks

> https://zh-hans.reactjs.org/docs/hooks-intro.html

### - useState

> https://zh-hans.reactjs.org/docs/hooks-reference.html#usestate

```tsx
import * as React from 'react';

type Props = { initialCount: number };

export default function Counter({initialCount}: Props) {
  const [count, setCount] = React.useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
    </>
  );
}

```

[⇧ 返回顶部](#目录)

### - useReducer
用于函数组件的状态管理 Hook （类似 Redux）。

```tsx
import * as React from 'react';

interface State {
  count: number;
}

type Action = { type: 'reset' } | { type: 'increment' } | { type: 'decrement' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      throw new Error();
  }
}

interface CounterProps {
  initialCount: number;
}

function Counter({ initialCount }: CounterProps) {
  const [state, dispatch] = React.useReducer(reducer, {
    count: initialCount,
  });

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </>
  );
}

export default Counter;

```

[⇧ 返回顶部](#目录)

### - useContext

> https://zh-hans.reactjs.org/docs/hooks-reference.html#usecontext

```tsx
import * as React from 'react';
import ThemeContext from '../context/theme-context';

type Props = {};

export default function ThemeToggleButton(props: Props) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  return (
    <button onClick={toggleTheme} style={theme} >
      Toggle Theme
    </button>
  );
}

```

[⇧ 返回顶部](#目录)

---

# Redux - 类型模式

## Store 配置

### 创建全局 Store 类型

#### `RootState` - 表示根 state 树的类型
可以作为 import，使用 Redux `connect` 方法连接组件时，能够确保类型安全性

#### `RootAction` - 表示所有 action 对象集合的类型
可以作为 import，用于不同层次中（reducers, sagas 或 redux-observables epics）接收和发送 redux actions

```tsx
import { StateType, ActionType } from 'typesafe-actions';

declare module 'MyTypes' {
  export type Store = StateType<typeof import('./index').default>;
  export type RootAction = ActionType<typeof import('./root-action').default>;
  export type RootState = StateType<ReturnType<typeof import('./root-reducer').default>>;
}

declare module 'typesafe-actions' {
  interface Types {
    RootAction: ActionType<typeof import('./root-action').default>;
  }
}

```

[⇧ 返回顶部](#目录)

### 创建 Store

当创建 store 实例时，我们不需要编写任何额外的类型，它会通过类型推断自动建立一个**类型安全的 Store 实例**。
> 生成的 store 实例中的方法（像 `getState` 和 `dispatch`）将支持类型检查，并能够暴露所有的类型错误。

```tsx
import { RootAction, RootState, Services } from 'MyTypes';
import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createBrowserHistory } from 'history';
import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';

import { composeEnhancers } from './utils';
import rootReducer from './root-reducer';
import rootEpic from './root-epic';
import services from '../services';

// browser history
export const history = createBrowserHistory();

export const epicMiddleware = createEpicMiddleware<
  RootAction,
  RootAction,
  RootState,
  Services
>({
  dependencies: services,
});

const routerMiddleware = createRouterMiddleware(history);

// configure middlewares
const middlewares = [epicMiddleware, routerMiddleware];
// compose enhancers
const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// rehydrate state on app start
const initialState = {};

// create store
const store = createStore(rootReducer(history), initialState, enhancer);

epicMiddleware.run(rootEpic);

// export store singleton instance
export default store;

```

---

## Action Creators 🌟

> 我们将使用成熟的辅助库 [`typesafe-actions`](https://github.com/piotrwitek/typesafe-actions#typesafe-actions) [![Latest Stable Version](https://img.shields.io/npm/v/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions) [![NPM Downloads](https://img.shields.io/npm/dt/typesafe-actions.svg)](https://www.npmjs.com/package/typesafe-actions) 它被设计成便于使用 **TypeScript** 来写 **Redux**。

> 查看这个进阶教程来学习更多：[Typesafe-Actions - Tutorial](https://github.com/piotrwitek/typesafe-actions#tutorial)!

下面的方案用一个简单的工厂函数来自动创建类型安全的 action creators。目的是减少重复的 actions 和 creators 类型声明代码，并减少代码维护工作。生成结果是绝对类型安全的 action-creators 及其 actions。

```tsx
import { action } from 'typesafe-actions';

import { ADD, INCREMENT } from './constants';

/* SIMPLE API */

export const increment = () => action(INCREMENT);
export const add = (amount: number) => action(ADD, amount);

/* ADVANCED API */

// More flexible allowing to create complex actions more easily
// use can use "action-creator" instance in place of "type constant"
// e.g. case getType(increment): return action.payload;
// This will allow to completely eliminate need for "constants" in your application, more info here:
// https://github.com/piotrwitek/typesafe-actions#constants

import { createAction } from 'typesafe-actions';
import { Todo } from '../todos/models';

export const emptyAction = createAction(INCREMENT)<void>();
export const payloadAction = createAction(ADD)<number>();
export const payloadMetaAction = createAction(ADD)<number, string>();

export const payloadCreatorAction = createAction(
  'TOGGLE_TODO',
  (todo: Todo) => todo.id
)<string>();

```
<details><summary><i>Click to expand</i></summary><p>

```tsx
import store from '../../store';
import { countersActions as counter } from '../counters';

// store.dispatch(counter.increment(1)); // Error: Expected 0 arguments, but got 1.
store.dispatch(counter.increment()); // OK

// store.dispatch(counter.add()); // Error: Expected 1 arguments, but got 0.
store.dispatch(counter.add(1)); // OK

```
</p></details>

[⇧ 返回顶部](#目录)

---

## Reducers

### 拥有 Type 层面不可变性的 State
用 `readonly` 修饰符声明 reducer 中 `State` 的类型，可以获得编译时的不可变性
```ts
export type State = {
  readonly counter: number;
  readonly todos: ReadonlyArray<string>;
};
```

Readonly 修饰符允许初始化，但不允许重新赋值（编译器会提示错误）
```ts
export const initialState: State = {
  counter: 0,
}; // OK

initialState.counter = 3; // TS Error: cannot be mutated
```

这对 **JS 中的 数组** 很起效，因为用 (`push`, `pop`, `splice`, ...) 这样的赋值方法将会报错，但是 (`concat`, `map`, `slice`,...) 这样的不可变方法依然是允许的。
```ts
state.todos.push('Learn about tagged union types') // TS Error: Property 'push' does not exist on type 'ReadonlyArray<string>'
const newTodos = state.todos.concat('Learn about tagged union types') // OK
```

#### 警告 - `Readonly` 不是递归的
这意味着 `readonly` 修饰符在对象的嵌套结构中不会向下传递不变性。你需要标记每个层级的每个属性。（译注：`Readonly` 是浅比较的）

> **小贴士：** 使用 `Readonly` 或 `ReadonlyArray` [映射类型](https://www.tslang.cn/docs/handbook/advanced-types.html)

```ts
export type State = Readonly<{
  counterPairs: ReadonlyArray<Readonly<{
    immutableCounter1: number,
    immutableCounter2: number,
  }>>,
}>;

state.counterPairs[0] = { immutableCounter1: 1, immutableCounter2: 1 }; // TS Error: cannot be mutated
state.counterPairs[0].immutableCounter1 = 1; // TS Error: cannot be mutated
state.counterPairs[0].immutableCounter2 = 1; // TS Error: cannot be mutated
```

#### 解决方案 - `Readonly` 的递归版本是 `DeepReadonly`

为了解决上述问题，我们可以使用 [`DeepReadonly`](https://github.com/piotrwitek/utility-types#deepreadonlyt) 类型（来自 `utility-types`）。

```ts
import { DeepReadonly } from 'utility-types';

export type State = DeepReadonly<{
  containerObject: {
    innerValue: number,
    numbers: number[],
  }
}>;

state.containerObject = { innerValue: 1 }; // TS Error: cannot be mutated
state.containerObject.innerValue = 1; // TS Error: cannot be mutated
state.containerObject.numbers.push(1); // TS Error: cannot use mutator methods
```


[⇧ 返回顶部](#目录)

### reducer 类型声明

> 为了理解下一小节，请确保了解 [类型推论](https://www.tslang.cn/docs/handbook/type-inference.html)，[基于控制流的类型分析](https://www.tslang.cn/docs/release-notes/typescript-2.0.html) 以及 [标记联合类型](https://www.tslang.cn/docs/release-notes/typescript-2.0.html)

```tsx
import { combineReducers } from 'redux';
import { ActionType } from 'typesafe-actions';

import { Todo, TodosFilter } from './models';
import * as actions from './actions';
import { ADD, CHANGE_FILTER, TOGGLE } from './constants';

export type TodosAction = ActionType<typeof actions>;

export type TodosState = Readonly<{
  todos: Todo[];
  todosFilter: TodosFilter;
}>;
const initialState: TodosState = {
  todos: [],
  todosFilter: TodosFilter.All,
};

export default combineReducers<TodosState, TodosAction>({
  todos: (state = initialState.todos, action) => {
    switch (action.type) {
      case ADD:
        return [...state, action.payload];

      case TOGGLE:
        return state.map(item =>
          item.id === action.payload
            ? { ...item, completed: !item.completed }
            : item
        );

      default:
        return state;
    }
  },
  todosFilter: (state = initialState.todosFilter, action) => {
    switch (action.type) {
      case CHANGE_FILTER:
        return action.payload;

      default:
        return state;
    }
  },
});

```

[⇧ 返回顶部](#目录)

### 使用 `typesafe-actions` 进行 reducer 类型声明
> 请注意，我们不需要在 API 上使用任何泛型类型参数。可以和传统的 reducer 写法进行比较，它们是等价的。

```tsx
import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import { Todo, TodosFilter } from './models';
import { ADD, CHANGE_FILTER, TOGGLE } from './constants';

export type TodosState = Readonly<{
  todos: Todo[];
  todosFilter: TodosFilter;
}>;
const initialState: TodosState = {
  todos: [],
  todosFilter: TodosFilter.All,
};

const todos = createReducer(initialState.todos)
  .handleType(ADD, (state, action) => [...state, action.payload])
  .handleType(TOGGLE, (state, action) =>
    state.map(item =>
      item.id === action.payload
        ? { ...item, completed: !item.completed }
        : item
    )
  );

const todosFilter = createReducer(initialState.todosFilter).handleType(
  CHANGE_FILTER,
  (state, action) => action.payload
);

export default combineReducers({
  todos,
  todosFilter,
});

```

[⇧ 返回顶部](#目录)

### 测试 reducer

```tsx
import {
  todosReducer as reducer,
  todosActions as actions,
  TodosState,
} from './';

/**
 * FIXTURES
 */
const getInitialState = (initial?: Partial<TodosState>) =>
  reducer(initial as TodosState, {} as any);

/**
 * STORIES
 */
describe('Todos Stories', () => {
  describe('initial state', () => {
    it('should match a snapshot', () => {
      const initialState = getInitialState();
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('adding todos', () => {
    it('should add a new todo as the first element', () => {
      const initialState = getInitialState();
      expect(initialState.todos).toHaveLength(0);
      const state = reducer(initialState, actions.add('new todo'));
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].title).toEqual('new todo');
    });
  });

  describe('toggling completion state', () => {
    it('should mark active todo as complete', () => {
      const activeTodo = { id: '1', completed: false, title: 'active todo' };
      const initialState = getInitialState({ todos: [activeTodo] });
      expect(initialState.todos[0].completed).toBeFalsy();
      const state1 = reducer(initialState, actions.toggle(activeTodo.id));
      expect(state1.todos[0].completed).toBeTruthy();
    });
  });
});

```

[⇧ 返回顶部](#目录)

---

## 使用 `redux-observable` 编写异步流

### epics 类型声明

```tsx
import { RootAction, RootState, Services } from 'MyTypes';
import { Epic } from 'redux-observable';
import { tap, ignoreElements, filter } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';

import { todosConstants } from '../todos';

// contrived example!!!
export const logAddAction: Epic<RootAction, RootAction, RootState, Services> = (
  action$,
  state$,
  { logger }
) =>
  action$.pipe(
    filter(isOfType(todosConstants.ADD)), // action is narrowed to: { type: "ADD_TODO"; payload: string; }
    tap(action => {
      logger.log(
        `action type must be equal: ${todosConstants.ADD} === ${action.type}`
      );
    }),
    ignoreElements()
  );

```

[⇧ 返回顶部](#目录)

### 测试 epics

```tsx
import { StateObservable, ActionsObservable } from 'redux-observable';
import { RootState, Services, RootAction } from 'MyTypes';
import { Subject } from 'rxjs';

import { add } from './actions';
import { logAddAction } from './epics';

// Simple typesafe mock of all the services, you dont't need to mock anything else
// It is decoupled and reusable for all your tests, just put it in a separate file
const services = {
  logger: {
    log: jest.fn<Services['logger']['log']>(),
  },
  localStorage: {
    loadState: jest.fn<Services['localStorage']['loadState']>(),
    saveState: jest.fn<Services['localStorage']['saveState']>(),
  },
};

describe('Todos Epics', () => {
  let state$: StateObservable<RootState>;

  beforeEach(() => {
    state$ = new StateObservable<RootState>(
      new Subject<RootState>(),
      undefined as any
    );
  });

  describe('logging todos actions', () => {
    beforeEach(() => {
      services.logger.log.mockClear();
    });

    it('should call the logger service when adding a new todo', done => {
      const addTodoAction = add('new todo');
      const action$ = ActionsObservable.of(addTodoAction);

      logAddAction(action$, state$, services)
        .toPromise()
        .then((outputAction: RootAction) => {
          expect(services.logger.log).toHaveBeenCalledTimes(1);
          expect(services.logger.log).toHaveBeenCalledWith(
            'action type must be equal: todos/ADD === todos/ADD'
          );
          // expect output undefined because we're using "ignoreElements" in epic
          expect(outputAction).toEqual(undefined);
          done();
        });
    });
  });
});

```

[⇧ 返回顶部](#目录)

---

## 使用 `reselect` 生成 Selectors

```tsx
import { createSelector } from 'reselect';

import { TodosState } from './reducer';

export const getTodos = (state: TodosState) => state.todos;

export const getTodosFilter = (state: TodosState) => state.todosFilter;

export const getFilteredTodos = createSelector(getTodos, getTodosFilter, (todos, todosFilter) => {
  switch (todosFilter) {
    case 'completed':
      return todos.filter(t => t.completed);
    case 'active':
      return todos.filter(t => !t.completed);

    default:
      return todos;
  }
});

```

[⇧ 返回顶部](#目录)

---

## 使用 `react-redux` 的 connect 方法

### 连接组件类型声明

*__注意__：在下面一段代码中，只有关于 connect 类型声明背后概念的简短说明。请查看 [Redux 连接组件](#redux-%e8%bf%9e%e6%8e%a5%e7%bb%84%e4%bb%b6) 章节了解更多更具体的例子*

```tsx
import MyTypes from 'MyTypes';

import { bindActionCreators, Dispatch, ActionCreatorsMapObject } from 'redux';
import { connect } from 'react-redux';

import { countersActions } from '../features/counters';
import { FCCounter } from '../components';

// Type annotation for "state" argument is mandatory to check 
// the correct shape of state object and injected props you can also
// extend connected component Props interface by annotating `ownProps` argument
const mapStateToProps = (state: MyTypes.RootState, ownProps: FCCounterProps) => ({
  count: state.counters.reduxCounter,
});

// "dispatch" argument needs an annotation to check the correct shape
//  of an action object when using dispatch function
const mapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) =>
  bindActionCreators({
    onIncrement: countersActions.increment,
  }, dispatch);

// shorter alternative is to use an object instead of mapDispatchToProps function
const dispatchToProps = {
    onIncrement: countersActions.increment,
};

// Notice we don't need to pass any generic type parameters to neither
// the connect function below nor map functions declared above
// because type inference will infer types from arguments annotations automatically
// This is much cleaner and idiomatic approach
export const FCCounterConnected =
  connect(mapStateToProps, mapDispatchToProps)(FCCounter);

// You can add extra layer of validation of your action creators
// by using bindActionCreators generic type parameter and RootAction type
const mapDispatchToProps = (dispatch: Dispatch<MyTypes.RootAction>) =>
  bindActionCreators<ActionCreatorsMapObject<Types.RootAction>>({
    invalidActionCreator: () => 1, // Error: Type 'number' is not assignable to type '{ type: "todos/ADD"; payload: Todo; } | { ... }
  }, dispatch);

```

### 连接组件类型声明，并集成 `redux-thunk`

*__注意__：使用 thunk action creators 时你需要使用 `bindActionCreators`。只有这样，你才能获得正确的 dispatch props 类型签名，如下所示。*

*__警告__: 目前（2019 四月）最新版 `redux-thunk` 中的 `bindActionCreators` 签名不会像下面那样正常工作，你需要使用 [`/playground/typings/redux-thunk/index.d.ts`](./playground/typings/redux-thunk/index.d.ts) 中改良的类型定义并覆写 tsconfig 中的 `paths` 字段，像这样： [`"paths":{"redux-thunk":["typings/redux-thunk"]}`](./playground/tsconfig.json)。*

```tsx
const thunkAsyncAction = () => async (dispatch: Dispatch): Promise<void> => {
  // dispatch actions, return Promise, etc.
}

const mapDispatchToProps = (dispatch: Dispatch<Types.RootAction>) =>
  bindActionCreators(
    {
      thunkAsyncAction,
    },
    dispatch
  );

type DispatchProps = ReturnType<typeof mapDispatchToProps>;
// { thunkAsyncAction: () => Promise<void>; }

/* Without "bindActionCreators" fix signature will be the same as the original "unbound" thunk function: */
// { thunkAsyncAction: () => (dispatch: Dispatch<AnyAction>) => Promise<void>; }
```

[⇧ 返回顶部](#目录)

---

# 配置和开发者工具

## 通用 Npm Scripts
> 通用的、跨项目的、 TS 相关的 npm scripts
```
"prettier": "prettier --list-different 'src/**/*.ts' || (echo '\nPlease fix code formatting by running:\nnpm run prettier:fix\n'; exit 1)",
"prettier:fix": "prettier --write 'src/**/*.ts'",
"lint": "tslint -p ./",
"tsc": "tsc -p ./ --noEmit",
"tsc:watch": "tsc -p ./ --noEmit -w",
"test": "jest --config jest.config.json",
"test:watch": "jest --config jest.config.json --watch",
"test:update": "jest --config jest.config.json -u"
"ci-check": "npm run prettier && npm run lint && npm run tsc && npm run test",
```

[⇧ 返回顶部](#目录)

## tsconfig.json

我们有推荐的 `tsconfig.json` 配置文件，你可以借助 [`react-redux-typescript-scripts`](https://github.com/piotrwitek/react-redux-typescript-scripts) 方便地把它添加到你的项目里。

<details><summary><i>Click to expand</i></summary><p>

```tsx
{
  "include": [
    "src",
    "typings"
  ],
  "exclude": [
    "src/**/*.spec.*"
  ],
  "extends": "./node_modules/react-redux-typescript-scripts/tsconfig.json",
  "compilerOptions": {}
}

```
</p></details>

[⇧ 返回顶部](#目录)

## TSLib
https://www.npmjs.com/package/tslib

这个库通过把运行时辅助函数外置化，而不是内嵌到每个文件中，来减少你的打包文件大小。

> 安装  
`npm i tslib`

把这行加到你的 `tsconfig.json` 中：
```ts
"compilerOptions": {
  "importHelpers": true
}
```

[⇧ 返回顶部](#目录)

## TSLint
https://palantir.github.io/tslint/

> 安装  
`npm i -D tslint`

> 如果用于 React 项目，你应该加上额外的 `react` 规则集：`npm i -D tslint-react` https://github.com/palantir/tslint-react  

我们有推荐配置文件，你可以借助 [`react-redux-typescript-scripts`](https://github.com/piotrwitek/react-redux-typescript-scripts) 方便地把它添加到你的项目里。

#### tslint.json
<details><summary><i>Click to expand</i></summary><p>

```tsx
{
  "extends": [
    "./node_modules/react-redux-typescript-scripts/tslint.json",
    "./node_modules/react-redux-typescript-scripts/tslint-react.json"
  ],
  "rules": {
    // you can further customize options here
  }
}

```
</p></details>

[⇧ 返回顶部](#目录)

## ESLint
https://eslint.org/  
https://typescript-eslint.io

> 安装  
`npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin`

我们有推荐配置文件，他会自动添加 TypeScript 的解析器和插件，你可以借助 [`react-redux-typescript-scripts`](https://github.com/piotrwitek/react-redux-typescript-scripts) 方便地把它添加到你的项目里。

#### .eslintrc
<details><summary><i>Click to expand</i></summary><p>

```tsx
{
  "extends": [
    "react-app",
    "./node_modules/react-redux-typescript-scripts/eslint.js"
  ],
  "rules": {
    // you can further customize options here
  }
}

```
</p></details>

[⇧ 返回顶部](#目录)

## Jest
https://jestjs.io/

> 安装  
`npm i -D jest ts-jest @types/jest`

#### jest.config.json
<details><summary><i>Click to expand</i></summary><p>

```tsx
{
  "verbose": true,
  "transform": {
    ".(ts|tsx)": "ts-jest"
  },
  "testRegex": "(/spec/.*|\\.(test|spec))\\.(ts|tsx|js)$",
  "moduleFileExtensions": ["ts", "tsx", "js"],
  "moduleNameMapper": {
    "^Components/(.*)": "./src/components/$1"
  },
  "globals": {
    "window": {},
    "ts-jest": {
      "tsConfig": "./tsconfig.json"
    }
  },
  "setupFiles": ["./jest.stubs.js"],
  "testURL": "http://localhost/"
}

```
</p></details>

#### jest.stubs.js
<details><summary><i>Click to expand</i></summary><p>

```tsx
// Global/Window object Stubs for Jest
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { },
  };
};

window.requestAnimationFrame = function (callback) {
  setTimeout(callback);
};

window.localStorage = {
  getItem: function () { },
  setItem: function () { },
};

Object.values = () => [];

```
</p></details>

[⇧ 返回顶部](#目录)

## 风格指南

### ["react-styleguidist"](https://github.com/styleguidist/react-styleguidist)

[⟩⟩⟩ styleguide.config.js](/playground/styleguide.config.js)  

[⟩⟩⟩ demo](https://piotrwitek.github.io/react-redux-typescript-guide/)

[⇧ 返回顶部](#目录)

---

# 食谱

### 通用小贴士

#### - 使用 TS 时我还需要使用 React.PropTypes 吗？
不。用了 TypeScript 之后，没有必要再使用 PropTypes。当声明 Props 和 State 接口后，你将通过静态类型检查获得完全的自动补全和编码时的安全性。这样，你就能直接避免运行时错误，并减少大量调试时间。额外的好处是，这也是一种用于在源码中解释组件公共 API 的优雅而标准化的方法。

[⇧ 返回顶部](#目录)

#### - 什么时候使用 `interface` 声明，什么时候使用 `type` 别名?
从实际来看，使用 `interface` 声明在编译错误时会生成一个 interface 同名标识，相反 `type` 别名不会生成标识名，并且会展开显示所有属性和嵌套的类型。
尽管我大部分时候更喜欢用 `type` ，但是有时候编译错误过于冗长影响排查，我会根据两者的差别，改用 interface 来隐藏报错中没那么重要的类型细节。
相关的 `ts-lint` 规则：https://palantir.github.io/tslint/rules/interface-over-type-literal/

[⇧ 返回顶部](#目录)

#### - 具名 exports 和 default export 那个比较好？
一个常见的适应性方案是使用文件夹模块模式，这样你可以根据情况同时使用具名和默认 import。
这个方案的好处是你能实现更好的封装，以及能够安全地重构内部命名和文件夹结构，而不影响你的业务代码：

```ts
// 1. create your component files (`select.tsx`) using default export in some folder:

// components/select.tsx
const Select: React.FC<Props> = (props) => {
...
export default Select;

// 2. in this folder create an `index.ts` file that will re-export components with named exports:

// components/index.ts
export { default as Select } from './select';
...

// 3. now you can import your components in both ways, with named export (better encapsulation) or using default export (internal access):

// containers/container.tsx
import { Select } from '@src/components';
or
import Select from '@src/components/select';
...
```

[⇧ 返回顶部](#目录)

#### - 什么是初始化 class 实例或静态属性的最佳实践？
首选新语法来进行 class 属性初始化
```tsx
class ClassCounterWithInitialCount extends React.Component<Props, State> {
  // default props using Property Initializers
  static defaultProps: DefaultProps = {
    className: 'default-class',
    initialCount: 0,
  };
  
  // initial state using Property Initializers
  state: State = {
    count: this.props.initialCount,
  };
  ...
}
```

[⇧ 返回顶部](#目录)

#### - 什么是声明组件 handler 方法的最佳实践？
首选新语法，用箭头函数声明 class 方法字段
```tsx
class ClassCounter extends React.Component<Props, State> {
// handlers using Class Fields with arrow functions
  handleIncrement = () => {
    this.setState({ count: this.state.count + 1 });
  };
  ...
}
```

[⇧ 返回顶部](#目录)

### module 环境声明小贴士
（译注：[环境声明（ambient）](https://jkchao.github.io/typescript-book-chinese/typings/ambient.html) 和 [模块扩展（augmentation）](https://www.tslang.cn/docs/handbook/declaration-merging.html)）
#### 环境声明中的 imports
若要进行 module 扩展，import 应该位于 module 声明外部。
```ts
import { Operator } from 'rxjs/Operator';
import { Observable } from 'rxjs/Observable';

declare module 'rxjs/Subject' {
  interface Subject<T> {
    lift<R>(operator: Operator<T, R>): Observable<R>;
  }
}
```

创建第三方类型定义时，所有 imports 应该位于 module 声明内部，否则 imports 将被视为扩展并报错。

```ts
declare module "react-custom-scrollbars" {
    import * as React from "react";
    export interface positionValues {
    ...
```

[⇧ 返回顶部](#目录)

### 类型定义小贴士

#### 缺少类型定义的错误
如果你找不到第三方模块的类型声明，你可以自己写一个，或借助 [Shorthand Ambient Modules](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Modules.md#shorthand-ambient-modules) 禁用该模块的类型检查。

```tsx
// typings/modules.d.ts
declare module 'MyTypes';
declare module 'react-test-renderer';

```

#### 为 npm 模块使用自定义 `d.ts` 文件
如果你想为（自带类型定义的）某些 npm 模块使用替代的（自定义的）类型定义，你可以通过覆写编译选项中 `paths` 字段来实现。

```ts
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "redux": ["typings/redux"], // use an alternative type-definitions instead of the included one
      ...
    },
    ...,
  }
}
```

[⇧ 返回顶部](#目录)

### 类型扩展小贴士
外部类型定义文件（*.d.ts）相关问题的处理策略

#### 对库的内部声明进行扩展 - 使用相对路径 import

```ts
// added missing autoFocus Prop on Input component in "antd@2.10.0" npm package
declare module '../node_modules/antd/lib/input/Input' {
  export interface InputProps {
    autoFocus?: boolean;
  }
}
```

#### 对库的公开声明进行扩展 - 使用 node_modules import

```ts
// fixed broken public type-definitions in "rxjs@5.4.1" npm package
import { Operator } from 'rxjs/Operator';
import { Observable } from 'rxjs/Observable';

declare module 'rxjs/Subject' {
  interface Subject<T> {
    lift<R>(operator: Operator<T, R>): Observable<R>;
  }
}
```

> 更多搭配第三方类型定义的进阶场景可以在 [TypeScript 官方文档](https://github.com/Microsoft/TypeScript-Handbook/blob/master/pages/Modules.md#working-with-other-javascript-libraries) 找到

[⇧ 返回顶部](#目录)

---

## 教程和文章
> 相关进阶教程精选清单

高阶组件：
- https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb

[⇧ 返回顶部](#目录)

---


## 贡献者

感谢这些优秀的人 ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/739075?v=4" width="100px;"/><br /><sub><b>Piotrek Witek</b></sub>](https://github.com/piotrwitek)<br />[💻](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=piotrwitek "Code") [📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=piotrwitek "Documentation") [🤔](#ideas-piotrwitek "Ideas, Planning, & Feedback") [👀](#review-piotrwitek "Reviewed Pull Requests") [💬](#question-piotrwitek "Answering Questions") | [<img src="https://avatars3.githubusercontent.com/u/8602615?v=4" width="100px;"/><br /><sub><b>Kazz Yokomizo</b></sub>](https://github.com/kazup01)<br />[💵](#financial-kazup01 "Financial") [🔍](#fundingFinding-kazup01 "Funding Finding") | [<img src="https://avatars1.githubusercontent.com/u/366438?v=4" width="100px;"/><br /><sub><b>Jake Boone</b></sub>](https://github.com/jakeboone02)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=jakeboone02 "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/9748762?v=4" width="100px;"/><br /><sub><b>Amit Dahan</b></sub>](https://github.com/amitdahan)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=amitdahan "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/98167?v=4" width="100px;"/><br /><sub><b>gulderov</b></sub>](https://github.com/gulderov)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=gulderov "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/1964212?v=4" width="100px;"/><br /><sub><b>Erik Pearson</b></sub>](https://github.com/emp823)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=emp823 "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/5342677?v=4" width="100px;"/><br /><sub><b>Bryan Mason</b></sub>](https://github.com/flymason)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=flymason "Documentation") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars1.githubusercontent.com/u/119451?v=4" width="100px;"/><br /><sub><b>Jakub Chodorowicz</b></sub>](http://www.jakub.chodorowicz.pl/)<br />[💻](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=chodorowicz "Code") | [<img src="https://avatars1.githubusercontent.com/u/7266431?v=4" width="100px;"/><br /><sub><b>Oleg Maslov</b></sub>](https://github.com/mleg)<br />[🐛](https://github.com/piotrwitek/react-redux-typescript-guide/issues?q=author%3Amleg "Bug reports") | [<img src="https://avatars0.githubusercontent.com/u/3393293?v=4" width="100px;"/><br /><sub><b>Aaron Westbrook</b></sub>](https://github.com/awestbro)<br />[🐛](https://github.com/piotrwitek/react-redux-typescript-guide/issues?q=author%3Aawestbro "Bug reports") | [<img src="https://avatars3.githubusercontent.com/u/14539?v=4" width="100px;"/><br /><sub><b>Peter Blazejewicz</b></sub>](http://www.linkedin.com/in/peterblazejewicz)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=peterblazejewicz "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/1642?v=4" width="100px;"/><br /><sub><b>Solomon White</b></sub>](https://github.com/rubysolo)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=rubysolo "Documentation") | [<img src="https://avatars2.githubusercontent.com/u/8838006?v=4" width="100px;"/><br /><sub><b>Levi Rocha</b></sub>](https://github.com/pino)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=pino "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/41281835?v=4" width="100px;"/><br /><sub><b>Sudachi-kun</b></sub>](http://cloudnative.co.jp)<br />[💵](#financial-loadbalance-sudachi-kun "Financial") |
| [<img src="https://avatars1.githubusercontent.com/u/14838850?v=4" width="100px;"/><br /><sub><b>Sosuke Suzuki</b></sub>](http://sosukesuzuki.github.io)<br />[💻](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=sosukesuzuki "Code") | [<img src="https://avatars0.githubusercontent.com/u/74433?v=4" width="100px;"/><br /><sub><b>Tom Rathbone</b></sub>](https://github.com/chillitom)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=chillitom "Documentation") | [<img src="https://avatars3.githubusercontent.com/u/4654382?v=4" width="100px;"/><br /><sub><b>Arshad Kazmi</b></sub>](https://arshadkazmi42.github.io/)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=arshadkazmi42 "Documentation") | [<img src="https://avatars1.githubusercontent.com/u/8815362?v=4" width="100px;"/><br /><sub><b>JeongUkJae</b></sub>](https://jeongukjae.github.io)<br />[📖](https://github.com/piotrwitek/react-redux-typescript-guide/commits?author=JeongUkJae "Documentation") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

这个项目遵循 [all-contributors](https://github.com/kentcdodds/all-contributors) 规范。欢迎任意形式的贡献！

---

MIT License

Copyright (c) 2017 Piotr Witek <piotrek.witek@gmail.com> (http://piotrwitek.github.io)
