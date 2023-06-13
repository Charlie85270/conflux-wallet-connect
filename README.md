
<img src="https://cryptocdn.fra1.cdn.digitaloceanspaces.com/sites/8/Screenshot-2022-04-28-10.57.38.png" />
<br />
<div align="center"><strong>Conflux Wallet Connect for React</strong></div>
<div align="center">Easily integrate your react applications on the Conflux eSpace with Fluent, Metamask, and OKX wallets.</div>
<br />
<div align="center">

<a href="https://conflux-wallet-connect.netlify.app">Website / Documentation</a> | 
  <a href="https://conflux-wallet-connect-dapp-exemple.netlify.app/"> Live dApp exemple </a> |
  <a href="https://github.com/Charlie85270/conflux-wallet-connect-dapp-exemple/"> Exemple source code</a>
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

## Button / Modal components to connect user wallets

After wrapping your application with the ConfluxWalletProvider as shown previously, you can use the `<ConfluxWalletButton />` on your app.
This is a pre-styled and interactive button that allow user to connect to your dApps with OKX, Metamask or fluent wallet.

More details and playground [here](?path=/docs/components-walletbutton--docs) :

```jsx
import { ConfluxWalletButton } from "conflux-wallet-connect";

const MyComponent = () => {
  const { openModal } = useConfluxWalletContext();

  return <ConfluxWalletButton onClick={openModal} />;
};
```

## Get active account informations

After wrapping your application with the ConfluxWalletProvider as shown previously, you can use the hook `useConfluxWalletContext` from anywhere in your application and allow you to interact with the **active** user wallet.

```jsx
import {
  useConfluxWalletContext,
} from "conflux-wallet-connect";


const MyComponent = () => {

 const { wallet } = useConfluxWalletContext();
 const { account, balance, chainId } = wallet;
  return (
    <p>
      The balance of the account {account} on {chainId} is {balance} ...
    <p>
  );
};
```

## Documentation

Find the full API reference on [official documentation](https://conflux-wallet-connect.netlify.app).
