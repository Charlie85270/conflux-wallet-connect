<a href="https://react-hot-toast.com/"><img alt="ConfluxWalletConnect" src="https://i.im.ge/2023/06/10/FMgm54.png"/></a>

<div align="center">
    <img src="https://badgen.net/npm/v/react-hot-toast" alt="NPM Version" />
  <img src="https://badgen.net/bundlephobia/minzip/react-hot-toast" alt="minzipped size"/>
    <img src="https://github.com/timolins/react-hot-toast/workflows/CI/badge.svg" alt="Build Status" />
</a>
</div>
<br />
<div align="center"><strong>Conflux Wallet Connect UI for React.</strong></div>
<div align="center"> Easily integrate your dApps on Conflux eSpace with Fluent, Metamask, and OKX wallets.</div>
<br />
<div align="center">
<a href="https://react-hot-toast.com/">Website</a> 
<span> · </span>
<a href="https://react-hot-toast.com/docs">Documentation</a>

</div>

<br />
<div align="center">
  <sub>Created by <a href="https://github.com/Charlie85270">Charlie Rabiller</a> 👨‍🍳</sub>
</div>

<br />

## Features

- 🔥 **Pre-styled and ready to use Button and Modal components to connect wallets to your dApps**
- 🔩 **Easily Customizable, plug your own components**
- ⏳ **Unified API for Metamask, Fluent and OKX wallets**
- 🕊 **Lightweight** - _less than 5kb including styles_
- ✅ **Light and Dark mode supported**

## Installation

#### With yarn

```sh
yarn add conflux-wallet-connect
```

#### With NPM

```sh
npm install conflux-wallet-connect
```

## Getting Started

First, wrap your App with the ConfluxWalletProvider and import the CSS. It will take care of rendering the connect modal, components, manage the wallets and give you access to all functions to interact with them.

```jsx
import {
  ConfluxWalletProvider,
  ConfluxWalletProviderConfiguration,
} from "conflux-wallet-connect";
import "conflux-wallet-connect/lib/conflux-wallet-connect.css";

const App = () => {
  const configuration: ConfluxWalletProviderConfiguration = {
    chainId: 1030,
    theme: "light",
    providers: ["fluent", "metamask", "okx"],
  };

  return (
    <ConfluxWalletProvider configuration={configuration}>
      <p>My App</p>
    </ConfluxWalletProvider>
  );
};
```

You can modify the providers**configuration** to add or remove providers if needed.
Supported providers : **fluent**, **metamask**, **okx**
Supported chains : **1030** (Conflux EVM mainnet) / 71 (Conflux EVM testnet

## Documentation

Find the full API reference on [official documentation](https://react-hot-toast.com/docs).
